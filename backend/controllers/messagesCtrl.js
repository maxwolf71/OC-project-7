// Imports
const fs = require('fs')
const models = require('../models')
const jwtUtils = require('../middleware/auth')

// Constants
const TITLE_LIMIT = 2
const CONTENT_LIMIT = 4
const ITEMS_LIMIT = 50

// Routes
module.exports = {
    createMessage(req, res) {
        // Getting auth header
        const headerAuth = req.headers['authorization']
        const userId = jwtUtils.getUserId(headerAuth)

        // constants
        const title = req.body.title
        const content = req.body.content

        if (title == '' || content == '') {
            return res.status(400).json({ 'error': 'missing parameters' })
        }

        if (title.length <= TITLE_LIMIT || content.length <= CONTENT_LIMIT) {
            return res.status(400).json({ 'error': 'invalid parameters' })
        }

        models.User.findOne({
            where: { id: userId }
        })
            .then(userFound => {
                if (userFound) {
                    if (req.file == null) {
                        models.Message.create({
                            title: title,
                            content: content,
                            attachement: 0,
                            likes: 0,
                            UserId: userFound.id
                        })
                            .then(newMessage => res.status(201).json(newMessage))
                            .catch(err => res.status(404).json({ error: 'user not found' }))
                    } else {
                        models.Message.create({
                            title: title,
                            content: content,
                            attachement: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
                            likes: 0,
                            UserId: userFound.id
                        })
                            .then(newMessage => res.status(201).json(newMessage))
                            .catch(err => res.status(404).json({ error: 'user not found' }))
                    }
                }
            })
            .catch(error => res.status(500).json({ error: 'unable to verify user' }))
    },
    oneMessage(req, res) {

        const id = req.params.id

        models.Message.findOne({
            attributes: ['id', 'title', 'content', 'attachement'],
            where: { id: id }
        })
            .then(message => {
                if (message) {
                    res.status(201).json(message)
                } else {
                    res.status(404).json({ 'error': 'message not found' })
                }
            })
            .catch(function (err) {
                res.status(500).json({ 'error': 'cannot fetch message' })
            })
    },

    listMessages(req, res) {
        const fields = req.query.fields
        const limit = parseInt(req.query.limit)
        const offset = parseInt(req.query.offset)
        const order = req.query.order

        if (limit > ITEMS_LIMIT) {
            limit = ITEMS_LIMIT
        }

        models.Message.findAll({
            order: [(order != null) ? order.split(':') : ['createdAt', 'DESC']],
            attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
            limit: (!isNaN(limit)) ? limit : null,
            offset: (!isNaN(offset)) ? offset : null,
            include: [{
                model: models.User,
                attributes: ['firstName', 'lastName']
            }]
        })
            .then(messages => {
                if (messages) {
                    res.status(200).json(messages)
                } else {
                    res.status(404).json({ "error": "no messages found" })
                }
            }).catch(err => {
                console.log(err)
                res.status(500).json({ "error": "invalid fields" })
            })
    },

    deleteMessage: async (req, res) => {
        const headerAuth = req.headers['authorization'];
        const userId = jwtUtils.getUserId(headerAuth);

        const Messages = models.Message;
        const attachement = Messages.attachement

        Messages.findOne({
            where: {
                id: req.params.id,
            }
        })
        .then(message => {
            if (message.UserId == userId) {
                if (attachement !== null) {
                    const filename = message.attachement.split('/images/')[1];
                    fs.unlink(`images/${filename}`, () => {
                        Messages.destroy({ where: { id: req.params.id } })
                            .then(() => res.status(200).json({ message: 'Message and image deleted !' }))
                            .catch(error => res.status(400).json({ error }))
                    })
                } else {
                    Messages.destroy({ where: { id: req.params.id } })
                        .then(() => res.status(200).json({ message: 'Message deleted !' }))
                        .catch(error => res.status(400).json({ error }))
                }
            } else {
                res.status(404).json({ 'error': "'You\'re not authorized to remove this message'" })
            }
        })
        .catch(error => res.status(500).json({ message: "Message not found" }))
    }
}
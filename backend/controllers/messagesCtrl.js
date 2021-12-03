// Imports
const fs = require('fs') // dealing with image
const models = require('../models')
const jwtUtils = require('../middleware/auth')

// Constants
const TITLE_LIMIT = 2
const CONTENT_LIMIT = 4

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
            return res.status(400).json({ 'error': 'Please fill title and content fields !' })
        }

        if (title.length <= TITLE_LIMIT || content.length <= CONTENT_LIMIT) {
            return res.status(400).json({ 'error': 'Title length too long/short !' })
        }

        models.User.findOne({
            where: { id: userId }
        })
            .then(userFound => {
                if (userFound) {
                    if (req.file == null) { // If no image
                        models.Message.create({
                            firstName: userFound.firstName,
                            lastName: userFound.lastName,
                            title: title,
                            content: content,
                            attachment: 0,
                            likes: 0,
                            UserId: userFound.id, // create unique user id for message
                        })
                            .then(newMessage => res.status(201).json(newMessage))
                            .catch(error => res.status(404).json({ error: 'user not found' }))
                    } else { // if image
                        models.Message.create({
                            firstName: userFound.firstName,
                            lastName: userFound.lastName,
                            title: title,
                            content: content,
                            attachment: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
                            likes: 0,
                            UserId: userFound.id, // create unique user id for message
                        })
                            .then(newMessage => res.status(201).json(newMessage))
                            .catch(error => res.status(404).json({ error: 'user not found' }))
                    }
                }
            })
            .catch(error => res.status(500).json({ error: 'unable to verify user' }))
    },
    oneMessage(req, res) {

        models.Message.findOne({
            attributes: ['id', 'userId', 'firstName', 'lastName', 'title', 'content', 'attachment', 'likes'],
            where: { id: req.params.id }
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

        models.Message.findAll({
            order: [(order != null) ? order.split(':') : ['createdAt', 'DESC']],
            attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
            limit: (!isNaN(limit)) ? limit : null,
            offset: (!isNaN(offset)) ? offset : null,
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
        const headerAuth = req.headers['authorization']
        const userId = jwtUtils.getUserId(headerAuth)

        const Messages = models.Message
        const attachment = Messages.attachment

        Messages.findOne({
            where: {
                id: req.params.id,
            }
        })
        .then(message => {
            if (message.UserId == userId || isAdmin === true) {
                if (attachment !== null) {
                    const filename = message.attachment.split('/images/')[1]
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
        .catch(error => res.status(500).json({ error }))
    }
}
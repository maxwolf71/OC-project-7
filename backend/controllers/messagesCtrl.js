// Imports
const models = require('../models')
const asyncLib = require('async')
const jwt = require('../middleware/auth')

//Constants
const TITLE_LIMIT = 2
const CONTENT_LIMIT = 4

// Routes
module.exports = {

    // POST A MESSAGE ***********************************************************************
    createMessage: function (req, res) {
        const headerAuth = req.headers['authorization']
        const userId = jwt.getUserId(headerAuth)

        // Params
        const title = req.body.title
        const content = req.body.content
        const attachement = req.body.file

        if (title == '' || content == '') {
            return res.status(400).json({ 'error': 'missing parameters' })
        }

        if (title.length <= TITLE_LIMIT || title.content <= CONTENT_LIMIT) {
            return res.status(400).json({ 'error': 'invalid parameters' })
        }

        asyncLib.waterfall([
            function (done) {
                models.User.findOne({
                    where: { id: userId }
                })
                    .then(function (userFound) {
                        done(null, userFound)
                    })
                    .catch(function (err) {
                        return res.status(500).json({ 'error': 'unable to verify user' })
                    })
            },
            function (userFound, done) {
                if (userFound) {
                    if (req.file == null) {
                        models.Message.create({
                            title: title,
                            content: content,
                            attachement: 0,
                            likes: 0,
                            UserId: userFound.id
                        })
                            .then(function (newMessage) {
                                done(newMessage)
                            })
                    }

                    else {
                        models.Message.create({
                            title: title,
                            content: content,
                            attachement: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
                            likes: 0,
                            UserId: userFound.id
                        })
                            .then(function (newMessage) {
                                done(newMessage)
                            })
                    }


                } else {
                    res.status(404).json({ 'error': 'user not found' })
                }
            }
        ], function (newMessage) {
            if (newMessage) {
                return res.status(201).json(newMessage)
            } else {
                return res.status(500).json({ 'error': 'cannot post message' })
            }
        })
    },

    // SHOW POSTS  ***********************************************************************
    listMessages: function (req, res) {

        models.Message.findAll({
            include: [{
                model: models.User,
                attributes: ['firstName', 'lastName']
            }]
        })
            .then(function (messages) {
                if (messages) {
                    res.status(200).json(messages)
                } else {
                    res.status(404).json({ 'error': 'no messages found' })
                }
            })
            .catch(error => {
                res.status(500).json({ 'error': error })
            })
    },
    // DELETE POST  ***********************************************************************
    deleteMessages: function (req, res) {

    }

}
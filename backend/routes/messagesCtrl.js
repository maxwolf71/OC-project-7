// Imports
const models = require('../models')
const asyncLib = require('async')
const jwtUtils = require('../utils/jwt.utils')

//Constants
const TITLE_LIMIT = 2
const CONTENT_LIMIT = 4

// Routes
module.exports = {

    // POST A MESSAGE ***********************************************************************
    createMessage: function (req, res) {
        const headerAuth = req.headers['authorization']
        const userId = jwtUtils.getUserId(headerAuth)

        // Params
        const title = req.body.title
        const content = req.body.content

        if (title == null || content == null) {
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
                    models.Message.create({
                        title: title,
                        content: content,
                        likes: 0,
                        UserId : userFound.id
                    })
                        .then(function (newMessage) {
                            done(newMessage)
                        })
                } else {
                    return res.status(404).json({ 'error': 'user not found' })
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
        const fields = req.query.fields
        const limit  = parseInt(req.query.limit)
        const offset = parseInt(req.query.offset)
        const order  = req.query.order

        models.Message.findAll({
            order: [(order != null) ? order.split(':') : ['title', 'ASC']],
            attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
            limit: (!isNaN(limit)) ? limit : null,
            offset: (!isNaN(offset)) ? offset : null,
            include: [{
                model: models.User,
                attributes: [ 'firstName', 'lastName' ]
            }]
        })
        .then(function(messages) {
            if (messages) {
                res.status(200).json(messages)
            } else {
                res.status(404).json({ 'error': 'no messages found' })
            }
        })
        .catch(function(err) {
            res.status(500).json({ 'error': 'invalid fields' })
        })
    }

}
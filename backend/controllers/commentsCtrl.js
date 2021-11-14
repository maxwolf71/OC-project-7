// Imports
const models = require('../models')
const jwtUtils = require('../middleware/auth')

// Constants
const ITEMS_LIMIT = 50

// Routes
module.exports = {
    createComment(req, res) {
        const headerAuth = req.headers['authorization']
        const userId = jwtUtils.getUserId(headerAuth)

        const content = req.body.content

        models.User.findOne({
            where: { id: userId }
        })
            .then(userFound => {
                models.Message.findOne({
                    where: { id: req.params.messageId }
                })
                    .then(messageFound => {
                        models.Comment.create({
                            messageId: messageFound.id,
                            userId: userFound.id, // create unique user id for comment
                            firstName: userFound.firstName,
                            lastName: userFound.lastName,
                            content: content,
                        })
                            .then(newComment => res.status(201).json(newComment), { message: 'Comment added with succes !' })
                            .catch(error => res.status(500).json({ error: 'Unable to create comment !' }))
                    })
                    .catch(error => res.status(500).json({ error: 'Unable to find the message !' }))
            })
            .catch(error => res.status(500).json({ error: 'Unable to find user !' }))
    },
    listCommentsMessage(req, res) {
        const headerAuth = req.headers['authorization']
        const userId = jwtUtils.getUserId(headerAuth)

        const fields = req.query.fields
        const limit = parseInt(req.query.limit)
        const offset = parseInt(req.query.offset)
        const order = req.query.order

        models.User.findOne({
            where: { id: userId }
        })
            .then(() => {
                models.Message.findOne({
                    where: { id: req.params.id }
                })
                    .then(messageFound => {
                        models.Comment.findAll({
                            order: [(order != null) ? order.split(':') : ['createdAt', 'DESC']],
                            attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
                            limit: (!isNaN(limit)) ? limit : null,
                            offset: (!isNaN(offset)) ? offset : null,
                            where: { messageId: messageFound.id }
                        })
                        .then(commentFound => {
                            if (!commentFound.length == 0) {
                                res.status(200).json(commentFound)
                            } else {
                                res.status(500).json({ error: 'No comments for this message !' })
                            }
                        })
                        .catch(err => {res.status(500).json({ error: 'Unable to search for comment !' })})
                    })
                    .catch(error => res.status(500).json({ error: 'Unable to find message !' }))
            })
            .catch(error => res.status(500).json({ error: 'Unable to find user !' }))
    },
    deleteComment: async (req, res) => {
        const headerAuth = req.headers['authorization'];
        const userId = jwtUtils.getUserId(headerAuth);

        models.Comment.findOne({
            where: {
                id: req.params.id,
            }
        })
            .then(comment => {
                if (comment.userId == userId) {
                    comment.destroy({
                        where: { id: req.params.id }
                    })
                        .then(() => res.status(200).json({ message: 'Comment deleted !' }))
                        .catch(error => res.status(400).json({ error }))
                } else {
                    res.status(404).json({ 'error': "'You\'re not authorized to remove this comment !'" })
                }
            })
            .catch(error => res.status(500).json({ error }))
    },


    /*listComments(req, res) {
        const fields = req.query.fields
        const limit = parseInt(req.query.limit)
        const offset = parseInt(req.query.offset)
        const order = req.query.order

        if (limit > ITEMS_LIMIT) {
            limit = ITEMS_LIMIT
        }
        models.Comment.findAll({
            order: [(order != null) ? order.split(':') : ['createdAt', 'DESC']],
            attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
            limit: (!isNaN(limit)) ? limit : null,
            offset: (!isNaN(offset)) ? offset : null,
        })
            .then(comments => {
                if (comments) {
                    res.status(200).json(comments)
                } else {
                    res.status(404).json({ "error": "no comments found" })
                }
            }).catch(err => {
                console.log(err)
                res.status(500).json({ "error": "invalid fields" })
            })
    }*/
}
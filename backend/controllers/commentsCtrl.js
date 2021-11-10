const models = require('../models')
const jwtUtils = require('../middleware/auth')

module.exports = {
    createComment(req, res) {
        const headerAuth = req.headers['authorization']
        const userId = jwtUtils.getUserId(headerAuth)

        const content = req.body.content
        console.log(content);
        models.User.findOne({
            where: { id: userId }
        })
        .then(userFound => {
            models.Message.findOne({
                where: { id: req.params.messageId} 
            })
            .then(messageFound => {
                models.Comment.create({
                    messageId: messageFound.id,
                    userId: userFound.id, // create unique user id for message
                    firstName: userFound.firstName,
                    lastName: userFound.lastName,
                    content: content,
                })
                .then(newComment => res.status(201).json(newComment))
                .catch(error => res.status(500).json({ error: 'Unable to create message !' }))
            })
            .catch(error => res.status(500).json({ 'error': 'Unable to find message !' }))
        })
        .catch(error => res.status(500).json({ error: 'Unable to find user !' }))
            
           
    }
}
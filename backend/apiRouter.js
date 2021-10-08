// Imports
const express      = require('express')
const usersCtrl    = require('./routes/usersCtrl')
const messagesCtrl = require('./routes/messagesCtrl')
//const likesCtrl    = require('./routes/likesCtrl')

// Router
exports.router = (function () {
    const apiRouter = express.Router()

    // Users routes
    apiRouter.route('/users/createAccount/').post(usersCtrl.createAccount)
    apiRouter.route('/users/login/').post(usersCtrl.login)
    apiRouter.route('/users/infos/').get(usersCtrl.getUserInfos)
    //apiRouter.route('/users/me/').put(usersCtrl.updateUserInfos)
    //apiRouter.route('/users/delete').post(usersCtrl.deleteProfile)

    // Messages routes
    apiRouter.route('/messages/new/').post(messagesCtrl.createMessage)
    apiRouter.route('/messages/').get(messagesCtrl.listMessages)
    //apiRouter.route('/messages/:d').delete(messagesCtrl.deleteMessage)

    // Likes routes
    //apiRouter.route('/messages/:messageId/vote/like').post(likesCtrl.likePost)
    //apiRouter.route('/messages/:messageId/vote/dislike').post(likesCtrl.dislikePost)

    return apiRouter
})() // instance of router

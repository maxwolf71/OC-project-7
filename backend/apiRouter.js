// Imports
const express      = require('express')
const usersCtrl    = require('./controllers/usersCtrl')
const messagesCtrl = require('./controllers/messagesCtrl')
const likesCtrl    = require('./controllers/likesCtrl')

const multer = require('./middleware/multer-config')

// Router
exports.router = (function () {
    const apiRouter = express.Router()

    // Users routes
    apiRouter.route('/users/createAccount/').post(usersCtrl.createAccount)
    apiRouter.route('/users/login/').post(usersCtrl.login)
    apiRouter.route('/users/infos/').get(usersCtrl.getUserInfos)
    apiRouter.route('/users/delete/:id').delete(usersCtrl.deleteProfile)
    //apiRouter.route('/users/bio/:id/').put(usersCtrl.updateUserBio)

    // Messages routes
    apiRouter.route('/messages/new/').post(multer, messagesCtrl.createMessage)
    apiRouter.route('/messages/').get(multer, messagesCtrl.listMessages)
    apiRouter.route('/messages/:id/').get(multer, messagesCtrl.oneMessage)
    apiRouter.route('/messages/:id/').delete(messagesCtrl.deleteMessage)

    // Likes routes
    apiRouter.route('/messages/:messageId/vote/like').post(likesCtrl.likeMessage)

    return apiRouter
})() // instance of router

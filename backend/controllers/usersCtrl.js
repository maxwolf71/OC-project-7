// Imports
const bcrypt = require('bcrypt')
const jwtUtils = require('../middleware/auth')
const models = require('../models')
const asyncLib = require('async')

// Constants
const EMAIL_REGEX = /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const PASSWORD_REGEX = /^(?=.*\d).{4,8}$/

// Routes
module.exports = {

  // CREATE AN ACCOUNT  ***********************************************************************

  createAccount: function (req, res) {

    // Params
    const email = req.body.email
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const password = req.body.password
    const bio = req.body.bio

    if (email == null || firstName == null || lastName == null || password == null) {
      return res.status(400).json({ 'error': 'missing parameters' })
    }

    if (firstName.length >= 15 || firstName.length <= 2) {
      return res.status(400).json({ 'error': 'wrong first name (must be length 3 - 16)' })
    }

    if (lastName.length >= 19 || lastName.length <= 2) {
      return res.status(400).json({ 'error': 'wrong first name (must be length 3 - 20)' })
    }

    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({ 'error': 'email is not valid' })
    }

    if (!PASSWORD_REGEX.test(password)) {
      return res.status(400).json({ 'error': 'password invalid (length 4 - 8 characters & include 1 number at least)' })
    }

    asyncLib.waterfall([
      function (done) {
        models.User.findOne({
          where: { email: email }
        })
          .then(userFound => {
            done(null, userFound)
          })
          .catch(err => {
            return res.status(500).json({ 'error': 'unable to verify user' })
          })
      },
      function (userFound, done) {
        if (!userFound) {
          bcrypt.hash(password, 5, function (err, bcryptedPassword) {
            done(null, userFound, bcryptedPassword)
          })
        } else {
          return res.status(409).json({ 'error': 'user already exists' })
        }
      },
      function (userFound, bcryptedPassword, done) {
        const newUser = models.User.create({
          email: email,
          firstName: firstName,
          lastName: lastName,
          password: bcryptedPassword,
          bio: bio,
          isAdmin: 0
        })
          .then(function (newUser) {
            done(newUser)
          })
          .catch(function (err) {
            return res.status(500).json({ 'error': 'cannot add user' })
          })
      }
    ],
      function (newUser) {
        if (newUser) {
          return res.status(201).json({
            'userId': newUser.id,
          })
        } else {
          return res.status(500).json({ 'error': 'cannot add user' })
        }
      })
  },

  // LOGIN ***********************************************************************
  login: function (req, res) {

    // Params
    const email = req.body.email
    const password = req.body.password

    if (email == null || password == null) {
      return res.status(403).json({ 'error': 'missing parameters' })
    }

    models.User.findOne({
      where: { email: email }
    })
      .then(userFound => {
        if (userFound) {
          bcrypt.compare(password, userFound.password, function (errBycrypt, resBycrypt) {
            if (resBycrypt) {
              return res.status(200).json({
                'userId': userFound.id,
                'token': jwtUtils.generateTokenForUser(userFound),
                'isAdmin': userFound.isAdmin,
              })
            } else {
              return res.status(403).json({ 'error': 'invalid password' })
            }
          })
        } else {
          return res.status(404).json({ 'error': 'user doesn\'t exist in DB' })
        }
      })
      .catch(err => {
        return res.status(500).json({ 'error': 'unable to verify user' })
      })
  },

  // GET USER PROFILE ***********************************************************************
  getUserInfos: function (req, res) {
    const headerAuth = req.headers['authorization']
    const userId = jwtUtils.getUserId(headerAuth)

    if (userId < 0) // if no user logged in
      return res.status(400).json({ 'error': 'wrong token' })

    models.User.findOne({
      attributes: ['id', 'email', 'firstName', 'lastName', 'bio'],
      where: { id: userId }
    })
      .then(user => {
        if (user) {
          res.status(201).json(user)
        } else {
          res.status(404).json({ 'error': 'user not found' })
        }
      })
      .catch(err => {
        res.status(500).json({ 'error': 'cannot fetch user' })
      })
  },

  // DELETE USER PROFILE ***********************************************************************
  deleteProfile: async (req, res) => {
    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getUserId(headerAuth);

    models.User.findOne({
        where: {
            id: req.params.id,
        }
    })
    .then(user => {
        if (user.id = userId || isAdmin === true) {
          user.destroy()
          .then(() => res.status(201).json({ message: 'User profile deleted !' }))
          .catch(error => res.status(400).json({ error: 'You don\' have sufficient rights to delete this profile !' }))
        } else {
          res.status(404).json({ message: 'Unable to delete user profile' })
        }
    })
    .catch(error => res.status(500).json({ message: "User not found" })) 
  },

  // UPDATE USER PROFILE ***********************************************************************
/*  updateUserBio: function (req, res) {
    const headerAuth = req.headers['authorization']
    const userId = jwtUtils.getUserId(headerAuth)

    // Params
    const bio = req.body.bio

    asyncLib.waterfall([
      function (done) {
        models.User.findOne({
          attributes: ['id', 'bio'],
          where: { id: userId }
        })
          .then(userFound => {
            done(null, userFound)
          })
          .catch(err => {
            return res.status(500).json({ 'error': 'unable to verify user' })
          })
      },
      function (userFound, done) {
        if (userFound)  {
          userFound.update({
            bio: (bio ? bio : userFound.bio)
          })
          .then(function () {
            done(userFound)
          })
          .catch(function (err) {
            return res.status(500).json({ 'error': 'cannot update user' })
          })
        } else {
          return res.status(404).json({ 'error': 'user not found' })
        }
      },
    ], function (userFound) {
      if (userFound) {
        return res.status(201).json(userFound)
      } else {
        return res.status(500).json({ 'error': 'cannot update user profile' })
      }
    })
  }*/
}


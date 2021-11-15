// Imports
const express = require('express')
const apiRouter = require('./apiRouter').router
const path = require('path') // help to generate path for images
const cors = require('cors') // Deal with cor errors

const server = express() // Instance of server 

server.use(cors())

server.use(express.json()) // Body-parser deprecated

// Configure Routes 
server.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html'),
        res.status(200).send('<h1>Hi server :)</h1>')
})

server.use('/api/', apiRouter)
server.use('/images', express.static(path.join(__dirname, 'images'))) // add image

// Launch server
server.listen(3000, function () {
    console.log('Server is listening !')
})


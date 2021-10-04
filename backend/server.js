// Imports
const express = require('express')
const apiRouter = require('./apiRouter').router

const server = express() // Instance of server 

const cors = require('cors')
server.use(
    cors({
        origin: '*'
    })
)

server.use(express.json()) // Body-parser deprecated

// Configure Routes 
server.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html'),
        res.status(200).send('<h1>Hi on my server</h1>')
})

server.use('/api/', apiRouter)

// Launch server
server.listen(3000, function () {
    console.log('Server is listening !')
})
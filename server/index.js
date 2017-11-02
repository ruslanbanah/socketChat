const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const chat = require('./chat')

const PORT = 3000

console.log('Server has been started...')
server.listen(PORT)
console.log(`http://localhost:${PORT}`)

app.use(express.static(__dirname + '/../public'));

console.log('Chat has been started...')
io.on('connection', chat );
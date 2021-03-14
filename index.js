const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
port = 3000;
io.on('connection', socket=>{
    console.log('A user Connected')
    socket.on('chatMessage', message=>{
        console.log(message)
        io.emit('chatMessageSrESPONSE', message)
    })
})
server.listen(port,()=>{
    console.log('Server Running', port)
})
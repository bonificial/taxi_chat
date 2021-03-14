const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
port = process.env.PORT || 3000;
io.on('connection', socket => {
    console.log('A user Connected')

    socket.on('joinRoom', ({userID, roomID}) => {
        socket.join(roomID);
        console.log(`${username} joined the conversation/room ${roomID}`);
    })

    socket.on('chatMessage', message => {
        console.log(`${message.username} sent a new message ${message.message.text}`);
        io.emit('chatMessageSrESPONSE', message)
    })
    socket.on('disconnect', () => {

        console.log(socket.id)
        socket.emit('message', socket.id + ' has left the chat')

    })
})
server.listen(port, () => {
    console.log('Server Running', port)
})

//git add . && git commit -m "updates" && git push -u origin master
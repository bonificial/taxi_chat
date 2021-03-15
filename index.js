const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

port = process.env.PORT || 3000;

const fh = require('./helpers/files');

// fh.readFile('me.json');
//storeData({contact:'0700', name:'Bonificial'},'me.json');
io.on('connection', socket => {
    console.log(socket.id, ' has   Connected')

    socket.on('joinRoom', ({userID, roomID}) => {
        socket.join(roomID);
        console.log(`${userID} joined the conversation/room ${roomID}`);
    })

    socket.on('chatMessage', message => {
        console.log(`${message.username} sent a new message ${message.message.text}`);
        io.emit('chatMessageResponse', message);
let threadkey = message.threadkey;
let messageObj = message.message;
fh.storeData(messageObj, threadkey + ".json");
    })
    socket.on('disconnect', () => {

        console.log(socket.id , ' has disconnected')
        socket.emit('message', socket.id + ' has left the chat')

    })
})
server.listen(port, () => {
    console.log('Server Running', port)
})

//
//git add . && git commit -m "updates" && git push -u origin master
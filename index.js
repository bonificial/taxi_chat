const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const fb = require('./helpers/firebase');
const app = express();
const server = http.createServer(app);
const io = socketio(server);

port = process.env.PORT || 3000;

const fh = require('./helpers/files');
fb.initializeFirebaseDB();

// fh.readFile('me.json');
//storeData({contact:'0700', name:'Bonificial'},'me.json');
io.on('connection', socket => {
    console.log(socket.id, ' has   Connected');


    socket.on('joinRoom', ({userID, roomID}) => {
        socket.join(roomID);
        console.log(`${userID} joined the conversation/room ${roomID}`);
        io.in(roomID).emit('message', `${userID} joined the conversation/room ${roomID}`)
    })

    socket.on('chatMessage', message => {
        console.log(`${message.user} sent a new message ${message.chatMessage}`);
        io.emit('chatMessageResponse', message);
        let threadkey = message.threadkey;
        let messageObj = message.message;
        let filename = threadkey + ".json";

     /*   if (fh.FileExistsOnS3(filename)) {
            fh.updateFile(filename, data);
        } else {
            fh.storeData({threadkey: threadkey, chats: [messageObj]}, threadkey + ".json");
        }*/

    })
    socket.on('disconnect', () => {

        console.log(socket.id, ' has disconnected')
        socket.emit('message', socket.id + ' has left the chat')

    })
})
server.listen(port, () => {
    console.log('Server Running', port)
})
app.get('/read/:filename', function (req, res) {
    let filename = req.params.filename + '.json';
    console.log('Filename is ', filename)
    fh.readFile(filename).then(response => {
        console.log(response)
        //res.type('json');
//console.log(JSON.parse(response))
        res.send(JSON.parse(response));
    })

});
app.get('/update/:filename/:town', function (req, res) {
    let filename = req.params.filename + '.json';
    let data = {
        "_id": "xXZJpTerOUcKfJSHbme16IcCxUs2_1610542057194",
        "createdAt": "Wednesday, January 13, 2021 3:47 PM",
        "key": "xXZJpTerOUcKfJSHbme16IcCxUs2_1610542057194",
        "text": "Hello",
        "user": {
            "_id": "xXZJpTerOUcKfJSHbme16IcCxUs2",
            "name": "Macha",
        }
    };
    // console.log(filename);
    fh.updateFile(filename, data).then(resp => {
        res.send('File Update Success');
    })


});
//
//git add . && git commit -m "updates" && git push -u origin master
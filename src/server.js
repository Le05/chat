const express = require('express');
const routes = require('./routes');
const { setupWebsocket } = require('./configs/websocket/websocketConfig');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);


// pega todas as conexoes
app.use((req, res, next) => {
    req.io = io;
    return next();
});

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

setupWebsocket(io);

server.listen(3000);


// const express = require('express');
// const routes = require('./routes');
// const socketio = require('socket.io');

// const http = require('http');
// const cors = require('cors');
// const { setupWebsocket } = require('./configs/websocket/websocketConfig');
// // importacao necessaria para manter as requsicoes http e websocket

// // const helmet = require('helmet');
// // const morgan = require("morgan");
// const app = express();
// const server = http.Server(app);

// //inicializa o socket
// const io = socketio(server);

// // pega todas as conexoes
// setupWebsocket(io);
// app.use((req, res, next) => {
//     req.io = io;
//     return next();
// });

// // app.use(helmet());
// app.use(cors());
// app.use(express.json())
// app.use(express.urlencoded({ extended: true }));
// // app.use(routes);
// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/teste.html');
// });

// server.listen(5000);


// const app = require('express')()
// const http = require('http').createServer(app)
// const io = require('socket.io')(http);

// app.get('/', (req, res) => {
//     res.send("Node Server is running. Yay!!")
// })

// io.on('connection', socket => {
//     console.log(socket.id);
//     //Get the chatID of the user and join in a room of the same name
//     chatID = socket.handshake.query.chatID
//     socket.join(chatID)

//     //Leave the room if the user closes the socket
//     socket.on('disconnect', () => {
//         socket.leave(chatID)
//     })

//     //Send message to only a particular user
//     socket.on('send_message', message => {
//         receiverChatID = message.receiverChatID
//         senderChatID = message.senderChatID
//         content = message.content

//         //Send message to only that particular id
//         socket.in(receiverChatID).emit('receive_message', {
//             'content': content,
//             'senderChatID': senderChatID,
//             'receiverChatID':receiverChatID,
//         })
//     })
// });
// var port = process.env.PORT || 3000;
// http.listen(port)

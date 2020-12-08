const express = require('express');
const routes = require('./routes');
const socketio = require('socket.io');

const http = require('http');
const cors = require('cors');
const { setupWebsocket } = require('./configs/websocket/websocketConfig');
// importacao necessaria para manter as requsicoes http e websocket

// const helmet = require('helmet');
// const morgan = require("morgan");
const app = express();
const server = http.Server(app);

//inicializa o socket
const io = socketio(server);

// pega todas as conexoes
setupWebsocket(io);
app.use((req, res, next) => {
    req.io = io;
    return next();
});

// app.use(helmet());
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
// app.use(routes);
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/teste.html');
});

server.listen(3000);

// var app = require('express')();
// var http = require('http').createServer(app);
// var io = require('socket.io')(http);

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/teste.html');
// });

// io.on('connection', (socket) => {
//   console.log('a user connected');
// });

// http.listen(3000, () => {
//   console.log('listening on *:3000');
// });

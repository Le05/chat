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



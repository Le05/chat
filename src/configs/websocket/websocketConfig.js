// const connection = require('./database/conections');

exports.setupWebsocket = (io) => {
    //quando connectar eu vou fazer isso
    io.on('connection', socket => connection(io,socket));
}

function connection(io,socket){
    io.emit("init", "Bem vindo ao MMmodel");
    // let { user_id } = socket.handshake.query;
    // let websocket_id = socket.id;

    socket.on('sendMessage',socket => sendMessage(io,socket));

   
}

function receiverMessage(io,socket){
// recebe as fotos para o socket
}

function sendMessage(io,socket){
    // envia as fotos
    console.log(socket);
    io.emit('receiverMessage',socket);
}
// const connection = require('./database/conections');

exports.setupWebsocket = (io) => {
    //quando connectar eu vou fazer isso
    io.on('connection', socket => connection(io,socket));
}

function connection(io,socket){
    io.emit("init", "Bem vindo ao MMmodel");
    let { user_id } = socket.handshake.query;
    let websocket_id = socket.id;
    // await connection('users').where('id',user_id).update('websocketId',websocket_id);
    console.log(socket.id);
    socket.on('message', data => {
        io.emit('message',data);
    });
}
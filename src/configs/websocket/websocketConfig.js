// const connection = require('./database/conections');

exports.setupWebsocket = (io) => {
    io.on('connection', async socket => {
        io.emit("init", "Bem vindo ao MMmodel");
        let { user_id } = socket.handshake.query;
        let websocket_id = socket.id;
        // await connection('users').where('id',user_id).update('websocketId',websocket_id);

        socket.on('message', data => {
            io.emit('message',data);
        });
    });

}
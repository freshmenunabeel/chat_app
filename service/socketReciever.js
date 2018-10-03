
var redisService = require('./redis');
var socketServer = require('./socketServer');
module.exports = function (io) {
    var sockets = {};
    io.on('connection', function (socket) {
        socket.on('connect', function (mgs) {
            socket.emit('handSake', '');
        });
        socket.on('handSake', function (name) {
            sockets[name] = socket.id;
        });

        socket.on('message', function (msg) {
            console.log('message got' + msg);
            json = msg;
            var sendToUser = json.user;
            if (sockets[sendToUser]) {
                io.to(sockets[sendToUser]).emit('message', json.msg);
            }
            else if (!msg.broadcast) {
                console.log('sending to broading');
                socketServer.broadCast(msg, () => {

                });
            }
        });
    })
};
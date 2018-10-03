

var io = require('socket.io-client');
var servers = ["http://52.55.33.87:8080/", "http://54.211.104.104:8080/"];
var sockets = [];

for (var i = 0; i < servers.length; i++) {
    (function (server2) {
        var socket2 = io(server2);
        sockets.push(socket2);
        socket2.on('connect', function (socket) {
            console.log("connect from " + server2 + ' ' + socket);
        });

        socket2.on('disconnect', function (socket) {
            console.log("disconnect from " + server2 + ' ' + socket);
        });
    })(servers[i]);
}

var socketService = function () {
    this.broadCast = function (message, callback) {
        console.log('broad casting');
        message.broadcast = true;
        for (socket in sockets) {
            sockets[socket].emit('message', message);
        }
        callback();
    }
}
module.exports = new socketService();
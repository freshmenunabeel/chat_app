var express = require('express');
var redisService = require('./service/redis');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
require('./service/socketReciever')(io);

app.get('/chat', function (req, res, next) {
    res.sendFile(__dirname + '/public/static/index.html');
});

http.listen(8080, function (err) {
    console.log('Started ' + err);
});

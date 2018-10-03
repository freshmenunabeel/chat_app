var express = require('express');
var redisService = require('./redis');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var socketServer = require('./socketServer');
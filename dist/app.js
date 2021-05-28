"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var socket_io_1 = __importDefault(require("socket.io"));
var cors = function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');
    if (req.metnod === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return true;
    }
    return false;
};
var app = express_1.default();
var server = http_1.default.createServer(app);
// @ts-ignore
var socket = socket_io_1.default(server);
app.get('/', function (req, res) {
    if (cors(req, res))
        return;
    res.send('Hello, server');
});
var messages = [
    { message: 'Hello Serg', id: 'qweqwe', user: { id: 'qweqew', name: 'Dimych' } },
    { message: 'Hello Dima', id: 'qweqwe1', user: { id: 'qweqew1', name: 'Sergey' } },
];
socket.on('connecting', function (socketChannel) {
    socketChannel.on('client-message-sent', function (message) {
        var messageItem = { message: message, id: '123' + new Date(), user: { id: 'effeff', name: 'Sergey' } };
        messages.push(messageItem);
        socket.emit('new-message-sent', messageItem);
    });
    socketChannel.emit('init-messages-published', messages);
    console.log('a user connected');
});
var PORT = process.env.PORT || 3009;
server.listen(PORT, function () {
    console.log('listening on *:3009');
});
//# sourceMappingURL=app.js.map
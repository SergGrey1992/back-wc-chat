import express from 'express'
import http from 'http'
import socketio from 'socket.io'
import cors from 'cors';

const app = express();
const server = http.createServer(app);
// @ts-ignore
const socket = socketio(server);
app.use(cors());
app.get('/', (req, res) => {
	res.send('Hello, server')
})

const messages = [
	{message: 'Hello Serg', id: 'qweqwe', user: {id: 'qweqew', name: 'Dimych'}},
	{message: 'Hello Dima', id: 'qweqwe1', user: {id: 'qweqew1', name: 'Sergey'}},
]
socket.on('connecting', (socketChannel: any) => {
	socketChannel.on('client-message-sent', (message: string) => {
		let messageItem = {message, id: '123' + new Date(), user: {id: 'effeff', name: 'Sergey'}}
		messages.push(messageItem)

		socket.emit('new-message-sent', messageItem)
	})

	socketChannel.emit('init-messages-published', messages);
	console.log('a user connected')
})

const PORT = process.env.PORT || 3009;

server.listen(PORT, () => {
	console.log('listening on *:3009')
})
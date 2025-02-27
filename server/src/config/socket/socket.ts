import { Server } from 'socket.io';

const io = new Server(parseInt(process.env.SOCKET_PORT ?? '3001'), {
  cors: {
    origin: process.env.CLIENT,
    methods: ['GET', 'POST'],
  },
});

export const socket = () =>
  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('message', (data: string) => {
      io.emit('response', 'Message Received: ' + data);
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });

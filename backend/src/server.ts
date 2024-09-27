// backend/src/server.ts
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import app from './app';
import connectDB from './config/db';
import chatSocket from './sockets/chatSocket';

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5001;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Update with your frontend URL
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('New client connected');
  chatSocket(socket, io);
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
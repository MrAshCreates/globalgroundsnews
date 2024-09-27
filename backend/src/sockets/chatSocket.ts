// backend/src/sockets/chatSocket.ts
import { Server, Socket } from 'socket.io';

const chatSocket = (socket: Socket, io: Server) => {
  socket.on('join_room', (roomId: string) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
  });

  socket.on('send_message', (message) => {
    const { conversationId, content, sender } = message;
    io.to(conversationId).emit('receive_message', {
      content,
      sender,
      timestamp: new Date().toISOString(),
    });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
};

export default chatSocket;
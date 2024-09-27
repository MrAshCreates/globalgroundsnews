// frontend/components/ChatRoom.tsx
'use client';

import { useState, useEffect } from 'react';
import io from 'socket.io-client';

interface Message {
  content: string;
  sender: string;
  timestamp: string;
}

interface ChatRoomProps {
  roomId: string;
}

export default function ChatRoom({ roomId }: ChatRoomProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001');

  useEffect(() => {
    socket.emit('join_room', roomId);

    socket.on('receive_message', (newMessage: Message) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.disconnect();
    };
  }, [roomId]);

  const sendMessage = () => {
    if (input.trim() === '') return;
    const message: Message = {
      content: input,
      sender: 'Username', // Replace with actual username
      timestamp: new Date().toISOString(),
    };
    socket.emit('send_message', message);
    setMessages((prevMessages) => [...prevMessages, message]);
    setInput('');
  };

  return (
    <div className="container mx-auto px-4 py-4 max-w-2xl">
      <h2 className="text-xl font-bold mb-4">Room: {roomId}</h2>
      <div className="border rounded p-4 h-96 overflow-y-scroll mb-4">
        {messages.map((message, index) => (
          <div key={index} className="mb-2">
            <strong>{message.sender}</strong>: {message.content}
          </div>
        ))}
      </div>
      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-grow px-4 py-2 border rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}
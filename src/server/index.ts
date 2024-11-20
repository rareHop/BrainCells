import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import { connectDB, Message } from './db';

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  },
  maxHttpBufferSize: 5e6 // 5MB max message size for voice messages
});

// Connect to MongoDB
connectDB();

io.on('connection', async (socket) => {
  console.log('User connected');

  // Send previous messages
  const previousMessages = await Message.find().sort({ timestamp: -1 }).limit(50);
  socket.emit('previousMessages', previousMessages.reverse());

  socket.on('join', (username) => {
    console.log(`${username} joined the chat`);
    io.emit('message', {
      content: `${username} joined the chat`,
      sender: 'System',
      timestamp: new Date(),
      type: 'text'
    });
  });

  socket.on('sendMessage', async (messageData) => {
    const message = new Message(messageData);
    await message.save();
    io.emit('message', message);
  });

  socket.on('leave', (username) => {
    console.log(`${username} left the chat`);
    io.emit('message', {
      content: `${username} left the chat`,
      sender: 'System',
      timestamp: new Date(),
      type: 'text'
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
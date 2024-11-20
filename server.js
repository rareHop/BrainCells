import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://your-mongodb-uri');

// Message Schema
const messageSchema = new mongoose.Schema({
  content: String,
  sender: String,
  timestamp: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

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
      timestamp: new Date()
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
      timestamp: new Date()
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
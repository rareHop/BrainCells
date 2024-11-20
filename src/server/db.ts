import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  content: String,
  sender: String,
  timestamp: { type: Date, default: Date.now },
  type: { type: String, enum: ['text', 'audio'], default: 'text' },
  audioUrl: String
});

export const Message = mongoose.model('Message', messageSchema);

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://your-mongodb-uri');
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};
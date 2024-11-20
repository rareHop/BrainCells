import React, { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';
import io from 'socket.io-client';
import { LoginForm } from './components/LoginForm';
import { ChatMessage } from './components/ChatMessage';
import { ChatHeader } from './components/ChatHeader';
import { VoiceRecorder } from './components/VoiceRecorder';

const socket = io('http://localhost:3001');

interface Message {
  _id: string;
  content: string;
  sender: string;
  timestamp: string;
  type?: 'text' | 'audio';
  audioUrl?: string;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    socket.on('message', (newMessage: Message) => {
      setMessages(prev => [...prev, newMessage]);
    });

    socket.on('previousMessages', (previousMessages: Message[]) => {
      setMessages(previousMessages);
    });

    return () => {
      socket.off('message');
      socket.off('previousMessages');
    };
  }, []);

  const handleLogin = (username: string) => {
    setIsAuthenticated(true);
    setUsername(username);
    socket.emit('join', username);
  };

  const handleLogout = () => {
    socket.emit('leave', username);
    setIsAuthenticated(false);
    setUsername('');
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit('sendMessage', {
        content: message,
        sender: username,
        timestamp: new Date().toISOString(),
        type: 'text'
      });
      setMessage('');
    }
  };

  const handleVoiceMessage = async (audioBlob: Blob) => {
    const base64 = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(audioBlob);
    });

    socket.emit('sendMessage', {
      content: '',
      sender: username,
      timestamp: new Date().toISOString(),
      type: 'audio',
      audioUrl: base64
    });
  };

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex flex-col">
      <ChatHeader username={username} onLogout={handleLogout} />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <ChatMessage
            key={msg._id || index}
            message={msg}
            currentUser={username}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={sendMessage} className="p-4 bg-white/5 backdrop-blur-lg">
        <div className="flex items-center space-x-2">
          <VoiceRecorder onSendVoice={handleVoiceMessage} />
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 rounded-lg bg-white/5 border border-purple-300/20 text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-300/50"
          />
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-lg transition duration-200"
          >
            <Send className="w-6 h-6" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
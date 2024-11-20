import React from 'react';
import { format } from 'date-fns';
import { AudioMessage } from './AudioMessage';

interface Message {
  _id: string;
  content: string;
  sender: string;
  timestamp: string;
  type?: 'text' | 'audio';
  audioUrl?: string;
}

interface ChatMessageProps {
  message: Message;
  currentUser: string;
}

export function ChatMessage({ message, currentUser }: ChatMessageProps) {
  const isOwnMessage = message.sender === currentUser;

  return (
    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
      <div className="max-w-[70%]">
        {message.type === 'audio' ? (
          <AudioMessage
            audioUrl={message.audioUrl!}
            sender={message.sender}
            isOwnMessage={isOwnMessage}
          />
        ) : (
          <div
            className={`break-words rounded-lg px-4 py-2 ${
              isOwnMessage
                ? 'bg-purple-600 text-white'
                : 'bg-white/10 text-purple-100'
            }`}
          >
            <div className="font-bold text-sm mb-1">
              {isOwnMessage ? 'You' : message.sender}
            </div>
            <p>{message.content}</p>
            <div className="text-xs opacity-70 mt-1">
              {format(new Date(message.timestamp), 'HH:mm')}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
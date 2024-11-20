import React from 'react';
import { Brain, LogOut } from 'lucide-react';

interface ChatHeaderProps {
  username: string;
  onLogout: () => void;
}

export function ChatHeader({ username, onLogout }: ChatHeaderProps) {
  return (
    <div className="bg-white/10 backdrop-blur-lg p-4 flex justify-between items-center">
      <div className="flex items-center">
        <Brain className="w-8 h-8 text-purple-300" />
        <h1 className="text-2xl font-bold text-white ml-3">Last Braincells</h1>
      </div>
      <div className="flex items-center">
        <span className="text-purple-300 mr-4">@{username}</span>
        <button
          onClick={onLogout}
          className="bg-red-500/20 hover:bg-red-500/30 text-red-300 p-2 rounded-lg transition duration-200"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
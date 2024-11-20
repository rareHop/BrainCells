import React, { useState } from 'react';
import { Brain } from 'lucide-react';

interface LoginFormProps {
  onLogin: (username: string) => void;
}

const GROUP_PASSWORD = "lastbraincell123";

export function LoginForm({ onLogin }: LoginFormProps) {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === GROUP_PASSWORD && username.trim()) {
      onLogin(username);
      setError('');
    } else {
      setError('Invalid password or username!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-center mb-8">
          <Brain className="w-12 h-12 text-purple-300" />
          <h1 className="text-3xl font-bold text-white ml-3">Last Braincells</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-purple-300/20 text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-300/50"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Group Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-purple-300/20 text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-300/50"
            />
          </div>
          {error && <p className="text-red-300 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
          >
            Join Chat
          </button>
        </form>
      </div>
    </div>
  );
}
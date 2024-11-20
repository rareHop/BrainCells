import React, { useState } from 'react';
import { Play, Pause } from 'lucide-react';

interface AudioMessageProps {
  audioUrl: string;
  sender: string;
  isOwnMessage: boolean;
}

export function AudioMessage({ audioUrl, sender, isOwnMessage }: AudioMessageProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  return (
    <div
      className={`flex items-center space-x-2 p-3 rounded-lg ${
        isOwnMessage ? 'bg-purple-600 text-white' : 'bg-white/10 text-purple-100'
      }`}
    >
      <button
        onClick={togglePlay}
        className={`p-2 rounded-full ${
          isOwnMessage ? 'bg-purple-700 hover:bg-purple-800' : 'bg-white/20 hover:bg-white/30'
        } transition-colors`}
      >
        {isPlaying ? (
          <Pause className="w-4 h-4" />
        ) : (
          <Play className="w-4 h-4" />
        )}
      </button>
      <div className="flex-1">
        <div className="text-sm font-semibold mb-1">
          {isOwnMessage ? 'You' : sender}
        </div>
        <div className="h-1 bg-white/20 rounded">
          <div className="h-full bg-white/40 rounded" style={{ width: '0%' }} />
        </div>
      </div>
      <audio
        ref={audioRef}
        src={audioUrl}
        onEnded={handleEnded}
        className="hidden"
      />
    </div>
  );
}
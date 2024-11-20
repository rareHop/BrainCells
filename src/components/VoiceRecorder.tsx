import React, { useState, useRef } from 'react';
import RecordRTC from 'recordrtc';
import { Mic, Square, Send } from 'lucide-react';

interface VoiceRecorderProps {
  onSendVoice: (audioBlob: Blob) => void;
}

export function VoiceRecorder({ onSendVoice }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const recorderRef = useRef<RecordRTC | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      recorderRef.current = new RecordRTC(stream, {
        type: 'audio',
        mimeType: 'audio/webm',
        recorderType: RecordRTC.StereoAudioRecorder,
      });
      recorderRef.current.startRecording();
      setIsRecording(true);
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
  };

  const stopRecording = () => {
    if (recorderRef.current) {
      recorderRef.current.stopRecording(() => {
        const blob = recorderRef.current?.getBlob();
        if (blob) {
          setRecordedBlob(blob);
        }
        setIsRecording(false);
      });
    }
  };

  const sendVoiceMessage = () => {
    if (recordedBlob) {
      onSendVoice(recordedBlob);
      setRecordedBlob(null);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      {!isRecording && !recordedBlob && (
        <button
          onClick={startRecording}
          className="p-2 rounded-full bg-purple-600 hover:bg-purple-700 transition-colors"
        >
          <Mic className="w-5 h-5 text-white" />
        </button>
      )}
      
      {isRecording && (
        <button
          onClick={stopRecording}
          className="p-2 rounded-full bg-red-500 hover:bg-red-600 transition-colors animate-pulse"
        >
          <Square className="w-5 h-5 text-white" />
        </button>
      )}

      {recordedBlob && (
        <button
          onClick={sendVoiceMessage}
          className="p-2 rounded-full bg-green-500 hover:bg-green-600 transition-colors"
        >
          <Send className="w-5 h-5 text-white" />
        </button>
      )}
    </div>
  );
}
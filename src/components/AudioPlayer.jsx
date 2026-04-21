import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function AudioPlayer({ autoPlayTrigger }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioUrl = "/bg-music.m4a";
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(audioUrl);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;
    return () => {
      audioRef.current.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (autoPlayTrigger && audioRef.current && !isPlaying) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(e => console.log("Audio auto-play prevented", e));
    }
  }, [autoPlayTrigger]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log("Audio play prevented", e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <button 
      onClick={togglePlay}
      className="fixed bottom-6 right-6 z-50 p-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full shadow-[0_0_20px_rgba(255,255,255,0.1)] border border-white/20 transition-all duration-300 group"
      aria-label="Toggle Background Music"
    >
      {isPlaying ? (
        <Volume2 className="w-5 h-5 text-pink-400 group-hover:scale-110 transition-transform" />
      ) : (
        <VolumeX className="w-5 h-5 text-gray-400 group-hover:scale-110 transition-transform" />
      )}
      
      {/* Subtle ping effect when off, indicating they should click it */}
      {!isPlaying && (
        <span className="absolute flex h-full w-full inset-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-20"></span>
        </span>
      )}
    </button>
  );
}

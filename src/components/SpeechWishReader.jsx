import React, { useState } from 'react';
import { Volume2, Sparkles, MessageSquare } from 'lucide-react';
import { triggerPrideConfetti } from '../utils/particles';

export default function SpeechWishReader() {
  const [text, setText] = useState('Happy Birthday! Wishing you a fantastic day filled with joy, laughter, and endless sweet cake!');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeak = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this browser.');
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.2;

    utterance.onstart = () => {
      setIsSpeaking(true);
      triggerPrideConfetti();
    };
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="w-full max-w-xl mx-auto p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-white">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="w-6 h-6 text-amber-300" />
        <h2 className="text-xl font-bold">Voice Wish Reader</h2>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400 mb-4"
      />

      <div className="text-center">
        <button
          onClick={handleSpeak}
          className={`px-6 py-2.5 rounded-full font-bold text-xs flex items-center gap-2 mx-auto transition-all shadow-lg ${
            isSpeaking
              ? 'bg-rose-500 text-white animate-pulse'
              : 'bg-gradient-to-r from-pink-500 to-amber-400 text-slate-950 hover:brightness-110'
          }`}
        >
          <Volume2 className="w-4 h-4" /> {isSpeaking ? 'Reading Aloud...' : 'Read Wish Aloud 🔊'}
        </button>
      </div>
    </div>
  );
}

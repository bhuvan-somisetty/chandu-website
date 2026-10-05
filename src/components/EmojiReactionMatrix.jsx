import React, { useState } from 'react';
import { playPop } from '../utils/audioSynth';

export default function EmojiReactionMatrix() {
  const [reactions, setReactions] = useState([]);

  const emojis = ['💖', '🎂', '🥳', '✨', '👑', '🎉', '🧁', '⭐', '🎈', '🍾'];

  const spawnEmoji = (emoji) => {
    playPop(500 + Math.random() * 300);
    const id = Date.now() + Math.random();
    const newEmoji = {
      id,
      emoji,
      x: Math.random() * 80 + 10,
      y: Math.random() * 60 + 20,
      size: Math.random() * 20 + 28
    };
    setReactions(prev => [...prev.slice(-25), newEmoji]);
  };

  const clearReactions = () => {
    setReactions([]);
    playPop(250);
  };

  return (
    <div className="bg-slate-900/80 backdrop-blur-xl border border-pink-500/20 rounded-3xl p-6 shadow-2xl max-w-xl mx-auto text-center">
      <div className="inline-block px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 font-mono text-xs uppercase tracking-widest mb-3">
        Interactive Vibe Garden
      </div>
      <h2 className="text-3xl font-extrabold text-white mb-2">Emoji Reaction Pop Matrix 💥</h2>
      <p className="text-slate-300 text-xs mb-4">
        Tap emoji buttons to flood the celebratory canvas with dynamic floating reactions!
      </p>

      {/* Floating Canvas Display */}
      <div className="relative w-full h-64 bg-slate-950/80 border-2 border-slate-800 rounded-3xl overflow-hidden mb-4 select-none">
        {reactions.map(r => (
          <div
            key={r.id}
            className="absolute transition-all transform animate-bounce pointer-events-none"
            style={{
              left: `${r.x}%`,
              top: `${r.y}%`,
              fontSize: `${r.size}px`
            }}
          >
            {r.emoji}
          </div>
        ))}
      </div>

      {/* Emoji Bar */}
      <div className="flex justify-center gap-2 mb-4 flex-wrap">
        {emojis.map(e => (
          <button
            key={e}
            onClick={() => spawnEmoji(e)}
            className="w-10 h-10 rounded-2xl bg-slate-800/90 border border-slate-700/80 text-xl hover:scale-125 transform active:scale-95 transition-all shadow-md"
          >
            {e}
          </button>
        ))}
      </div>

      <button
        onClick={clearReactions}
        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-all border border-slate-700"
      >
        🗑️ Clear Canvas
      </button>
    </div>
  );
}

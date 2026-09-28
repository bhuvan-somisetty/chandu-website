import React, { useState } from 'react';
import { Star, Sparkles, Compass } from 'lucide-react';
import { playSparkle } from '../utils/audioSynth';

export default function ZodiacStarlight() {
  const [luckyTrait, setLuckyTrait] = useState('Radiant Optimism');

  const traits = [
    'Radiant Optimism ✨',
    'Unshakable Loyalty 🛡️',
    'Creative Genius 💡',
    'Infectious Laughter 😄',
    'Limitless Ambition 🚀',
    'Pure Heart of Gold 💖'
  ];

  const handleRoll = () => {
    playSparkle();
    const next = traits[Math.floor(Math.random() * traits.length)];
    setLuckyTrait(next);
  };

  return (
    <div className="w-full max-w-xl mx-auto p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-white text-center">
      <h2 className="text-2xl font-bold flex items-center justify-center gap-2 mb-2">
        <Star className="w-6 h-6 text-amber-300 fill-amber-300" /> Starlight Energy & Aura
      </h2>
      <p className="text-xs text-white/70 mb-4">Discover your celestial birthday superpower energy!</p>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-indigo-500/20 border border-purple-300/30 mb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-purple-300 block mb-1">
          Birthday Power Aura
        </span>
        <div className="text-2xl font-extrabold text-amber-200">{luckyTrait}</div>
      </div>

      <button
        onClick={handleRoll}
        className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-white transition-all inline-flex items-center gap-1.5"
      >
        <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Reveal Another Aura
      </button>
    </div>
  );
}

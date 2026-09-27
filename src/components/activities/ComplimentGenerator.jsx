import React, { useState } from 'react';
import { Sparkles, Heart, RefreshCw } from 'lucide-react';
import { playSparkle } from '../../utils/audioSynth';
import { triggerPrideConfetti } from '../../utils/particles';

const VIBES = [
  "You radiate genuine positive energy wherever you go! ✨",
  "Your kindness makes the whole world a much better place. 💖",
  "You have an incredible sense of humor and infectious smile! 😄",
  "Your dedication and hard work are truly inspiring! 🚀",
  "You are one of the most reliable and thoughtful friends ever! 🌟"
];

export default function ComplimentGenerator() {
  const [currentVibe, setCurrentVibe] = useState(VIBES[0]);

  const handleNext = () => {
    playSparkle();
    const next = VIBES[Math.floor(Math.random() * VIBES.length)];
    setCurrentVibe(next);
    triggerPrideConfetti();
  };

  return (
    <div className="w-full max-w-xl mx-auto p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-white text-center">
      <h2 className="text-xl font-bold flex items-center justify-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-pink-400" /> Instant Vibe Generator
      </h2>
      <div className="p-6 rounded-2xl bg-white/5 border border-white/10 mb-4 font-bold text-base text-pink-100">
        "{currentVibe}"
      </div>
      <button
        onClick={handleNext}
        className="px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 font-bold text-xs hover:brightness-110 shadow-lg flex items-center gap-1.5 mx-auto transition-all"
      >
        <RefreshCw className="w-4 h-4" /> Get Another Compliment ✨
      </button>
    </div>
  );
}

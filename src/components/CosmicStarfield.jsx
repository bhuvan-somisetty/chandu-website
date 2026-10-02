import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Sparkles, Compass } from 'lucide-react';
import { playSparkle } from '../utils/audioSynth';
import { triggerPrideConfetti } from '../utils/particles';

const WISH_STARS = [
  'Radiant Joy 🌟', 'Epic Success 🚀', 'Unstoppable Laughter 😄',
  'Deep Friendship 💖', 'Infinite Health 🌿', 'Sweet Adventures ✈️'
];

export default function CosmicStarfield() {
  const [collected, setCollected] = useState([]);

  const handleCollect = (s) => {
    playSparkle();
    if (!collected.includes(s)) {
      const updated = [...collected, s];
      setCollected(updated);
      if (updated.length === WISH_STARS.length) {
        triggerPrideConfetti();
      }
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-white text-center">
      <h2 className="text-xl font-bold flex items-center justify-center gap-2 mb-2">
        <Star className="w-5 h-5 text-yellow-300 fill-yellow-300" /> Cosmic Birthday Starfield
      </h2>
      <p className="text-xs text-white/70 mb-4">Tap cosmic stars to collect all birthday blessings!</p>

      <div className="grid grid-cols-2 gap-2.5 mb-4">
        {WISH_STARS.map((s, idx) => {
          const isGot = collected.includes(s);
          return (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCollect(s)}
              className={`p-3 rounded-2xl border text-xs font-bold transition-all ${
                isGot ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md' : 'bg-white/5 border-white/10 hover:bg-white/15'
              }`}
            >
              {s}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

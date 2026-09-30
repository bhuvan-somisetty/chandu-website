import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { playPop } from '../utils/audioSynth';
import { triggerPrideConfetti } from '../utils/particles';

const CLOUD_WISHES = [
  'Endless Laughter 😄', 'Big Adventures ✈️', 'Sweet Cake 🍰',
  'Glowing Health 🌿', 'Unstoppable Success 🚀', 'Joyful Milestones 🏆',
  'Deep Friendship 💖', 'Peaceful Days 🌸', 'Infinite Happiness 🌟', 'Creative Sparks 💡'
];

export default function WishCloud() {
  const handleTagClick = () => {
    playPop();
    triggerPrideConfetti();
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-white text-center">
      <h2 className="text-2xl font-bold flex items-center justify-center gap-2 mb-2">
        <Sparkles className="w-6 h-6 text-pink-300" /> Floating Wish Tag Cloud
      </h2>
      <p className="text-xs text-white/70 mb-6">Tap any glowing wish bubble to send positive celebration vibrations!</p>

      <div className="flex flex-wrap justify-center gap-2.5">
        {CLOUD_WISHES.map((w, idx) => (
          <motion.button
            key={idx}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleTagClick}
            className="px-4 py-2 rounded-2xl bg-white/10 hover:bg-white/25 border border-white/20 text-xs font-bold text-white shadow-md transition-all"
          >
            {w}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

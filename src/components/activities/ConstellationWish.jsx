import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Sparkles, Heart } from 'lucide-react';
import { playSparkle } from '../../utils/audioSynth';
import { triggerPrideConfetti } from '../../utils/particles';

const STARS = [
  { id: 1, x: 20, y: 30, label: 'Unstoppable Joy' },
  { id: 2, x: 50, y: 15, label: 'Endless Success' },
  { id: 3, x: 80, y: 35, label: 'Radiant Health' },
  { id: 4, x: 35, y: 65, label: 'Lifelong Adventure' },
  { id: 5, x: 65, y: 70, label: 'Everlasting Friendship' }
];

export default function ConstellationWish() {
  const [litStars, setLitStars] = useState([]);

  const toggleStar = (id) => {
    playSparkle();
    if (!litStars.includes(id)) {
      const updated = [...litStars, id];
      setLitStars(updated);
      if (updated.length === STARS.length) {
        triggerPrideConfetti();
      }
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Star className="w-6 h-6 text-yellow-300" /> Starry Constellation of Wishes
        </h2>
        <span className="text-xs text-white/70">{litStars.length} / {STARS.length} Connected</span>
      </div>

      <p className="text-xs text-white/70 mb-4">
        Click each star in the night sky to ignite your birthday wishes constellation:
      </p>

      <div className="relative h-72 w-full rounded-2xl bg-gradient-to-b from-slate-950 via-indigo-950 to-purple-950 border border-white/20 overflow-hidden">
        {STARS.map((s) => {
          const isLit = litStars.includes(s.id);
          return (
            <motion.button
              key={s.id}
              onClick={() => toggleStar(s.id)}
              whileHover={{ scale: 1.2 }}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer"
              style={{ left: `${s.x}%`, top: `${s.y}%` }}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                isLit ? 'bg-amber-300 text-slate-950 shadow-[0_0_20px_#fde047]' : 'bg-white/20 text-white/60 hover:bg-white/40'
              }`}>
                <Star className={`w-4 h-4 ${isLit ? 'fill-amber-300' : ''}`} />
              </div>
              <span className={`text-[10px] font-bold mt-1 px-2 py-0.5 rounded-full transition-all ${
                isLit ? 'bg-white/20 text-amber-200' : 'text-white/40'
              }`}>
                {s.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

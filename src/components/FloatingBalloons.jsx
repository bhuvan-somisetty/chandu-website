import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playPop } from '../utils/audioSynth';
import { triggerConfetti } from '../utils/particles';
import { useAchievements } from '../context/AchievementContext';

const BALLOONS = [
  { id: 1, color: 'bg-rose-500', left: '10%', delay: 0, speed: 12 },
  { id: 2, color: 'bg-amber-400', left: '25%', delay: 2, speed: 14 },
  { id: 3, color: 'bg-sky-400', left: '45%', delay: 4, speed: 11 },
  { id: 4, color: 'bg-purple-500', left: '70%', delay: 1, speed: 15 },
  { id: 5, color: 'bg-pink-400', left: '85%', delay: 3, speed: 13 },
  { id: 6, color: 'bg-emerald-400', left: '92%', delay: 5, speed: 16 }
];

export default function FloatingBalloons() {
  const [popped, setPopped] = useState([]);
  const { unlockAchievement } = useAchievements();

  const handlePop = (id, e) => {
    e.stopPropagation();
    playPop();
    const rect = e.currentTarget.getBoundingClientRect();
    triggerConfetti({
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight
      },
      particleCount: 25
    });
    setPopped(prev => [...prev, id]);
    if (popped.length + 1 >= 5) {
      unlockAchievement('balloon_popper');
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      <AnimatePresence>
        {BALLOONS.map(b => !popped.includes(b.id) && (
          <motion.div
            key={b.id}
            initial={{ y: '110vh', opacity: 0 }}
            animate={{
              y: '-20vh',
              opacity: [0, 0.85, 0.85, 0],
              x: [0, 20, -20, 0]
            }}
            transition={{
              duration: b.speed,
              repeat: Infinity,
              delay: b.delay,
              ease: 'linear'
            }}
            onClick={(e) => handlePop(b.id, e)}
            className="absolute pointer-events-auto cursor-pointer group select-none"
            style={{ left: b.left }}
          >
            <div className={`w-12 h-16 sm:w-14 sm:h-18 ${b.color} rounded-full shadow-lg relative transform group-hover:scale-110 transition-transform`}>
              <div className="absolute top-2 left-2 w-3 h-3 bg-white/40 rounded-full blur-[1px]" />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-inherit rotate-45" />
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-white/30" />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

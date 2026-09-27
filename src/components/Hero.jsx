import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Gift, Heart } from 'lucide-react';
import { triggerPrideConfetti } from '../utils/particles';
import { playFanfare } from '../utils/audioSynth';
import CountdownTimer from './CountdownTimer';
import { Link } from 'react-router-dom';

export default function Hero() {
  const handleCelebration = () => {
    playFanfare();
    triggerPrideConfetti();
  };

  return (
    <div className="relative pt-24 pb-12 px-4 text-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-amber-300 mb-6"
      >
        <Sparkles className="w-4 h-4 animate-spin" /> Special Birthday Celebration Edition
      </motion.div>

      <motion.h1
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-4 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-rose-300 to-purple-300"
      >
        Happy Birthday! 🎂✨
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-base sm:text-xl text-white/80 max-w-2xl mx-auto mb-8 font-medium leading-relaxed"
      >
        To an extraordinary friend — wishing you boundless happiness, unforgettable memories, and a fantastic year ahead!
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-wrap items-center justify-center gap-4 mb-8"
      >
        <button
          onClick={handleCelebration}
          className="px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-amber-400 font-extrabold text-slate-950 shadow-2xl hover:brightness-110 transform hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
        >
          <Sparkles className="w-5 h-5 text-slate-950" /> Celebrate with Confetti!
        </button>
        <Link
          to="/games"
          className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 font-bold text-white transition-all flex items-center gap-2"
        >
          <Gift className="w-5 h-5 text-amber-300" /> Play Party Games
        </Link>
      </motion.div>

      <CountdownTimer />
    </div>
  );
}

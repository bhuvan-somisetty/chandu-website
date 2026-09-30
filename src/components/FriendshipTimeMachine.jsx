import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, Heart, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { playPop, playSparkle } from '../utils/audioSynth';

const ERAS = [
  { year: 'Day One', title: 'The Spark of Great Friendship', desc: 'When we first met and realized we share the same fun vibe and laughter.', icon: '✨', color: 'from-amber-500 to-rose-500' },
  { year: 'Golden Moments', title: 'Unforgettable Adventures', desc: 'Endless talks, funny memories, sharing snacks, and spontaneous hangouts.', icon: '🌟', color: 'from-pink-500 to-purple-500' },
  { year: 'Milestone Wins', title: 'Cheering Each Other On', desc: 'Celebrating every achievement, supporting big dreams, and conquering goals.', icon: '🏆', color: 'from-indigo-500 to-sky-500' },
  { year: 'Today & Beyond', title: 'The Happiest Birthday Yet', desc: 'Celebrating you today and looking forward to hundreds of more epic chapters ahead!', icon: '🎂', color: 'from-emerald-500 to-teal-500' }
];

export default function FriendshipTimeMachine() {
  const [currentIdx, setCurrentIdx] = useState(0);

  const handleNext = () => {
    playPop();
    setCurrentIdx(c => (c + 1) % ERAS.length);
  };

  const handlePrev = () => {
    playPop();
    setCurrentIdx(c => (c - 1 + ERAS.length) % ERAS.length);
  };

  const era = ERAS[currentIdx];

  return (
    <div className="w-full max-w-2xl mx-auto p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-white">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Calendar className="w-6 h-6 text-amber-300" />
          <h2 className="text-2xl font-bold">Friendship Time Machine</h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <motion.div
        key={currentIdx}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="p-8 rounded-3xl bg-slate-950/60 border border-white/15 text-center relative overflow-hidden"
      >
        <div className="text-5xl mb-3">{era.icon}</div>
        <span className="text-xs font-extrabold uppercase tracking-widest text-amber-300 block mb-1">
          {era.year}
        </span>
        <h3 className="text-2xl font-extrabold mb-3 text-pink-200">{era.title}</h3>
        <p className="text-sm text-white/80 max-w-md mx-auto leading-relaxed">{era.desc}</p>
      </motion.div>
    </div>
  );
}

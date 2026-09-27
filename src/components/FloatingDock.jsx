import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Trophy, Gift, Music } from 'lucide-react';
import { triggerPrideConfetti } from '../utils/particles';
import { playChime } from '../utils/audioSynth';
import { useAchievements } from '../context/AchievementContext';
import ThemeSelector from './ThemeSelector';
import { Link, useLocation } from 'react-router-dom';

export default function FloatingDock() {
  const { totalPoints, unlockAchievement } = useAchievements();
  const location = useLocation();

  const handleConfettiBlast = () => {
    playChime();
    triggerPrideConfetti();
    unlockAchievement('confetti_master');
  };

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 flex items-center gap-3 px-4 py-2.5 bg-black/40 backdrop-blur-xl border border-white/20 rounded-full shadow-2xl text-white"
    >
      <button
        onClick={handleConfettiBlast}
        className="p-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg transform hover:scale-110 active:scale-95 transition-all"
        title="Trigger Celebration Blast"
      >
        <Sparkles className="w-5 h-5" />
      </button>

      <Link
        to="/games"
        className={`p-3 rounded-full transition-all ${location.pathname === '/games' ? 'bg-white/30 text-amber-300' : 'bg-white/10 hover:bg-white/20 text-white'}`}
        title="Birthday Games Arcade"
      >
        <Gift className="w-5 h-5" />
      </Link>

      <Link
        to="/achievements"
        className={`p-3 rounded-full relative transition-all ${location.pathname === '/achievements' ? 'bg-white/30 text-amber-300' : 'bg-white/10 hover:bg-white/20 text-white'}`}
        title="Trophy Room"
      >
        <Trophy className="w-5 h-5" />
        {totalPoints > 0 && (
          <span className="absolute -top-1 -right-1 px-1.5 py-0.5 text-[9px] font-bold bg-amber-400 text-slate-950 rounded-full">
            {totalPoints}
          </span>
        )}
      </Link>

      <ThemeSelector />
    </motion.div>
  );
}

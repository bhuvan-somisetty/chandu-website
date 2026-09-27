import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAchievements } from '../context/AchievementContext';
import { Award, Sparkles } from 'lucide-react';

export default function AchievementNotification() {
  const { recentUnlock } = useAchievements();

  return (
    <AnimatePresence>
      {recentUnlock && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="fixed bottom-24 right-6 z-50 max-w-sm p-4 rounded-2xl bg-gradient-to-r from-amber-500/90 via-pink-500/90 to-purple-600/90 backdrop-blur-xl border border-white/30 shadow-2xl text-white flex items-center gap-3"
        >
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-2xl shadow-inner flex-shrink-0">
            {recentUnlock.icon || '🏆'}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-amber-200">
              <Sparkles className="w-3.5 h-3.5 animate-spin" /> Achievement Unlocked!
            </div>
            <div className="font-bold text-sm truncate">{recentUnlock.title}</div>
            <div className="text-xs text-white/80 line-clamp-1">{recentUnlock.desc}</div>
          </div>
          <div className="text-xs font-bold px-2 py-1 bg-white/20 rounded-full">
            +{recentUnlock.points} pts
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, CheckCircle, Lock, Sparkles } from 'lucide-react';
import { useAchievements, ALL_ACHIEVEMENTS } from '../context/AchievementContext';
import { triggerPrideConfetti } from '../utils/particles';
import { playFanfare } from '../utils/audioSynth';

export default function AchievementsPage() {
  const { unlocked, totalPoints } = useAchievements();

  const handleCelebrateAll = () => {
    playFanfare();
    triggerPrideConfetti();
  };

  return (
    <div className="pt-24 pb-20 px-4 max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold mb-3 border border-amber-400/30">
          <Trophy className="w-4 h-4" /> Total Celebration Score: {totalPoints} pts
        </div>
        <h1 className="text-4xl font-extrabold text-white mb-2">Trophy Room & Badges 🏆</h1>
        <p className="text-sm text-white/70">
          Unlocked {unlocked.length} of {ALL_ACHIEVEMENTS.length} celebration milestones
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {ALL_ACHIEVEMENTS.map((ach) => {
          const isUnlocked = unlocked.includes(ach.id);
          return (
            <motion.div
              key={ach.id}
              whileHover={{ scale: isUnlocked ? 1.02 : 1 }}
              className={`p-5 rounded-2xl border transition-all flex items-start gap-3.5 ${
                isUnlocked
                  ? 'bg-white/10 backdrop-blur-md border-amber-400/50 ring-1 ring-amber-400/20 text-white shadow-lg'
                  : 'bg-white/5 border-white/10 text-white/40'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${
                isUnlocked ? 'bg-amber-400/20 shadow-inner' : 'bg-white/5 grayscale'
              }`}>
                {ach.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm truncate">{ach.title}</h3>
                  {isUnlocked ? (
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Lock className="w-3.5 h-3.5 text-white/40" />
                  )}
                </div>
                <p className="text-xs text-white/70 line-clamp-2 mt-1">{ach.desc}</p>
                <div className="mt-2 text-[10px] font-bold text-amber-300">
                  +{ach.points} Points
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {unlocked.length > 0 && (
        <div className="text-center mt-10">
          <button
            onClick={handleCelebrateAll}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-amber-400 via-pink-500 to-purple-500 text-slate-950 font-extrabold shadow-xl hover:brightness-110 transform hover:scale-105 transition-all"
          >
            Celebrate All Trophies! 🎊✨
          </button>
        </div>
      )}
    </div>
  );
}

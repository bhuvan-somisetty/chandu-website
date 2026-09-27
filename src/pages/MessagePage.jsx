import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Flame } from 'lucide-react';
import { triggerPrideConfetti } from '../utils/particles';
import { playFanfare } from '../utils/audioSynth';
import WishJar from '../components/activities/WishJar';

export default function MessagePage() {
  const handleWish = () => {
    playFanfare();
    triggerPrideConfetti();
  };

  return (
    <div className="pt-24 pb-20 px-4 max-w-4xl mx-auto space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-white mb-2">A Special Birthday Letter 💌</h1>
        <p className="text-sm text-white/70">Heartfelt birthday wishes for an incredible friend</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 sm:p-12 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-purple-500/10 text-white relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-32 h-32 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="text-3xl mb-4">🎂✨</div>
        <h2 className="text-2xl font-bold mb-4 text-amber-200">To an Amazing Friend,</h2>
        
        <div className="space-y-4 text-white/90 text-base leading-relaxed font-sans">
          <p>
            Happy Birthday! Today is all about celebrating you and the bright energy you bring into the world.
          </p>
          <p>
            Having a friend like you is truly special. Thank you for all the laughs, great conversations, and positive vibes. You make every ordinary day feel like an adventure.
          </p>
          <p>
            May this upcoming year be packed with exciting milestones, good health, unforgettable journeys, and massive success in everything you set your heart on. Keep shining bright!
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center">
          <div>
            <div className="font-bold text-sm text-amber-300">With Warm Wishes,</div>
            <div className="text-xs text-white/70">Your Good Friend ✨</div>
          </div>
          <button
            onClick={handleWish}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-amber-400 font-bold text-slate-950 hover:brightness-110 shadow-lg flex items-center gap-2"
          >
            <Flame className="w-4 h-4 text-slate-950" /> Send Warm Birthday Cheer! ✨
          </button>
        </div>
      </motion.div>

      <WishJar />
    </div>
  );
}

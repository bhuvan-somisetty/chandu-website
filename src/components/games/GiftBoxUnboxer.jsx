import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, Sparkles, RefreshCw, Heart } from 'lucide-react';
import { playFanfare, playSparkle } from '../../utils/audioSynth';
import { triggerPrideConfetti } from '../../utils/particles';
import { useAchievements } from '../../context/AchievementContext';

const GIFTS = [
  { title: 'Infinite Good Vibes Pass', desc: 'Valid forever across all universes!', icon: '🌟' },
  { title: 'Virtual Hug & High Five', desc: 'Instant mood boost guaranteed anytime.', icon: '🤗' },
  { title: 'Unlimited Coffee & Snack Coupon', desc: 'Redeemable on our next hangout!', icon: '☕' },
  { title: 'Golden Friendship Badge', desc: 'Awarded for being an extraordinarily wonderful human.', icon: '🏅' },
  { title: 'Spontaneous Road Trip Pass', desc: 'Pack your bags for the next big adventure!', icon: '🚗' }
];

export default function GiftBoxUnboxer() {
  const [opened, setOpened] = useState(false);
  const [selectedGift, setSelectedGift] = useState(null);
  const { unlockAchievement } = useAchievements();

  const handleOpen = () => {
    if (opened) return;
    const g = GIFTS[Math.floor(Math.random() * GIFTS.length)];
    setSelectedGift(g);
    setOpened(true);
    playFanfare();
    triggerPrideConfetti();
    unlockAchievement('gift_unboxed');
  };

  const handleReset = () => {
    setOpened(false);
    setSelectedGift(null);
    playSparkle();
  };

  return (
    <div className="w-full max-w-xl mx-auto p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-white text-center">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Gift className="w-5 h-5 text-pink-400" /> Mystery Gift Box
        </h2>
        {opened && (
          <button
            onClick={handleReset}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 transition-all"
            title="Unbox Another"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="py-8 flex flex-col items-center justify-center">
        {!opened ? (
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpen}
            className="cursor-pointer"
          >
            <div className="w-28 h-28 mx-auto rounded-3xl bg-gradient-to-tr from-rose-500 to-amber-400 shadow-2xl flex items-center justify-center text-5xl relative transform rotate-3">
              <Gift className="w-14 h-14 text-white" />
            </div>
            <p className="mt-4 text-sm text-white/90 font-semibold">Tap to Unbox Your Surprise Gift!</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-6 rounded-3xl bg-gradient-to-br from-pink-500/30 via-purple-500/30 to-amber-500/30 border border-white/30 max-w-md w-full"
          >
            <div className="text-5xl mb-2">{selectedGift.icon}</div>
            <h3 className="text-xl font-bold mb-1 text-amber-200">{selectedGift.title}</h3>
            <p className="text-sm text-white/80 mb-3">{selectedGift.desc}</p>
            <div className="flex items-center justify-center gap-1 text-xs text-pink-300 font-semibold">
              <Heart className="w-3.5 h-3.5 fill-pink-300" /> Made with joy just for you
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

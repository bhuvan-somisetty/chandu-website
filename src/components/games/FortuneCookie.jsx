import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, RefreshCw, Star } from 'lucide-react';
import { playPop, playSparkle } from '../../utils/audioSynth';
import { triggerPrideConfetti } from '../../utils/particles';
import { useAchievements } from '../../context/AchievementContext';

const FORTUNES = [
  "This year will unlock opportunities beyond your wild imagination! ✨",
  "Your smile and kindness are superpowers that light up any room. 🌟",
  "Massive adventures and heartwarming milestones are coming your way! 🚀",
  "The secret to a great year is celebrating every tiny victory. 🎉",
  "You are deeply appreciated for being such an authentic, incredible friend! 💖",
  "A spontaneous road trip or dream vacation will happen sooner than you think! ✈️",
  "Your creativity and wisdom will inspire everyone around you this year. 💡",
  "Good fortunes, hearty laughter, and sweet desserts await you daily! 🍰",
  "Your infectious enthusiasm will turn everyday dreams into reality! 🌟"
];

export default function FortuneCookie() {
  const [cracked, setCracked] = useState(false);
  const [fortune, setFortune] = useState('');
  const [luckyNumber, setLuckyNumber] = useState(7);
  const { unlockAchievement } = useAchievements();

  const handleCrack = () => {
    if (cracked) return;
    playPop();
    playSparkle();
    const randomF = FORTUNES[Math.floor(Math.random() * FORTUNES.length)];
    setFortune(randomF);
    setLuckyNumber(Math.floor(Math.random() * 90) + 10);
    setCracked(true);
    triggerPrideConfetti();
    unlockAchievement('fortune_cracked');
  };

  const handleReset = () => {
    setCracked(false);
    playSparkle();
  };

  return (
    <div className="w-full max-w-xl mx-auto p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-white text-center">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" /> Birthday Fortune Cookie
        </h2>
        {cracked && (
          <button
            onClick={handleReset}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 transition-all"
            title="Crack Another"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="py-8 flex flex-col items-center justify-center">
        {!cracked ? (
          <motion.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCrack}
            className="cursor-pointer"
          >
            <div className="text-7xl mb-3 drop-shadow-xl animate-bounce">
              🥠
            </div>
            <p className="text-sm text-white/80 font-semibold">Tap the Cookie to Reveal Your Fortune!</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/20 via-pink-500/20 to-purple-500/20 border border-amber-300/40 shadow-inner max-w-md w-full"
          >
            <div className="flex justify-center gap-1 text-amber-300 mb-2">
              <Star className="w-4 h-4 fill-amber-300" />
              <Star className="w-4 h-4 fill-amber-300" />
              <Star className="w-4 h-4 fill-amber-300" />
            </div>
            <p className="text-base font-bold text-amber-100 mb-4 italic">
              "{fortune}"
            </p>
            <div className="text-xs font-semibold px-3 py-1 rounded-full bg-white/10 inline-block text-white/80">
              Lucky Birthday Number: #{luckyNumber}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

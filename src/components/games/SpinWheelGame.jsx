import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Trophy, RotateCcw, Award } from 'lucide-react';
import { playSparkle, playFanfare, playPop } from '../../utils/audioSynth';
import { triggerPrideConfetti } from '../../utils/particles';
import { useAchievements } from '../../context/AchievementContext';

const PRIZES = [
  '🎂 Double Birthday Cake',
  '☕ Free Coffee on Me',
  '🌟 Infinite Good Luck',
  '🎁 Mystery Gift Pack',
  '🏅 VIP Friend Badge',
  '🎉 100 Confetti Blasts',
  '🍕 Pizza Party Pass',
  '🚀 Big Dream Milestone'
];

export default function SpinWheelGame() {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [wonPrize, setWonPrize] = useState(null);
  const { unlockAchievement } = useAchievements();

  const handleSpin = () => {
    if (spinning) return;
    setSpinning(true);
    setWonPrize(null);
    playPop();

    const extraTurns = Math.floor(Math.random() * 4) + 5;
    const randomSector = Math.floor(Math.random() * PRIZES.length);
    const sectorAngle = 360 / PRIZES.length;
    const finalAngle = rotation + extraTurns * 360 + randomSector * sectorAngle;

    setRotation(finalAngle);

    setTimeout(() => {
      setSpinning(false);
      const prizeIndex = (PRIZES.length - Math.floor((finalAngle % 360) / sectorAngle)) % PRIZES.length;
      setWonPrize(PRIZES[prizeIndex]);
      playFanfare();
      triggerPrideConfetti();
      unlockAchievement('gift_unboxed');
    }, 3200);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-white text-center">
      <h2 className="text-2xl font-bold flex items-center justify-center gap-2 mb-2">
        <Sparkles className="w-6 h-6 text-amber-300" /> Birthday Wheel of Fortune
      </h2>
      <p className="text-xs text-white/70 mb-6">Spin the celebration prize wheel and unlock awesome friendship rewards!</p>

      <div className="relative w-64 h-64 mx-auto mb-6 flex items-center justify-center">
        {/* Pointer */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-8 bg-amber-400 border-2 border-white shadow-xl z-20 clip-triangle" />
        
        {/* Rotating Wheel */}
        <motion.div
          animate={{ rotate: rotation }}
          transition={{ duration: 3.2, ease: [0.15, 0.9, 0.2, 1] }}
          className="w-full h-full rounded-full border-4 border-amber-300 shadow-2xl bg-gradient-to-tr from-pink-600 via-purple-600 to-indigo-600 relative overflow-hidden flex items-center justify-center"
        >
          <div className="text-3xl select-none">🎡</div>
        </motion.div>
      </div>

      {wonPrize && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 bg-emerald-500/20 border border-emerald-400/40 rounded-2xl mb-4 text-emerald-200 font-extrabold text-sm"
        >
          🎉 Congratulations! You won: {wonPrize}!
        </motion.div>
      )}

      <button
        onClick={handleSpin}
        disabled={spinning}
        className="px-8 py-3 rounded-full bg-gradient-to-r from-amber-400 to-pink-500 text-slate-950 font-extrabold shadow-xl hover:brightness-110 transform hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2 disabled:opacity-50"
      >
        <RotateCcw className={`w-4 h-4 ${spinning ? 'animate-spin' : ''}`} />
        {spinning ? 'Spinning...' : 'Spin the Wheel!'}
      </button>
    </div>
  );
}

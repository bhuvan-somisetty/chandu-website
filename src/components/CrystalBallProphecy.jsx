import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, RefreshCw } from 'lucide-react';
import { playSparkle } from '../utils/audioSynth';
import { triggerPrideConfetti } from '../utils/particles';

const PROPHECIES = [
  "A spontaneous road trip will bring unforgettable laughs and stories! 🚗✨",
  "A creative project you start this month will turn out to be a massive success! 💡🌟",
  "You will meet inspiring mentors and celebrate amazing personal triumphs! 🏆💖",
  "A surprise gift or unexpected good news is heading your way this week! 🎁🎉",
  "Your warm energy and kindness will light up an incredible new chapter! 🌸💫"
];

export default function CrystalBallProphecy() {
  const [prophecy, setProphecy] = useState(PROPHECIES[0]);
  const [isRevealing, setIsRevealing] = useState(false);

  const handleGaze = () => {
    setIsRevealing(true);
    playSparkle();
    setTimeout(() => {
      const next = PROPHECIES[Math.floor(Math.random() * PROPHECIES.length)];
      setProphecy(next);
      setIsRevealing(false);
      triggerPrideConfetti();
    }, 600);
  };

  return (
    <div className="w-full max-w-xl mx-auto p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-white text-center">
      <h2 className="text-2xl font-bold flex items-center justify-center gap-2 mb-2">
        <Sparkles className="w-6 h-6 text-indigo-300 animate-spin" /> Birthday Crystal Ball Prophecy
      </h2>
      <p className="text-xs text-white/70 mb-6">Gaze into the mystical orb to reveal your golden birthday prophecy!</p>

      <motion.div
        animate={isRevealing ? { scale: [1, 1.2, 0.95, 1], rotate: [0, 15, -15, 0] } : {}}
        className="w-32 h-32 mx-auto rounded-full bg-gradient-to-tr from-indigo-600 via-purple-500 to-pink-400 p-1 mb-6 shadow-[0_0_30px_rgba(168,85,247,0.5)] flex items-center justify-center text-5xl select-none cursor-pointer"
        onClick={handleGaze}
      >
        🔮
      </motion.div>

      <div className="p-6 rounded-2xl bg-slate-950/60 border border-white/10 mb-4 font-bold text-sm text-purple-200">
        "{prophecy}"
      </div>

      <button
        onClick={handleGaze}
        className="px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 font-bold text-xs text-white shadow-lg hover:brightness-110 inline-flex items-center gap-1.5 transition-all"
      >
        <RefreshCw className="w-3.5 h-3.5" /> Gaze Again
      </button>
    </div>
  );
}

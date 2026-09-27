import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, PartyPopper, Heart, RotateCcw, Cake, Gift } from 'lucide-react';
import { useHeartNavigation } from '../context/NavigationContext';

export default function MessagePage() {
  const [candlesBlown, setCandlesBlown] = useState(false);
  const { navigateWithHeart } = useHeartNavigation();

  const launchConfetti = () => {
    const duration = 2500;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 6,
        angle: 60,
        spread: 60,
        origin: { x: 0, y: 0.7 },
        colors: ['#ec4899', '#a855f7', '#60a5fa', '#facc15', '#34d399']
      });
      confetti({
        particleCount: 6,
        angle: 120,
        spread: 60,
        origin: { x: 1, y: 0.7 },
        colors: ['#ec4899', '#a855f7', '#60a5fa', '#facc15', '#34d399']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  useEffect(() => {
    launchConfetti();
  }, []);

  const handleBlowCandles = () => {
    setCandlesBlown(true);
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#f43f5e', '#ec4899', '#8b5cf6', '#3b82f6', '#eab308']
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-[100dvh] pt-24 sm:pt-28 pb-24 px-4 sm:px-6 md:px-12 flex flex-col items-center justify-center relative z-10"
    >
      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="max-w-3xl w-full backdrop-blur-2xl bg-white/5 p-6 sm:p-10 md:p-14 rounded-3xl sm:rounded-[2.5rem] shadow-[0_0_50px_rgba(192,38,211,0.2)] border border-white/10 relative overflow-hidden text-center"
      >
        {/* Soft inner glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[85%] h-[35%] bg-gradient-to-b from-pink-500/20 via-purple-500/15 to-transparent mix-blend-screen filter blur-[80px] pointer-events-none"></div>

        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs font-semibold uppercase tracking-widest mb-6 relative z-10">
          <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
          <span>A Note From The Heart</span>
        </div>

        <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold mb-6 sm:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-purple-200 to-indigo-200 relative z-10 tracking-tight leading-tight">
          To an Amazing Friend ✨
        </h2>
        
        <div className="space-y-5 text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed font-light relative z-10 text-left sm:text-center">
          <p>
            Happy Birthday! Today is all about celebrating you—your vibrant personality, your infectious smile, and the genuine energy you bring wherever you go.
          </p>
          <p>
            Having you as a close friend has been one of the biggest blessings. From endless random talks and shared jokes to always being a strong, dependable pillar whenever it matters—thank you for being such an authentic and wonderful friend.
          </p>
          <p>
            I hope this new year brings you boundless happiness, peace of mind, exciting adventures, and massive success in everything you set your eyes on. You deserve all the good things life has to offer!
          </p>
          
          {/* Highlight Banner */}
          <div className="pt-6 mt-6 border-t border-white/10 text-center">
            <h3 className="text-2xl sm:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 mb-3 drop-shadow-md">
              Wishing You The Happiest Birthday! 🎂🎉
            </h3>
            <p className="text-xs sm:text-base text-gray-300">
              May every day of your year ahead be as bright and cheerful as you are.
            </p>
          </div>

          {/* Interactive Birthday Cake & Wish Button */}
          <div className="pt-6 flex flex-col items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBlowCandles}
              className={`px-6 py-3 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 flex items-center gap-2 shadow-lg ${
                candlesBlown 
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 shadow-[0_0_20px_rgba(52,211,153,0.3)]'
                  : 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-[0_0_25px_rgba(236,72,153,0.4)] hover:shadow-[0_0_35px_rgba(168,85,247,0.6)]'
              }`}
            >
              <Cake className="w-4 h-4 text-yellow-300" />
              <span>{candlesBlown ? "✨ Wish Made & Confetti Popped! ✨" : "Make a Wish & Blow Candles 🎂"}</span>
            </motion.button>
          </div>

          {/* Sign Off */}
          <div className="pt-8 flex flex-col items-center text-center">
            <p className="text-lg sm:text-xl font-medium text-pink-300 mb-6 italic">
              Warmest wishes always, <br />
              <span className="font-semibold text-white">Your Friend ✨</span>
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-400">
              <button
                onClick={() => navigateWithHeart('/')}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5 text-pink-400" />
                <span>Replay from Start</span>
              </button>
              <button
                onClick={launchConfetti}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
              >
                <PartyPopper className="w-3.5 h-3.5 text-yellow-400" />
                <span>More Confetti</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Sparkles, Heart, Flame } from 'lucide-react';
import { playSparkle, playFanfare } from '../utils/audioSynth';
import { triggerPrideConfetti } from '../utils/particles';

export default function OrigamiEnvelope() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
      playFanfare();
      triggerPrideConfetti();
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-white text-center">
      <h2 className="text-2xl font-bold flex items-center justify-center gap-2 mb-4">
        <Mail className="w-6 h-6 text-pink-300" /> Wax-Sealed Birthday Envelope
      </h2>

      <div className="py-6 flex flex-col items-center justify-center">
        {!isOpen ? (
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpen}
            className="cursor-pointer relative"
          >
            <div className="w-64 h-40 rounded-2xl bg-gradient-to-br from-rose-700 via-pink-800 to-purple-900 border border-white/20 shadow-2xl flex flex-col items-center justify-center relative overflow-hidden">
              {/* Flap lines */}
              <div className="absolute top-0 left-0 right-0 h-20 border-b border-white/20 bg-white/5" />
              {/* Wax Seal */}
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-600 to-yellow-400 border-2 border-yellow-200 shadow-xl flex items-center justify-center text-xl text-slate-950 font-bold z-10">
                🎂
              </div>
            </div>
            <p className="mt-4 text-xs font-bold text-amber-200">Tap Wax Seal to Unfold Birthday Letter ✨</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-8 rounded-3xl bg-gradient-to-br from-white/15 to-white/5 border border-white/30 backdrop-blur-2xl max-w-md w-full text-left"
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-2xl">💌</span>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-400/20 text-amber-300">
                Special Delivery
              </span>
            </div>
            <h3 className="text-xl font-extrabold mb-2 text-pink-200">A Heartfelt Birthday Wish</h3>
            <p className="text-xs sm:text-sm text-white/90 leading-relaxed mb-4">
              May your life be filled with unending happiness, loyal friendships, radiant health, and massive success in all your passions!
            </p>
            <div className="text-right text-xs font-bold text-amber-300">
              — Your Good Friend ✨
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Sparkles } from 'lucide-react';

export default function WelcomeScreen({ onContinue }) {
  const [isHiding, setIsHiding] = useState(false);

  const handleContinue = () => {
    setIsHiding(true);
    setTimeout(() => {
      onContinue();
    }, 600);
  };

  return (
    <AnimatePresence>
      {!isHiding && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(12px)" }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[9999] bg-[#0c0a1e] flex flex-col items-center justify-center px-6 overflow-hidden"
        >
          {/* Subtle animated background gradient blobs */}
          <div className="absolute w-72 h-72 sm:w-96 sm:h-96 bg-purple-600/30 rounded-full filter blur-[100px] animate-pulse"></div>
          <div className="absolute w-64 h-64 sm:w-80 sm:h-80 bg-pink-600/20 rounded-full filter blur-[100px] -bottom-10 -right-10"></div>

          {/* Aesthetic border frame */}
          <div className="absolute inset-4 sm:inset-8 border border-pink-500/30 rounded-[2rem] pointer-events-none shadow-[0_0_40px_rgba(236,72,153,0.15)]"></div>
          
          <motion.div 
            initial={{ scale: 0.85, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ delay: 0.15, type: "spring", damping: 18 }}
            className="flex flex-col items-center text-center max-w-md relative z-10 p-4"
          >
            <div className="relative mb-8">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-pink-500/20 via-purple-500/20 to-indigo-500/20 border border-white/20 backdrop-blur-xl flex items-center justify-center shadow-[0_0_40px_rgba(168,85,247,0.3)]">
                <Volume2 className="w-12 h-12 text-pink-300 animate-bounce" />
              </div>
              <Sparkles className="w-6 h-6 text-yellow-300 absolute -top-2 -right-2 animate-pulse" />
            </div>
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs font-semibold tracking-widest uppercase mb-4">
              Best Experience with Sound
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200 mb-4 tracking-tight leading-snug">
              Turn Up Your Volume
            </h1>
            
            <p className="text-gray-300 text-sm sm:text-base font-light mb-10 max-w-xs leading-relaxed">
              We've prepared something special for you with music & memories.
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleContinue}
              className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-bold tracking-widest text-base sm:text-lg rounded-full shadow-[0_0_30px_rgba(236,72,153,0.4)] hover:shadow-[0_0_45px_rgba(168,85,247,0.6)] transition-all uppercase flex items-center justify-center gap-2"
            >
              <span>Let's Begin</span>
              <Sparkles className="w-5 h-5 text-yellow-200" />
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

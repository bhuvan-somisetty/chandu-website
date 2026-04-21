import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Headphones } from 'lucide-react';

export default function WelcomeScreen({ onContinue }) {
  const [isHiding, setIsHiding] = useState(false);

  const handleContinue = () => {
    setIsHiding(true);
    setTimeout(() => {
      onContinue();
    }, 600); // Wait for exit animation
  };

  return (
    <AnimatePresence>
      {!isHiding && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center px-6"
        >
          {/* Red frame border */}
          <div className="absolute inset-4 sm:inset-8 border-2 border-red-600/80 rounded-[2rem] pointer-events-none shadow-[0_0_30px_rgba(220,38,38,0.2)]"></div>
          
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", damping: 15 }}
            className="flex flex-col items-center text-center max-w-md relative z-10"
          >
            <div className="bg-red-600/10 p-6 rounded-full mb-8 shadow-[0_0_50px_rgba(220,38,38,0.3)]">
              <span className="text-6xl animate-pulse">🔊</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-bold text-orange-400 mb-12 drop-shadow-md tracking-wide">
              Raise the volume for a better experience
            </h1>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleContinue}
              className="px-10 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold tracking-widest text-lg rounded-full shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_40px_rgba(234,88,12,0.6)] transition-all uppercase"
            >
              Continue
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-16 px-4 mt-10 border-t border-white/5 relative overflow-hidden flex flex-col items-center text-center">
      
      {/* Background glow for footer */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-pink-900/20 to-transparent pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-2xl z-10"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-200 mb-4 drop-shadow-md">
          Happy Birthday! ✨🎂
        </h2>
        
        <p className="text-base sm:text-lg text-gray-300 font-light mb-8">
          Wishing you a lifetime of happiness, endless success, good health, and an amazing year ahead!
        </p>

        <p className="text-xl font-medium text-pink-300 mb-10 italic">
          With best wishes, <br />
          <span className="font-semibold text-white">Your Friend</span>
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        viewport={{ once: true }}
        className="z-10 flex items-center gap-2 text-xs text-gray-400 tracking-wider uppercase"
      >
        <span>Celebrated with</span>
        <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" style={{ animationDuration: '4s' }} />
        <span>for a wonderful friend</span>
      </motion.div>

    </footer>
  );
}

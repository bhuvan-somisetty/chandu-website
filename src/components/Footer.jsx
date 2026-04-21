import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-20 px-6 mt-10 border-t border-white/5 relative overflow-hidden flex flex-col items-center text-center">
      
      {/* Background glow for footer */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-pink-900/20 to-transparent pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-2xl z-10"
      >
        <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 mb-6 drop-shadow-md">
          Happy Birthday once again, Chandu 🎂✨
        </h2>
        
        <p className="text-xl text-gray-300 font-light mb-8">
          Wishing you a lifetime of happiness, endless success, and a friendship that only grows stronger. Here's to making many more memories!
        </p>

        <p className="text-2xl font-medium text-pink-300 mb-16 italic">
          With lots of love,
          <br className="md:hidden" /> Tejaswini ❤️
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        viewport={{ once: true }}
        className="z-10 flex items-center gap-2 text-sm text-gray-500 tracking-wider uppercase"
      >
        <span>Made with</span>
        <Heart className="w-4 h-4 text-pink-500 fill-pink-500 animate-pulse" />
        <span>for Chandu</span>
      </motion.div>

    </footer>
  );
}

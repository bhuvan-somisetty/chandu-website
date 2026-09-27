import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      
      {/* Decorative blurred blobs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-glow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-glow" style={{ animationDelay: '1s' }}></div>

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="z-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 border border-pink-500/30 text-pink-300 text-xs font-semibold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
          <span>Birthday Celebration</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-200 drop-shadow-lg p-2">
          Happy Birthday! ✨🎂
        </h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1.2 }}
          className="text-lg md:text-2xl text-gray-200 font-light tracking-wide mb-12 max-w-xl mx-auto"
        >
          Celebrating a wonderful friend and an extraordinary person today!
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 z-10 flex flex-col items-center cursor-pointer"
        onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <span className="text-xs sm:text-sm uppercase tracking-widest text-purple-300 mb-2">Scroll To Explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown className="text-pink-400 w-7 h-7" />
        </motion.div>
      </motion.div>
    </section>
  );
}

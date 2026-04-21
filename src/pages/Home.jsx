import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden"
    >
      {/* Decorative blurred blobs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-pulse-glow z-0"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-pink-600 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-pulse-glow z-0" style={{ animationDelay: '1s' }}></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="z-10 mt-10 md:mt-0"
      >
        <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-purple-400 via-pink-300 to-blue-400 drop-shadow-[0_0_20px_rgba(236,72,153,0.3)] filter">
          Happy Birthday <br /> Chandu ✨
        </h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1.5 }}
          className="text-xl md:text-3xl text-gray-200 font-light tracking-wider mb-14"
        >
          A cinematic surprise from your bestie.
        </motion.p>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/journey')}
        className="z-10 group relative px-8 py-4 bg-white/5 backdrop-blur-md rounded-full border border-white/20 text-white font-medium tracking-widest text-lg shadow-[0_0_30px_rgba(192,38,211,0.3)] hover:shadow-[0_0_50px_rgba(236,72,153,0.5)] transition-all flex items-center gap-3 overflow-hidden"
      >
        <span className="relative z-10">Open Journey</span>
        <ChevronRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </motion.button>
    </motion.div>
  );
}

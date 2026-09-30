import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Star } from 'lucide-react';
import { playSparkle } from '../utils/audioSynth';
import { triggerPrideConfetti } from '../utils/particles';

export default function HoloCard3D() {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handlePointerMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotateX(-y / 8);
    setRotateY(x / 8);
  };

  const handlePointerLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div className="w-full max-w-xl mx-auto p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-white text-center">
      <h2 className="text-2xl font-bold flex items-center justify-center gap-2 mb-2">
        <Sparkles className="w-6 h-6 text-yellow-300 animate-spin" /> 3D Holographic Foil Card
      </h2>
      <p className="text-xs text-white/70 mb-6">Hover and tilt to see the shiny iridescent reflections!</p>

      <motion.div
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onClick={() => { playSparkle(); triggerPrideConfetti(); }}
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
        }}
        className="w-full max-w-xs mx-auto p-8 rounded-3xl bg-gradient-to-tr from-pink-500 via-indigo-600 to-amber-400 border-2 border-white/50 shadow-[0_0_35px_rgba(236,72,153,0.4)] cursor-pointer select-none relative overflow-hidden transition-transform duration-100"
      >
        <div className="text-5xl mb-2">👑✨</div>
        <h3 className="text-2xl font-extrabold text-white mb-2">VIP Birthday Pass</h3>
        <p className="text-xs text-white/90 mb-4 font-semibold">
          Guaranteed 365 Days of Pure Luck, Smiles, and Happiness!
        </p>
        <div className="text-[10px] font-bold px-3 py-1 bg-white/20 rounded-full inline-block">
          Tap for Holo Confetti Blast 🎊
        </div>
      </motion.div>
    </div>
  );
}

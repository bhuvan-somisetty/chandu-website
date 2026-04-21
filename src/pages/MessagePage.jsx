import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart } from 'lucide-react';

export default function MessagePage() {
  useEffect(() => {
    // Elegant subtle confetti effect on mount
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ec4899', '#a855f7', '#60a5fa']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ec4899', '#a855f7', '#60a5fa']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-[100dvh] pt-24 pb-20 px-4 md:px-10 flex flex-col items-center justify-center relative z-10"
    >
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="max-w-3xl w-full backdrop-blur-xl bg-white/5 p-8 md:p-14 rounded-[2.5rem] shadow-[0_0_50px_rgba(192,38,211,0.2)] border border-white/10 relative overflow-hidden text-center"
      >
        {/* Soft inner glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[30%] bg-pink-500/20 mix-blend-screen filter blur-[80px] pointer-events-none"></div>

        <h2 className="text-3xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-br from-pink-300 to-purple-400 relative z-10">
          To My Beautiful Bestie,
        </h2>
        
        <div className="space-y-6 text-lg md:text-xl text-gray-200 leading-relaxed font-light relative z-10">
          <p>
            Four beautiful years. Can you believe it? We've completed 4 amazing years and are now running in our 5th year of this beautiful chaos we call friendship.
          </p>
          <p>
            Through all the highs and lows, the crazy memories, the endless laughter, and having each other's back, you've been my constant. I couldn't have asked for a better friend to navigate life with.
          </p>
          <p>
            Today, on your special day, I want to remind you of how incredibly special you are to me. Your beautiful smile, your strength, and your pure heart make my world brighter. Thank you for being you.
          </p>
          
          <div className="pt-8 mt-8 border-t border-white/10">
            <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-pink-300 to-purple-300 mb-6 drop-shadow-md">
              Once again Happy Birthday Bangari ❤️
            </h3>
            <p className="text-[1.1rem]">Wishing you a lifetime of happiness, endless success, and a friendship that only grows stronger. Here's to making many more memories!</p>
          </div>

          <div className="pt-10 flex flex-col items-center">
            <p className="text-2xl font-medium text-pink-300 mb-8 italic">
              With lots of love, <br/> your Andhra Pilla
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-400 uppercase tracking-[0.3em]">
              <span>Made with</span>
              <Heart className="w-3 h-3 text-pink-500 fill-pink-500 animate-pulse" />
              <span>for Chandu</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

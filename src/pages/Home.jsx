import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Sparkles, PartyPopper, Heart, Compass, Image as ImageIcon } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useHeartNavigation } from '../context/NavigationContext';

const previewPhotos = [
  { src: '/images/photo2.png', tag: 'Cool Vibes 😎', alt: 'Fun memory' },
  { src: '/images/photo1.jpg', tag: 'Radiant Smile ✨', alt: 'Bright smile' },
  { src: '/images/photo5.jpg', tag: 'Pure Grace 🌸', alt: 'Traditional beauty' },
  { src: '/images/photo4.jpg', tag: 'Candid Energy 🌿', alt: 'Casual joy' },
];

export default function Home() {
  const { navigateWithHeart, triggerBurst } = useHeartNavigation();

  const handleConfetti = () => {
    triggerBurst();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f472b6', '#c084fc', '#60a5fa', '#facc15', '#34d399']
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="relative min-h-[100dvh] pt-24 sm:pt-28 pb-24 px-4 sm:px-6 md:px-12 flex flex-col items-center justify-center text-center overflow-x-hidden"
    >
      {/* Decorative blurred background lights */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-purple-600/30 rounded-full mix-blend-screen filter blur-[100px] pointer-events-none animate-pulse-glow z-0"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-pink-600/25 rounded-full mix-blend-screen filter blur-[100px] pointer-events-none animate-pulse-glow z-0" style={{ animationDelay: '1.5s' }}></div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Top celebratory pill badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-pink-500/30 text-pink-200 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-6 shadow-[0_0_20px_rgba(236,72,153,0.2)]"
        >
          <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" style={{ animationDuration: '4s' }} />
          <span>Special Birthday Edition</span>
          <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" style={{ animationDuration: '4s' }} />
        </motion.div>

        {/* Hero Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-200 drop-shadow-[0_0_35px_rgba(236,72,153,0.35)] mb-4 leading-tight">
            Happy Birthday, <br /> Bestie! 🎂✨
          </h1>
          
          <p className="text-base sm:text-xl md:text-2xl text-gray-200 font-light max-w-2xl mx-auto mb-8 leading-relaxed">
            Celebrating an extraordinary friend who brings genuine laughter, positive energy, and unforgettable memories into life.
          </p>
        </motion.div>

        {/* Floating Photo Preview Strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full max-w-3xl mb-10"
        >
          {previewPhotos.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              onClick={() => navigateWithHeart('/gallery')}
              className="relative rounded-2xl overflow-hidden shadow-lg ring-1 ring-white/15 aspect-[3/4] bg-black/40 group cursor-pointer"
            >
              <img 
                src={item.src} 
                alt={item.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-center p-2.5">
                <span className="text-[11px] sm:text-xs font-semibold text-pink-200 tracking-wide bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-sm border border-white/10">
                  {item.tag}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-md"
        >
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => navigateWithHeart('/journey')}
            className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white font-bold tracking-wider text-sm sm:text-base rounded-full shadow-[0_0_25px_rgba(236,72,153,0.4)] hover:shadow-[0_0_35px_rgba(168,85,247,0.6)] transition-all flex items-center justify-center gap-2"
          >
            <Compass className="w-5 h-5 text-pink-200" />
            <span>Explore Journey</span>
            <ChevronRight className="w-4 h-4" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleConfetti}
            className="w-full sm:w-auto px-6 py-3.5 bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium tracking-wider text-sm sm:text-base rounded-full hover:bg-white/20 transition-all flex items-center justify-center gap-2"
          >
            <PartyPopper className="w-5 h-5 text-yellow-300" />
            <span>Throw Confetti!</span>
          </motion.button>
        </motion.div>

        {/* Quick links footer inside home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-12 flex items-center justify-center gap-6 text-xs sm:text-sm text-gray-400 font-light"
        >
          <button 
            onClick={() => navigateWithHeart('/gallery')} 
            className="hover:text-pink-300 transition-colors flex items-center gap-1.5"
          >
            <ImageIcon className="w-4 h-4 text-purple-400" />
            <span>Photo Gallery (5 Snaps)</span>
          </button>
          <span>•</span>
          <button 
            onClick={() => navigateWithHeart('/message')} 
            className="hover:text-pink-300 transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span>Birthday Note</span>
          </button>
        </motion.div>

      </div>
    </motion.div>
  );
}

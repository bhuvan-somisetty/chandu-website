import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Sparkles, Eye, Camera, Star, Smile, Flame, PartyPopper, Heart } from 'lucide-react';
import { useHeartNavigation } from '../context/NavigationContext';

const memoryCards = [
  {
    id: 1,
    icon: <Sparkles className="w-12 h-12 text-yellow-300" />,
    title: 'Joy & Bright Smiles',
    category: 'moments',
    tag: 'Signature Smile ✨',
    gradient: 'from-purple-900/70 via-pink-900/50 to-indigo-900/70',
    border: 'border-pink-500/40',
    caption: 'That signature bright smile that lights up every room and brings pure positivity.',
    highlight: 'A smile that makes every conversation brighter and full of cheerful energy.'
  },
  {
    id: 2,
    icon: <Smile className="w-12 h-12 text-cyan-300" />,
    title: 'Non-Stop Laughter',
    category: 'fun',
    tag: 'Unfiltered Banter 😎',
    gradient: 'from-blue-900/70 via-indigo-900/50 to-purple-900/70',
    border: 'border-blue-500/40',
    caption: 'Endless jokes, relatable rants, and laughing together until our stomachs hurt.',
    highlight: 'Countless moments of spontaneous laughter and fun memories that never get old.'
  },
  {
    id: 3,
    icon: <PartyPopper className="w-12 h-12 text-amber-300" />,
    title: 'Grand Celebrations',
    category: 'celebrations',
    tag: 'Festive Vibes 🌸',
    gradient: 'from-amber-900/60 via-pink-900/50 to-purple-900/70',
    border: 'border-amber-500/40',
    caption: 'Dressing up, celebrating special milestones, and making every moment memorable.',
    highlight: 'Cherishing big days, festive gatherings, and unforgettable milestones.'
  },
  {
    id: 4,
    icon: <Flame className="w-12 h-12 text-emerald-300" />,
    title: 'Adventures & Chills',
    category: 'moments',
    tag: 'Good Times 🌿',
    gradient: 'from-emerald-900/70 via-teal-900/50 to-indigo-900/70',
    border: 'border-emerald-500/40',
    caption: 'Casual hangouts, relaxing days, and simply enjoying good times together.',
    highlight: 'Authentic and relaxed moments that make great friendship feel so effortless.'
  },
  {
    id: 5,
    icon: <Star className="w-12 h-12 text-rose-300" />,
    title: 'Golden Milestones',
    category: 'celebrations',
    tag: 'Victory & Pride 💫',
    gradient: 'from-rose-900/70 via-purple-900/50 to-indigo-900/70',
    border: 'border-rose-500/40',
    caption: 'Supporting each other through big decisions and celebrating every proud victory.',
    highlight: 'Standing by each other through life’s achievements and looking ahead to greater goals.'
  },
  {
    id: 6,
    icon: <Camera className="w-12 h-12 text-purple-300" />,
    title: 'Timeless Memories',
    category: 'fun',
    tag: 'Pure Magic 🌟',
    gradient: 'from-violet-900/70 via-purple-900/50 to-pink-900/70',
    border: 'border-purple-500/40',
    caption: 'A collection of shared moments, inside jokes, and a lifelong bond of friendship.',
    highlight: 'Moments frozen in memory that always bring a warm smile whenever remembered.'
  }
];

export default function GalleryPage() {
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [filter, setFilter] = useState('all');
  const { navigateWithHeart } = useHeartNavigation();

  const filteredCards = filter === 'all' 
    ? memoryCards 
    : memoryCards.filter(c => c.category === filter);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIdx === null) return;
      if (e.key === 'ArrowRight') {
        setSelectedIdx((prev) => (prev + 1) % memoryCards.length);
      } else if (e.key === 'ArrowLeft') {
        setSelectedIdx((prev) => (prev - 1 + memoryCards.length) % memoryCards.length);
      } else if (e.key === 'Escape') {
        setSelectedIdx(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIdx]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
      className="min-h-[100dvh] pt-24 sm:pt-28 pb-24 px-4 sm:px-6 md:px-12 relative z-10"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>Memory Cards</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-200 mb-3 drop-shadow-md tracking-tight">
            Hall of Memories ✨
          </h2>
          <p className="text-gray-300 text-sm sm:text-lg font-light max-w-lg mx-auto">
            A space celebrating moments of laughter, adventures, and milestones!
          </p>

          {/* Filter Pills */}
          <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
            {[
              { key: 'all', label: 'All Memories (6)' },
              { key: 'moments', label: 'Moments & Smiles' },
              { key: 'fun', label: 'Fun & Banter' },
              { key: 'celebrations', label: 'Celebrations' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                  filter === tab.key
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-[0_0_15px_rgba(236,72,153,0.4)]'
                    : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Memory Cards Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-16"
        >
          <AnimatePresence>
            {filteredCards.map((card, index) => {
              const globalIndex = memoryCards.findIndex(c => c.id === card.id);
              return (
                <motion.div 
                  layout
                  key={card.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className={`group relative cursor-pointer overflow-hidden rounded-3xl bg-gradient-to-b ${card.gradient} border ${card.border} shadow-[0_4px_25px_rgba(0,0,0,0.3)] hover:shadow-[0_0_35px_rgba(236,72,153,0.25)] transition-all duration-300 flex flex-col justify-between p-6 sm:p-7 aspect-[4/5]`}
                  onClick={() => setSelectedIdx(globalIndex)}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-pink-200 border border-white/15">
                      {card.tag}
                    </span>
                    <div className="p-2 rounded-full bg-white/10 backdrop-blur-md text-white group-hover:bg-white/20 transition-colors">
                      <Eye className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="my-auto flex flex-col items-center text-center transform group-hover:scale-108 transition-transform duration-300">
                    <div className="p-4 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-md mb-4 shadow-inner">
                      {card.icon}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                      {card.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-200 font-light text-center line-clamp-2 leading-relaxed">
                    {card.caption}
                  </p>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Next Page Navigation CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center w-full"
        >
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => navigateWithHeart('/message')}
            className="group px-8 py-3.5 sm:py-4 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white font-bold tracking-wider text-sm sm:text-base rounded-full shadow-[0_0_25px_rgba(236,72,153,0.35)] hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] transition-all flex items-center gap-3"
          >
            <span>Next: Birthday Wishes</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>

      </div>

      {/* Fullscreen Modal Preview */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-6 backdrop-blur-md"
            onClick={() => setSelectedIdx(null)}
          >
            {/* Close Button */}
            <button 
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              onClick={() => setSelectedIdx(null)}
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Previous Button */}
            <button 
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIdx((prev) => (prev - 1 + memoryCards.length) % memoryCards.length);
              }}
              aria-label="Previous card"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button 
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIdx((prev) => (prev + 1) % memoryCards.length);
              }}
              aria-label="Next card"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Modal Card Content */}
            <motion.div 
              key={selectedIdx}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 280 }}
              className={`max-w-lg w-full bg-gradient-to-b ${memoryCards[selectedIdx].gradient} border ${memoryCards[selectedIdx].border} rounded-3xl p-6 sm:p-8 flex flex-col items-center text-center shadow-[0_0_50px_rgba(0,0,0,0.8)]`}
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-xs px-3 py-1 rounded-full bg-black/40 text-pink-200 border border-white/15 font-semibold mb-6">
                {memoryCards[selectedIdx].tag}
              </span>

              <div className="p-6 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-md mb-6 shadow-inner">
                {memoryCards[selectedIdx].icon}
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                {memoryCards[selectedIdx].title}
              </h3>

              <p className="text-sm sm:text-base text-gray-200 font-light mb-4 leading-relaxed">
                {memoryCards[selectedIdx].caption}
              </p>

              <div className="p-4 rounded-2xl bg-black/30 border border-white/10 w-full mt-2">
                <p className="text-xs sm:text-sm text-pink-200 font-light italic">
                  "{memoryCards[selectedIdx].highlight}"
                </p>
              </div>

              <span className="text-xs text-gray-400 font-mono mt-6">
                Card {selectedIdx + 1} of {memoryCards.length}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

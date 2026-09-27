import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Sparkles, ZoomIn, Eye } from 'lucide-react';
import { useHeartNavigation } from '../context/NavigationContext';

const photos = [
  {
    id: 1,
    src: '/images/photo1.jpg',
    title: 'Radiant Smile',
    category: 'traditional',
    tag: 'Traditional Glow ✨',
    caption: 'That signature bright smile that lights up the room with pure joy and grace.'
  },
  {
    id: 2,
    src: '/images/photo2.png',
    title: 'Cool & Unstoppable',
    category: 'candid',
    tag: 'Retro Swag 😎',
    caption: 'Effortlessly pulling off the film-frame retro aesthetic with unmatched confidence.'
  },
  {
    id: 3,
    src: '/images/photo3.jpg',
    title: 'Pure Elegance',
    category: 'traditional',
    tag: 'Festive Grace 🌸',
    caption: 'Carrying traditional outfits with poise, perfection, and effortless charm.'
  },
  {
    id: 4,
    src: '/images/photo4.jpg',
    title: 'Natural & Candid',
    category: 'candid',
    tag: 'Fresh Vibes 🌿',
    caption: 'Unfiltered, relaxed, and always radiating genuine positive energy.'
  },
  {
    id: 5,
    src: '/images/photo5.jpg',
    title: 'Celebration Queen',
    category: 'traditional',
    tag: 'Festive Joy 💫',
    caption: 'A festive, glowing smile amidst vibrant floral celebrations.'
  }
];

export default function GalleryPage() {
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [filter, setFilter] = useState('all');
  const { navigateWithHeart } = useHeartNavigation();

  const filteredPhotos = filter === 'all' 
    ? photos 
    : photos.filter(p => p.category === filter);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIdx === null) return;
      if (e.key === 'ArrowRight') {
        setSelectedIdx((prev) => (prev + 1) % photos.length);
      } else if (e.key === 'ArrowLeft') {
        setSelectedIdx((prev) => (prev - 1 + photos.length) % photos.length);
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
            <span>Captured Moments</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-200 mb-3 drop-shadow-md tracking-tight">
            Hall of Memories ✨
          </h2>
          <p className="text-gray-300 text-sm sm:text-lg font-light max-w-lg mx-auto">
            From festive grace to candid chills, celebrating all your amazing vibes!
          </p>

          {/* Filter Pills */}
          <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
            {[
              { key: 'all', label: 'All Photos (5)' },
              { key: 'traditional', label: 'Traditional (3)' },
              { key: 'candid', label: 'Candid & Swag (2)' }
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

        {/* Photos Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-16"
        >
          <AnimatePresence>
            {filteredPhotos.map((photo, index) => {
              const globalIndex = photos.findIndex(p => p.id === photo.id);
              return (
                <motion.div 
                  layout
                  key={photo.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="group relative cursor-pointer overflow-hidden rounded-3xl bg-black/40 border border-white/10 shadow-[0_4px_25px_rgba(0,0,0,0.3)] hover:border-pink-500/40 hover:shadow-[0_0_30px_rgba(236,72,153,0.2)] transition-all duration-300 flex flex-col"
                  onClick={() => setSelectedIdx(globalIndex)}
                >
                  <div className="relative w-full aspect-[4/5] overflow-hidden bg-black/30">
                    <img 
                      src={photo.src} 
                      alt={photo.title} 
                      loading="lazy"
                      className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-pink-500/80 backdrop-blur-md text-white">
                          {photo.tag}
                        </span>
                        <div className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white">
                          <Eye className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 flex flex-col justify-between flex-grow">
                    <h3 className="text-base sm:text-lg font-bold text-white mb-1 group-hover:text-pink-300 transition-colors">
                      {photo.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-300 font-light line-clamp-2">
                      {photo.caption}
                    </p>
                  </div>
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

      {/* Cinematic Fullscreen Lightbox */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-3 sm:p-6 backdrop-blur-md"
            onClick={() => setSelectedIdx(null)}
          >
            {/* Close Button */}
            <button 
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              onClick={() => setSelectedIdx(null)}
              aria-label="Close image"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Previous Button */}
            <button 
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIdx((prev) => (prev - 1 + photos.length) % photos.length);
              }}
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button 
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIdx((prev) => (prev + 1) % photos.length);
              }}
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image & Caption Container */}
            <motion.div 
              key={selectedIdx}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 280 }}
              className="max-w-2xl w-full flex flex-col items-center max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/20 bg-black max-h-[70vh]">
                <img 
                  src={photos[selectedIdx].src} 
                  alt={photos[selectedIdx].title} 
                  className="w-full h-auto max-h-[70vh] object-contain mx-auto"
                />
              </div>

              {/* Lightbox Details Bar */}
              <div className="mt-4 text-center px-4 w-full">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30 font-semibold">
                    {photos[selectedIdx].tag}
                  </span>
                  <span className="text-xs text-gray-400 font-mono">
                    {selectedIdx + 1} / {photos.length}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {photos[selectedIdx].title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 font-light mt-1 max-w-md mx-auto">
                  {photos[selectedIdx].caption}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useHeartNavigation } from '../context/NavigationContext';

const duoPhotos = [
  { id: 1, src: '/images/1.jpeg', alt: 'Memory 1', tag: 'Us ❤️' },
  { id: 2, src: '/images/2.jpeg', alt: 'Memory 2', tag: 'Double Trouble' },
  { id: 3, src: '/images/3.jpeg', alt: 'Memory 3', tag: 'Forever Besties' },
];

const soloPhotos = [
  { id: 4, src: '/images/4.jpeg', alt: 'Queen 1', tag: 'Birthday Queen ✨' },
  { id: 5, src: '/images/5.jpeg', alt: 'Queen 2', tag: 'Gorgeous ✨' },
  { id: 6, src: '/images/6.jpeg', alt: 'Queen 3', tag: 'Stunning ✨' },
  { id: 7, src: '/images/7.jpeg', alt: 'Queen 4', tag: 'Shining Bright ✨' },
];

export default function GalleryPage() {
  const [selectedImg, setSelectedImg] = useState(null);
  const { navigateWithHeart } = useHeartNavigation();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen pt-24 pb-20 px-6 md:px-10 relative z-10"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-500 mb-4 drop-shadow-md">
            Our Hall of Memories
          </h2>
          <p className="text-gray-300 text-lg md:text-xl font-light">Captured moments of chaos, joy, and pure elegance.</p>
        </motion.div>

        {/* Duo Section */}
        <h3 className="text-2xl md:text-3xl font-semibold text-white mb-8 border-b border-white/10 pb-4 inline-block">The Duo 💖</h3>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-20"
        >
          {duoPhotos.map(photo => (
            <motion.div 
              key={photo.id}
              variants={itemVariants}
              className="relative group cursor-pointer overflow-hidden rounded-3xl shadow-[0_0_20px_rgba(236,72,153,0.15)] ring-1 ring-white/10 aspect-[4/5] bg-black/20"
              onClick={() => setSelectedImg(photo.src)}
            >
              <img 
                src={photo.src} 
                alt={photo.alt} 
                loading="lazy"
                className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 via-purple-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex flex-col justify-end p-6">
                <span className="text-white text-xl font-medium tracking-wide translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{photo.tag}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Solo Section */}
        <h3 className="text-2xl md:text-3xl font-semibold text-white mb-8 border-b border-white/10 pb-4 inline-block">The Birthday Queen 👑</h3>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {soloPhotos.map(photo => (
            <motion.div 
              key={photo.id}
              variants={itemVariants}
              className="relative group cursor-pointer overflow-hidden rounded-3xl shadow-[0_0_20px_rgba(96,165,250,0.15)] ring-1 ring-white/10 aspect-square bg-black/20"
              onClick={() => setSelectedImg(photo.src)}
            >
              <img 
                src={photo.src} 
                alt={photo.alt} 
                loading="lazy"
                className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex flex-col justify-end p-6">
                <span className="text-white text-lg font-medium tracking-wide translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{photo.tag}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Next Page Button */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 flex justify-center w-full"
        >
          <button
            onClick={() => navigateWithHeart('/message')}
            className="group relative px-8 py-4 bg-white/5 backdrop-blur-md rounded-full border border-white/20 text-white font-medium tracking-widest text-lg shadow-[0_0_30px_rgba(192,38,211,0.3)] hover:shadow-[0_0_50px_rgba(236,72,153,0.5)] transition-all flex items-center gap-3 overflow-hidden"
          >
            <span className="relative z-10 transition-transform group-hover:-translate-x-1">Next: Message</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 group-hover:translate-x-1 transition-transform"><path d="m9 18 6-6-6-6"/></svg>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>
        </motion.div>
      </div>

      {/* Cinematic Lightbox */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
            onClick={() => setSelectedImg(null)}
          >
            <motion.button 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="absolute top-6 right-6 md:top-10 md:right-10 bg-white/10 hover:bg-white/20 p-2 rounded-full text-white transition-colors"
            >
              <X className="w-8 h-8" />
            </motion.button>
            <motion.img 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={selectedImg} 
              alt="Enlarged Memory" 
              className="max-w-full max-h-[85vh] rounded-2xl shadow-[0_0_50px_rgba(255,255,255,0.1)] ring-1 ring-white/20 object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

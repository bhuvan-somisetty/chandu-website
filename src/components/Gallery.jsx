import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';

const photos = [
  { id: 1, src: '/images/photo1.jpg', alt: 'Radiant Smile', tag: 'Traditional Glow ✨' },
  { id: 2, src: '/images/photo2.png', alt: 'Cool Vibes', tag: 'Retro Swag 😎' },
  { id: 3, src: '/images/photo3.jpg', alt: 'Pure Elegance', tag: 'Festive Grace 🌸' },
  { id: 4, src: '/images/photo4.jpg', alt: 'Natural & Candid', tag: 'Fresh Vibes 🌿' },
  { id: 5, src: '/images/photo5.jpg', alt: 'Celebration Queen', tag: 'Festive Joy 💫' },
];

export default function Gallery() {
  const [selectedImg, setSelectedImg] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.85 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
  };

  return (
    <section className="py-20 px-4 md:px-10">
      <div className="max-w-6xl mx-auto">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>Memories & Moments</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-200 mb-3">
            Birthday Queen's Gallery ✨
          </h2>
          <p className="text-gray-300 text-sm md:text-base font-light">Celebrating all your smiles, grace, and fun vibes!</p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {photos.map(photo => (
            <motion.div 
              key={photo.id}
              variants={itemVariants}
              className="relative group cursor-pointer overflow-hidden rounded-3xl shadow-[0_0_20px_rgba(236,72,153,0.15)] ring-1 ring-white/10 aspect-[4/5] bg-black/30"
              onClick={() => setSelectedImg(photo.src)}
            >
              <img 
                src={photo.src} 
                alt={photo.alt} 
                className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-end justify-center pb-6">
                <span className="text-white text-sm font-semibold tracking-wide bg-pink-600/60 px-3 py-1 rounded-full backdrop-blur-sm border border-white/20">
                  {photo.tag}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
            onClick={() => setSelectedImg(null)}
          >
            <button className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors">
              <X className="w-8 h-8" />
            </button>
            <motion.img 
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
              src={selectedImg} 
              alt="Enlarged" 
              className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl object-contain border border-white/20"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

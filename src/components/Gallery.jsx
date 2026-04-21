import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const duoPhotos = [
  { id: 1, src: '/images/1.jpeg', alt: 'Friendship Memory 1' },
  { id: 2, src: '/images/2.jpeg', alt: 'Friendship Memory 2' },
  { id: 3, src: '/images/3.jpeg', alt: 'Friendship Memory 3' },
];

const soloPhotos = [
  { id: 4, src: '/images/4.jpeg', alt: 'Birthday Queen 1' },
  { id: 5, src: '/images/5.jpeg', alt: 'Birthday Queen 2' },
  { id: 6, src: '/images/6.jpeg', alt: 'Birthday Queen 3' },
  { id: 7, src: '/images/7.jpeg', alt: 'Birthday Queen 4' },
];

export default function Gallery() {
  const [selectedImg, setSelectedImg] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
  };

  return (
    <section className="py-20 px-4 md:px-10">
      <div className="max-w-6xl mx-auto">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-500 mb-4">
            Our Friendship Memories
          </h2>
          <p className="text-gray-400 text-lg">5 years of laughter, chaos, and unforgettable moments.</p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24"
        >
          {duoPhotos.map(photo => (
            <motion.div 
              key={photo.id}
              variants={itemVariants}
              className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-[0_0_20px_rgba(236,72,153,0.15)] ring-1 ring-white/10"
              onClick={() => setSelectedImg(photo.src)}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-end justify-center pb-6">
                <span className="text-white font-medium tracking-wider">Us ❤️</span>
              </div>
              <img 
                src={photo.src} 
                alt={photo.alt} 
                className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-pink-500 mb-4">
            The Birthday Queen
          </h2>
          <p className="text-gray-400 text-lg">Shining brighter than the stars today.</p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
        >
          {soloPhotos.map(photo => (
            <motion.div 
              key={photo.id}
              variants={itemVariants}
              className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-[0_0_20px_rgba(96,165,250,0.15)] ring-1 ring-white/10"
              onClick={() => setSelectedImg(photo.src)}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-end justify-center pb-6">
                <span className="text-white font-medium tracking-wider">Gorgeous ✨</span>
              </div>
              <img 
                src={photo.src} 
                alt={photo.alt} 
                className="w-full h-72 object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            onClick={() => setSelectedImg(null)}
          >
            <button className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors">
              <X w={32} h={32} />
            </button>
            <motion.img 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={selectedImg} 
              alt="Enlarged" 
              className="max-w-full max-h-[90vh] rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

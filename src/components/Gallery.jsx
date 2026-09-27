import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Eye, Camera, Star, Smile, Flame, PartyPopper } from 'lucide-react';

const memoryCards = [
  {
    id: 1,
    icon: <Sparkles className="w-10 h-10 text-yellow-300" />,
    title: 'Joy & Bright Smiles',
    tag: 'Signature Smile ✨',
    gradient: 'from-purple-900/70 via-pink-900/50 to-indigo-900/70',
    border: 'border-pink-500/40',
    caption: 'That signature bright smile that lights up every room and brings pure positivity.'
  },
  {
    id: 2,
    icon: <Smile className="w-10 h-10 text-cyan-300" />,
    title: 'Non-Stop Laughter',
    tag: 'Unfiltered Banter 😎',
    gradient: 'from-blue-900/70 via-indigo-900/50 to-purple-900/70',
    border: 'border-blue-500/40',
    caption: 'Endless jokes, relatable rants, and laughing together until our stomachs hurt.'
  },
  {
    id: 3,
    icon: <PartyPopper className="w-10 h-10 text-amber-300" />,
    title: 'Grand Celebrations',
    tag: 'Festive Vibes 🌸',
    gradient: 'from-amber-900/60 via-pink-900/50 to-purple-900/70',
    border: 'border-amber-500/40',
    caption: 'Dressing up, celebrating special milestones, and making every moment memorable.'
  },
  {
    id: 4,
    icon: <Flame className="w-10 h-10 text-emerald-300" />,
    title: 'Adventures & Chills',
    tag: 'Good Times 🌿',
    gradient: 'from-emerald-900/70 via-teal-900/50 to-indigo-900/70',
    border: 'border-emerald-500/40',
    caption: 'Casual hangouts, relaxing days, and simply enjoying good times together.'
  },
  {
    id: 5,
    icon: <Star className="w-10 h-10 text-rose-300" />,
    title: 'Golden Milestones',
    tag: 'Victory & Pride 💫',
    gradient: 'from-rose-900/70 via-purple-900/50 to-indigo-900/70',
    border: 'border-rose-500/40',
    caption: 'Supporting each other through big decisions and celebrating every proud victory.'
  },
  {
    id: 6,
    icon: <Camera className="w-10 h-10 text-purple-300" />,
    title: 'Timeless Memories',
    tag: 'Pure Magic 🌟',
    gradient: 'from-violet-900/70 via-purple-900/50 to-pink-900/70',
    border: 'border-purple-500/40',
    caption: 'A collection of shared moments, inside jokes, and a lifelong bond of friendship.'
  }
];

export default function Gallery() {
  const [selectedCard, setSelectedCard] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
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
            Memory Gallery ✨
          </h2>
          <p className="text-gray-300 text-sm md:text-base font-light">Celebrating smiles, laughter, and memorable moments!</p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {memoryCards.map(card => (
            <motion.div 
              key={card.id}
              variants={itemVariants}
              className={`relative group cursor-pointer overflow-hidden rounded-3xl bg-gradient-to-b ${card.gradient} border ${card.border} shadow-[0_0_20px_rgba(236,72,153,0.15)] p-6 aspect-[4/5] flex flex-col justify-between`}
              onClick={() => setSelectedCard(card)}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-xs font-semibold text-pink-200 bg-black/40 px-3 py-1 rounded-full border border-white/10">
                  {card.tag}
                </span>
                <div className="p-2 rounded-full bg-white/10 text-white">
                  <Eye className="w-4 h-4" />
                </div>
              </div>

              <div className="my-auto flex flex-col items-center text-center transform group-hover:scale-108 transition-transform duration-300">
                <div className="p-4 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-md mb-3">
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-1">
                  {card.title}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-gray-200 font-light text-center line-clamp-2">
                {card.caption}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedCard && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
            onClick={() => setSelectedCard(null)}
          >
            <button className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors">
              <X className="w-8 h-8" />
            </button>
            <motion.div 
              initial={{ scale: 0.88 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.88 }}
              className={`max-w-md w-full bg-gradient-to-b ${selectedCard.gradient} border ${selectedCard.border} rounded-3xl p-8 flex flex-col items-center text-center shadow-2xl`}
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-xs px-3 py-1 rounded-full bg-black/40 text-pink-200 border border-white/15 font-semibold mb-6">
                {selectedCard.tag}
              </span>
              <div className="p-5 rounded-3xl bg-white/10 border border-white/20 mb-6">
                {selectedCard.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {selectedCard.title}
              </h3>
              <p className="text-sm text-gray-200 font-light leading-relaxed">
                {selectedCard.caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Smile, Star, Flame, Music, Heart, X, Search, Filter } from 'lucide-react';
import { playPop, playSparkle } from '../utils/audioSynth';

const MEMORY_CARDS = [
  { id: 1, title: 'Cherished Laughter', category: 'Friendship', icon: Smile, color: 'from-amber-500 to-rose-500', desc: 'Those unforgettable moments when laughing together made everything brighter.' },
  { id: 2, title: 'Big Dreamer Milestones', category: 'Milestone', icon: Star, color: 'from-purple-500 to-indigo-500', desc: 'Celebrating every goal achieved and cheering for all the great things ahead.' },
  { id: 3, title: 'Warmth & Kindness', category: 'Friendship', icon: Heart, color: 'from-pink-500 to-rose-500', desc: 'A reminder of how much your genuine support and empathy mean to everyone.' },
  { id: 4, title: 'Adventures & Memories', category: 'Fun', icon: Sparkles, color: 'from-sky-500 to-blue-500', desc: 'From spontaneous fun to great talks, each memory is a treasure.' },
  { id: 5, title: 'Vibrant Energy', category: 'Fun', icon: Flame, color: 'from-orange-500 to-amber-500', desc: 'The positive spark you bring to every gathering and celebration.' },
  { id: 6, title: 'Soundtrack of Joy', category: 'Milestone', icon: Music, color: 'from-emerald-500 to-teal-500', desc: 'May this year be filled with your favorite beats, peace, and prosperity.' }
];

export default function GalleryPage() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Friendship', 'Fun', 'Milestone'];

  const filtered = activeCategory === 'All'
    ? MEMORY_CARDS
    : MEMORY_CARDS.filter(c => c.category === activeCategory);

  return (
    <div className="pt-24 pb-20 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-white mb-2">Memory Gallery ✨</h1>
        <p className="text-sm text-white/70">Interactive celebration memory cards celebrating great times</p>
      </div>

      {/* Category Filter */}
      <div className="flex justify-center gap-2 mb-8 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => { setActiveCategory(cat); playPop(); }}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeCategory === cat ? 'bg-amber-400 text-slate-950 shadow-md' : 'bg-white/10 text-white/80 hover:bg-white/20'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map((card) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.id}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => { setSelectedCard(card); playSparkle(); }}
              className="p-6 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/30 transition-all shadow-xl cursor-pointer text-white"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-4 shadow-lg`}>
                <Icon className="w-7 h-7 text-white" />
              </div>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/10 text-amber-300 inline-block mb-2">
                {card.category}
              </span>
              <h3 className="text-xl font-bold mb-2">{card.title}</h3>
              <p className="text-xs text-white/70 line-clamp-2">{card.desc}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Modal View */}
      <AnimatePresence>
        {selectedCard && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-lg bg-slate-900/95 border border-white/20 rounded-3xl p-6 shadow-2xl relative text-white"
            >
              <button
                onClick={() => setSelectedCard(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${selectedCard.color} flex items-center justify-center mb-4 shadow-lg`}>
                <selectedCard.icon className="w-8 h-8 text-white" />
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/10 text-amber-300 inline-block mb-2">
                {selectedCard.category}
              </span>
              <h3 className="text-2xl font-bold mb-3">{selectedCard.title}</h3>
              <p className="text-sm text-white/80 leading-relaxed mb-6">{selectedCard.desc}</p>
              <div className="text-right">
                <button
                  onClick={() => setSelectedCard(null)}
                  className="px-6 py-2.5 rounded-full bg-white/20 hover:bg-white/30 font-bold text-xs"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

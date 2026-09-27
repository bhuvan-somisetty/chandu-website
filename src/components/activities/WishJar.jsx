import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, Heart } from 'lucide-react';
import { playPop, playSparkle } from '../../utils/audioSynth';
import { triggerPrideConfetti } from '../../utils/particles';
import { KEYS, getStoredItem, setStoredItem } from '../../utils/storage';
import { useAchievements } from '../../context/AchievementContext';

const DEFAULT_WISHES = [
  { id: 1, text: "May your day be filled with warm smiles and sweet surprises! ✨", author: "A Good Friend" },
  { id: 2, text: "Wishing you infinite happiness, good health, and success always. 🌟", author: "Well-wisher" }
];

export default function WishJar() {
  const [wishes, setWishes] = useState(() => {
    return getStoredItem(KEYS.WISHES, DEFAULT_WISHES);
  });
  const [inputWish, setInputWish] = useState('');
  const { unlockAchievement } = useAchievements();

  const handleAddWish = (e) => {
    e.preventDefault();
    if (!inputWish.trim()) return;

    const newWish = {
      id: Date.now(),
      text: inputWish.trim(),
      author: 'You ✨'
    };
    const updated = [newWish, ...wishes];
    setWishes(updated);
    setStoredItem(KEYS.WISHES, updated);
    setInputWish('');
    playPop();
    playSparkle();
    triggerPrideConfetti();
    unlockAchievement('wish_placed');
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-white">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-6 h-6 text-amber-400" />
        <h2 className="text-2xl font-bold">Glowing Wish & Memory Jar</h2>
      </div>

      <form onSubmit={handleAddWish} className="mb-6 flex gap-2">
        <input
          type="text"
          value={inputWish}
          onChange={(e) => setInputWish(e.target.value)}
          placeholder="Write a warm birthday wish or memory note..."
          className="flex-1 px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm"
        />
        <button
          type="submit"
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-amber-500 font-bold hover:brightness-110 shadow-lg flex items-center gap-1.5 transition-all"
        >
          <Send className="w-4 h-4" /> Drop In
        </button>
      </form>

      <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
        <AnimatePresence>
          {wishes.map((w) => (
            <motion.div
              key={w.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-start gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-pink-500/20 text-pink-300 flex items-center justify-center flex-shrink-0">
                <Heart className="w-4 h-4 fill-pink-300" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white/90">{w.text}</p>
                <span className="text-[11px] text-amber-300/80 font-semibold">— {w.author}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

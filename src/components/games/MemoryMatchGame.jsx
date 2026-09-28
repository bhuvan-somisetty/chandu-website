import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, RotateCcw, Trophy, Award } from 'lucide-react';
import { playPop, playSparkle, playFanfare } from '../../utils/audioSynth';
import { triggerPrideConfetti } from '../../utils/particles';
import { useAchievements } from '../../context/AchievementContext';

const CARD_ICONS = ['🎂', '🎈', '🎁', '🍰', '⭐', '🎉'];

function shuffleCards() {
  const deck = [...CARD_ICONS, ...CARD_ICONS]
    .map((icon, id) => ({ id, icon, isFlipped: false, isMatched: false }))
    .sort(() => Math.random() - 0.5);
  return deck;
}

export default function MemoryMatchGame() {
  const [cards, setCards] = useState(shuffleCards);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [moves, setMoves] = useState(0);
  const [matchedCount, setMatchedCount] = useState(0);
  const { unlockAchievement } = useAchievements();

  const handleCardClick = (idx) => {
    if (flippedIndices.length === 2 || cards[idx].isFlipped || cards[idx].isMatched) return;

    playPop();
    const newCards = [...cards];
    newCards[idx].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedIndices, idx];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [firstIdx, secondIdx] = newFlipped;
      if (cards[firstIdx].icon === cards[secondIdx].icon) {
        // Match
        playSparkle();
        setTimeout(() => {
          setCards(prev => {
            const updated = [...prev];
            updated[firstIdx].isMatched = true;
            updated[secondIdx].isMatched = true;
            return updated;
          });
          setFlippedIndices([]);
          setMatchedCount(c => {
            const nextCount = c + 1;
            if (nextCount === CARD_ICONS.length) {
              playFanfare();
              triggerPrideConfetti();
              unlockAchievement('bingo_winner');
            }
            return nextCount;
          });
        }, 400);
      } else {
        // No match
        setTimeout(() => {
          setCards(prev => {
            const updated = [...prev];
            updated[firstIdx].isFlipped = false;
            updated[secondIdx].isFlipped = false;
            return updated;
          });
          setFlippedIndices([]);
        }, 900);
      }
    }
  };

  const handleRestart = () => {
    setCards(shuffleCards());
    setFlippedIndices([]);
    setMoves(0);
    setMatchedCount(0);
    playSparkle();
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-white">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-amber-300" /> Birthday Memory Match
          </h2>
          <p className="text-xs text-white/70">Find all pairs of celebration items!</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-white/10 rounded-xl text-xs font-bold">Moves: {moves}</span>
          <button
            onClick={handleRestart}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all"
            title="Restart Game"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-4">
        {cards.map((card, idx) => (
          <motion.button
            key={card.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleCardClick(idx)}
            className={`h-24 sm:h-28 rounded-2xl flex items-center justify-center text-3xl font-bold transition-all border select-none ${
              card.isFlipped || card.isMatched
                ? 'bg-gradient-to-br from-pink-500/80 to-amber-500/80 border-amber-300 shadow-lg'
                : 'bg-slate-900/80 border-white/10 hover:border-white/30 text-transparent'
            }`}
          >
            {card.isFlipped || card.isMatched ? card.icon : '❓'}
          </motion.button>
        ))}
      </div>

      {matchedCount === CARD_ICONS.length && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-emerald-500/20 border border-emerald-400/40 rounded-2xl text-center text-emerald-200 font-bold text-sm"
        >
          🎉 Fantastic Memory! You solved all pairs in {moves} moves!
        </motion.div>
      )}
    </div>
  );
}

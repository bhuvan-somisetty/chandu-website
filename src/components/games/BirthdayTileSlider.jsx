import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, RotateCcw, Trophy } from 'lucide-react';
import { playPop, playFanfare } from '../../utils/audioSynth';
import { triggerPrideConfetti } from '../../utils/particles';

const WINNING_ORDER = [1, 2, 3, 4, 5, 6, 7, 8, null];

export default function BirthdayTileSlider() {
  const [tiles, setTiles] = useState([1, 2, 3, 4, 5, null, 7, 8, 6]);
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);

  const handleTileClick = (index) => {
    const emptyIndex = tiles.indexOf(null);
    const validMoves = [emptyIndex - 1, emptyIndex + 1, emptyIndex - 3, emptyIndex + 3];

    if (validMoves.includes(index)) {
      playPop();
      const newTiles = [...tiles];
      newTiles[emptyIndex] = newTiles[index];
      newTiles[index] = null;
      setTiles(newTiles);
      setMoves(m => m + 1);

      if (newTiles.every((val, idx) => val === WINNING_ORDER[idx])) {
        setIsWon(true);
        playFanfare();
        triggerPrideConfetti();
      }
    }
  };

  const handleReset = () => {
    setTiles([1, 2, 3, 4, 5, null, 7, 8, 6]);
    setMoves(0);
    setIsWon(false);
  };

  return (
    <div className="w-full max-w-xl mx-auto p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-white text-center">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-300" /> Birthday Puzzle Slider
        </h2>
        <span className="text-xs px-3 py-1 bg-white/10 rounded-xl font-bold">Moves: {moves}</span>
      </div>

      <div className="grid grid-cols-3 gap-2.5 max-w-xs mx-auto mb-4 bg-slate-950/60 p-4 rounded-2xl border border-white/10">
        {tiles.map((t, idx) => (
          <button
            key={idx}
            onClick={() => handleTileClick(idx)}
            className={`h-20 rounded-xl font-extrabold text-xl flex items-center justify-center transition-all ${
              t ? 'bg-gradient-to-br from-pink-500 to-amber-500 text-white shadow-md active:scale-95' : 'bg-transparent border border-dashed border-white/10'
            }`}
          >
            {t ? (t === 1 ? '🎂' : t === 2 ? '🎈' : t === 3 ? '🎁' : t === 4 ? '🍰' : t === 5 ? '⭐' : t === 6 ? '🎉' : t === 7 ? '🥳' : '✨') : ''}
          </button>
        ))}
      </div>

      {isWon && (
        <div className="p-3 bg-emerald-500/20 border border-emerald-400/40 rounded-xl text-emerald-200 text-xs font-bold mb-4">
          🎉 Puzzle Solved in {moves} moves!
        </div>
      )}

      <button
        onClick={handleReset}
        className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-white transition-all inline-flex items-center gap-1.5"
      >
        <RotateCcw className="w-3.5 h-3.5" /> Restart Puzzle
      </button>
    </div>
  );
}

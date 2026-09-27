import React, { useState } from 'react';
import { Award, Check, Sparkles, RotateCcw } from 'lucide-react';
import { playPop, playFanfare } from '../../utils/audioSynth';
import { triggerPrideConfetti } from '../../utils/particles';
import { useAchievements } from '../../context/AchievementContext';

const BINGO_TILES = [
  "Always brings good vibes ✨",
  "Has the best laughter 😄",
  "Great taste in music 🎵",
  "Listens like a champion 👂",
  "Free Space: Awesome Friend! ⭐",
  "Makes everyone feel included 💖",
  "Full of creative ideas 💡",
  "Always down for sweet treats 🍰",
  "Deserves the happiest birthday! 🎉"
];

export default function FriendshipBingo() {
  const [marked, setMarked] = useState([4]);
  const handleReset = () => setMarked([4]); // center free space
  const { unlockAchievement } = useAchievements();

  const handleToggle = (idx) => {
    playPop();
    const updated = marked.includes(idx) ? marked.filter(i => i !== idx) : [...marked, idx];
    setMarked(updated);
    if (updated.length >= 5) {
      playFanfare();
      triggerPrideConfetti();
      unlockAchievement('bingo_winner');
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-white">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Award className="w-6 h-6 text-amber-400" />
          <h2 className="text-2xl font-bold">Friendship Bingo</h2>
        </div>
        <span className="text-xs text-white/70">{marked.length} / 9 Marked</span>
      </div>

      <div className="grid grid-cols-3 gap-2.5">
        {BINGO_TILES.map((tile, idx) => {
          const isMarked = marked.includes(idx);
          return (
            <button
              key={idx}
              onClick={() => handleToggle(idx)}
              className={`h-24 p-2 rounded-2xl border text-xs font-semibold flex flex-col items-center justify-center text-center transition-all ${
                isMarked ? 'bg-amber-400 text-slate-950 border-amber-300 font-bold scale-95 shadow-md' : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
            >
              {tile}
            </button>
          );
        })}
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cake, Sparkles, Trophy, Play, RotateCcw } from 'lucide-react';
import { playPop, playFanfare } from '../../utils/audioSynth';
import { triggerPrideConfetti } from '../../utils/particles';
import { useAchievements } from '../../context/AchievementContext';

const HOLES = [0, 1, 2, 3, 4, 5, 6, 7, 8];

export default function WhackACakeGame() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeHole, setActiveHole] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const { unlockAchievement } = useAchievements();

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          setIsPlaying(false);
          setActiveHole(null);
          playFanfare();
          triggerPrideConfetti();
          unlockAchievement('balloon_popper');
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying) return;
    const popInterval = setInterval(() => {
      const nextHole = Math.floor(Math.random() * HOLES.length);
      setActiveHole(nextHole);
    }, 850);
    return () => clearInterval(popInterval);
  }, [isPlaying]);

  const handleWhack = (idx) => {
    if (idx === activeHole) {
      playPop();
      setScore(s => s + 10);
      setActiveHole(null);
    }
  };

  const handleStart = () => {
    setScore(0);
    setTimeLeft(20);
    setIsPlaying(true);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-white">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Cake className="w-6 h-6 text-pink-400" /> Whack-A-Cake Arcade
          </h2>
          <p className="text-xs text-white/70">Tap the cakes as soon as they pop up from party boxes!</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-amber-400/20 text-amber-300 font-bold rounded-xl text-xs">⏳ {timeLeft}s</span>
          <span className="px-3 py-1 bg-purple-400/20 text-purple-200 font-bold rounded-xl text-xs">🏆 {score} pts</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 p-4 bg-slate-950/50 rounded-2xl border border-white/10 mb-4 min-h-[300px] items-center">
        {!isPlaying ? (
          <div className="col-span-3 text-center py-8">
            <div className="text-6xl mb-3">🎂</div>
            <h3 className="text-lg font-bold mb-2">
              {score > 0 ? `Great Reflexes! Final Score: ${score} pts` : 'Ready for Cake Whacking?'}
            </h3>
            <button
              onClick={handleStart}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-amber-400 text-slate-950 font-bold shadow-lg hover:brightness-110 transform hover:scale-105 transition-all inline-flex items-center gap-2"
            >
              {score > 0 ? <RotateCcw className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {score > 0 ? 'Play Again' : 'Start Game'}
            </button>
          </div>
        ) : (
          HOLES.map((h) => {
            const hasCake = activeHole === h;
            return (
              <button
                key={h}
                onClick={() => handleWhack(h)}
                className="h-24 sm:h-28 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center text-4xl relative overflow-hidden active:scale-95 transition-transform"
              >
                <div className="w-14 h-4 bg-slate-950/80 rounded-full absolute bottom-2" />
                {hasCake && (
                  <motion.span
                    initial={{ y: 20, scale: 0.5 }}
                    animate={{ y: 0, scale: 1 }}
                    className="z-10"
                  >
                    🎂
                  </motion.span>
                )}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Trophy, Sparkles, Star } from 'lucide-react';
import { playPop, playFanfare } from '../../utils/audioSynth';
import { triggerPrideConfetti } from '../../utils/particles';
import { useAchievements } from '../../context/AchievementContext';

const COLORS = [
  'bg-rose-500', 'bg-amber-500', 'bg-purple-500', 'bg-sky-500', 'bg-pink-500', 'bg-emerald-500'
];

export default function BalloonPopper() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [balloons, setBalloons] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(25);
  const [combo, setCombo] = useState(0);
  const { unlockAchievement } = useAchievements();

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          setIsPlaying(false);
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
    const spawner = setInterval(() => {
      const newBalloon = {
        id: Date.now() + Math.random(),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        left: Math.random() * 80 + 5,
        isGolden: Math.random() > 0.8,
        speed: Math.random() * 2 + 2.5
      };
      setBalloons(prev => [...prev.slice(-12), newBalloon]);
    }, 700);
    return () => clearInterval(spawner);
  }, [isPlaying]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(25);
    setCombo(0);
    setBalloons([]);
    setIsPlaying(true);
  };

  const handlePop = (id, isGolden) => {
    playPop();
    setCombo(c => c + 1);
    setScore(s => s + (isGolden ? 50 : 10) * (Math.floor(combo / 3) + 1));
    setBalloons(prev => prev.filter(b => b.id !== id));
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl relative overflow-hidden text-white">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-amber-400" /> Balloon Popper Fiesta
          </h2>
          <p className="text-xs text-white/70">Pop as many balloons as you can before time runs out!</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 bg-amber-400/20 border border-amber-400/40 rounded-xl text-amber-300 font-bold text-sm">
            ⏳ {timeLeft}s
          </div>
          <div className="px-3 py-1 bg-purple-400/20 border border-purple-400/40 rounded-xl text-purple-200 font-extrabold shadow-sm text-sm">
            🏆 {score} pts
          </div>
        </div>
      </div>

      <div className="relative h-96 w-full rounded-2xl bg-slate-950/40 border border-white/10 overflow-hidden flex items-center justify-center">
        {!isPlaying ? (
          <div className="text-center p-6 z-20">
            <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-pink-500 to-amber-500 flex items-center justify-center text-3xl shadow-lg">
              🎈
            </div>
            <h3 className="text-xl font-bold mb-1">
              {score > 0 ? `Great Job! Final Score: ${score}` : 'Ready to Pop Balloons?'}
            </h3>
            <p className="text-xs text-white/70 mb-4 max-w-xs mx-auto">
              Tap the floating balloons. Golden balloons award 5x bonus points!
            </p>
            <button
              onClick={startGame}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 to-pink-500 font-bold text-slate-950 hover:brightness-110 shadow-lg transform hover:scale-105 active:scale-95 transition-all flex items-center gap-2 mx-auto"
            >
              {score > 0 ? <RotateCcw className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              {score > 0 ? 'Play Again' : 'Start Popping'}
            </button>
          </div>
        ) : (
          <div className="absolute inset-0">
            {balloons.map(b => (
              <motion.div
                key={b.id}
                initial={{ y: 380 }}
                animate={{ y: -80 }}
                transition={{ duration: b.speed, ease: 'linear' }}
                onAnimationComplete={() => setBalloons(prev => prev.filter(x => x.id !== b.id))}
                onClick={() => handlePop(b.id, b.isGolden)}
                className="absolute cursor-pointer select-none group"
                style={{ left: `${b.left}%` }}
              >
                <div className={`w-14 h-18 rounded-full relative shadow-md transform group-hover:scale-110 transition-transform ${
                  b.isGolden ? 'bg-gradient-to-t from-amber-500 via-yellow-300 to-amber-200 border-2 border-yellow-100 ring-4 ring-yellow-400/50' : b.color
                }`}>
                  {b.isGolden && (
                    <Star className="w-5 h-5 text-amber-950 absolute inset-0 m-auto animate-spin" />
                  )}
                  <div className="absolute top-2 left-2 w-3 h-3 bg-white/40 rounded-full blur-[1px]" />
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-inherit rotate-45" />
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-white/40" />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

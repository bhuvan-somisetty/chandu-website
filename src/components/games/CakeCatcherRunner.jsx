import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Trophy, Sparkles, Heart } from 'lucide-react';
import { playPop, playFanfare, playSparkle } from '../../utils/audioSynth';
import { triggerPrideConfetti } from '../../utils/particles';
import { useAchievements } from '../../context/AchievementContext';

export default function CakeCatcherRunner() {
  const canvasRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const { unlockAchievement } = useAchievements();

  useEffect(() => {
    if (!isPlaying) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = 340;

    let animId;
    let basketX = canvas.width / 2 - 35;
    const basketWidth = 70;
    const basketHeight = 16;
    let items = [];
    let spawnTimer = 0;
    let localScore = score;
    let localLives = lives;

    const handlePointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      basketX = Math.max(0, Math.min(canvas.width - basketWidth, x - basketWidth / 2));
    };

    window.addEventListener('pointermove', handlePointerMove);

    function gameLoop() {
      ctx.fillStyle = '#0a0a14';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Basket / Plate
      ctx.fillStyle = '#f43f5e';
      ctx.beginPath();
      ctx.roundRect(basketX, canvas.height - 30, basketWidth, basketHeight, [8]);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 10px sans-serif';
      ctx.fillText('🎂 PLATE', basketX + 12, canvas.height - 18);

      // Spawn falling items
      spawnTimer++;
      if (spawnTimer % 35 === 0) {
        const isHazard = Math.random() > 0.8;
        items.push({
          x: Math.random() * (canvas.width - 30) + 15,
          y: -20,
          speed: Math.random() * 2 + 3,
          isHazard,
          icon: isHazard ? '🧊' : ['🧁', '🍰', '⭐', '🎈'][Math.floor(Math.random() * 4)]
        });
      }

      // Update & Draw Items
      for (let i = items.length - 1; i >= 0; i--) {
        const it = items[i];
        it.y += it.speed;

        ctx.font = '22px sans-serif';
        ctx.fillText(it.icon, it.x - 11, it.y);

        // Check catch collision
        if (
          it.y >= canvas.height - 35 &&
          it.y <= canvas.height - 10 &&
          it.x >= basketX - 10 &&
          it.x <= basketX + basketWidth + 10
        ) {
          if (it.isHazard) {
            localLives--;
            setLives(localLives);
            if (localLives <= 0) {
              setIsPlaying(false);
              playFanfare();
              triggerPrideConfetti();
              unlockAchievement('balloon_popper');
              cancelAnimationFrame(animId);
              return;
            }
          } else {
            playPop();
            localScore += 10;
            setScore(localScore);
          }
          items.splice(i, 1);
          continue;
        }

        // Check drop off screen
        if (it.y > canvas.height + 20) {
          items.splice(i, 1);
        }
      }

      animId = requestAnimationFrame(gameLoop);
    }

    animId = requestAnimationFrame(gameLoop);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      cancelAnimationFrame(animId);
    };
  }, [isPlaying]);

  const handleStart = () => {
    setScore(0);
    setLives(3);
    setIsPlaying(true);
    playSparkle();
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-white">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-amber-300" /> Cake Catcher 2D Arcade
          </h2>
          <p className="text-xs text-white/70">Catch falling sweet cakes with your party plate!</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-pink-500/20 text-pink-300 font-bold rounded-xl text-xs">❤️ Lives: {lives}</span>
          <span className="px-3 py-1 bg-amber-400/20 text-amber-300 font-bold rounded-xl text-xs">🏆 {score} pts</span>
        </div>
      </div>

      <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-slate-950 mb-4 min-h-[340px] flex items-center justify-center">
        {!isPlaying ? (
          <div className="text-center p-6 z-10">
            <div className="text-6xl mb-3 animate-bounce">🧁</div>
            <h3 className="text-xl font-bold mb-2">
              {score > 0 ? `Great Catching! Final Score: ${score} pts` : 'Ready to Catch Cakes?'}
            </h3>
            <p className="text-xs text-white/70 mb-4 max-w-xs mx-auto">
              Slide your finger or mouse to guide the plate. Catch cakes and stars, dodge ice cubes!
            </p>
            <button
              onClick={handleStart}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 to-pink-500 text-slate-950 font-bold shadow-xl hover:brightness-110 transform hover:scale-105 transition-all inline-flex items-center gap-2"
            >
              {score > 0 ? <RotateCcw className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {score > 0 ? 'Play Again' : 'Start Catching'}
            </button>
          </div>
        ) : (
          <canvas ref={canvasRef} className="w-full block touch-none" />
        )}
      </div>
    </div>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Trophy, Sparkles, Heart } from 'lucide-react';
import { playPop, playFanfare, playSparkle } from '../../utils/audioSynth';
import { triggerPrideConfetti } from '../../utils/particles';

export default function BalloonRacerGame() {
  const canvasRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = 300;

    let animId;
    let racerX = canvas.width / 2 - 20;
    let stars = [];
    let localScore = score;

    const handlePointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      racerX = Math.max(10, Math.min(canvas.width - 40, e.clientX - rect.left - 15));
    };

    window.addEventListener('pointermove', handlePointerMove);

    function loop() {
      ctx.fillStyle = '#070714';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Balloon Racer
      ctx.font = '28px sans-serif';
      ctx.fillText('🎈', racerX, canvas.height - 30);

      // Spawn Stars
      if (Math.random() > 0.9) {
        stars.push({
          x: Math.random() * (canvas.width - 30) + 15,
          y: -20,
          speed: Math.random() * 2 + 3
        });
      }

      // Update & Draw Stars
      for (let i = stars.length - 1; i >= 0; i--) {
        const s = stars[i];
        s.y += s.speed;
        ctx.fillText('⭐', s.x, s.y);

        if (s.y >= canvas.height - 45 && s.y <= canvas.height - 10 && Math.abs(s.x - racerX) < 30) {
          playPop();
          localScore += 10;
          setScore(localScore);
          stars.splice(i, 1);
          continue;
        }

        if (s.y > canvas.height + 20) stars.splice(i, 1);
      }

      animId = requestAnimationFrame(loop);
    }

    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      cancelAnimationFrame(animId);
    };
  }, [isPlaying]);

  return (
    <div className="w-full max-w-2xl mx-auto p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-300" /> Balloon Sky Racer 🎈
        </h2>
        <span className="px-3 py-1 bg-amber-400/20 text-amber-300 font-bold rounded-xl text-xs">Score: {score} pts</span>
      </div>

      <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-slate-950 mb-4 min-h-[300px] flex items-center justify-center">
        {!isPlaying ? (
          <div className="text-center p-6 z-10">
            <div className="text-5xl mb-2">🎈✨</div>
            <h3 className="text-lg font-bold mb-2">Ready to Race the Skies?</h3>
            <button
              onClick={() => { setScore(0); setIsPlaying(true); playSparkle(); }}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-pink-500 text-slate-950 font-bold text-xs inline-flex items-center gap-2 shadow-lg hover:brightness-110 transition-all"
            >
              <Play className="w-3.5 h-3.5" /> Start Sky Race
            </button>
          </div>
        ) : (
          <canvas ref={canvasRef} className="w-full block touch-none" />
        )}
      </div>
    </div>
  );
}

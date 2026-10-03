import React, { useRef, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { playPop, playSparkle, playCelebrationTune } from '../../utils/audioSynth';

export default function StarWishCatcher() {
  const canvasRef = useRef(null);
  const [starsCaught, setStarsCaught] = useState(0);
  const [wishesUnlocked, setWishesUnlocked] = useState([]);
  const animRef = useRef(null);
  const starsRef = useRef([]);

  const wishPool = [
    '✨ Endless laughter & sparkling adventures',
    '💫 Triumph in every bold aspiration',
    '🌟 Deep and enduring friendships',
    '🎉 Boundless happiness & good health',
    '🚀 Infinite cosmic blessings in 2026'
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let frame = 0;
    const loop = () => {
      frame++;
      if (frame % 40 === 0 && starsRef.current.length < 12) {
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: -10,
          vx: (Math.random() - 0.5) * 2,
          vy: Math.random() * 2 + 1.5,
          radius: Math.random() * 4 + 4,
          color: ['#f43f5e', '#ec4899', '#38bdf8', '#fbbf24', '#a855f7'][Math.floor(Math.random() * 5)]
        });
      }

      ctx.fillStyle = 'rgba(2, 6, 23, 0.3)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      starsRef.current.forEach((s) => {
        s.x += s.vx;
        s.y += s.vy;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.shadowBlur = 12;
        ctx.shadowColor = s.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Remove fallen stars
      starsRef.current = starsRef.current.filter(s => s.y < canvas.height + 20);

      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const clickX = (e.clientX - rect.left) * scaleX;
    const clickY = (e.clientY - rect.top) * scaleY;

    let caught = false;
    starsRef.current = starsRef.current.filter(s => {
      const dist = Math.hypot(s.x - clickX, s.y - clickY);
      if (dist < 35 && !caught) {
        caught = true;
        setStarsCaught(c => {
          const next = c + 1;
          if (next % 3 === 0) {
            const nextWish = wishPool[(next / 3 - 1) % wishPool.length];
            setWishesUnlocked(w => [nextWish, ...w]);
            playSparkle();
          }
          if (next === 10) {
            playCelebrationTune();
            confetti({ particleCount: 100, spread: 70 });
          }
          return next;
        });
        playPop(800);
        return false;
      }
      return true;
    });
  };

  return (
    <div className="bg-slate-900/80 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-6 shadow-2xl max-w-2xl mx-auto text-center">
      <div className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-3">
        Celestial Arcade Game
      </div>
      <h2 className="text-3xl font-extrabold text-white mb-2">Shooting Star Wish Catcher 🌠</h2>
      <p className="text-slate-300 text-xs mb-4">
        Click or tap falling shooting stars to gather starlight and unlock cosmic birthday wishes!
      </p>

      {/* Counter */}
      <div className="flex justify-between items-center bg-slate-800/80 px-4 py-2 rounded-xl mb-3 border border-slate-700 font-mono text-xs text-white">
        <span>⭐ Stars Caught: <strong className="text-cyan-300 text-sm">{starsCaught}</strong></span>
        <span className="text-amber-300">💫 Wishes Sealed: {wishesUnlocked.length}</span>
      </div>

      {/* Canvas */}
      <div className="relative rounded-2xl overflow-hidden border-2 border-slate-700 bg-slate-950 mb-4 cursor-pointer">
        <canvas
          ref={canvasRef}
          width={500}
          height={280}
          onClick={handleCanvasClick}
          className="w-full h-64 block"
        />
      </div>

      {/* Unlocked Wishes */}
      {wishesUnlocked.length > 0 && (
        <div className="space-y-2 mt-4 text-left">
          <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider block">✨ Unlocked Cosmic Blessings:</span>
          {wishesUnlocked.map((w, idx) => (
            <div key={idx} className="p-2.5 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-xs text-cyan-200 font-serif">
              {w}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

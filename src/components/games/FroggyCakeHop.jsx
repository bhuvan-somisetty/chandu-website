import React, { useRef, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { playPop, playCelebrationTune } from '../../utils/audioSynth';

export default function FroggyCakeHop() {
  const canvasRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const animRef = useRef(null);

  const state = useRef({
    frogX: 180,
    frogY: 340,
    rows: [
      { y: 80, speed: 2, items: [{ x: 50, w: 60, icon: '🧁' }, { x: 200, w: 60, icon: '🧁' }] },
      { y: 130, speed: -2.5, items: [{ x: 30, w: 70, icon: '🍰' }, { x: 220, w: 70, icon: '🍰' }] },
      { y: 180, speed: 1.8, items: [{ x: 80, w: 65, icon: '🎁' }, { x: 260, w: 65, icon: '🎁' }] },
      { y: 230, speed: -2, items: [{ x: 40, w: 50, icon: '🚗' }, { x: 190, w: 50, icon: '🚗' }] },
      { y: 280, speed: 2.2, items: [{ x: 60, w: 50, icon: '🏎️' }, { x: 240, w: 50, icon: '🏎️' }] }
    ]
  });

  const startGame = () => {
    state.current.frogX = 180;
    state.current.frogY = 340;
    setScore(0);
    setLives(3);
    setGameOver(false);
    setWon(false);
    setIsPlaying(true);
    playPop();
  };

  const hop = (dir) => {
    if (!isPlaying || gameOver || won) return;
    const s = state.current;
    if (dir === 'up') s.frogY -= 50;
    if (dir === 'down') s.frogY = Math.min(340, s.frogY + 50);
    if (dir === 'left') s.frogX = Math.max(20, s.frogX - 45);
    if (dir === 'right') s.frogX = Math.min(340, s.frogX + 45);
    playPop(550);

    // Goal Reach
    if (s.frogY <= 40) {
      playCelebrationTune();
      confetti({ particleCount: 100, spread: 70 });
      setScore(sc => sc + 200);
      setWon(true);
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isPlaying) return;
      if (e.key === 'ArrowUp' || e.key === 'w') hop('up');
      if (e.key === 'ArrowDown' || e.key === 's') hop('down');
      if (e.key === 'ArrowLeft' || e.key === 'a') hop('left');
      if (e.key === 'ArrowRight' || e.key === 'd') hop('right');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, gameOver, won]);

  useEffect(() => {
    if (!isPlaying) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const loop = () => {
      const s = state.current;

      // Update row items
      s.rows.forEach(r => {
        r.items.forEach(item => {
          item.x += r.speed;
          if (r.speed > 0 && item.x > canvas.width) item.x = -item.w;
          if (r.speed < 0 && item.x < -item.w) item.x = canvas.width;
        });
      });

      // Collision check on obstacle rows
      s.rows.forEach(r => {
        if (Math.abs(s.frogY - r.y) < 20) {
          r.items.forEach(item => {
            if (s.frogX > item.x - 15 && s.frogX < item.x + item.w + 15) {
              // Car collision
              if (item.icon === '🚗' || item.icon === '🏎️') {
                playPop(220);
                s.frogX = 180;
                s.frogY = 340;
                setLives(l => {
                  if (l <= 1) {
                    setGameOver(true);
                    setIsPlaying(false);
                    return 0;
                  }
                  return l - 1;
                });
              }
            }
          });
        }
      });

      // Render Stage
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Safe Grass Top
      ctx.fillStyle = '#065f46';
      ctx.fillRect(0, 0, canvas.width, 60);

      // River Section
      ctx.fillStyle = '#0c4a6e';
      ctx.fillRect(0, 60, canvas.width, 150);

      // Road Section
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(0, 210, canvas.width, 110);

      // Start Grass Bottom
      ctx.fillStyle = '#065f46';
      ctx.fillRect(0, 320, canvas.width, 60);

      // Render Floating Items & Obstacles
      s.rows.forEach(r => {
        r.items.forEach(item => {
          ctx.font = '24px serif';
          ctx.fillText(item.icon, item.x, r.y + 8);
        });
      });

      // Draw Frog
      ctx.font = '28px serif';
      ctx.fillText('🐸', s.frogX - 14, s.frogY + 10);

      if (isPlaying && !gameOver && !won) {
        animRef.current = requestAnimationFrame(loop);
      }
    };

    animRef.current = requestAnimationFrame(loop);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isPlaying, gameOver, won]);

  return (
    <div className="bg-slate-900/80 backdrop-blur-xl border border-emerald-500/20 rounded-3xl p-6 shadow-2xl max-w-xl mx-auto text-center">
      <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs uppercase tracking-widest mb-3">
        Retro Arcade Crosser
      </div>
      <h2 className="text-3xl font-extrabold text-white mb-2">Froggy Cake Hop 🐸</h2>
      <p className="text-slate-300 text-xs mb-4">
        Hop across floating cupcakes and dodge party vehicles to reach the celebration pond!
      </p>

      {/* HUD */}
      <div className="flex justify-between items-center bg-slate-800/80 px-6 py-2.5 rounded-2xl mb-4 border border-slate-700 font-mono text-sm">
        <span className="text-rose-400 font-bold">❤️ Lives: {lives}</span>
        <span className="text-amber-300 font-bold">⭐ Score: {score} PTS</span>
      </div>

      {/* Canvas */}
      <div className="relative w-[360px] h-[380px] mx-auto rounded-2xl overflow-hidden border-2 border-slate-700 bg-slate-950 mb-4 select-none touch-none">
        <canvas ref={canvasRef} width={360} height={380} className="w-full h-full block" />

        {!isPlaying && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/90 p-4">
            {won ? (
              <>
                <h3 className="text-2xl font-black text-amber-300 mb-1">🎉 Reached the Birthday Pond!</h3>
                <p className="text-xs text-slate-300 mb-4">You safely crossed the celebration road!</p>
              </>
            ) : gameOver ? (
              <>
                <h3 className="text-2xl font-black text-rose-400 mb-1">Game Over!</h3>
                <p className="text-xs text-slate-300 mb-4">The froggy needs another leap!</p>
              </>
            ) : (
              <>
                <div className="text-4xl mb-2">🐸 🧁 🚗</div>
                <h3 className="text-lg font-bold text-white mb-1">Ready to Hop?</h3>
                <p className="text-xs text-slate-400 mb-4">Use Arrow keys or touch buttons to hop.</p>
              </>
            )}
            <button
              onClick={startGame}
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 rounded-xl font-bold text-xs shadow-lg hover:scale-105 transition-all"
            >
              {gameOver || won ? '🔄 Play Again' : '▶️ Start Hopping'}
            </button>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-2">
        <button onClick={() => hop('left')} disabled={!isPlaying} className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold">⬅️</button>
        <button onClick={() => hop('up')} disabled={!isPlaying} className="px-5 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold">⬆️ Hop Up</button>
        <button onClick={() => hop('down')} disabled={!isPlaying} className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold">⬇️</button>
        <button onClick={() => hop('right')} disabled={!isPlaying} className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold">➡️</button>
      </div>
    </div>
  );
}

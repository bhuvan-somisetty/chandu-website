import React, { useRef, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { playPop, playLaserBeam, playCelebrationTune } from '../../utils/audioSynth';

export default function CyberHighwayRacer() {
  const canvasRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(5);
  const [gameOver, setGameOver] = useState(false);
  const animRef = useRef(null);

  const gameState = useRef({
    carX: 180,
    carLane: 1, // 0, 1, 2
    roadOffset: 0,
    obstacles: [],
    gifts: []
  });

  const laneX = [90, 180, 270];

  const startGame = () => {
    gameState.current.carLane = 1;
    gameState.current.carX = laneX[1];
    gameState.current.obstacles = [];
    gameState.current.gifts = [];
    setScore(0);
    setSpeed(5);
    setGameOver(false);
    setIsPlaying(true);
    playPop();
  };

  const steerLeft = () => {
    if (gameState.current.carLane > 0) {
      gameState.current.carLane -= 1;
      gameState.current.carX = laneX[gameState.current.carLane];
      playPop(600);
    }
  };

  const steerRight = () => {
    if (gameState.current.carLane < 2) {
      gameState.current.carLane += 1;
      gameState.current.carX = laneX[gameState.current.carLane];
      playPop(600);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isPlaying) return;
      if (e.key === 'ArrowLeft' || e.key === 'a') steerLeft();
      if (e.key === 'ArrowRight' || e.key === 'd') steerRight();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let frame = 0;
    const loop = () => {
      frame++;
      const state = gameState.current;

      // Spawn gifts
      if (frame % 35 === 0) {
        const lane = Math.floor(Math.random() * 3);
        state.gifts.push({ lane, x: laneX[lane], y: -20, icon: '🎁' });
      }

      // Spawn obstacles
      if (frame % 50 === 0) {
        const lane = Math.floor(Math.random() * 3);
        state.obstacles.push({ lane, x: laneX[lane], y: -20, icon: '🚧' });
      }

      // Update positions
      state.gifts.forEach(g => { g.y += speed; });
      state.obstacles.forEach(o => { o.y += speed; });

      // Collision checks
      state.gifts = state.gifts.filter(g => {
        if (Math.abs(g.y - 260) < 25 && g.lane === state.carLane) {
          setScore(s => {
            const next = s + 50;
            if (next % 300 === 0) {
              setSpeed(sp => Math.min(12, sp + 1));
              playCelebrationTune();
            }
            return next;
          });
          playLaserBeam(800);
          return false;
        }
        return g.y < 340;
      });

      state.obstacles = state.obstacles.filter(o => {
        if (Math.abs(o.y - 260) < 22 && o.lane === state.carLane) {
          setGameOver(true);
          setIsPlaying(false);
          playLaserBeam(200);
          return false;
        }
        return o.y < 340;
      });

      // Render Highway Canvas
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Road boundaries
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(40, 0, 280, canvas.height);

      // Lane dividers
      state.roadOffset = (state.roadOffset + speed) % 40;
      ctx.strokeStyle = '#38bdf8';
      ctx.setLineDash([15, 25]);
      ctx.lineDashOffset = -state.roadOffset;
      ctx.lineWidth = 2;

      ctx.beginPath();
      ctx.moveTo(135, 0);
      ctx.lineTo(135, canvas.height);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(225, 0);
      ctx.lineTo(225, canvas.height);
      ctx.stroke();

      ctx.setLineDash([]);

      // Draw gifts
      state.gifts.forEach(g => {
        ctx.font = '24px serif';
        ctx.fillText(g.icon, g.x - 12, g.y);
      });

      // Draw obstacles
      state.obstacles.forEach(o => {
        ctx.font = '24px serif';
        ctx.fillText(o.icon, o.x - 12, o.y);
      });

      // Draw player car
      ctx.font = '32px serif';
      ctx.fillText('🏎️', state.carX - 16, 275);

      if (isPlaying && !gameOver) {
        animRef.current = requestAnimationFrame(loop);
      }
    };

    animRef.current = requestAnimationFrame(loop);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isPlaying, gameOver, speed]);

  return (
    <div className="bg-slate-900/80 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-6 shadow-2xl max-w-xl mx-auto text-center">
      <div className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-3">
        Cyber Arcade Racer
      </div>
      <h2 className="text-3xl font-extrabold text-white mb-2">Cyber Highway Racer 🏎️</h2>
      <p className="text-slate-300 text-xs mb-4">
        Speed down the neon highway, collect birthday gift boxes, and dodge cyber roadblocks!
      </p>

      {/* HUD */}
      <div className="flex justify-between items-center bg-slate-800/80 px-4 py-2 rounded-xl mb-3 border border-slate-700 font-mono text-xs text-white">
        <span>⚡ Speed: {speed * 10} MPH</span>
        <span className="text-amber-300 font-bold">⭐ Score: {score} PTS</span>
      </div>

      {/* Canvas */}
      <div className="relative w-[360px] h-[320px] mx-auto rounded-2xl overflow-hidden border-2 border-slate-700 bg-slate-950 mb-4 touch-none">
        <canvas
          ref={canvasRef}
          width={360}
          height={320}
          className="w-full h-full block"
        />

        {!isPlaying && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/90 p-4">
            {gameOver ? (
              <>
                <h3 className="text-2xl font-black text-rose-400 mb-1">Crash on Highway!</h3>
                <p className="text-xs text-slate-300 mb-4">Final Distance Score: <strong className="text-amber-300">{score} PTS</strong></p>
              </>
            ) : (
              <>
                <div className="text-4xl mb-2">🏎️ 🎁 ⚡</div>
                <h3 className="text-lg font-bold text-white mb-1">Ready to Race?</h3>
                <p className="text-xs text-slate-400 mb-4">Use Left/Right arrow keys or the buttons below.</p>
              </>
            )}
            <button
              onClick={startGame}
              className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 rounded-xl font-bold text-xs shadow-lg hover:scale-105 transition-all"
            >
              {gameOver ? '🔄 Race Again' : '🏎️ Start Engine'}
            </button>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4">
        <button
          onClick={steerLeft}
          disabled={!isPlaying}
          className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white rounded-2xl text-sm font-bold shadow-md"
        >
          ⬅️ Left Lane
        </button>
        <button
          onClick={steerRight}
          disabled={!isPlaying}
          className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white rounded-2xl text-sm font-bold shadow-md"
        >
          Right Lane ➡️
        </button>
      </div>
    </div>
  );
}

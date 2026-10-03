import React, { useState, useEffect, useRef } from 'react';
import { playPop, playLaserBeam } from '../../utils/audioSynth';
import { useAchievements } from '../../context/AchievementContext';

export default function SpaceBirthdayOdyssey() {
  const [gameActive, setGameActive] = useState(false);
  const [score, setScore] = useState(0);
  const [health, setHealth] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const playerPosRef = useRef(200);
  const [, setRerender] = useState(0);
  const starsRef = useRef([]);
  const cakesRef = useRef([]);
  const animFrameRef = useRef(null);
  const { unlockAchievement } = useAchievements();

  const startGame = () => {
    setGameActive(true);
    setScore(0);
    setHealth(3);
    setGameOver(false);
    playerPosRef.current = 200;
    starsRef.current = [];
    cakesRef.current = [];
    playPop();
  };

  const moveLeft = () => {
    playerPosRef.current = Math.max(30, playerPosRef.current - 40);
    setRerender(n => n + 1);
  };

  const moveRight = () => {
    playerPosRef.current = Math.min(370, playerPosRef.current + 40);
    setRerender(n => n + 1);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!gameActive) return;
      if (e.key === 'ArrowLeft' || e.key === 'a') moveLeft();
      if (e.key === 'ArrowRight' || e.key === 'd') moveRight();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameActive]);

  useEffect(() => {
    if (!gameActive) return;

    let frame = 0;
    const loop = () => {
      frame++;
      // Spawn items
      if (frame % 30 === 0) {
        cakesRef.current.push({ x: Math.random() * 340 + 30, y: -20, type: 'cake' });
      }
      if (frame % 45 === 0) {
        starsRef.current.push({ x: Math.random() * 340 + 30, y: -20, type: 'asteroid' });
      }

      // Update positions
      cakesRef.current.forEach(c => { c.y += 4; });
      starsRef.current.forEach(a => { a.y += 5; });

      // Collision checks
      cakesRef.current = cakesRef.current.filter(c => {
        if (Math.abs(c.x - playerPosRef.current) < 35 && Math.abs(c.y - 320) < 30) {
          setScore(s => {
            const next = s + 50;
            if (next >= 300) unlockAchievement && unlockAchievement('space_pilot');
            return next;
          });
          playPop(600);
          return false;
        }
        return c.y < 380;
      });

      starsRef.current = starsRef.current.filter(a => {
        if (Math.abs(a.x - playerPosRef.current) < 30 && Math.abs(a.y - 320) < 30) {
          playLaserBeam(200);
          setHealth(h => {
            if (h <= 1) {
              setGameOver(true);
              setGameActive(false);
            }
            return h - 1;
          });
          return false;
        }
        return a.y < 380;
      });

      setRerender(n => n + 1);
      if (gameActive && !gameOver) {
        animFrameRef.current = requestAnimationFrame(loop);
      }
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [gameActive, gameOver]);

  return (
    <div className="bg-slate-900/80 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-6 shadow-2xl max-w-xl mx-auto text-center">
      <div className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 font-mono text-xs uppercase tracking-widest mb-3">
        Space Arcade Odyssey
      </div>
      <h2 className="text-3xl font-extrabold text-white mb-2">Space Birthday Rocket 🚀</h2>
      <p className="text-slate-300 text-xs mb-4">
        Pilot the Birthday Rocket through outer space, collect flying cupcakes, and dodge space meteors!
      </p>

      {/* Game Stage */}
      <div className="relative w-full max-w-[400px] h-[360px] mx-auto bg-slate-950 rounded-2xl overflow-hidden border border-purple-500/40 shadow-2xl mb-4">
        {!gameActive ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-slate-950/90 z-20">
            {gameOver ? (
              <>
                <h3 className="text-2xl font-black text-rose-400 mb-2">Mission Over!</h3>
                <p className="text-sm text-slate-300 mb-4">Final Odyssey Score: <span className="font-bold text-amber-300">{score} PTS</span></p>
              </>
            ) : (
              <>
                <div className="text-4xl mb-3">🚀 🧁 🌌</div>
                <h3 className="text-xl font-bold text-white mb-2">Ready to Launch?</h3>
                <p className="text-xs text-slate-400 mb-4">Use Left/Right arrow keys or touch buttons to navigate.</p>
              </>
            )}
            <button
              onClick={startGame}
              className="px-6 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold text-xs shadow-lg hover:scale-105 transition-all"
            >
              {gameOver ? '🔄 Play Again' : '🚀 Launch Rocket'}
            </button>
          </div>
        ) : (
          <>
            {/* HUD */}
            <div className="absolute top-3 left-3 right-3 flex justify-between items-center text-xs font-mono text-white z-10">
              <span className="bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-700">
                ❤️ {health} Lives
              </span>
              <span className="bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-700 text-amber-300 font-bold">
                ⭐ {score} PTS
              </span>
            </div>

            {/* Falling Cupcakes */}
            {cakesRef.current.map((c, i) => (
              <div
                key={i}
                className="absolute text-2xl filter drop-shadow animate-pulse"
                style={{ left: `${c.x}px`, top: `${c.y}px` }}
              >
                🧁
              </div>
            ))}

            {/* Falling Asteroids */}
            {starsRef.current.map((a, i) => (
              <div
                key={i}
                className="absolute text-2xl filter drop-shadow"
                style={{ left: `${a.x}px`, top: `${a.y}px` }}
              >
                ☄️
              </div>
            ))}

            {/* Player Rocket */}
            <div
              className="absolute text-3xl transition-all duration-75"
              style={{ left: `${playerPosRef.current - 15}px`, top: '310px' }}
            >
              🚀
            </div>
          </>
        )}
      </div>

      {/* Touch Controls */}
      <div className="flex justify-center gap-4">
        <button
          onClick={moveLeft}
          disabled={!gameActive}
          className="px-6 py-3 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white rounded-2xl text-base font-bold shadow-md"
        >
          ⬅️ Left
        </button>
        <button
          onClick={moveRight}
          disabled={!gameActive}
          className="px-6 py-3 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white rounded-2xl text-base font-bold shadow-md"
        >
          Right ➡️
        </button>
      </div>
    </div>
  );
}

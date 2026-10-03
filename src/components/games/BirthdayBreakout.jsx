import React, { useRef, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { playPop, playLaserBeam, playCelebrationTune } from '../../utils/audioSynth';

export default function BirthdayBreakout() {
  const canvasRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const animRef = useRef(null);

  const gameState = useRef({
    paddleX: 160,
    paddleWidth: 80,
    ballX: 200,
    ballY: 260,
    ballDx: 3,
    ballDy: -3,
    ballRadius: 6,
    bricks: []
  });

  const initBricks = () => {
    const rows = 4;
    const cols = 6;
    const brickW = 55;
    const brickH = 18;
    const padding = 8;
    const offsetTop = 30;
    const offsetLeft = 20;

    const colors = ['#f43f5e', '#ec4899', '#a855f7', '#38bdf8'];
    const bricks = [];
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        bricks.push({
          x: c * (brickW + padding) + offsetLeft,
          y: r * (brickH + padding) + offsetTop,
          w: brickW,
          h: brickH,
          color: colors[r],
          status: 1
        });
      }
    }
    return bricks;
  };

  const startGame = () => {
    gameState.current.bricks = initBricks();
    gameState.current.paddleX = 160;
    gameState.current.ballX = 200;
    gameState.current.ballY = 260;
    gameState.current.ballDx = 3 * (Math.random() > 0.5 ? 1 : -1);
    gameState.current.ballDy = -3;
    setScore(0);
    setLives(3);
    setGameOver(false);
    setWon(false);
    setIsPlaying(true);
    playPop();
  };

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const relativeX = (clientX - rect.left) * scaleX;
    gameState.current.paddleX = Math.max(0, Math.min(canvas.width - gameState.current.paddleWidth, relativeX - gameState.current.paddleWidth / 2));
  };

  useEffect(() => {
    if (!isPlaying) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const update = () => {
      const state = gameState.current;

      // Move ball
      state.ballX += state.ballDx;
      state.ballY += state.ballDy;

      // Wall bounce
      if (state.ballX + state.ballRadius > canvas.width || state.ballX - state.ballRadius < 0) {
        state.ballDx = -state.ballDx;
        playPop(500);
      }
      if (state.ballY - state.ballRadius < 0) {
        state.ballDy = -state.ballDy;
        playPop(500);
      }

      // Paddle bounce
      if (
        state.ballY + state.ballRadius >= canvas.height - 20 &&
        state.ballX >= state.paddleX &&
        state.ballX <= state.paddleX + state.paddleWidth
      ) {
        state.ballDy = -Math.abs(state.ballDy);
        // Angle variation based on hit position
        const hitPoint = (state.ballX - (state.paddleX + state.paddleWidth / 2)) / (state.paddleWidth / 2);
        state.ballDx = hitPoint * 4;
        playPop(650);
      }

      // Bottom fall
      if (state.ballY + state.ballRadius > canvas.height) {
        setLives(l => {
          if (l <= 1) {
            setGameOver(true);
            setIsPlaying(false);
            return 0;
          }
          state.ballX = 200;
          state.ballY = 250;
          state.ballDy = -3;
          return l - 1;
        });
      }

      // Brick collision
      let activeCount = 0;
      state.bricks.forEach(b => {
        if (b.status === 1) {
          activeCount++;
          if (
            state.ballX > b.x &&
            state.ballX < b.x + b.w &&
            state.ballY > b.y &&
            state.ballY < b.y + b.h
          ) {
            b.status = 0;
            state.ballDy = -state.ballDy;
            setScore(s => s + 20);
            playLaserBeam(700);
          }
        }
      });

      if (activeCount === 0) {
        setWon(true);
        setIsPlaying(false);
        playCelebrationTune();
        confetti({ particleCount: 120, spread: 80 });
      }

      // Draw loop
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw bricks
      state.bricks.forEach(b => {
        if (b.status === 1) {
          ctx.beginPath();
          ctx.roundRect(b.x, b.y, b.w, b.h, 4);
          ctx.fillStyle = b.color;
          ctx.fill();
          ctx.strokeStyle = '#ffffff33';
          ctx.stroke();
        }
      });

      // Draw paddle
      ctx.beginPath();
      ctx.roundRect(state.paddleX, canvas.height - 18, state.paddleWidth, 12, 6);
      ctx.fillStyle = '#f59e0b';
      ctx.fill();

      // Draw ball
      ctx.beginPath();
      ctx.arc(state.ballX, state.ballY, state.ballRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#38bdf8';
      ctx.fill();
      ctx.shadowBlur = 0;

      if (isPlaying && !gameOver && !won) {
        animRef.current = requestAnimationFrame(update);
      }
    };

    animRef.current = requestAnimationFrame(update);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isPlaying, gameOver, won]);

  return (
    <div className="bg-slate-900/80 backdrop-blur-xl border border-rose-500/20 rounded-3xl p-6 shadow-2xl max-w-xl mx-auto text-center">
      <div className="inline-block px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 font-mono text-xs uppercase tracking-widest mb-3">
        Retro Arcade Breakout
      </div>
      <h2 className="text-3xl font-extrabold text-white mb-2">Birthday Brick Breakout 🏓</h2>
      <p className="text-slate-300 text-xs mb-4">
        Bounce the birthday orb, smash colorful gift bricks, and clear the stage!
      </p>

      {/* HUD */}
      <div className="flex justify-between items-center bg-slate-800/80 px-4 py-2 rounded-xl mb-3 border border-slate-700 font-mono text-xs text-white">
        <span>❤️ Lives: {lives}</span>
        <span className="text-amber-300 font-bold">⭐ Score: {score} PTS</span>
      </div>

      {/* Canvas */}
      <div className="relative w-[400px] h-[320px] mx-auto rounded-2xl overflow-hidden border-2 border-slate-700 bg-slate-950 mb-4 touch-none">
        <canvas
          ref={canvasRef}
          width={400}
          height={320}
          onMouseMove={handleMouseMove}
          onTouchMove={handleMouseMove}
          className="w-full h-full block cursor-none"
        />

        {!isPlaying && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/90 p-4">
            {won ? (
              <>
                <h3 className="text-2xl font-black text-amber-300 mb-1">🎉 You Smashed All Bricks!</h3>
                <p className="text-xs text-slate-300 mb-4">Final Score: {score} PTS</p>
              </>
            ) : gameOver ? (
              <>
                <h3 className="text-2xl font-black text-rose-400 mb-1">Game Over!</h3>
                <p className="text-xs text-slate-300 mb-4">Final Score: {score} PTS</p>
              </>
            ) : (
              <>
                <div className="text-4xl mb-2">🏓 🎁 ✨</div>
                <h3 className="text-lg font-bold text-white mb-1">Ready to Break Bricks?</h3>
                <p className="text-xs text-slate-400 mb-4">Move your mouse or finger to control the paddle.</p>
              </>
            )}
            <button
              onClick={startGame}
              className="px-6 py-2 bg-gradient-to-r from-rose-500 to-amber-500 text-slate-950 rounded-xl font-bold text-xs shadow-lg hover:scale-105 transition-all"
            >
              {gameOver || won ? '🔄 Play Again' : '▶️ Start Breakout'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

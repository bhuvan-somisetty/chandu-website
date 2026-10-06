import React, { useRef, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { playPop, playLaserBeam, playCelebrationTune } from '../../utils/audioSynth';

export default function BirthdayAirHockey() {
  const canvasRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playerScore, setPlayerScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);
  const [winner, setWinner] = useState(null);
  const animRef = useRef(null);

  const state = useRef({
    puckX: 180,
    puckY: 200,
    puckVx: 3,
    puckVy: 3,
    puckRadius: 10,
    playerX: 180,
    playerY: 340,
    aiX: 180,
    aiY: 60,
    paddleRadius: 22
  });

  const startGame = () => {
    state.current.puckX = 180;
    state.current.puckY = 200;
    state.current.puckVx = (Math.random() > 0.5 ? 1 : -1) * 3.5;
    state.current.puckVy = (Math.random() > 0.5 ? 1 : -1) * 3.5;
    state.current.playerX = 180;
    state.current.playerY = 340;
    state.current.aiX = 180;
    state.current.aiY = 60;
    setPlayerScore(0);
    setAiScore(0);
    setWinner(null);
    setIsPlaying(true);
    playPop();
  };

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    state.current.playerX = Math.max(30, Math.min(canvas.width - 30, x));
    state.current.playerY = Math.max(220, Math.min(canvas.height - 30, y));
  };

  useEffect(() => {
    if (!isPlaying) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const update = () => {
      const s = state.current;

      // Move Puck
      s.puckX += s.puckVx;
      s.puckY += s.puckVy;

      // AI Paddle Movement
      const targetAiX = s.puckX;
      s.aiX += (targetAiX - s.aiX) * 0.08;
      s.aiX = Math.max(30, Math.min(canvas.width - 30, s.aiX));

      // Wall Bounces
      if (s.puckX - s.puckRadius < 15 || s.puckX + s.puckRadius > canvas.width - 15) {
        s.puckVx = -s.puckVx;
        playPop(480);
      }

      // Player Collision
      const pDist = Math.hypot(s.puckX - s.playerX, s.puckY - s.playerY);
      if (pDist < s.puckRadius + s.paddleRadius) {
        s.puckVy = -Math.abs(s.puckVy);
        s.puckVx = (s.puckX - s.playerX) * 0.25;
        playPop(700);
      }

      // AI Collision
      const aiDist = Math.hypot(s.puckX - s.aiX, s.puckY - s.aiY);
      if (aiDist < s.puckRadius + s.paddleRadius) {
        s.puckVy = Math.abs(s.puckVy);
        s.puckVx = (s.puckX - s.aiX) * 0.25;
        playPop(600);
      }

      // Goal Top (Player Scores)
      if (s.puckY - s.puckRadius < 10) {
        if (s.puckX > 110 && s.puckX < 250) {
          playCelebrationTune();
          setPlayerScore(p => {
            const next = p + 1;
            if (next >= 5) {
              setWinner('player');
              setIsPlaying(false);
              confetti({ particleCount: 100, spread: 80 });
            }
            return next;
          });
          s.puckX = 180;
          s.puckY = 200;
          s.puckVy = 3.5;
        } else {
          s.puckVy = -s.puckVy;
        }
      }

      // Goal Bottom (AI Scores)
      if (s.puckY + s.puckRadius > canvas.height - 10) {
        if (s.puckX > 110 && s.puckX < 250) {
          playLaserBeam(250);
          setAiScore(a => {
            const next = a + 1;
            if (next >= 5) {
              setWinner('ai');
              setIsPlaying(false);
            }
            return next;
          });
          s.puckX = 180;
          s.puckY = 200;
          s.puckVy = -3.5;
        } else {
          s.puckVy = -s.puckVy;
        }
      }

      // Draw Air Hockey Table
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Table Rink
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 4;
      ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

      // Center Line
      ctx.beginPath();
      ctx.moveTo(10, canvas.height / 2);
      ctx.lineTo(canvas.width - 10, canvas.height / 2);
      ctx.strokeStyle = '#f43f5e';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Center Circle
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, 45, 0, Math.PI * 2);
      ctx.strokeStyle = '#38bdf8';
      ctx.stroke();

      // Top Goal
      ctx.fillStyle = '#f43f5e';
      ctx.fillRect(110, 8, 140, 6);

      // Bottom Goal
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(110, canvas.height - 14, 140, 6);

      // Draw AI Paddle
      ctx.beginPath();
      ctx.arc(s.aiX, s.aiY, s.paddleRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#f43f5e';
      ctx.shadowBlur = 12;
      ctx.shadowColor = '#f43f5e';
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw Player Paddle
      ctx.beginPath();
      ctx.arc(s.playerX, s.playerY, s.paddleRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#38bdf8';
      ctx.shadowBlur = 12;
      ctx.shadowColor = '#38bdf8';
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw Puck
      ctx.beginPath();
      ctx.arc(s.puckX, s.puckY, s.puckRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#fbbf24';
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#fbbf24';
      ctx.fill();
      ctx.shadowBlur = 0;

      if (isPlaying && !winner) {
        animRef.current = requestAnimationFrame(update);
      }
    };

    animRef.current = requestAnimationFrame(update);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isPlaying, winner]);

  return (
    <div className="bg-slate-900/80 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-6 shadow-2xl max-w-xl mx-auto text-center">
      <div className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-3">
        Neon Arcade Air Hockey
      </div>
      <h2 className="text-3xl font-extrabold text-white mb-2">Birthday Air Hockey 🏓</h2>
      <p className="text-slate-300 text-xs mb-4">
        Deflect the glowing puck, score 5 goals against the AI opponent, and win the air hockey cup!
      </p>

      {/* Scoreboard */}
      <div className="flex justify-between items-center bg-slate-800/80 px-6 py-2.5 rounded-2xl mb-4 border border-slate-700 font-mono text-sm">
        <span className="text-rose-400 font-bold">AI Rival: {aiScore}</span>
        <span className="text-amber-300 font-bold">First to 5 Goals</span>
        <span className="text-cyan-400 font-bold">You: {playerScore}</span>
      </div>

      {/* Table Canvas */}
      <div className="relative w-[360px] h-[400px] mx-auto rounded-2xl overflow-hidden border-2 border-slate-700 bg-slate-950 mb-4 touch-none select-none">
        <canvas
          ref={canvasRef}
          width={360}
          height={400}
          onMouseMove={handleMouseMove}
          onTouchMove={handleMouseMove}
          className="w-full h-full block cursor-none"
        />

        {!isPlaying && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/90 p-4">
            {winner === 'player' ? (
              <>
                <h3 className="text-2xl font-black text-amber-300 mb-1">🏆 You Won the Match!</h3>
                <p className="text-xs text-slate-300 mb-4">Final Score: {playerScore} - {aiScore}</p>
              </>
            ) : winner === 'ai' ? (
              <>
                <h3 className="text-2xl font-black text-rose-400 mb-1">AI Won This Round!</h3>
                <p className="text-xs text-slate-300 mb-4">Final Score: {playerScore} - {aiScore}</p>
              </>
            ) : (
              <>
                <div className="text-4xl mb-2">🏓 ⚡ 🏒</div>
                <h3 className="text-lg font-bold text-white mb-1">Ready for Face-Off?</h3>
                <p className="text-xs text-slate-400 mb-4">Control your paddle with mouse or touch.</p>
              </>
            )}
            <button
              onClick={startGame}
              className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 rounded-xl font-bold text-xs shadow-lg hover:scale-105 transition-all"
            >
              {winner ? '🔄 Play Again' : '▶️ Start Match'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

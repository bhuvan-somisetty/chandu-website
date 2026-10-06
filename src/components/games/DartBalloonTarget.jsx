import React, { useRef, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { playPop, playLaserBeam, playCelebrationTune } from '../../utils/audioSynth';

export default function DartBalloonTarget() {
  const canvasRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [dartsLeft, setDartsLeft] = useState(10);
  const [gameOver, setGameOver] = useState(false);
  const animRef = useRef(null);
  const balloonsRef = useRef([]);

  const colors = ['#f43f5e', '#ec4899', '#a855f7', '#38bdf8', '#fbbf24', '#34d399'];

  const startGame = () => {
    balloonsRef.current = [];
    setScore(0);
    setDartsLeft(10);
    setGameOver(false);
    setIsPlaying(true);
    playPop();
  };

  const handleShoot = (e) => {
    if (!isPlaying || dartsLeft <= 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const clickX = (e.clientX - rect.left) * scaleX;
    const clickY = (e.clientY - rect.top) * scaleY;

    playLaserBeam(900);

    let hit = false;
    balloonsRef.current = balloonsRef.current.filter(b => {
      const dist = Math.hypot(b.x - clickX, b.y - clickY);
      if (dist < b.radius && !hit) {
        hit = true;
        setScore(s => s + b.points);
        playPop(650);
        return false;
      }
      return true;
    });

    const nextDarts = dartsLeft - 1;
    setDartsLeft(nextDarts);

    if (nextDarts <= 0) {
      setGameOver(true);
      setIsPlaying(false);
      playCelebrationTune();
      confetti({ particleCount: 100, spread: 70 });
    }
  };

  useEffect(() => {
    if (!isPlaying) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let frame = 0;
    const loop = () => {
      frame++;

      // Spawn balloons
      if (frame % 35 === 0 && balloonsRef.current.length < 8) {
        balloonsRef.current.push({
          x: Math.random() * (canvas.width - 60) + 30,
          y: canvas.height + 30,
          vy: Math.random() * 1.5 + 1.2,
          radius: Math.random() * 10 + 18,
          color: colors[Math.floor(Math.random() * colors.length)],
          points: Math.floor(Math.random() * 30 + 20)
        });
      }

      // Update positions
      balloonsRef.current.forEach(b => {
        b.y -= b.vy;
      });

      // Filter off-screen
      balloonsRef.current = balloonsRef.current.filter(b => b.y > -50);

      // Render
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Balloons
      balloonsRef.current.forEach(b => {
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = b.color;
        ctx.shadowBlur = 12;
        ctx.shadowColor = b.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        // String
        ctx.beginPath();
        ctx.moveTo(b.x, b.y + b.radius);
        ctx.lineTo(b.x, b.y + b.radius + 15);
        ctx.strokeStyle = '#ffffff66';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Points Text
        ctx.font = '10px monospace';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.fillText(`+${b.points}`, b.x, b.y + 3);
      });

      if (isPlaying && !gameOver) {
        animRef.current = requestAnimationFrame(loop);
      }
    };

    animRef.current = requestAnimationFrame(loop);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isPlaying, gameOver]);

  return (
    <div className="bg-slate-900/80 backdrop-blur-xl border border-rose-500/20 rounded-3xl p-6 shadow-2xl max-w-xl mx-auto text-center">
      <div className="inline-block px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 font-mono text-xs uppercase tracking-widest mb-3">
        Carnival Target Gallery
      </div>
      <h2 className="text-3xl font-extrabold text-white mb-2">Balloon Dart Target 🎯</h2>
      <p className="text-slate-300 text-xs mb-4">
        Throw darts at rising balloons, score bullseyes, and win high-score carnival tickets!
      </p>

      {/* HUD */}
      <div className="flex justify-between items-center bg-slate-800/80 px-6 py-2.5 rounded-2xl mb-4 border border-slate-700 font-mono text-sm">
        <span className="text-rose-400 font-bold">🎯 Darts: {dartsLeft}</span>
        <span className="text-amber-300 font-bold">⭐ Score: {score} PTS</span>
      </div>

      {/* Canvas */}
      <div className="relative w-[360px] h-[340px] mx-auto rounded-2xl overflow-hidden border-2 border-slate-700 bg-slate-950 mb-4 cursor-crosshair select-none">
        <canvas
          ref={canvasRef}
          width={360}
          height={340}
          onClick={handleShoot}
          className="w-full h-full block"
        />

        {!isPlaying && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/90 p-4">
            {gameOver ? (
              <>
                <h3 className="text-2xl font-black text-amber-300 mb-1">🎉 Carnival Round Complete!</h3>
                <p className="text-xs text-slate-300 mb-4">Final Score: <strong className="text-amber-400">{score} PTS</strong></p>
              </>
            ) : (
              <>
                <div className="text-4xl mb-2">🎯 🎈 🎪</div>
                <h3 className="text-lg font-bold text-white mb-1">Ready to Throw Darts?</h3>
                <p className="text-xs text-slate-400 mb-4">Tap on rising balloons to throw darts.</p>
              </>
            )}
            <button
              onClick={startGame}
              className="px-6 py-2.5 bg-gradient-to-r from-rose-500 to-amber-500 text-slate-950 rounded-xl font-bold text-xs shadow-lg hover:scale-105 transition-all"
            >
              {gameOver ? '🔄 Play Again' : '🎯 Start Carnival Round'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useRef, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { playPop, playCelebrationTune } from '../../utils/audioSynth';

export default function CupcakeTowerStacker() {
  const canvasRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const animRef = useRef(null);

  const state = useRef({
    swingX: 180,
    swingVx: 3.5,
    stackedCupcakes: [],
    currentY: 280
  });

  const startGame = () => {
    state.current.stackedCupcakes = [{ x: 140, w: 80, icon: '🧁' }];
    state.current.currentY = 245;
    state.current.swingX = 50;
    state.current.swingVx = 3.5;
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
    playPop();
  };

  const dropCupcake = () => {
    if (!isPlaying || gameOver) return;
    const s = state.current;
    const lastCupcake = s.stackedCupcakes[s.stackedCupcakes.length - 1];

    const droppedW = 75;
    const droppedX = s.swingX - droppedW / 2;

    // Check overlap with last cupcake
    const overlap = Math.min(droppedX + droppedW, lastCupcake.x + lastCupcake.w) - Math.max(droppedX, lastCupcake.x);

    if (overlap > 15) {
      // Successful stack
      s.stackedCupcakes.push({ x: droppedX, w: droppedW, icon: '🧁' });
      s.currentY -= 32;
      setScore(sc => {
        const next = sc + 1;
        if (next === 10) {
          playCelebrationTune();
          confetti({ particleCount: 100, spread: 70 });
        }
        return next;
      });
      playPop(500 + s.stackedCupcakes.length * 30);

      // Scroll tower down if it gets too high
      if (s.currentY < 90) {
        s.stackedCupcakes.forEach(c => { c.yShift = (c.yShift || 0) + 32; });
        s.currentY += 32;
      }
    } else {
      // Missed / Toppled
      setGameOver(true);
      setIsPlaying(false);
      playPop(200);
    }
  };

  useEffect(() => {
    if (!isPlaying) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const update = () => {
      const s = state.current;

      // Move swinging cupcake
      s.swingX += s.swingVx;
      if (s.swingX > canvas.width - 40 || s.swingX < 40) {
        s.swingVx = -s.swingVx;
      }

      // Draw loop
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Base Plate
      ctx.fillStyle = '#e2e8f0';
      ctx.fillRect(100, 290, 160, 10);

      // Draw Stacked Cupcakes
      s.stackedCupcakes.forEach((c, idx) => {
        const y = 280 - idx * 30 + (c.yShift || 0);
        ctx.font = '28px serif';
        ctx.textAlign = 'center';
        ctx.fillText(c.icon, c.x + c.w / 2, y);
      });

      // Draw Swinging Cupcake
      ctx.font = '28px serif';
      ctx.textAlign = 'center';
      ctx.fillText('🧁', s.swingX, 40);

      // Swing string
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, 0);
      ctx.lineTo(s.swingX, 20);
      ctx.strokeStyle = '#ffffff44';
      ctx.lineWidth = 2;
      ctx.stroke();

      if (isPlaying && !gameOver) {
        animRef.current = requestAnimationFrame(update);
      }
    };

    animRef.current = requestAnimationFrame(update);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isPlaying, gameOver]);

  return (
    <div className="bg-slate-900/80 backdrop-blur-xl border border-pink-500/20 rounded-3xl p-6 shadow-2xl max-w-xl mx-auto text-center">
      <div className="inline-block px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 font-mono text-xs uppercase tracking-widest mb-3">
        Physics Tower Stacker
      </div>
      <h2 className="text-3xl font-extrabold text-white mb-2">Cupcake Tower Stacker 🧁</h2>
      <p className="text-slate-300 text-xs mb-4">
        Time your taps to stack delicious cupcakes as high as the stars without toppling over!
      </p>

      {/* Score */}
      <div className="flex justify-between items-center bg-slate-800/80 px-6 py-2.5 rounded-2xl mb-4 border border-slate-700 font-mono text-sm">
        <span className="text-pink-400 font-bold">🧁 Tier: {score}</span>
        <span className="text-amber-300 font-bold">High Tower Target: 10</span>
      </div>

      {/* Canvas */}
      <div className="relative w-[360px] h-[340px] mx-auto rounded-2xl overflow-hidden border-2 border-slate-700 bg-slate-950 mb-4 select-none touch-none">
        <canvas
          ref={canvasRef}
          width={360}
          height={340}
          onClick={dropCupcake}
          className="w-full h-full block cursor-pointer"
        />

        {!isPlaying && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/90 p-4">
            {gameOver ? (
              <>
                <h3 className="text-2xl font-black text-rose-400 mb-1">Tower Toppled!</h3>
                <p className="text-xs text-slate-300 mb-4">Final Tower Height: <strong className="text-pink-400">{score} Cupcakes</strong></p>
              </>
            ) : (
              <>
                <div className="text-4xl mb-2">🧁 🎂 ✨</div>
                <h3 className="text-lg font-bold text-white mb-1">Ready to Stack?</h3>
                <p className="text-xs text-slate-400 mb-4">Tap anywhere on the stage to drop swinging cupcakes.</p>
              </>
            )}
            <button
              onClick={startGame}
              className="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-bold text-xs shadow-lg hover:scale-105 transition-all"
            >
              {gameOver ? '🔄 Try Again' : '▶️ Start Stacking'}
            </button>
          </div>
        )}
      </div>

      {isPlaying && (
        <button
          onClick={dropCupcake}
          className="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-bold text-xs shadow-lg active:scale-95 transition-all"
        >
          ⬇️ DROP CUPCAKE NOW!
        </button>
      )}
    </div>
  );
}

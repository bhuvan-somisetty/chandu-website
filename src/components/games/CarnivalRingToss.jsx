import React, { useRef, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { playPop, playCelebrationTune } from '../../utils/audioSynth';

const BOTTLES = [
  { id: 1, x: 80, y: 110, pts: 30, color: '#f43f5e', label: 'Cherry' },
  { id: 2, x: 200, y: 90, pts: 50, color: '#eab308', label: 'Gold Star' },
  { id: 3, x: 320, y: 110, pts: 30, color: '#06b6d4', label: 'Blueberry' },
  { id: 4, x: 140, y: 180, pts: 20, color: '#a855f7', label: 'Grape' },
  { id: 5, x: 260, y: 180, pts: 20, color: '#10b981', label: 'Lime' },
];

export default function CarnivalRingToss() {
  const [ringsLeft, setRingsLeft] = useState(5);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [power, setPower] = useState(50);
  const [angle, setAngle] = useState(0); // -30 to 30
  const [tossedRing, setTossedRing] = useState(null);
  const [message, setMessage] = useState('Aim and toss your rings!');
  const [gameOver, setGameOver] = useState(false);

  const resetGame = () => {
    setRingsLeft(5);
    setScore(0);
    setStreak(0);
    setTossedRing(null);
    setMessage('Aim and toss your rings!');
    setGameOver(false);
    playPop(440);
  };

  const tossRing = () => {
    if (ringsLeft <= 0 || tossedRing) return;

    setRingsLeft((r) => r - 1);
    playPop(600);

    // Target landing point based on angle & power
    const targetX = 200 + angle * 4.5 + (Math.random() * 20 - 10);
    const targetY = 240 - (power / 100) * 150 + (Math.random() * 20 - 10);

    setTossedRing({
      x: 200,
      y: 290,
      scale: 1.5,
      opacity: 1,
      targetX,
      targetY,
    });

    // Simulate toss flight
    setTimeout(() => {
      // Check hit against bottles
      let hitBottle = null;
      for (const b of BOTTLES) {
        const dist = Math.hypot(b.x - targetX, b.y - targetY);
        if (dist < 32) {
          hitBottle = b;
          break;
        }
      }

      if (hitBottle) {
        const gained = hitBottle.pts * (streak + 1);
        setScore((s) => s + gained);
        setStreak((st) => st + 1);
        setMessage(`RINGER! Hit ${hitBottle.label} for +${gained} pts! 🎉`);
        playCelebrationTune();
        confetti({ particleCount: 70, spread: 60 });
      } else {
        setStreak(0);
        setMessage('Close miss! Adjust angle & power. 🎯');
        playPop(200);
      }

      setTimeout(() => {
        setTossedRing(null);
        if (ringsLeft - 1 <= 0) {
          setGameOver(true);
        }
      }, 700);
    }, 450);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl text-white max-w-lg mx-auto">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-black bg-gradient-to-r from-amber-400 to-rose-400 bg-clip-text text-transparent">
            Carnival Ring Toss 🎯
          </h2>
          <p className="text-xs text-slate-400">Ring the celebration soda bottles</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-mono font-bold text-amber-400">{score}</div>
          <div className="text-xs text-slate-400">Rings: {'⭕'.repeat(ringsLeft)}</div>
        </div>
      </div>

      {/* Carnival Booth Board */}
      <div className="relative h-80 bg-gradient-to-b from-indigo-950 via-slate-900 to-amber-950/40 rounded-2xl border-2 border-amber-600/30 overflow-hidden shadow-inner mb-4 select-none">
        {/* Striped Awning Top */}
        <div className="absolute top-0 left-0 right-0 h-6 bg-[repeating-linear-gradient(45deg,#f43f5e,#f43f5e_12px,#fff_12px,#fff_24px)] opacity-90 shadow-md" />

        {/* Bottles */}
        {BOTTLES.map((b) => (
          <div
            key={b.id}
            style={{ left: `${b.x}px`, top: `${b.y}px` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
          >
            <div
              style={{ backgroundColor: b.color }}
              className="w-7 h-16 rounded-t-full rounded-b-lg border-2 border-white/60 shadow-lg flex items-center justify-center font-black text-xs text-slate-950"
            >
              {b.pts}
            </div>
            <div className="w-10 h-2 bg-black/40 rounded-full blur-[1px] mt-1" />
          </div>
        ))}

        {/* Tossed Ring */}
        {tossedRing && (
          <div
            style={{
              left: `${tossedRing.targetX}px`,
              top: `${tossedRing.targetY}px`,
              transition: 'all 0.45s cubic-bezier(0.2, 0.8, 0.2, 1)',
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-4 border-amber-400 shadow-[0_0_12px_#fbbf24] pointer-events-none"
          />
        )}

        {/* Trajectory Guide */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none opacity-40">
          <div className="text-xs font-mono text-amber-200">Angle: {angle}° | Power: {power}%</div>
        </div>
      </div>

      <div className="text-center text-xs font-bold text-amber-300 mb-4 h-4">
        {message}
      </div>

      {/* Controls */}
      {!gameOver ? (
        <div className="space-y-3 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 w-16">Aim Angle:</span>
            <input
              type="range"
              min={-25}
              max={25}
              value={angle}
              onChange={(e) => setAngle(Number(e.target.value))}
              className="w-full accent-amber-400"
            />
            <span className="text-xs font-mono w-8 text-right">{angle}°</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 w-16">Throw Power:</span>
            <input
              type="range"
              min={20}
              max={100}
              value={power}
              onChange={(e) => setPower(Number(e.target.value))}
              className="w-full accent-rose-400"
            />
            <span className="text-xs font-mono w-8 text-right">{power}%</span>
          </div>

          <button
            onClick={tossRing}
            disabled={ringsLeft <= 0 || tossedRing}
            className="w-full py-3 bg-gradient-to-r from-amber-400 to-rose-500 hover:from-amber-500 hover:to-rose-600 active:scale-98 text-slate-950 font-black rounded-xl shadow-lg transition"
          >
            Toss Ring ⭕
          </button>
        </div>
      ) : (
        <div className="text-center bg-slate-950/80 p-5 rounded-2xl border border-slate-800">
          <h3 className="text-lg font-bold text-white mb-1">Game Over! Final Score: {score}</h3>
          <p className="text-xs text-slate-400 mb-4">Thanks for playing the carnival ring toss!</p>
          <button
            onClick={resetGame}
            className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold px-6 py-2.5 rounded-xl text-xs transition"
          >
            Play Again 🔄
          </button>
        </div>
      )}
    </div>
  );
}

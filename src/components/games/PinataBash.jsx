import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { playPop, playCelebrationTune } from '../../utils/audioSynth';

export default function PinataBash() {
  const [hits, setHits] = useState(0);
  const [candies, setCandies] = useState([]);
  const [broken, setBroken] = useState(false);
  const maxHits = 15;

  const hitPinata = () => {
    if (broken) return;
    const nextHits = hits + 1;
    setHits(nextHits);
    playPop(400 + nextHits * 30);

    // Spawn falling candies
    const candyIcons = ['🍬', '🍭', '🍫', '✨', '🧁', '⭐'];
    const newCandies = Array.from({ length: 4 }).map((_, i) => ({
      id: Date.now() + i,
      icon: candyIcons[Math.floor(Math.random() * candyIcons.length)],
      left: Math.random() * 80 + 10,
      animDelay: Math.random() * 0.2
    }));
    setCandies(prev => [...newCandies, ...prev].slice(0, 20));

    if (nextHits >= maxHits) {
      setBroken(true);
      playCelebrationTune();
      confetti({ particleCount: 150, spread: 90, origin: { y: 0.4 } });
    }
  };

  const resetPinata = () => {
    setHits(0);
    setCandies([]);
    setBroken(false);
    playPop(300);
  };

  const crackPercent = Math.min(100, Math.round((hits / maxHits) * 100));

  return (
    <div className="bg-slate-900/80 backdrop-blur-xl border border-pink-500/20 rounded-3xl p-6 shadow-2xl max-w-xl mx-auto text-center">
      <div className="inline-block px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 font-mono text-xs uppercase tracking-widest mb-3">
        Arcade Party Bash
      </div>
      <h2 className="text-3xl font-extrabold text-white mb-2">Birthday Pinata Bash 🪅</h2>
      <p className="text-slate-300 text-xs mb-4">
        Tap the swinging rainbow pinata rapidly to break it open and release a torrent of sweet birthday treats!
      </p>

      {/* Progress Meter */}
      <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700/60 mb-6 flex justify-between items-center">
        <span className="text-xs font-mono text-slate-300">Hits: {hits} / {maxHits}</span>
        <div className="w-48 bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-700">
          <div
            className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-amber-400 transition-all duration-200"
            style={{ width: `${crackPercent}%` }}
          />
        </div>
        <span className="text-xs font-bold text-amber-300 font-mono">{crackPercent}%</span>
      </div>

      {/* Pinata Arena */}
      <div className="relative w-full h-64 bg-slate-950/70 border border-slate-800 rounded-3xl overflow-hidden flex flex-col items-center justify-start p-4 mb-4 select-none">
        {/* Rope */}
        <div className="w-1 h-12 bg-amber-700 border-dashed border-l border-amber-500" />

        {/* Pinata Target */}
        <div
          onClick={hitPinata}
          className={`cursor-pointer transition-transform transform active:scale-90 duration-150 ${
            broken ? 'scale-125 opacity-30 animate-pulse' : 'hover:scale-105 animate-bounce'
          }`}
          style={{ animationDuration: `${Math.max(0.4, 1.2 - hits * 0.05)}s` }}
        >
          <div className="text-7xl filter drop-shadow-[0_10px_20px_rgba(244,63,94,0.4)]">
            {broken ? '💥' : '🪅'}
          </div>
        </div>

        {/* Falling Candies */}
        {candies.map(c => (
          <div
            key={c.id}
            className="absolute text-xl pointer-events-none animate-fade-in"
            style={{
              left: `${c.left}%`,
              top: '75%',
              transition: 'all 0.5s ease-out'
            }}
          >
            {c.icon}
          </div>
        ))}

        {broken && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-sm z-10 animate-fade-in">
            <span className="text-3xl mb-1">🎉 🍬 🍭</span>
            <h3 className="text-2xl font-black text-amber-300 mb-2">PINATA SMASHED!</h3>
            <p className="text-xs text-slate-300 mb-4">You unleashed a mountain of birthday candy!</p>
            <button
              onClick={resetPinata}
              className="px-5 py-2 bg-gradient-to-r from-pink-500 to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg hover:scale-105 transition-all"
            >
              🔄 Hang New Pinata
            </button>
          </div>
        )}
      </div>

      {!broken && (
        <button
          onClick={hitPinata}
          className="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-bold text-xs shadow-lg hover:scale-105 active:scale-95 transition-all"
        >
          🏏 Swing Bat & Hit!
        </button>
      )}
    </div>
  );
}

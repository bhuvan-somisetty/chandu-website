import React, { useState, useEffect } from 'react';
import { playKick, playSnare, playHiHat, playPop, playAirHorn } from '../utils/audioSynth';

export default function InteractiveDrumKit() {
  const [activePad, setActivePad] = useState(null);

  const pads = [
    { id: 'kick', label: 'Bass Kick 🥁', key: 'A', action: playKick, color: 'from-red-500 to-rose-600' },
    { id: 'snare', label: 'Snare Drum 💥', key: 'S', action: playSnare, color: 'from-amber-500 to-orange-600' },
    { id: 'hihat', label: 'Hi-Hat Cymbal 🪙', key: 'D', action: playHiHat, color: 'from-yellow-400 to-amber-500' },
    { id: 'tom1', label: 'High Tom 🪘', key: 'F', action: () => playPop(400), color: 'from-emerald-500 to-teal-600' },
    { id: 'tom2', label: 'Mid Tom 🪘', key: 'J', action: () => playPop(300), color: 'from-cyan-500 to-blue-600' },
    { id: 'tom3', label: 'Floor Tom 🪘', key: 'K', action: () => playPop(220), color: 'from-indigo-500 to-purple-600' },
    { id: 'crash', label: 'Crash Cymbal 🔔', key: 'L', action: () => playPop(900), color: 'from-purple-500 to-pink-600' },
    { id: 'airhorn', label: 'Party Horn 📢', key: 'Space', action: playAirHorn, color: 'from-pink-500 to-rose-600' }
  ];

  const triggerPad = (pad) => {
    pad.action();
    setActivePad(pad.id);
    setTimeout(() => setActivePad(null), 180);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const keyUpper = e.key === ' ' ? 'Space' : e.key.toUpperCase();
      const matched = pads.find(p => p.key.toUpperCase() === keyUpper);
      if (matched) {
        triggerPad(matched);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="bg-slate-900/80 backdrop-blur-xl border border-yellow-500/20 rounded-3xl p-6 shadow-2xl max-w-3xl mx-auto text-center">
      <div className="inline-block px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 font-mono text-xs uppercase tracking-widest mb-3">
        Percussion Drum Machine
      </div>
      <h2 className="text-3xl font-extrabold text-white mb-2">Party Drum Kit 🥁</h2>
      <p className="text-slate-300 text-xs mb-6">
        Tap the drum pads or press keyboard keys (A, S, D, F, J, K, L, Space) to lay down live party grooves!
      </p>

      {/* Pads Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-6">
        {pads.map((p) => {
          const isActive = activePad === p.id;
          return (
            <button
              key={p.id}
              onClick={() => triggerPad(p)}
              className={`h-32 rounded-2xl border-2 flex flex-col items-center justify-center p-3 transition-all duration-100 transform active:scale-90 ${
                isActive
                  ? 'bg-white border-white scale-95 shadow-[0_0_25px_#ffffff]'
                  : `bg-gradient-to-br ${p.color} border-white/20 hover:scale-105 shadow-lg`
              }`}
            >
              <span className={`text-sm font-black ${isActive ? 'text-slate-950' : 'text-white'} mb-1`}>
                {p.label}
              </span>
              <span className={`text-[11px] font-mono px-2 py-0.5 rounded-lg ${isActive ? 'bg-slate-900 text-white' : 'bg-black/40 text-yellow-300'}`}>
                Key [{p.key}]
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

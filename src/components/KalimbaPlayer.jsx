import React, { useState } from 'react';
import { playChime, playPop } from '../utils/audioSynth';

export default function KalimbaPlayer() {
  const [activeTine, setActiveTine] = useState(null);

  const tines = [
    { note: 'D4', freq: 293.66, label: '1', key: '1' },
    { note: 'B3', freq: 246.94, label: '2', key: '2' },
    { note: 'G3', freq: 196.00, label: '3', key: '3' },
    { note: 'E3', freq: 164.81, label: '4', key: '4' },
    { note: 'C3', freq: 130.81, label: '5', key: '5' },
    { note: 'D3', freq: 146.83, label: '6', key: '6' },
    { note: 'F3', freq: 174.61, label: '7', key: '7' },
    { note: 'A3', freq: 220.00, label: '8', key: '8' },
    { note: 'C4', freq: 261.63, label: '9', key: '9' }
  ];

  const pluckTine = (tine, index) => {
    playChime(tine.freq * 2);
    setActiveTine(index);
    setTimeout(() => setActiveTine(null), 200);
  };

  return (
    <div className="bg-slate-900/80 backdrop-blur-xl border border-amber-500/20 rounded-3xl p-6 shadow-2xl max-w-xl mx-auto text-center">
      <div className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs uppercase tracking-widest mb-3">
        Acoustic Thumb Piano
      </div>
      <h2 className="text-3xl font-extrabold text-white mb-2">Crystal Kalimba 🎶</h2>
      <p className="text-slate-300 text-xs mb-6">
        Pluck the authentic steel tines for gentle, therapeutic music box lullabies.
      </p>

      {/* Kalimba Body */}
      <div className="relative w-80 h-72 mx-auto bg-gradient-to-b from-amber-900 via-amber-800 to-amber-950 rounded-3xl border-4 border-amber-700/60 shadow-2xl p-6 flex flex-col items-center justify-between">
        {/* Soundhole */}
        <div className="w-16 h-16 rounded-full bg-amber-950 border-4 border-amber-800/80 shadow-inner flex items-center justify-center">
          <span className="text-xs text-amber-600/60 font-serif">★</span>
        </div>

        {/* Metal Bridge */}
        <div className="w-64 h-3 bg-slate-300 rounded-full shadow-md -mb-2 border border-slate-400" />

        {/* Tines */}
        <div className="flex justify-center items-start gap-1 w-full z-10">
          {tines.map((t, idx) => {
            const height = 90 + Math.abs(idx - 4) * 8;
            const isPlucked = activeTine === idx;
            return (
              <div
                key={t.note}
                onClick={() => pluckTine(t, idx)}
                className={`flex-1 rounded-b-xl cursor-pointer transition-all duration-100 flex flex-col justify-end items-center pb-2 select-none ${
                  isPlucked
                    ? 'bg-gradient-to-b from-amber-200 to-white shadow-[0_0_15px_#fde68a] scale-y-105'
                    : 'bg-gradient-to-b from-slate-300 via-slate-100 to-slate-400 hover:from-white hover:to-slate-300 shadow-md'
                }`}
                style={{ height: `${height}px` }}
              >
                <span className="text-[10px] font-mono font-black text-slate-800">{t.label}</span>
                <span className="text-[8px] font-mono text-slate-600">{t.note}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

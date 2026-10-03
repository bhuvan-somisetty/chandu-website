import React, { useState, useEffect, useRef } from 'react';
import { playChime } from '../utils/audioSynth';
import { useAchievements } from '../context/AchievementContext';

export default function ChimeHarp() {
  const strings = [
    { note: 'C4', freq: 261.63, color: 'from-rose-500 to-pink-500' },
    { note: 'D4', freq: 293.66, color: 'from-orange-500 to-amber-500' },
    { note: 'E4', freq: 329.63, color: 'from-yellow-400 to-amber-300' },
    { note: 'F4', freq: 349.23, color: 'from-emerald-400 to-teal-500' },
    { note: 'G4', freq: 392.00, color: 'from-cyan-400 to-blue-500' },
    { note: 'A4', freq: 440.00, color: 'from-indigo-400 to-purple-500' },
    { note: 'B4', freq: 493.88, color: 'from-purple-500 to-pink-500' },
    { note: 'C5', freq: 523.25, color: 'from-pink-400 to-rose-400' },
    { note: 'D5', freq: 587.33, color: 'from-rose-400 to-amber-400' },
    { note: 'E5', freq: 659.25, color: 'from-amber-300 to-emerald-400' }
  ];

  const [activeString, setActiveString] = useState(null);
  const [arpeggioActive, setArpeggioActive] = useState(false);
  const [tempo, setTempo] = useState(160);
  const intervalRef = useRef(null);
  const { unlockAchievement } = useAchievements();

  const pluckString = (index) => {
    const s = strings[index];
    playChime(s.freq);
    setActiveString(index);
    setTimeout(() => {
      setActiveString(null);
    }, 300);
  };

  const toggleArpeggio = () => {
    if (arpeggioActive) {
      clearInterval(intervalRef.current);
      setArpeggioActive(false);
    } else {
      setArpeggioActive(true);
      let step = 0;
      let ascending = true;
      unlockAchievement && unlockAchievement('harp_virtuoso');
      intervalRef.current = setInterval(() => {
        pluckString(step);
        if (ascending) {
          step++;
          if (step >= strings.length - 1) ascending = false;
        } else {
          step--;
          if (step <= 0) ascending = true;
        }
      }, 60000 / tempo);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="bg-slate-900/80 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-6 shadow-2xl max-w-3xl mx-auto text-center">
      <div className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-3">
        Celestial Melody Instrument
      </div>
      <h2 className="text-3xl font-extrabold text-white mb-2">Chime Harp & Arpeggiator 🎵</h2>
      <p className="text-slate-300 text-xs mb-6">
        Hover or tap strings to pluck harmonic crystal frequencies. Enable the arpeggiator for an automated celestial lullaby.
      </p>

      {/* Harp Instrument Frame */}
      <div className="relative bg-slate-950/70 border border-slate-800 rounded-3xl p-6 mb-6 shadow-2xl flex items-end justify-center gap-3 h-72">
        {strings.map((s, idx) => {
          const heightPercent = 40 + (idx * 6);
          const isPlucked = activeString === idx;
          return (
            <div
              key={s.note}
              onMouseEnter={() => pluckString(idx)}
              onClick={() => pluckString(idx)}
              className="flex-1 h-full flex flex-col items-center justify-end group cursor-pointer"
            >
              <span className="text-[10px] font-mono text-slate-400 mb-1 group-hover:text-cyan-300 transition-colors">
                {s.note}
              </span>
              <div
                className={`w-2 rounded-full transition-all duration-150 ${
                  isPlucked
                    ? 'bg-white shadow-[0_0_20px_#38bdf8] scale-y-105'
                    : `bg-gradient-to-t ${s.color} opacity-70 group-hover:opacity-100 group-hover:w-3`
                }`}
                style={{ height: `${heightPercent}%` }}
              ></div>
              <div className="w-4 h-2 bg-slate-800 rounded-full mt-2 group-hover:bg-cyan-500"></div>
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60">
        <button
          onClick={toggleArpeggio}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            arpeggioActive
              ? 'bg-rose-500 text-white shadow-lg animate-pulse'
              : 'bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950'
          }`}
        >
          {arpeggioActive ? '⏹️ Stop Arpeggiator' : '▶️ Play Celestial Arpeggio'}
        </button>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 font-mono">Tempo: {tempo} BPM</span>
          <input
            type="range"
            min="80"
            max="260"
            value={tempo}
            onChange={(e) => setTempo(Number(e.target.value))}
            className="w-28 accent-cyan-400 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

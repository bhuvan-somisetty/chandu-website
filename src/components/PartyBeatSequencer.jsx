import React, { useState, useEffect } from 'react';
import { Music, Play, Square, Sparkles } from 'lucide-react';
import { playKick, playSnare, playHiHat, playAirHorn } from '../utils/audioSynth';

export default function PartyBeatSequencer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [grid, setGrid] = useState([
    [true, false, false, false, true, false, false, false], // Kick
    [false, false, true, false, false, false, true, false], // Snare
    [true, true, true, true, true, true, true, true]        // Hi-Hat
  ]);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentStep(s => {
        const next = (s + 1) % 8;
        if (grid[0][next]) playKick();
        if (grid[1][next]) playSnare();
        if (grid[2][next]) playHiHat();
        return next;
      });
    }, 200);
    return () => clearInterval(interval);
  }, [isPlaying, grid]);

  const toggleCell = (row, col) => {
    setGrid(prev => {
      const updated = prev.map(r => [...r]);
      updated[row][col] = !updated[row][col];
      return updated;
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Music className="w-5 h-5 text-pink-400" /> 8-Step Party Beat Sequencer
        </h2>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
            isPlaying ? 'bg-rose-500 text-white' : 'bg-gradient-to-r from-pink-500 to-amber-400 text-slate-950'
          }`}
        >
          {isPlaying ? <Square className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          {isPlaying ? 'Stop' : 'Play Beat'}
        </button>
      </div>

      <div className="space-y-2 mb-4 bg-slate-950/60 p-4 rounded-2xl border border-white/10">
        {['🥁 Kick', '🪘 Snare', '🔔 Hat'].map((inst, rIdx) => (
          <div key={rIdx} className="flex items-center gap-2">
            <span className="w-16 text-xs font-bold text-white/70">{inst}</span>
            <div className="flex-1 grid grid-cols-8 gap-1.5">
              {grid[rIdx].map((active, cIdx) => (
                <button
                  key={cIdx}
                  onClick={() => toggleCell(rIdx, cIdx)}
                  className={`h-10 rounded-lg transition-all border ${
                    active
                      ? 'bg-amber-400 border-amber-300 shadow-md'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  } ${currentStep === cIdx && isPlaying ? 'ring-2 ring-pink-400' : ''}`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

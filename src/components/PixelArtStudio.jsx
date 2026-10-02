import React, { useState } from 'react';
import { Palette, RotateCcw, Download, Sparkles } from 'lucide-react';
import { playPop, playFanfare } from '../utils/audioSynth';
import { triggerPrideConfetti } from '../utils/particles';

const COLORS = ['#f43f5e', '#fbbf24', '#38bdf8', '#a855f7', '#34d399', '#ffffff', '#1e293b'];

export default function PixelArtStudio() {
  const [grid, setGrid] = useState(Array(64).fill('#1e293b'));
  const [activeColor, setActiveColor] = useState('#f43f5e');

  const handleCellClick = (idx) => {
    playPop();
    const newGrid = [...grid];
    newGrid[idx] = activeColor;
    setGrid(newGrid);
  };

  const handleClear = () => {
    setGrid(Array(64).fill('#1e293b'));
  };

  const handleSave = () => {
    playFanfare();
    triggerPrideConfetti();
    alert('Pixel Art Birthday Masterpiece Saved! ✨');
  };

  return (
    <div className="w-full max-w-xl mx-auto p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-white text-center">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Palette className="w-5 h-5 text-pink-400" /> Pixel Art Birthday Painter
        </h2>
        <button onClick={handleClear} className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold">
          Clear
        </button>
      </div>

      <div className="grid grid-cols-8 gap-1 max-w-[280px] mx-auto mb-4 bg-slate-950 p-2 rounded-2xl border border-white/10">
        {grid.map((c, idx) => (
          <button
            key={idx}
            onClick={() => handleCellClick(idx)}
            className="w-7 h-7 rounded-md transition-transform active:scale-90"
            style={{ backgroundColor: c }}
          />
        ))}
      </div>

      <div className="flex justify-center gap-2 mb-4">
        {COLORS.map((c) => (
          <button
            key={c}
            onClick={() => setActiveColor(c)}
            className={`w-6 h-6 rounded-full border-2 transition-transform ${
              activeColor === c ? 'border-white scale-125' : 'border-transparent'
            }`}
            style={{ backgroundColor: c }}
          />
        ))}
      </div>

      <button
        onClick={handleSave}
        className="px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-amber-400 text-slate-950 font-bold text-xs inline-flex items-center gap-1.5 shadow-lg"
      >
        <Download className="w-3.5 h-3.5" /> Save Pixel Art
      </button>
    </div>
  );
}

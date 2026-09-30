import React, { useState, useRef } from 'react';
import { Camera, Sparkles, Download, RefreshCw, Smile } from 'lucide-react';
import { playPop, playFanfare, playSparkle } from '../utils/audioSynth';
import { triggerPrideConfetti } from '../utils/particles';

const STICKERS = ['🥳', '👑', '🕶️', '🎂', '✨', '🎈', '⭐', '💖'];
const FILTERS = [
  { id: 'normal', name: 'Original', filter: 'none' },
  { id: 'vintage', name: 'Vintage 1989', filter: 'sepia(0.5) contrast(1.1) brightness(1.05)' },
  { id: 'neon', name: 'Cyber Neon', filter: 'hue-rotate(90deg) saturate(1.8)' },
  { id: 'warm', name: 'Golden Hour', filter: 'sepia(0.3) saturate(1.4) brightness(1.1)' }
];

export default function PhotoboothCamera() {
  const [selectedStickers, setSelectedStickers] = useState(['🥳', '👑']);
  const [activeFilter, setActiveFilter] = useState(FILTERS[0]);
  const [customCaption, setCustomCaption] = useState('Birthday Legend ✨');
  const cardRef = useRef(null);

  const addSticker = (s) => {
    playPop();
    if (selectedStickers.length < 5) {
      setSelectedStickers(prev => [...prev, s]);
    }
  };

  const clearStickers = () => {
    playSparkle();
    setSelectedStickers([]);
  };

  const handleDownload = () => {
    playFanfare();
    triggerPrideConfetti();
    alert('Photobooth Portrait Ready! Save or screenshot your birthday avatar card ✨');
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-white">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Camera className="w-6 h-6 text-pink-400" />
          <h2 className="text-2xl font-bold">Party Photobooth & Sticker Studio</h2>
        </div>
        <button
          onClick={clearStickers}
          className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all"
        >
          Clear Stickers
        </button>
      </div>

      {/* Live Preview Photo Card */}
      <div
        ref={cardRef}
        className="w-full max-w-sm mx-auto p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 border border-white/30 shadow-2xl text-center relative overflow-hidden my-4"
        style={{ filter: activeFilter.filter }}
      >
        <div className="w-40 h-40 mx-auto rounded-full bg-gradient-to-tr from-pink-500 via-amber-400 to-indigo-500 p-1 mb-4 shadow-xl relative flex items-center justify-center">
          <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-7xl select-none">
            😎
          </div>
          {/* Active Stickers Over Avatar */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {selectedStickers.map((stk, idx) => (
              <span
                key={idx}
                className="absolute text-4xl transform -translate-y-6"
                style={{
                  transform: `translate(${(idx - 1) * 28}px, ${(idx % 2 === 0 ? -20 : 15)}px)`
                }}
              >
                {stk}
              </span>
            ))}
          </div>
        </div>

        <div className="text-xl font-extrabold text-amber-200 mb-1">{customCaption}</div>
        <div className="text-[11px] font-bold text-pink-300">#OfficialCelebrationPortrait</div>
      </div>

      {/* Filter and Sticker Selectors */}
      <div className="space-y-4 my-4">
        <div>
          <label className="text-xs font-semibold text-white/70 block mb-2">Color Aura Filters</label>
          <div className="flex gap-2 flex-wrap">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => { setActiveFilter(f); playPop(); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeFilter.id === f.id ? 'bg-amber-400 text-slate-950' : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                {f.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-white/70 block mb-2">Tap to Add Party Stickers</label>
          <div className="flex gap-2 flex-wrap">
            {STICKERS.map((s, idx) => (
              <button
                key={idx}
                onClick={() => addSticker(s)}
                className="w-10 h-10 rounded-2xl bg-white/10 hover:bg-white/20 text-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center pt-2">
        <button
          onClick={handleDownload}
          className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-amber-400 text-slate-950 font-bold shadow-xl hover:brightness-110 transform hover:scale-105 transition-all inline-flex items-center gap-2"
        >
          <Download className="w-4 h-4" /> Save Birthday Portrait
        </button>
      </div>
    </div>
  );
}

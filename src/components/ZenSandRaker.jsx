import React, { useRef, useState, useEffect } from 'react';
import { playPop } from '../utils/audioSynth';

const STONES = ['🪨', '🗿', '🌸', '🎋', '🍃', '🏮'];
const RAKE_SIZES = [12, 24, 36];

export default function ZenSandRaker() {
  const canvasRef = useRef(null);
  const [selectedStone, setSelectedStone] = useState(STONES[0]);
  const [mode, setMode] = useState('rake'); // 'rake' or 'place'
  const [placedItems, setPlacedItems] = useState([
    { x: 120, y: 140, icon: '🪨', size: 36 },
    { x: 280, y: 220, icon: '🪨', size: 28 },
    { x: 200, y: 100, icon: '🌸', size: 24 },
  ]);
  const [rakeSize, setRakeSize] = useState(24);
  const isDrawing = useRef(false);
  const lastPos = useRef(null);

  const initSand = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#e5dfd3';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle sand grain noise
    for (let i = 0; i < 4000; i++) {
      ctx.fillStyle = Math.random() > 0.5 ? '#dcd4c5' : '#ede8dc';
      ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 1.5, 1.5);
    }
  };

  useEffect(() => {
    initSand();
  }, []);

  const handlePointerDown = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * canvas.width;
    const y = ((e.clientY - rect.top) / rect.height) * canvas.height;

    if (mode === 'place') {
      setPlacedItems((prev) => [...prev, { x, y, icon: selectedStone, size: 32 }]);
      playPop(350);
      return;
    }

    isDrawing.current = true;
    lastPos.current = { x, y };
    playPop(220);
  };

  const handlePointerMove = (e) => {
    if (!isDrawing.current || mode !== 'rake') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * canvas.width;
    const y = ((e.clientY - rect.top) / rect.height) * canvas.height;

    const ctx = canvas.getContext('2d');
    ctx.lineWidth = rakeSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Rake comb furrow simulation (multiple grooves)
    ctx.strokeStyle = '#c8bfae';
    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(x, y);
    ctx.stroke();

    // Inner ridge
    ctx.strokeStyle = '#dfd8ca';
    ctx.lineWidth = rakeSize * 0.4;
    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(x, y);
    ctx.stroke();

    lastPos.current = { x, y };
  };

  const handlePointerUp = () => {
    isDrawing.current = false;
  };

  const clearSand = () => {
    initSand();
    playPop(300);
  };

  const resetStones = () => {
    setPlacedItems([]);
    playPop(260);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl text-white max-w-lg mx-auto">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-black bg-gradient-to-r from-stone-200 to-amber-200 bg-clip-text text-transparent">
            Zen Sand Garden 🪨
          </h2>
          <p className="text-xs text-slate-400">Rake soothing sand ripples & arrange stones</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setMode('rake')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              mode === 'rake' ? 'bg-amber-400 text-slate-950 font-black' : 'bg-slate-800 text-slate-300'
            }`}
          >
            Rake 🎋
          </button>
          <button
            onClick={() => setMode('place')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              mode === 'place' ? 'bg-amber-400 text-slate-950 font-black' : 'bg-slate-800 text-slate-300'
            }`}
          >
            Place 🪨
          </button>
        </div>
      </div>

      {mode === 'place' ? (
        <div className="flex gap-2 items-center mb-3 bg-slate-950/60 p-2.5 rounded-2xl border border-slate-800">
          <span className="text-xs text-slate-400 mr-2">Stone:</span>
          {STONES.map((s) => (
            <button
              key={s}
              onClick={() => setSelectedStone(s)}
              className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg transition ${
                selectedStone === s ? 'bg-amber-400/20 border border-amber-400' : 'bg-slate-800 hover:bg-slate-700'
              }`}
            >
              {s}
            </button>
          ))}
          <button
            onClick={resetStones}
            className="ml-auto text-xs text-rose-400 hover:text-rose-300 font-semibold px-2"
          >
            Clear Stones
          </button>
        </div>
      ) : (
        <div className="flex gap-2 items-center mb-3 bg-slate-950/60 p-2.5 rounded-2xl border border-slate-800">
          <span className="text-xs text-slate-400 mr-2">Rake Comb:</span>
          {RAKE_SIZES.map((sz) => (
            <button
              key={sz}
              onClick={() => setRakeSize(sz)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
                rakeSize === sz ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-300'
              }`}
            >
              {sz === 12 ? 'Fine' : sz === 24 ? 'Medium' : 'Broad'}
            </button>
          ))}
          <button
            onClick={clearSand}
            className="ml-auto text-xs text-amber-300 hover:text-amber-200 font-semibold px-2"
          >
            Smooth Sand 🧹
          </button>
        </div>
      )}

      {/* Sand Canvas Container */}
      <div className="relative border-4 border-stone-800/80 rounded-2xl overflow-hidden shadow-inner bg-[#e5dfd3] select-none touch-none">
        <canvas
          ref={canvasRef}
          width={400}
          height={320}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className="w-full h-80 cursor-crosshair block"
        />

        {/* Placed Elements Overlay */}
        {placedItems.map((item, idx) => (
          <div
            key={idx}
            style={{
              left: `${(item.x / 400) * 100}%`,
              top: `${(item.y / 320) * 100}%`,
              fontSize: `${item.size}px`,
              transform: 'translate(-50%, -50%)',
            }}
            className="absolute pointer-events-none filter drop-shadow-md transition-transform"
          >
            {item.icon}
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-3 text-xs text-slate-400">
        <span>Click and drag to carve meditative ripples.</span>
        <span>{placedItems.length} stones placed</span>
      </div>
    </div>
  );
}

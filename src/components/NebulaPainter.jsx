import React, { useRef, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { playPop } from '../utils/audioSynth';

const PALETTES = [
  { name: 'Orion Purple', color: '#c084fc', glow: '#7e22ce' },
  { name: 'Andromeda Cyan', color: '#38bdf8', glow: '#0369a1' },
  { name: 'Solar Gold', color: '#facc15', glow: '#ca8a04' },
  { name: 'Supernova Rose', color: '#fb7185', glow: '#be123c' },
  { name: 'Emerald Aurora', color: '#4ade80', glow: '#15803d' },
];

export default function NebulaPainter() {
  const canvasRef = useRef(null);
  const [selectedPalette, setSelectedPalette] = useState(PALETTES[0]);
  const [brushSize, setBrushSize] = useState(35);
  const isPainting = useRef(false);

  const initSpace = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#050714';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Star backdrop
    for (let i = 0; i < 200; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const r = Math.random() * 1.5;
      ctx.fillStyle = Math.random() > 0.3 ? '#ffffff' : '#93c5fd';
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  useEffect(() => {
    initSpace();
  }, []);

  const paintAt = (x, y) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Radial gradient gas cloud
    const grad = ctx.createRadialGradient(x, y, 0, x, y, brushSize);
    grad.addColorStop(0, selectedPalette.color + 'aa');
    grad.addColorStop(0.5, selectedPalette.glow + '44');
    grad.addColorStop(1, 'transparent');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, brushSize, 0, Math.PI * 2);
    ctx.fill();

    // Occasional star sparkles inside nebula
    if (Math.random() > 0.6) {
      const sx = x + (Math.random() * brushSize - brushSize / 2);
      const sy = y + (Math.random() * brushSize - brushSize / 2);
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(sx, sy, Math.random() * 2 + 1, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const handlePointerDown = (e) => {
    isPainting.current = true;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * canvasRef.current.width;
    const y = ((e.clientY - rect.top) / rect.height) * canvasRef.current.height;
    paintAt(x, y);
    playPop(500);
  };

  const handlePointerMove = (e) => {
    if (!isPainting.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * canvasRef.current.width;
    const y = ((e.clientY - rect.top) / rect.height) * canvasRef.current.height;
    paintAt(x, y);
  };

  const handlePointerUp = () => {
    isPainting.current = false;
  };

  const exportNebula = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'cosmic_birthday_nebula.png';
    link.href = canvas.toDataURL();
    link.click();
    confetti({ particleCount: 80, spread: 60 });
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl text-white max-w-lg mx-auto">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            Nebula Painter 🌌
          </h2>
          <p className="text-xs text-slate-400">Paint deep space gas clouds & starlight</p>
        </div>
        <button
          onClick={exportNebula}
          className="bg-indigo-600 hover:bg-indigo-700 px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 shadow-md"
        >
          Download 📥
        </button>
      </div>

      {/* Palette Selector */}
      <div className="flex gap-2 items-center mb-3 bg-slate-950/60 p-2.5 rounded-2xl border border-slate-800 flex-wrap">
        <span className="text-xs text-slate-400 mr-1">Color:</span>
        {PALETTES.map((p) => (
          <button
            key={p.name}
            onClick={() => { setSelectedPalette(p); playPop(400); }}
            style={{ borderColor: selectedPalette.name === p.name ? '#fff' : 'transparent' }}
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs border transition"
          >
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: p.color }} />
            <span className="text-[11px] text-slate-300">{p.name.split(' ')[0]}</span>
          </button>
        ))}
        <button
          onClick={initSpace}
          className="ml-auto text-xs text-rose-400 hover:text-rose-300 font-semibold px-2"
        >
          Clear 🧹
        </button>
      </div>

      {/* Brush Size */}
      <div className="flex items-center gap-3 mb-3 px-1">
        <span className="text-xs text-slate-400 w-16">Glow Radius:</span>
        <input
          type="range"
          min={15}
          max={60}
          value={brushSize}
          onChange={(e) => setBrushSize(Number(e.target.value))}
          className="w-full accent-purple-400"
        />
        <span className="text-xs font-mono w-8 text-right">{brushSize}px</span>
      </div>

      {/* Canvas */}
      <div className="relative border-2 border-slate-800 rounded-2xl overflow-hidden shadow-2xl bg-black select-none touch-none">
        <canvas
          ref={canvasRef}
          width={400}
          height={320}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className="w-full h-80 cursor-crosshair block"
        />
      </div>

      <p className="text-[11px] text-slate-400 mt-3 text-center">
        Tip: Drag across stars to form glowing interstellar cosmic clouds.
      </p>
    </div>
  );
}

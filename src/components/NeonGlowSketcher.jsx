import React, { useRef, useState, useEffect } from 'react';
import { playPop, playSparkle } from '../utils/audioSynth';

export default function NeonGlowSketcher() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState('#f43f5e');
  const [brushSize, setBrushSize] = useState(6);
  const [glowIntensity, setGlowIntensity] = useState(15);
  const [brushStyle, setBrushStyle] = useState('glow');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#020617';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if (e.touches && e.touches.length > 0) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  const startDrawing = (e) => {
    setIsDrawing(true);
    const { x, y } = getCoordinates(e);
    const ctx = canvasRef.current.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(x, y);
    playPop(700);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const { x, y } = getCoordinates(e);
    const ctx = canvasRef.current.getContext('2d');

    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (brushStyle === 'rainbow') {
      const hue = (Date.now() / 8) % 360;
      ctx.strokeStyle = `hsl(${hue}, 100%, 65%)`;
      ctx.shadowColor = `hsl(${hue}, 100%, 50%)`;
    } else {
      ctx.strokeStyle = brushColor;
      ctx.shadowColor = brushColor;
    }

    ctx.shadowBlur = glowIntensity;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#020617';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    playPop(300);
  };

  const downloadArtwork = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'birthday_neon_art.png';
    link.href = canvas.toDataURL();
    link.click();
    playSparkle();
  };

  const colors = ['#f43f5e', '#ec4899', '#a855f7', '#38bdf8', '#34d399', '#fbbf24', '#ffffff'];

  return (
    <div className="bg-slate-900/80 backdrop-blur-xl border border-pink-500/20 rounded-3xl p-6 shadow-2xl max-w-3xl mx-auto text-center">
      <div className="inline-block px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 font-mono text-xs uppercase tracking-widest mb-3">
        Luminous Canvas Tool
      </div>
      <h2 className="text-3xl font-extrabold text-white mb-2">Neon Glow Sketcher 🎨</h2>
      <p className="text-slate-300 text-xs mb-6">
        Paint with luminous electric neon particles and export high-resolution glowing birthday artworks!
      </p>

      {/* Canvas */}
      <div className="relative rounded-2xl overflow-hidden border-2 border-slate-700/80 shadow-2xl mb-5 mx-auto touch-none bg-slate-950">
        <canvas
          ref={canvasRef}
          width={640}
          height={380}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="w-full h-80 block cursor-crosshair"
        />
      </div>

      {/* Controls Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-800/70 p-4 rounded-2xl border border-slate-700/60 mb-4 items-center">
        {/* Color Palette */}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {colors.map((c) => (
            <button
              key={c}
              onClick={() => { setBrushColor(c); setBrushStyle('glow'); }}
              style={{ backgroundColor: c, boxShadow: brushColor === c && brushStyle === 'glow' ? `0 0 12px ${c}` : 'none' }}
              className={`w-7 h-7 rounded-full transition-transform ${
                brushColor === c && brushStyle === 'glow' ? 'scale-125 ring-2 ring-white' : 'hover:scale-110'
              }`}
            />
          ))}
          <button
            onClick={() => setBrushStyle('rainbow')}
            className={`px-2.5 py-1 rounded-xl text-[10px] font-bold uppercase transition-all ${
              brushStyle === 'rainbow'
                ? 'bg-gradient-to-r from-red-500 via-green-500 to-blue-500 text-white shadow-md ring-2 ring-white scale-105'
                : 'bg-slate-700 text-white/80'
            }`}
          >
            🌈 Rainbow
          </button>
        </div>

        {/* Sliders */}
        <div className="space-y-2 text-left px-2">
          <div className="flex justify-between text-[11px] text-slate-300">
            <span>Size: {brushSize}px</span>
            <input
              type="range"
              min="2"
              max="24"
              value={brushSize}
              onChange={(e) => setBrushSize(Number(e.target.value))}
              className="w-24 accent-pink-500 cursor-pointer"
            />
          </div>
          <div className="flex justify-between text-[11px] text-slate-300">
            <span>Glow: {glowIntensity}px</span>
            <input
              type="range"
              min="4"
              max="35"
              value={glowIntensity}
              onChange={(e) => setGlowIntensity(Number(e.target.value))}
              className="w-24 accent-purple-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center md:justify-end gap-2">
          <button
            onClick={clearCanvas}
            className="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-xl text-xs font-bold transition-all"
          >
            🗑️ Clear
          </button>
          <button
            onClick={downloadArtwork}
            className="px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl text-xs font-bold shadow-lg hover:scale-105 transition-all"
          >
            💾 Save Art
          </button>
        </div>
      </div>
    </div>
  );
}

import React, { useRef, useState, useEffect } from 'react';
import { Flame, Sparkles, RotateCcw, Download } from 'lucide-react';
import { playSparkle } from '../utils/audioSynth';
import { triggerPrideConfetti } from '../utils/particles';

export default function SparklerCanvas() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [sparklerColor, setSparklerColor] = useState('#ffd700');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = 320;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#06060c';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const drawSparkles = (x, y) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = sparklerColor;
    ctx.shadowBlur = 15;
    ctx.shadowColor = sparklerColor;

    for (let i = 0; i < 5; i++) {
      const offsetX = (Math.random() - 0.5) * 16;
      const offsetY = (Math.random() - 0.5) * 16;
      const radius = Math.random() * 2.5 + 1;
      ctx.beginPath();
      ctx.arc(x + offsetX, y + offsetY, radius, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const handlePointerDown = (e) => {
    setIsDrawing(true);
    playSparkle();
    const rect = canvasRef.current.getBoundingClientRect();
    drawSparkles(e.clientX - rect.left, e.clientY - rect.top);
  };

  const handlePointerMove = (e) => {
    if (!isDrawing) return;
    const rect = canvasRef.current.getBoundingClientRect();
    drawSparkles(e.clientX - rect.left, e.clientY - rect.top);
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#06060c';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Flame className="w-6 h-6 text-amber-400" /> Sparkler Light Drawing
        </h2>
        <button
          onClick={handleClear}
          className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all"
          title="Clear Canvas"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      <p className="text-xs text-white/70 mb-4">
        Hold and drag your finger or mouse across the dark night to paint with glowing birthday sparklers!
      </p>

      <div className="rounded-2xl overflow-hidden border border-white/20 shadow-inner mb-4 cursor-crosshair">
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={() => setIsDrawing(false)}
          onPointerLeave={() => setIsDrawing(false)}
          className="w-full block touch-none"
        />
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          {['#ffd700', '#ff4081', '#00e5ff', '#b388ff', '#00e676'].map((c) => (
            <button
              key={c}
              onClick={() => setSparklerColor(c)}
              className={`w-6 h-6 rounded-full border-2 transition-all ${
                sparklerColor === c ? 'border-white scale-125' : 'border-transparent'
              }`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
        <span className="text-[11px] text-white/60">Glow Particle Trails ✨</span>
      </div>
    </div>
  );
}

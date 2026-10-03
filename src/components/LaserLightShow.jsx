import React, { useState, useEffect, useRef } from 'react';
import { playLaserBeam } from '../utils/audioSynth';

export default function LaserLightShow() {
  const canvasRef = useRef(null);
  const [activePreset, setActivePreset] = useState('hyperdrive');
  const [laserSpeed] = useState(1);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let angle = 0;

    const render = () => {
      ctx.fillStyle = 'rgba(2, 6, 23, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      angle += 0.03 * laserSpeed;

      const beams = activePreset === 'hyperdrive' ? 12 : activePreset === 'kaleidoscope' ? 16 : 8;
      const colors = ['#f43f5e', '#38bdf8', '#a855f7', '#fbbf24', '#34d399', '#ec4899'];

      for (let i = 0; i < beams; i++) {
        const theta = angle + (i * Math.PI * 2) / beams;
        const radius = Math.min(cx, cy) * 0.85 * Math.sin(angle * 0.5 + i);
        const x = cx + Math.cos(theta) * radius;
        const y = cy + Math.sin(theta) * radius;

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(x, y);
        ctx.strokeStyle = colors[i % colors.length];
        ctx.lineWidth = 2.5;
        ctx.shadowBlur = 15;
        ctx.shadowColor = colors[i % colors.length];
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [activePreset, laserSpeed]);

  const fireManualLaser = () => {
    playLaserBeam();
  };

  return (
    <div className="bg-slate-900/80 backdrop-blur-xl border border-indigo-500/20 rounded-3xl p-6 shadow-2xl max-w-2xl mx-auto text-center">
      <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-mono text-xs uppercase tracking-widest mb-3">
        Concert Stage Visuals
      </div>
      <h2 className="text-3xl font-extrabold text-white mb-2">Laser Light Show Simulator 🎆</h2>
      <p className="text-slate-300 text-xs mb-4">
        Dynamic multi-beam laser patterns with real-time geometric physics and sound effects.
      </p>

      <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl mb-4 bg-slate-950">
        <canvas ref={canvasRef} width={500} height={280} className="w-full h-64 block" />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60">
        <div className="flex gap-2">
          {['hyperdrive', 'kaleidoscope', 'pulsar'].map((mode) => (
            <button
              key={mode}
              onClick={() => { setActivePreset(mode); fireManualLaser(); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activePreset === mode
                  ? 'bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow-md'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>

        <button
          onClick={fireManualLaser}
          className="px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl text-xs font-bold shadow-md hover:scale-105 transition-all"
        >
          ⚡ Fire Laser Pulse
        </button>
      </div>
    </div>
  );
}

import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { playPop, playSparkle, playChime } from '../utils/audioSynth';

export default function AuraEnergyScanner() {
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [auraResult, setAuraResult] = useState(null);
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  const auras = [
    { name: 'Radiant Solar Gold', color: '#fbbf24', desc: 'Infused with boundless warmth, charismatic brilliance, and an unstoppable magnetic smile.', traits: ['Charisma', 'Warmth', 'Leadership'] },
    { name: 'Cosmic Violet Starlight', color: '#a855f7', desc: 'Carrying deep intuition, serene mystery, and a wondrous imagination that transforms everything it touches.', traits: ['Intuition', 'Creativity', 'Vision'] },
    { name: 'Electric Emerald Spark', color: '#34d399', desc: 'Vibrating with restorative life force, joyful loyalty, and an adventurous spirit full of surprises.', traits: ['Vitality', 'Loyalty', 'Adventure'] },
    { name: 'Celestial Ocean Azure', color: '#38bdf8', desc: 'Flowing with infinite calm, deep philosophical clarity, and a heart as vast as the open sky.', traits: ['Clarity', 'Peace', 'Empathy'] },
    { name: 'Passionate Rose Nova', color: '#f43f5e', desc: 'Burning with courageous passion, heartfelt generosity, and an inspiring dedication to loved ones.', traits: ['Passion', 'Courage', 'Generosity'] }
  ];

  const startScan = () => {
    setScanning(true);
    setProgress(0);
    setAuraResult(null);
    playPop(500);

    let current = 0;
    const interval = setInterval(() => {
      current += 4;
      setProgress(current);
      if (current >= 100) {
        clearInterval(interval);
        setScanning(false);
        const randomAura = auras[Math.floor(Math.random() * auras.length)];
        setAuraResult(randomAura);
        playChime();
        confetti({ particleCount: 100, spread: 70 });
      }
    }, 80);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let angle = 0;

    const render = () => {
      ctx.fillStyle = 'rgba(2, 6, 23, 0.25)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      angle += 0.05;

      const particles = scanning ? 36 : 18;
      for (let i = 0; i < particles; i++) {
        const theta = angle + (i * Math.PI * 2) / particles;
        const radius = (scanning ? 50 : 35) + Math.sin(angle * 2 + i) * 15;
        const x = cx + Math.cos(theta) * radius;
        const y = cy + Math.sin(theta) * radius;

        ctx.beginPath();
        ctx.arc(x, y, scanning ? 4 : 2.5, 0, Math.PI * 2);
        ctx.fillStyle = scanning ? '#f43f5e' : '#38bdf8';
        ctx.shadowBlur = 12;
        ctx.shadowColor = scanning ? '#ec4899' : '#38bdf8';
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(render);
    };

    render();
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [scanning]);

  return (
    <div className="bg-slate-900/80 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-6 shadow-2xl max-w-xl mx-auto text-center">
      <div className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 font-mono text-xs uppercase tracking-widest mb-3">
        Bio-Cosmic Energy Matrix
      </div>
      <h2 className="text-3xl font-extrabold text-white mb-2">Birthday Aura Energy Scanner 🔮</h2>
      <p className="text-slate-300 text-xs mb-4">
        Hold your finger or cursor on the scan crystal to measure your birthday astrological bio-frequency!
      </p>

      {/* Sensor Canvas */}
      <div className="relative w-56 h-56 mx-auto rounded-full overflow-hidden border-4 border-purple-500/40 shadow-[0_0_30px_rgba(168,85,247,0.3)] mb-4 bg-slate-950 flex items-center justify-center">
        <canvas ref={canvasRef} width={224} height={224} className="absolute inset-0 w-full h-full block" />
        <div
          onClick={!scanning ? startScan : undefined}
          className={`relative z-10 w-24 h-24 rounded-full flex flex-col items-center justify-center cursor-pointer transition-transform ${
            scanning ? 'scale-110 animate-pulse bg-purple-600/30' : 'hover:scale-105 bg-purple-500/20 border border-purple-400/40'
          }`}
        >
          <span className="text-3xl mb-1">{scanning ? '⚡' : '🔮'}</span>
          <span className="text-[10px] font-mono text-purple-200 font-bold">
            {scanning ? `${progress}%` : 'TAP SCAN'}
          </span>
        </div>
      </div>

      {auraResult && (
        <div className="bg-slate-800/80 p-5 rounded-2xl border border-purple-500/30 text-left animate-fade-in mb-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-4 h-4 rounded-full shadow-lg" style={{ backgroundColor: auraResult.color }} />
            <h4 className="text-base font-bold text-white">{auraResult.name}</h4>
          </div>
          <p className="text-xs text-slate-300 font-serif leading-relaxed mb-3">
            "{auraResult.desc}"
          </p>
          <div className="flex gap-2 flex-wrap">
            {auraResult.traits.map(t => (
              <span key={t} className="px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-bold">
                ★ {t}
              </span>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={startScan}
        disabled={scanning}
        className="px-6 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 disabled:opacity-50 text-white rounded-xl font-bold text-xs shadow-lg hover:scale-105 transition-all"
      >
        {scanning ? 'Scanning Energy...' : '✨ Calibrate Aura Frequencies'}
      </button>
    </div>
  );
}

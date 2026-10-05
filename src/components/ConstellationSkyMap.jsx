import React, { useRef, useEffect, useState } from 'react';
import { playChime, playPop } from '../utils/audioSynth';

export default function ConstellationSkyMap() {
  const canvasRef = useRef(null);
  const [selectedConstellation, setSelectedConstellation] = useState(null);

  const constellations = [
    { name: 'Ursa Major (The Great Bear)', stars: [[100, 80], [140, 85], [170, 110], [190, 150], [150, 160], [120, 130]], lore: 'Symbol of strength, unwavering courage, and perpetual celestial guidance.' },
    { name: 'Orion (The Celestial Hunter)', stars: [[280, 70], [260, 120], [300, 120], [280, 150], [250, 190], [310, 190]], lore: 'A beacon of bold adventures, triumphant quests, and radiant ambition.' },
    { name: 'Cassiopeia (The Stellar Queen)', stars: [[380, 80], [410, 100], [430, 80], [450, 110], [480, 90]], lore: 'The throne of elegance, majestic grace, and cosmic celebration.' }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#020617';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Background random stars
    for (let i = 0; i < 70; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      ctx.beginPath();
      ctx.arc(x, y, Math.random() * 1.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.fill();
    }

    // Draw Constellations
    constellations.forEach(c => {
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.lineWidth = 1.5;

      c.stars.forEach(([x, y], idx) => {
        if (idx === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      // Draw star nodes
      c.stars.forEach(([x, y]) => {
        ctx.beginPath();
        ctx.arc(x, y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = '#38bdf8';
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#38bdf8';
        ctx.fill();
        ctx.shadowBlur = 0;
      });
    });
  }, []);

  const selectGroup = (c) => {
    setSelectedConstellation(c);
    playChime();
  };

  return (
    <div className="bg-slate-900/80 backdrop-blur-xl border border-indigo-500/20 rounded-3xl p-6 shadow-2xl max-w-2xl mx-auto text-center">
      <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-mono text-xs uppercase tracking-widest mb-3">
        Astronomical Sky Observatory
      </div>
      <h2 className="text-3xl font-extrabold text-white mb-2">Celestial Sky Map 🌌</h2>
      <p className="text-slate-300 text-xs mb-4">
        Explore ancient stellar constellations and inspect their birthday cosmic mythology!
      </p>

      {/* Canvas */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-700 bg-slate-950 mb-4 shadow-2xl">
        <canvas ref={canvasRef} width={560} height={260} className="w-full h-64 block" />
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-2 mb-4 flex-wrap">
        {constellations.map(c => (
          <button
            key={c.name}
            onClick={() => selectGroup(c)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedConstellation?.name === c.name
                ? 'bg-indigo-500 text-white shadow-lg scale-105'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {c.name.split(' (')[0]}
          </button>
        ))}
      </div>

      {selectedConstellation && (
        <div className="p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-2xl text-left animate-fade-in">
          <h4 className="text-xs font-bold text-indigo-300 mb-1">⭐ {selectedConstellation.name}</h4>
          <p className="text-xs text-slate-300 font-serif leading-relaxed">
            "{selectedConstellation.lore}"
          </p>
        </div>
      )}
    </div>
  );
}

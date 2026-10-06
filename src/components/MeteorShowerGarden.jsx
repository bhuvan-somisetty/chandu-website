import React, { useRef, useState, useEffect } from 'react';
import { playChime, playPop } from '../utils/audioSynth';

export default function MeteorShowerGarden() {
  const canvasRef = useRef(null);
  const [wishesCount, setWishesCount] = useState(0);
  const animRef = useRef(null);
  const meteorsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let frame = 0;
    const loop = () => {
      frame++;

      if (frame % 20 === 0 && meteorsRef.current.length < 12) {
        meteorsRef.current.push({
          x: Math.random() * (canvas.width + 100),
          y: -20,
          len: Math.random() * 40 + 50,
          speed: Math.random() * 4 + 6,
          color: ['#38bdf8', '#f43f5e', '#a855f7', '#fbbf24'][Math.floor(Math.random() * 4)]
        });
      }

      ctx.fillStyle = 'rgba(2, 6, 23, 0.25)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Render Meteors
      meteorsRef.current.forEach(m => {
        m.x -= m.speed;
        m.y += m.speed;

        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x + m.len, m.y - m.len);
        ctx.strokeStyle = m.color;
        ctx.lineWidth = 2;
        ctx.shadowBlur = 10;
        ctx.shadowColor = m.color;
        ctx.stroke();
        ctx.shadowBlur = 0;
      });

      meteorsRef.current = meteorsRef.current.filter(m => m.y < canvas.height + 100 && m.x > -100);

      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  const makeWish = () => {
    setWishesCount(c => c + 1);
    playChime();
    playPop(850);
  };

  return (
    <div className="bg-slate-900/80 backdrop-blur-xl border border-indigo-500/20 rounded-3xl p-6 shadow-2xl max-w-xl mx-auto text-center">
      <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-mono text-xs uppercase tracking-widest mb-3">
        Celestial Night Garden
      </div>
      <h2 className="text-3xl font-extrabold text-white mb-2">Meteor Shower Garden 💫</h2>
      <p className="text-slate-300 text-xs mb-4">
        Gaze upon the starry meteor shower and make silent wishes upon each falling star!
      </p>

      {/* Canvas */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-700 bg-slate-950 mb-4 shadow-2xl">
        <canvas ref={canvasRef} width={400} height={240} className="w-full h-60 block" />
      </div>

      <div className="flex items-center justify-between bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60 mb-4">
        <span className="text-xs text-slate-300 font-mono">
          Wishes Cast: <strong className="text-indigo-400 font-bold">{wishesCount}</strong>
        </span>
        <button
          onClick={makeWish}
          className="px-5 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-bold text-xs shadow-md hover:scale-105 transition-all"
        >
          ✨ Wish Upon Meteor
        </button>
      </div>
    </div>
  );
}

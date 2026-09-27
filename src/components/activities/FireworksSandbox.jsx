import React, { useRef, useEffect } from 'react';
import { Sparkles, Play, Flame } from 'lucide-react';
import { playPop, playSparkle } from '../../utils/audioSynth';
import { useAchievements } from '../../context/AchievementContext';

export default function FireworksSandbox() {
  const canvasRef = useRef(null);
  const { unlockAchievement } = useAchievements();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];

    const resize = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = 360;
    };
    resize();
    window.addEventListener('resize', resize);

    function createExplosion(x, y) {
      const colors = ['#f43f5e', '#fbbf24', '#38bdf8', '#a855f7', '#34d399', '#f472b6'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      for (let i = 0; i < 40; i++) {
        const angle = (Math.PI * 2 * i) / 40;
        const speed = Math.random() * 4 + 2;
        particles.push({
          trail: true,
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color,
          alpha: 1,
          decay: Math.random() * 0.02 + 0.015,
          size: Math.random() * 3 + 2
        });
      }
    }

    const handleClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      createExplosion(x, y);
      playPop();
      playSparkle();
      unlockAchievement('fireworks_sparked');
    };

    canvas.addEventListener('click', handleClick);

    function loop() {
      ctx.fillStyle = 'rgba(10, 10, 20, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05; // gravity
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationId = requestAnimationFrame(loop);
    }
    loop();

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-white">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-amber-400" /> Fireworks Lightshow Studio
        </h2>
        <span className="text-xs text-white/70">Click to launch bursts ✨</span>
      </div>
      <div className="relative rounded-2xl overflow-hidden border border-white/20 bg-slate-950 shadow-inner cursor-crosshair">
        <canvas ref={canvasRef} className="w-full block" />
      </div>
    </div>
  );
}

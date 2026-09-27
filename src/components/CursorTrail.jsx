import React, { useEffect, useState } from 'react';

export default function CursorTrail() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    let lastX = 0;
    let lastY = 0;

    const handlePointerMove = (e) => {
      const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
      if (dist > 15) {
        lastX = e.clientX;
        lastY = e.clientY;
        const newParticle = {
          id: Date.now() + Math.random(),
          x: e.clientX,
          y: e.clientY,
          emoji: ['✨', '⭐', '💖', '💫', '🎉'][Math.floor(Math.random() * 5)],
          size: Math.random() * 10 + 10
        };
        setParticles(prev => [...prev.slice(-15), newParticle]);
      }
    };

    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  useEffect(() => {
    if (particles.length === 0) return;
    const timer = setTimeout(() => {
      setParticles(prev => prev.slice(1));
    }, 500);
    return () => clearTimeout(timer);
  }, [particles]);

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {particles.map(p => (
        <span
          key={p.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 animate-fade-out"
          style={{
            left: p.x,
            top: p.y,
            fontSize: `${p.size}px`
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
}

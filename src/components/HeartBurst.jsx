import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const icons = ['✨', '🌟', '🎉', '💫', '💖', '⭐', '🎈'];

const BurstItem = ({ delay, angle, distance, icon }) => {
  const x = Math.cos(angle) * distance;
  const y = Math.sin(angle) * distance;

  return (
    <motion.div
      initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
      animate={{ 
        scale: [0, 1.4, 1], 
        x: x, 
        y: y, 
        opacity: [1, 1, 0],
        rotate: [0, angle * (180 / Math.PI)]
      }}
      transition={{ 
        duration: 0.8, 
        delay: delay,
        ease: "easeOut"
      }}
      className="absolute text-2xl sm:text-3xl pointer-events-none select-none"
    >
      {icon}
    </motion.div>
  );
};

export default function HeartBurst({ isVisible }) {
  const particles = Array.from({ length: 16 }).map((_, i) => ({
    id: i,
    icon: icons[i % icons.length],
    delay: Math.random() * 0.1,
    angle: (i / 16) * Math.PI * 2 + (Math.random() * 0.4 - 0.2),
    distance: 80 + Math.random() * 120
  }));

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center pointer-events-none">
          <div className="relative">
            {particles.map((p) => (
              <BurstItem 
                key={p.id} 
                icon={p.icon}
                delay={p.delay} 
                angle={p.angle} 
                distance={p.distance} 
              />
            ))}
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}

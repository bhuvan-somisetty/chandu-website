import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Heart = ({ delay, angle, distance }) => {
  const x = Math.cos(angle) * distance;
  const y = Math.sin(angle) * distance;

  return (
    <motion.div
      initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
      animate={{ 
        scale: [0, 1.5, 1], 
        x: x, 
        y: y, 
        opacity: [1, 1, 0],
        rotate: angle * (180 / Math.PI)
      }}
      transition={{ 
        duration: 0.8, 
        delay: delay,
        ease: "easeOut"
      }}
      className="absolute text-2xl pointer-events-none select-none"
    >
      ❤️
    </motion.div>
  );
};

export default function HeartBurst({ isVisible }) {
  // Generate a set of random angles and distances for the hearts
  const heartParticles = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    delay: Math.random() * 0.1,
    angle: (i / 12) * Math.PI * 2 + (Math.random() * 0.5 - 0.25),
    distance: 100 + Math.random() * 100
  }));

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center pointer-events-none">
          <div className="relative">
            {heartParticles.map((heart) => (
              <Heart 
                key={heart.id} 
                delay={heart.delay} 
                angle={heart.angle} 
                distance={heart.distance} 
              />
            ))}
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}

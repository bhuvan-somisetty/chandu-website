import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Gift, Smile } from 'lucide-react';

export default function CountdownTimer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: 'Moments of Joy', value: '365+', icon: Smile, color: 'text-amber-400' },
    { label: 'Warm Wishes', value: '1,000+', icon: Heart, color: 'text-rose-400' },
    { label: 'Unforgettable Memories', value: 'Infinite', icon: Sparkles, color: 'text-purple-400' },
    { label: 'Smiles Shared', value: 'Countless', icon: Gift, color: 'text-sky-400' }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto my-8 px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-center hover:border-white/30 transition-all hover:scale-105"
            >
              <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-white/10 flex items-center justify-center">
                <Icon className={`w-5 h-5 ${item.color}`} />
              </div>
              <div className="text-xl sm:text-2xl font-extrabold text-white">{item.value}</div>
              <div className="text-xs text-white/70 font-medium">{item.label}</div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

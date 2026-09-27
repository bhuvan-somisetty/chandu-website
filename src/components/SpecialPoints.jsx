import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Star, Smile, ShieldCheck, Sun } from 'lucide-react';

const TRAITS = [
  { icon: Smile, title: 'Infectious Smile', desc: 'Lights up any room with warmth and humor', color: 'from-amber-400 to-rose-400' },
  { icon: Star, title: 'Inspiring Ambition', desc: 'Always striving towards big dreams and goals', color: 'from-purple-400 to-indigo-400' },
  { icon: Heart, title: 'Empathetic Heart', desc: 'Always there to support and uplift friends', color: 'from-pink-400 to-rose-400' },
  { icon: ShieldCheck, title: 'Loyal Friend', desc: 'Trustworthy, dependable, and genuine', color: 'from-emerald-400 to-teal-400' },
  { icon: Sun, title: 'Bright Energy', desc: 'Turns ordinary days into special memories', color: 'from-yellow-400 to-amber-500' },
  { icon: Sparkles, title: 'Pure Kindness', desc: 'Spreads good vibes wherever they go', color: 'from-sky-400 to-blue-500' }
];

export default function SpecialPoints() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-white mb-2">What Makes You Special ✨</h2>
        <p className="text-sm text-white/70">A few of the countless reasons everyone celebrates you today</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {TRAITS.map((t, idx) => {
          const Icon = t.icon;
          return (
            <motion.div
              key={idx}
              whileHover={{ y: -6, scale: 1.02 }}
              className="p-6 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/30 transition-all shadow-xl text-white"
            >
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${t.color} flex items-center justify-center mb-4 shadow-lg`}>
                <Icon className="w-6 h-6 text-slate-950" />
              </div>
              <h3 className="text-lg font-bold mb-1">{t.title}</h3>
              <p className="text-xs text-white/70 leading-relaxed">{t.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

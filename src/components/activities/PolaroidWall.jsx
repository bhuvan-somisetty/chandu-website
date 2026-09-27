import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Sparkles, Heart, Star, Smile, PartyPopper } from 'lucide-react';
import { playPop } from '../../utils/audioSynth';

const POLAROIDS = [
  { id: 1, title: 'Golden Smiles', date: 'Celebration Day', icon: Smile, rotation: '-rotate-2', color: 'from-amber-400 to-rose-400' },
  { id: 2, title: 'Epic Adventures', date: 'Cherished Moments', icon: Star, rotation: 'rotate-3', color: 'from-sky-400 to-indigo-500' },
  { id: 3, title: 'Pure Joy & Laughter', date: 'Heartfelt Vibes', icon: Heart, rotation: '-rotate-3', color: 'from-pink-400 to-purple-500' },
  { id: 4, title: 'Party Confetti', date: 'Sweet Memories', icon: PartyPopper, rotation: 'rotate-2', color: 'from-emerald-400 to-teal-500' }
];

export default function PolaroidWall() {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-white">
      <div className="flex items-center gap-2 mb-6">
        <Camera className="w-6 h-6 text-pink-400" />
        <div>
          <h2 className="text-2xl font-bold">Polaroid Memory Wall</h2>
          <p className="text-xs text-white/70">Aesthetic memory snapshots and celebratory vibes</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {POLAROIDS.map((p) => {
          const Icon = p.icon;
          return (
            <motion.div
              key={p.id}
              whileHover={{ scale: 1.06, rotate: 0 }}
              onClick={playPop}
              className={`bg-white p-3 pb-6 rounded-xl shadow-2xl transform ${p.rotation} transition-transform cursor-pointer`}
            >
              <div className={`w-full h-44 rounded-lg bg-gradient-to-br ${p.color} flex flex-col items-center justify-center text-white shadow-inner relative overflow-hidden`}>
                <div className="absolute top-2 right-2 w-2 h-2 bg-white/40 rounded-full" />
                <Icon className="w-12 h-12 mb-2 drop-shadow-md" />
                <Sparkles className="w-5 h-5 text-white/80 animate-pulse" />
              </div>
              <div className="mt-3 text-center text-slate-900">
                <div className="font-bold text-sm font-sans">{p.title}</div>
                <div className="text-[10px] text-slate-500">{p.date}</div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

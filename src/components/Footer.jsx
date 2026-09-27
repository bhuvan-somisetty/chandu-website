import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { triggerPrideConfetti } from '../utils/particles';

export default function Footer() {
  return (
    <footer className="w-full py-12 px-4 border-t border-white/10 bg-black/20 backdrop-blur-md text-center text-white/70 text-xs">
      <div className="max-w-4xl mx-auto space-y-3">
        <button
          onClick={triggerPrideConfetti}
          className="inline-flex items-center gap-1 text-sm font-bold text-pink-300 hover:text-pink-200 transition-colors"
        >
          Happy Birthday! ✨🎂
        </button>
        <p className="text-white/60">
          Created with warm friendship, joy, and celebratory cheer.
        </p>
        <div className="flex items-center justify-center gap-1 text-[11px] text-white/40">
          <span>Made for an amazing friend</span>
          <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
        </div>
      </div>
    </footer>
  );
}

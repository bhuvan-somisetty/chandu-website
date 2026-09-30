import React, { useState } from 'react';
import { Share2, Copy, Check, Sparkles } from 'lucide-react';
import { playSparkle } from '../utils/audioSynth';
import { triggerPrideConfetti } from '../utils/particles';

export default function ShareableCard() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    playSparkle();
    triggerPrideConfetti();
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.origin);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-white text-center">
      <h2 className="text-2xl font-bold flex items-center justify-center gap-2 mb-2">
        <Share2 className="w-6 h-6 text-amber-300" /> Share the Celebration
      </h2>
      <p className="text-xs text-white/70 mb-4">Invite friends to play party games and send warm birthday wishes!</p>

      <button
        onClick={handleCopy}
        className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 font-bold text-xs flex items-center gap-2 mx-auto transition-all shadow-lg"
      >
        {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-amber-300" />}
        {copied ? 'Celebration Link Copied! ✨' : 'Copy Celebration Link'}
      </button>
    </div>
  );
}

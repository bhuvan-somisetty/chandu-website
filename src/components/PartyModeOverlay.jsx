import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePartyMode } from '../context/PartyModeContext';
import { Sparkles, X, Flame } from 'lucide-react';
import { playAirHorn } from '../utils/audioSynth';
import { triggerPrideConfetti } from '../utils/particles';

export default function PartyModeOverlay() {
  const { isPartyMode, togglePartyMode, partyTheme } = usePartyMode();

  if (!isPartyMode) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {/* Disco Ambient Strobe Lights */}
      <motion.div
        animate={{
          background: [
            'radial-gradient(circle at 20% 20%, rgba(244, 63, 94, 0.35) 0%, transparent 60%)',
            'radial-gradient(circle at 80% 30%, rgba(59, 130, 246, 0.35) 0%, transparent 60%)',
            'radial-gradient(circle at 50% 80%, rgba(234, 179, 8, 0.35) 0%, transparent 60%)',
            'radial-gradient(circle at 30% 60%, rgba(168, 85, 247, 0.35) 0%, transparent 60%)'
          ]
        }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0"
      />

      {/* Floating Disco Ball Indicator */}
      <div className="absolute top-20 right-6 pointer-events-auto flex items-center gap-2 bg-black/60 backdrop-blur-xl border border-pink-500/50 rounded-full px-4 py-2 shadow-[0_0_25px_#ec4899] text-white">
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          className="text-2xl"
        >
          🪩
        </motion.span>
        <span className="text-xs font-extrabold uppercase tracking-wider text-pink-300">Party Mode ON</span>
        <button
          onClick={() => { playAirHorn(); triggerPrideConfetti(); }}
          className="p-1 rounded-full bg-pink-500/30 hover:bg-pink-500 text-white transition-all ml-1"
          title="Sound Airhorn"
        >
          <Flame className="w-3.5 h-3.5 text-amber-300" />
        </button>
        <button
          onClick={togglePartyMode}
          className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all ml-1"
          title="Exit Party Mode"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

import React from 'react';
import { Volume2, Sparkles, Music } from 'lucide-react';
import { playPop, playSparkle, playFanfare, playKick, playSnare, playHiHat, playAirHorn, playLaserZap, playCrowdCheer, play8BitTune } from '../utils/audioSynth';

const SOUNDS = [
  { label: 'Party Airhorn 📢', fn: playAirHorn, color: 'from-amber-400 to-orange-500' },
  { label: 'Cheering Crowd 👏', fn: playCrowdCheer, color: 'from-pink-500 to-rose-600' },
  { label: 'Laser Zap ⚡', fn: playLaserZap, color: 'from-cyan-400 to-blue-500' },
  { label: 'Magic Sparkle ✨', fn: playSparkle, color: 'from-purple-400 to-indigo-600' },
  { label: 'Kick Drum 🥁', fn: playKick, color: 'from-rose-500 to-red-600' },
  { label: 'Snare Snap 🪘', fn: playSnare, color: 'from-indigo-500 to-purple-600' },
  { label: 'Hi-Hat Cymbal 🔔', fn: playHiHat, color: 'from-sky-400 to-blue-600' },
  { label: 'Fanfare Horn 🎺', fn: playFanfare, color: 'from-emerald-400 to-teal-600' },
  { label: '8-Bit Tune 👾', fn: play8BitTune, color: 'from-fuchsia-500 to-pink-500' },
  { label: 'Bubble Pop 🎈', fn: playPop, color: 'from-yellow-400 to-amber-500' }
];

export default function SoundEffectsPad() {
  return (
    <div className="w-full max-w-2xl mx-auto p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-white">
      <div className="flex items-center gap-2 mb-4">
        <Volume2 className="w-6 h-6 text-pink-400" />
        <div>
          <h2 className="text-2xl font-bold">Party Sound FX Launchpad</h2>
          <p className="text-xs text-white/70">Instant sound effects triggers for epic celebration hype</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        {SOUNDS.map((s, idx) => (
          <button
            key={idx}
            onClick={s.fn}
            className={`p-3 h-20 rounded-2xl bg-gradient-to-br ${s.color} border border-white/20 shadow-md text-xs font-bold flex flex-col items-center justify-center hover:brightness-110 active:scale-95 transition-all select-none`}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}

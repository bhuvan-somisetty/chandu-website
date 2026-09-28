import React, { useState } from 'react';
import { Music, Play, Square, Sparkles, Volume2 } from 'lucide-react';
import { playKick, playSnare, playHiHat, playAirHorn, playSparkle, play8BitTune } from '../utils/audioSynth';
import { usePartyMode } from '../context/PartyModeContext';

export default function DJBeatmaker() {
  const [isPlayingBeat, setIsPlayingBeat] = useState(false);
  const [beatIntervalId, setBeatIntervalId] = useState(null);
  const { togglePartyMode, isPartyMode } = usePartyMode();

  const pads = [
    { label: 'Kick Drum 🥁', fn: playKick, color: 'from-rose-500 to-pink-600' },
    { label: 'Snare Snap 🪘', fn: playSnare, color: 'from-purple-500 to-indigo-600' },
    { label: 'Hi-Hat Cymbal 🔔', fn: playHiHat, color: 'from-sky-500 to-blue-600' },
    { label: 'Party Airhorn 📢', fn: playAirHorn, color: 'from-amber-400 to-orange-500' },
    { label: 'Magic Sparkle ✨', fn: playSparkle, color: 'from-emerald-400 to-teal-500' },
    { label: '8-Bit Birthday 👾', fn: play8BitTune, color: 'from-fuchsia-500 to-pink-500' }
  ];

  const handleToggleAutoBeat = () => {
    if (isPlayingBeat) {
      clearInterval(beatIntervalId);
      setIsPlayingBeat(false);
      setBeatIntervalId(null);
    } else {
      setIsPlayingBeat(true);
      let step = 0;
      const interval = setInterval(() => {
        if (step % 4 === 0) playKick();
        else if (step % 4 === 2) playSnare();
        playHiHat();
        step++;
      }, 250);
      setBeatIntervalId(interval);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-white">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Music className="w-6 h-6 text-pink-400" /> Party DJ Soundboard & Beat Looper
          </h2>
          <p className="text-xs text-white/70">Tap live pads or toggle the automatic dance rhythm loop!</p>
        </div>
        <button
          onClick={handleToggleAutoBeat}
          className={`px-4 py-2 rounded-2xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-lg ${
            isPlayingBeat ? 'bg-rose-500 text-white animate-pulse' : 'bg-gradient-to-r from-pink-500 to-amber-400 text-slate-950'
          }`}
        >
          {isPlayingBeat ? <Square className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          {isPlayingBeat ? 'Stop Beat' : 'Loop Dance Beat'}
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
        {pads.map((p, idx) => (
          <button
            key={idx}
            onClick={p.fn}
            className={`p-4 h-24 rounded-2xl bg-gradient-to-br ${p.color} border border-white/20 shadow-lg text-sm font-bold flex flex-col items-center justify-center hover:brightness-110 transform hover:scale-105 active:scale-95 transition-all select-none`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="text-center pt-2">
        <button
          onClick={togglePartyMode}
          className={`px-6 py-2.5 rounded-full text-xs font-bold border transition-all ${
            isPartyMode ? 'bg-pink-500/30 border-pink-400 text-pink-200' : 'bg-white/10 border-white/20 hover:bg-white/20 text-white'
          }`}
        >
          🪩 {isPartyMode ? 'Party Strobe Mode Active' : 'Enable Full-Screen Party Mode'}
        </button>
      </div>
    </div>
  );
}

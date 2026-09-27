import React, { useState } from 'react';
import { Music, Play, Sparkles } from 'lucide-react';
import { PIANO_KEYS, playPianoKey, playBirthdayTune } from '../../utils/audioSynth';
import { useAchievements } from '../../context/AchievementContext';

const KEYS_LIST = Object.keys(PIANO_KEYS);

export default function ChimePiano() {
  const [activeKey, setActiveKey] = useState(null);
  const { unlockAchievement } = useAchievements();

  const handleKeyPress = (k) => {
    setActiveKey(k);
    playPianoKey(k);
    unlockAchievement('piano_maestro');
    setTimeout(() => setActiveKey(null), 250);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-white">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Music className="w-6 h-6 text-sky-400" />
          <h2 className="text-2xl font-bold">Chime Synthesizer Piano</h2>
        </div>
        <button
          onClick={playBirthdayTune}
          className="px-4 py-2 rounded-full bg-gradient-to-r from-sky-400 to-indigo-500 text-xs font-bold hover:brightness-110 shadow-lg flex items-center gap-1.5 transition-all"
        >
          <Play className="w-3.5 h-3.5" /> Play Birthday Song
        </button>
      </div>

      <p className="text-xs text-white/70 mb-4">
        Tap the chime keys to play your own melodies or follow the birthday song guide:
      </p>

      <div className="flex justify-center gap-1.5 sm:gap-2 p-4 bg-slate-950/60 rounded-2xl border border-white/10 overflow-x-auto">
        {KEYS_LIST.map((keyName) => {
          const isSharp = keyName.includes('#');
          const isActive = activeKey === keyName;

          if (isSharp) {
            return (
              <button
                key={keyName}
                onClick={() => handleKeyPress(keyName)}
                className={`h-24 w-8 -mx-4 z-10 rounded-b-lg border border-slate-700 transition-all font-bold text-[10px] flex items-end justify-center pb-2 select-none ${
                  isActive ? 'bg-amber-400 text-slate-950 scale-95' : 'bg-slate-900 text-white/80 hover:bg-slate-800'
                }`}
              >
                {keyName}
              </button>
            );
          }

          return (
            <button
              key={keyName}
              onClick={() => handleKeyPress(keyName)}
              className={`h-36 w-10 sm:w-12 rounded-b-xl border border-white/20 transition-all font-bold text-xs flex items-end justify-center pb-3 select-none ${
                isActive ? 'bg-pink-400 text-slate-950 scale-95' : 'bg-white/90 text-slate-900 hover:bg-white'
              }`}
            >
              {keyName}
            </button>
          );
        })}
      </div>
    </div>
  );
}

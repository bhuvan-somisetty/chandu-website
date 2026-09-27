import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkle } from 'lucide-react';
import { setSoundMuted, isSoundMuted, playBirthdayTune } from '../utils/audioSynth';

export default function SoundboardToggle() {
  const [muted, setMuted] = useState(isSoundMuted());

  const handleToggle = () => {
    const nextState = !muted;
    setMuted(nextState);
    setSoundMuted(nextState);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={playBirthdayTune}
        className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold flex items-center gap-1.5 transition-all border border-white/20 text-amber-300 shadow-sm"
        title="Synthesize Birthday Melody"
      >
        <Sparkle className="w-3.5 h-3.5 animate-spin" /> Play Melody
      </button>
      <button
        onClick={handleToggle}
        className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all border border-white/20"
        title={muted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
      >
        {muted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
      </button>
    </div>
  );
}

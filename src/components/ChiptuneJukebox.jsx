import React, { useState } from 'react';
import { play8BitTune, playPop, playCelebrationTune } from '../utils/audioSynth';

export default function ChiptuneJukebox() {
  const [currentTrack, setCurrentTrack] = useState(null);

  const tracks = [
    { id: 1, title: '8-Bit Birthday Anthem', genre: 'Chiptune', length: '0:35', play: play8BitTune, icon: '🎂' },
    { id: 2, title: 'Starry Pixel Voyage', genre: 'Synthwave', length: '0:28', play: playCelebrationTune, icon: '🚀' },
    { id: 3, title: 'Retro Castle Victory', genre: 'Fanfare', length: '0:18', play: () => playPop(600), icon: '👑' },
    { id: 4, title: 'Neon Arcade Disco', genre: 'Groove', length: '0:42', play: play8BitTune, icon: '🪩' }
  ];

  const handlePlay = (track) => {
    setCurrentTrack(track.id);
    track.play();
  };

  return (
    <div className="bg-slate-900/80 backdrop-blur-xl border border-emerald-500/20 rounded-3xl p-6 shadow-2xl max-w-xl mx-auto text-center">
      <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs uppercase tracking-widest mb-3">
        Retro Chiptune Soundboard
      </div>
      <h2 className="text-3xl font-extrabold text-white mb-2">Chiptune Retro Jukebox 🎶</h2>
      <p className="text-slate-300 text-xs mb-6">
        Stream authentic procedural 8-bit square wave synthesizers and chiptune tracks!
      </p>

      {/* Playlist */}
      <div className="space-y-3 mb-6">
        {tracks.map((t) => (
          <div
            key={t.id}
            onClick={() => handlePlay(t)}
            className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
              currentTrack === t.id
                ? 'bg-emerald-500/20 border-emerald-400/50 shadow-lg scale-[1.02]'
                : 'bg-slate-800/80 border-slate-700/60 hover:border-emerald-500/30'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{t.icon}</span>
              <div className="text-left">
                <h4 className="text-xs font-bold text-white">{t.title}</h4>
                <span className="text-[10px] text-slate-400 font-mono">{t.genre} • {t.length}</span>
              </div>
            </div>
            <button className="w-8 h-8 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold text-xs shadow-md">
              {currentTrack === t.id ? '▶' : '♫'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

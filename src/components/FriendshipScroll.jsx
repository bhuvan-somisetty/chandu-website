import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { playPop, playCelebrationTune } from '../utils/audioSynth';

export default function FriendshipScroll() {
  const [unrolled, setUnrolled] = useState(false);

  const toggleScroll = () => {
    playPop();
    if (!unrolled) {
      playCelebrationTune();
      confetti({ particleCount: 80, spread: 60 });
    }
    setUnrolled(!unrolled);
  };

  const vows = [
    '✨ Always celebrating your triumphs like they are our own',
    '🍕 Infinite pizza, laughter, and late night spontaneous roadtrips',
    '🛡️ An unbreakable fortress of support through life’s wildest adventures',
    '💫 Reminding you of your boundless brilliance whenever doubts creep in',
    '🌟 Eternal friendship, joy, and unforgettable celebrations in 2026 & beyond'
  ];

  return (
    <div className="bg-slate-900/80 backdrop-blur-xl border border-amber-500/20 rounded-3xl p-6 shadow-2xl max-w-xl mx-auto text-center">
      <div className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs uppercase tracking-widest mb-3">
        Royal Friendship Decree
      </div>
      <h2 className="text-3xl font-extrabold text-white mb-2">The Golden Friendship Scroll 📜</h2>
      <p className="text-slate-300 text-xs mb-6">
        Tap the royal wax seal to unfurl the ancient parchment of celebration and friendship decrees!
      </p>

      {/* Scroll Roll / Unrolled View */}
      <div
        onClick={toggleScroll}
        className={`cursor-pointer transition-all duration-700 mx-auto rounded-3xl p-6 border-4 ${
          unrolled
            ? 'bg-gradient-to-b from-amber-100 via-amber-50 to-amber-200 border-amber-600/80 text-slate-900 shadow-2xl scale-105'
            : 'bg-gradient-to-r from-amber-800 via-amber-700 to-amber-900 border-amber-400/50 text-amber-100 w-64 h-24 flex items-center justify-center hover:scale-105 shadow-xl'
        }`}
      >
        {!unrolled ? (
          <div className="flex items-center gap-3">
            <span className="text-3xl animate-bounce">📜</span>
            <div className="text-left">
              <h4 className="text-xs font-serif font-black uppercase text-amber-200">Sealed Decree</h4>
              <span className="text-[10px] text-amber-300/80 font-mono">Tap Seal to Unroll</span>
            </div>
          </div>
        ) : (
          <div className="space-y-4 text-left animate-fade-in">
            <div className="text-center border-b border-amber-700/30 pb-3">
              <span className="text-2xl mb-1 block">👑 ★ 👑</span>
              <h3 className="text-lg font-serif font-black text-amber-950 uppercase tracking-widest">
                The Sacred Vows of Friendship
              </h3>
              <p className="text-[11px] font-serif italic text-amber-800">Conferred for eternity on this special birthday</p>
            </div>

            <div className="space-y-2 py-2">
              {vows.map((v, i) => (
                <div key={i} className="text-xs font-serif text-slate-800 leading-relaxed flex items-start gap-2">
                  <span>{v}</span>
                </div>
              ))}
            </div>

            <div className="text-center border-t border-amber-700/30 pt-3">
              <span className="text-[10px] font-mono text-amber-900">Click anywhere to roll up scroll</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

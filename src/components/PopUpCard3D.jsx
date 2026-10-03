import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { playPop, playCelebrationTune } from '../utils/audioSynth';

export default function PopUpCard3D() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCard = () => {
    playPop();
    if (!isOpen) {
      playCelebrationTune();
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-slate-900/80 backdrop-blur-xl border border-pink-500/20 rounded-3xl p-6 shadow-2xl max-w-xl mx-auto text-center">
      <div className="inline-block px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 font-mono text-xs uppercase tracking-widest mb-3">
        Interactive 3D Keepsake
      </div>
      <h2 className="text-3xl font-extrabold text-white mb-2">3D Pop-Up Greeting Card 💌</h2>
      <p className="text-slate-300 text-xs mb-6">
        Click the wax seal to unfold the personalized dimensional celebration card!
      </p>

      {/* 3D Card Container */}
      <div className="relative w-72 h-80 mx-auto my-6 perspective-1000">
        <div
          onClick={toggleCard}
          className={`w-full h-full rounded-2xl cursor-pointer transition-all duration-700 transform-style-3d shadow-2xl relative border-2 ${
            isOpen
              ? 'bg-gradient-to-br from-amber-100 to-rose-100 border-amber-300 text-slate-900 rotate-y-180 scale-105'
              : 'bg-gradient-to-br from-rose-900 via-pink-950 to-purple-950 border-pink-500/40 text-white hover:scale-102'
          }`}
        >
          {!isOpen ? (
            /* Card Front */
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-2xl shadow-lg mb-4 animate-pulse">
                👑
              </div>
              <h3 className="text-xl font-serif font-bold text-amber-200 mb-1">To Someone Special</h3>
              <p className="text-[11px] text-pink-300 font-serif italic mb-4">"A magical journey begins with a turn of the year"</p>
              <div className="px-4 py-1.5 rounded-full bg-amber-500 text-slate-950 font-bold text-xs shadow-md">
                ✨ Tap Wax Seal to Open
              </div>
            </div>
          ) : (
            /* Card Inside (Flipped) */
            <div className="absolute inset-0 flex flex-col items-center justify-between p-6 text-center transform -scale-x-100">
              <div className="animate-bounce text-3xl mt-2">🎂 ✨ 🎉</div>
              <div className="my-auto">
                <h4 className="text-2xl font-serif font-black text-rose-600 mb-2">Happy Birthday!</h4>
                <p className="text-xs text-slate-700 font-serif leading-relaxed mb-3">
                  Wishing you boundless joy, unforgettable adventures, warm smiles, and triumphant victories every single day.
                </p>
                <span className="text-[11px] text-purple-700 font-semibold font-mono block">~ Celebrating You in 2026 ~</span>
              </div>
              <div className="text-[10px] text-slate-500 italic">Click again to close envelope</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

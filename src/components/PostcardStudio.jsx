import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { playSparkle } from '../utils/audioSynth';

export default function PostcardStudio() {
  const [recipient, setRecipient] = useState('My Dearest Friend');
  const [message, setMessage] = useState('Wishing you a year filled with sunshine, triumphs, deep laughter, and endless adventure!');
  const [stamp, setStamp] = useState('💌');

  const printPostcard = () => {
    playSparkle();
    confetti({ particleCount: 80, spread: 60 });
    window.print();
  };

  const stamps = ['💌', '👑', '🎉', '🌟', '🚀', '🎂'];

  return (
    <div className="bg-slate-900/80 backdrop-blur-xl border border-rose-500/20 rounded-3xl p-6 shadow-2xl max-w-2xl mx-auto text-center">
      <div className="inline-block px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 font-mono text-xs uppercase tracking-widest mb-3">
        Vintage Postcard Workshop
      </div>
      <h2 className="text-3xl font-extrabold text-white mb-2">Celebration Postcard Studio 💌</h2>
      <p className="text-slate-300 text-xs mb-6">
        Design and print a vintage birthday postcard complete with postal marks and stamps!
      </p>

      {/* Editor inputs */}
      <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60 mb-6 text-left space-y-3">
        <div>
          <label className="text-[10px] text-slate-400 uppercase font-mono block mb-1">To</label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white"
          />
        </div>
        <div>
          <label className="text-[10px] text-slate-400 uppercase font-mono block mb-1">Message</label>
          <textarea
            rows={2}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white"
          />
        </div>
        <div>
          <label className="text-[10px] text-slate-400 uppercase font-mono block mb-1">Select Stamp</label>
          <div className="flex gap-2">
            {stamps.map(s => (
              <button
                key={s}
                onClick={() => setStamp(s)}
                className={`w-8 h-8 rounded-lg text-lg border flex items-center justify-center transition-transform ${
                  stamp === s ? 'bg-rose-500/30 border-rose-400 scale-110' : 'bg-slate-900 border-slate-700'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Postcard Frame */}
      <div className="bg-amber-50 p-6 rounded-3xl border-4 border-amber-300/80 shadow-2xl text-slate-900 my-4 text-left font-serif relative">
        <div className="grid grid-cols-2 gap-6 min-h-[200px]">
          {/* Left: Message */}
          <div className="border-r-2 border-slate-300/60 pr-4 flex flex-col justify-between">
            <div>
              <h4 className="font-bold text-sm text-amber-900 mb-2">Dear {recipient},</h4>
              <p className="text-xs text-slate-700 leading-relaxed italic">
                "{message}"
              </p>
            </div>
            <span className="text-[10px] text-slate-500 font-mono block mt-4">~ Happy Birthday 2026 ~</span>
          </div>

          {/* Right: Stamp & Address */}
          <div className="flex flex-col justify-between pl-2">
            <div className="flex justify-end">
              <div className="w-16 h-20 border-2 border-dashed border-rose-400 bg-rose-50 rounded-lg flex flex-col items-center justify-center shadow-sm">
                <span className="text-2xl">{stamp}</span>
                <span className="text-[8px] font-mono text-rose-600 mt-1 uppercase font-bold">AIR MAIL</span>
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <div className="border-b border-slate-400 h-4"></div>
              <div className="border-b border-slate-400 h-4"></div>
              <div className="border-b border-slate-400 h-4"></div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={printPostcard}
        className="px-6 py-2.5 bg-gradient-to-r from-rose-500 to-amber-500 text-slate-950 rounded-xl font-bold text-xs shadow-lg hover:scale-105 transition-all mt-2"
      >
        🖨️ Print / Save Postcard Keepsake
      </button>
    </div>
  );
}

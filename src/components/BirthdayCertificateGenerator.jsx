import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { playSparkle } from '../utils/audioSynth';

export default function BirthdayCertificateGenerator() {
  const [recipient, setRecipient] = useState('An Incredible Friend');
  const [awardTitle, setAwardTitle] = useState('Grand Champion of Awesomeness');
  const [issuedDate, setIssuedDate] = useState('October 2026');

  const generatePDF = () => {
    playSparkle();
    confetti({ particleCount: 100, spread: 70 });
    window.print();
  };

  return (
    <div className="bg-slate-900/80 backdrop-blur-xl border border-amber-500/20 rounded-3xl p-6 shadow-2xl max-w-2xl mx-auto text-center">
      <div className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs uppercase tracking-widest mb-3">
        Official Celebration Diploma
      </div>
      <h2 className="text-3xl font-extrabold text-white mb-2">Birthday Award Certificate 📜</h2>
      <p className="text-slate-300 text-xs mb-6">
        Customize and print a gold-embossed celebratory diploma honoring this special birthday milestone!
      </p>

      {/* Editor Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60 mb-6 text-left">
        <div>
          <label className="text-[10px] text-slate-400 uppercase font-mono block mb-1">Presented To</label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white"
          />
        </div>
        <div>
          <label className="text-[10px] text-slate-400 uppercase font-mono block mb-1">Award Honor</label>
          <input
            type="text"
            value={awardTitle}
            onChange={(e) => setAwardTitle(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white"
          />
        </div>
        <div>
          <label className="text-[10px] text-slate-400 uppercase font-mono block mb-1">Conferred Date</label>
          <input
            type="text"
            value={issuedDate}
            onChange={(e) => setIssuedDate(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white"
          />
        </div>
      </div>

      {/* Certificate Frame */}
      <div className="bg-gradient-to-br from-amber-50 via-amber-100 to-yellow-50 p-8 rounded-3xl border-8 border-amber-500/80 shadow-2xl text-slate-900 my-4 relative overflow-hidden">
        <div className="border-2 border-amber-700/40 p-6 rounded-2xl flex flex-col items-center">
          <div className="text-3xl mb-2">👑 🏆 🌟</div>
          <h3 className="text-2xl font-serif font-black tracking-wider text-amber-900 uppercase">
            Certificate of Celebration
          </h3>
          <p className="text-xs font-serif italic text-amber-800 mt-1 mb-4">
            This distinguished recognition is joyfully conferred upon
          </p>

          <div className="text-2xl font-serif font-extrabold text-rose-700 border-b-2 border-amber-600/60 pb-1 px-8 mb-4">
            {recipient}
          </div>

          <p className="text-xs font-serif text-slate-700 max-w-md leading-relaxed mb-4">
            In recognition of your exceptional warmth, boundless brilliance, and unforgettable presence as the
          </p>

          <span className="text-sm font-bold text-amber-950 bg-amber-200/80 px-4 py-1.5 rounded-full border border-amber-400 mb-6">
            ★ {awardTitle} ★
          </span>

          <div className="w-full flex justify-between items-end text-[11px] font-serif text-slate-600 border-t border-amber-700/30 pt-4">
            <div>
              <span className="font-bold text-slate-900 block font-mono">📅 Date:</span>
              {issuedDate}
            </div>
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 font-bold flex items-center justify-center text-xs shadow-lg border-2 border-white">
              SEAL
            </div>
            <div>
              <span className="font-bold text-slate-900 block font-mono">✍️ Signed:</span>
              With Infinite Love
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={generatePDF}
        className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 rounded-xl font-bold text-xs shadow-lg hover:scale-105 transition-all mt-2"
      >
        🖨️ Print / Save Official Certificate
      </button>
    </div>
  );
}

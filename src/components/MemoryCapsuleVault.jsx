import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { playPop, playCelebrationTune } from '../utils/audioSynth';

export default function MemoryCapsuleVault() {
  const [memories, setMemories] = useState([
    { id: 1, title: 'Secret Birthday Wish 2026', unlockYear: 2027, locked: true, text: 'May this upcoming year bring you the dream opportunities and joyful journeys you have worked so hard for!' },
    { id: 2, title: 'Unforgettable Roadtrip Memory', unlockYear: 2026, locked: false, text: 'Remember that unforgettable night singing songs together under the starry highway lights!' },
    { id: 3, title: 'Future Milestone Prophecy', unlockYear: 2028, locked: true, text: 'You will achieve greatness in your endeavors and reach summits you once only imagined.' }
  ]);
  const [newTitle, setNewTitle] = useState('');
  const [newText, setNewText] = useState('');
  const [newYear, setNewYear] = useState(2027);

  const unlockMemory = (id) => {
    setMemories(prev => prev.map(m => {
      if (m.id === id) {
        playCelebrationTune();
        confetti({ particleCount: 80, spread: 60 });
        return { ...m, locked: false };
      }
      return m;
    }));
  };

  const addCapsule = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newText.trim()) return;
    playPop();
    const newEntry = {
      id: Date.now(),
      title: newTitle,
      unlockYear: newYear,
      locked: true,
      text: newText
    };
    setMemories([newEntry, ...memories]);
    setNewTitle('');
    setNewText('');
  };

  return (
    <div className="bg-slate-900/80 backdrop-blur-xl border border-amber-500/20 rounded-3xl p-6 shadow-2xl max-w-2xl mx-auto text-center">
      <div className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs uppercase tracking-widest mb-3">
        Time-Locked Vault
      </div>
      <h2 className="text-3xl font-extrabold text-white mb-2">Memory Capsule Vault ⏳</h2>
      <p className="text-slate-300 text-xs mb-6">
        Seal time-locked memories, predictions, and celebratory letters to be opened on future birthdays.
      </p>

      {/* Creation Form */}
      <form onSubmit={addCapsule} className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60 mb-6 text-left space-y-3">
        <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">🔒 Seal a New Memory Capsule</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <input
            type="text"
            placeholder="Capsule Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="sm:col-span-2 bg-slate-950/80 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
          />
          <select
            value={newYear}
            onChange={(e) => setNewYear(Number(e.target.value))}
            className="bg-slate-950/80 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
          >
            <option value={2026}>Unlock in 2026</option>
            <option value={2027}>Unlock in 2027</option>
            <option value={2028}>Unlock in 2028</option>
            <option value={2030}>Unlock in 2030</option>
          </select>
        </div>
        <textarea
          rows={2}
          placeholder="Write your secret letter or future wish to seal in the time vault..."
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          className="w-full bg-slate-950/80 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
        />
        <div className="text-right">
          <button
            type="submit"
            className="px-4 py-2 bg-gradient-to-r from-amber-500 to-pink-500 text-slate-950 rounded-xl font-bold text-xs shadow-md hover:scale-105 transition-all"
          >
            🔐 Seal in Vault
          </button>
        </div>
      </form>

      {/* Capsule List */}
      <div className="space-y-3">
        {memories.map((m) => (
          <div
            key={m.id}
            className={`p-4 rounded-2xl border transition-all text-left ${
              m.locked
                ? 'bg-slate-800/40 border-slate-700/60'
                : 'bg-gradient-to-r from-amber-500/10 via-pink-500/10 to-purple-500/10 border-amber-400/40 shadow-lg'
            }`}
          >
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-sm font-bold text-white flex items-center gap-2">
                {m.locked ? '🔒' : '🔓'} {m.title}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-700 text-amber-300 border border-slate-600">
                Target: {m.unlockYear}
              </span>
            </div>
            {m.locked ? (
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-slate-400 font-mono italic">
                  [Time-vault encrypted until {m.unlockYear}]
                </p>
                <button
                  onClick={() => unlockMemory(m.id)}
                  className="px-3 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/30 rounded-lg text-[11px] font-bold transition-all"
                >
                  ⚡ Unlock Capsule
                </button>
              </div>
            ) : (
              <p className="text-xs text-slate-200 font-serif leading-relaxed mt-1 bg-slate-950/40 p-3 rounded-xl border border-white/5">
                "{m.text}"
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

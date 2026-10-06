import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { playPop } from '../utils/audioSynth';

const STRINGS = [
  { note: 'G4', freq: 392.0, name: 'G' },
  { note: 'C4', freq: 261.63, name: 'C' },
  { note: 'E4', freq: 329.63, name: 'E' },
  { note: 'A4', freq: 440.0, name: 'A' },
];

const CHORDS = [
  { name: 'C', frets: [0, 0, 0, 3], notes: [392.0, 261.63, 329.63, 523.25] },
  { name: 'G', frets: [0, 2, 3, 2], notes: [392.0, 293.66, 392.0, 493.88] },
  { name: 'Am', frets: [2, 0, 0, 0], notes: [440.0, 261.63, 329.63, 440.0] },
  { name: 'F', frets: [2, 0, 1, 0], notes: [440.0, 261.63, 349.23, 440.0] },
  { name: 'Em', frets: [0, 4, 3, 2], notes: [392.0, 329.63, 392.0, 493.88] },
  { name: 'Dm', frets: [2, 2, 1, 0], notes: [440.0, 293.66, 349.23, 440.0] },
];

export default function UkuleleStrummer() {
  const [selectedChord, setSelectedChord] = useState(CHORDS[0]);
  const [activeString, setActiveString] = useState(null);

  const playPluck = (freq) => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.35, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 1.2);
    } catch {
      playPop(freq);
    }
  };

  const strumAll = (direction = 'down') => {
    const freqs = selectedChord ? selectedChord.notes : STRINGS.map((s) => s.freq);
    const order = direction === 'down' ? [0, 1, 2, 3] : [3, 2, 1, 0];

    order.forEach((idx, i) => {
      setTimeout(() => {
        playPluck(freqs[idx]);
        setActiveString(idx);
        setTimeout(() => setActiveString(null), 200);
      }, i * 40);
    });
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl text-white max-w-lg mx-auto">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-black bg-gradient-to-r from-amber-300 via-orange-400 to-amber-600 bg-clip-text text-transparent">
            Ukulele Strummer 🎸
          </h2>
          <p className="text-xs text-slate-400">Hawaiian acoustic 4-string chords</p>
        </div>
        <div className="text-xs bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full font-bold">
          Chord: {selectedChord.name}
        </div>
      </div>

      {/* Chord Buttons */}
      <div className="grid grid-cols-6 gap-2 mb-4">
        {CHORDS.map((chord) => (
          <button
            key={chord.name}
            onClick={() => { setSelectedChord(chord); playPop(400); }}
            className={`py-2 rounded-xl text-xs font-bold transition ${
              selectedChord.name === chord.name
                ? 'bg-amber-400 text-slate-950 shadow-md font-black'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {chord.name}
          </button>
        ))}
      </div>

      {/* Ukulele Body Soundboard */}
      <div className="relative bg-[#78350f] rounded-3xl p-6 border-4 border-[#451a03] shadow-inner mb-4 overflow-hidden">
        {/* Soundhole */}
        <div className="w-24 h-24 mx-auto rounded-full bg-[#1c1917] border-4 border-[#b45309] shadow-inner flex items-center justify-center relative mb-4">
          <div className="w-20 h-20 rounded-full border border-amber-500/30" />
        </div>

        {/* 4 Strings */}
        <div className="relative h-44 flex justify-around items-center px-4">
          {STRINGS.map((str, idx) => {
            const freq = selectedChord ? selectedChord.notes[idx] : str.freq;
            const isActive = activeString === idx;

            return (
              <button
                key={str.name}
                onClick={() => {
                  playPluck(freq);
                  setActiveString(idx);
                  setTimeout(() => setActiveString(null), 250);
                }}
                className="relative h-full flex flex-col items-center justify-between group focus:outline-none"
              >
                <span className="text-[10px] text-amber-200 font-bold bg-[#451a03] px-2 py-0.5 rounded-full">
                  {str.name}
                </span>

                {/* String Line */}
                <div
                  style={{
                    width: `${4 - idx * 0.7}px`,
                    backgroundColor: isActive ? '#fef08a' : '#d4d4d8',
                    boxShadow: isActive ? '0 0 10px #fef08a' : 'none',
                    transform: isActive ? 'scaleX(2)' : 'none',
                  }}
                  className="h-full rounded-full transition-all duration-75"
                />

                <span className="text-[9px] text-amber-300 font-mono">
                  {Math.round(freq)}Hz
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Strum Action Controls */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => strumAll('down')}
          className="py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-bold rounded-2xl shadow-lg transition active:scale-95 text-xs"
        >
          Strum Down ⬇️
        </button>
        <button
          onClick={() => strumAll('up')}
          className="py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-bold rounded-2xl shadow-lg transition active:scale-95 text-xs"
        >
          Strum Up ⬆️
        </button>
      </div>
    </div>
  );
}

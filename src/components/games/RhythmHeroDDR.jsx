import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { playPop, playCelebrationTune } from '../../utils/audioSynth';

const LANES = [
  { id: 'left', key: 'ArrowLeft', char: '←', label: 'Left', color: '#38bdf8' },
  { id: 'up', key: 'ArrowUp', char: '↑', label: 'Up', color: '#4ade80' },
  { id: 'down', key: 'ArrowDown', char: '↓', label: 'Down', color: '#f43f5e' },
  { id: 'right', key: 'ArrowRight', char: '→', label: 'Right', color: '#eab308' },
];

export default function RhythmHeroDDR() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [notes, setNotes] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [bpm] = useState(120);

  const nextNoteTime = useRef(0);
  const gameStartTime = useRef(0);

  const handleStart = () => {
    setScore(0);
    setCombo(0);
    setMaxCombo(0);
    setNotes([]);
    setFeedback('GET READY!');
    setIsPlaying(true);
    gameStartTime.current = Date.now();
    nextNoteTime.current = Date.now() + 800;
    playPop(440);
  };

  const handleHit = (laneId) => {
    if (!isPlaying) return;
    const targetLaneNotes = notes.filter((n) => n.lane === laneId && !n.hit);
    if (targetLaneNotes.length === 0) return;

    const closest = targetLaneNotes[0];
    const diff = Math.abs(closest.y - 300);

    if (diff < 30) {
      setScore((s) => s + 100);
      setCombo((c) => {
        const nc = c + 1;
        setMaxCombo((m) => Math.max(m, nc));
        return nc;
      });
      setFeedback('PERFECT! 🔥');
      closest.hit = true;
      playPop(880);
    } else if (diff < 65) {
      setScore((s) => s + 50);
      setCombo((c) => {
        const nc = c + 1;
        setMaxCombo((m) => Math.max(m, nc));
        return nc;
      });
      setFeedback('GREAT! ✨');
      closest.hit = true;
      playPop(660);
    } else if (diff < 100) {
      setScore((s) => s + 20);
      setCombo(0);
      setFeedback('OK 👍');
      closest.hit = true;
      playPop(330);
    } else {
      setCombo(0);
      setFeedback('MISS ❌');
    }
  };

  useEffect(() => {
    const onKey = (e) => {
      if (!isPlaying) return;
      const found = LANES.find((l) => l.key === e.key);
      if (found) {
        e.preventDefault();
        handleHit(found.id);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isPlaying, notes]);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      const now = Date.now();
      if (now >= nextNoteTime.current) {
        const randomLane = LANES[Math.floor(Math.random() * LANES.length)].id;
        setNotes((prev) => [
          ...prev,
          { id: Math.random(), lane: randomLane, y: 0, hit: false },
        ]);
        nextNoteTime.current = now + (60000 / bpm) * (Math.random() > 0.5 ? 0.5 : 1);
      }

      setNotes((prev) => {
        return prev
          .map((n) => ({ ...n, y: n.y + 6 }))
          .filter((n) => {
            if (!n.hit && n.y > 360) {
              setCombo(0);
              setFeedback('MISS ❌');
              return false;
            }
            return n.y <= 380 && !n.hit;
          });
      });

      if (now - gameStartTime.current > 40000) {
        setIsPlaying(false);
        setFeedback('STAGE CLEAR! 🌟');
        confetti({ particleCount: 150, spread: 80 });
        playCelebrationTune();
      }
    }, 24);

    return () => clearInterval(interval);
  }, [isPlaying, bpm]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl text-white max-w-lg mx-auto">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-black bg-gradient-to-r from-pink-400 to-indigo-400 bg-clip-text text-transparent">
            Rhythm Hero DDR 🎵
          </h2>
          <p className="text-xs text-slate-400">Tap arrows to party rhythm tempo</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-mono font-bold text-yellow-400">{score}</div>
          <div className="text-xs text-slate-400">Combo: <span className="text-pink-400 font-bold">{combo}</span> (Max: {maxCombo})</div>
        </div>
      </div>

      <div className="relative h-96 bg-slate-950/80 rounded-2xl border border-slate-800 overflow-hidden select-none">
        <div className="absolute inset-0 grid grid-cols-4 divide-x divide-slate-800/40 pointer-events-none" />
        <div className="absolute left-0 right-0 top-[300px] h-1 bg-gradient-to-r from-pink-500 via-indigo-500 to-emerald-500 shadow-[0_0_12px_rgba(236,72,153,0.8)]" />

        {notes.map((note) => {
          const laneIndex = LANES.findIndex((l) => l.id === note.lane);
          const lane = LANES[laneIndex];
          return (
            <div
              key={note.id}
              style={{
                top: `${note.y}px`,
                left: `${laneIndex * 25 + 2}%`,
                width: '21%',
                backgroundColor: lane.color,
              }}
              className="absolute h-10 rounded-xl flex items-center justify-center font-black text-xl shadow-lg transform -translate-y-1/2 transition-transform"
            >
              {lane.char}
            </div>
          );
        })}

        <div className="absolute top-[285px] left-0 right-0 grid grid-cols-4 px-2 pointer-events-none">
          {LANES.map((lane) => (
            <div
              key={lane.id}
              style={{ borderColor: lane.color }}
              className="h-10 mx-1 rounded-xl border-2 border-dashed flex items-center justify-center text-lg font-bold opacity-70"
            >
              {lane.char}
            </div>
          ))}
        </div>

        {feedback && (
          <div className="absolute top-16 left-0 right-0 text-center pointer-events-none">
            <span className="text-xl font-black bg-slate-900/90 border border-slate-700 px-4 py-1.5 rounded-full shadow-lg text-pink-300">
              {feedback}
            </span>
          </div>
        )}

        {!isPlaying && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center">
            <div className="text-5xl mb-3">🎧🕺</div>
            <h3 className="text-xl font-bold mb-2">Ready to Dance?</h3>
            <p className="text-xs text-slate-400 mb-6 max-w-xs">
              Hit arrow keys or lane buttons when falling notes hit the neon bar!
            </p>
            <button
              onClick={handleStart}
              className="bg-gradient-to-r from-pink-500 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 px-8 py-3 rounded-full font-bold shadow-lg transform hover:scale-105 active:scale-95 transition"
            >
              Start Dancing ⚡
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-4 gap-2 mt-4">
        {LANES.map((lane) => (
          <button
            key={lane.id}
            onClick={() => handleHit(lane.id)}
            style={{ backgroundColor: `${lane.color}22`, borderColor: lane.color }}
            className="py-3 rounded-xl border-2 flex flex-col items-center justify-center hover:opacity-100 opacity-80 active:scale-95 transition"
          >
            <span className="text-2xl font-bold" style={{ color: lane.color }}>{lane.char}</span>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider">{lane.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

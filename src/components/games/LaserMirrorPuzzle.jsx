import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { playPop, playCelebrationTune } from '../../utils/audioSynth';

const LEVELS = [
  {
    name: 'Tutorial: Corner Reflection',
    gridSize: 5,
    emitter: { x: 0, y: 0, dir: 'R' },
    target: { x: 4, y: 4 },
    initialMirrors: [
      { x: 4, y: 0, type: '/' },
      { x: 2, y: 4, type: null },
    ],
    available: ['/', '\\'],
  },
  {
    name: 'Zig-Zag Bounce',
    gridSize: 5,
    emitter: { x: 0, y: 2, dir: 'R' },
    target: { x: 4, y: 2 },
    initialMirrors: [
      { x: 2, y: 2, type: null },
      { x: 2, y: 0, type: null },
      { x: 4, y: 0, type: null },
    ],
    available: ['/', '\\', '/', '\\'],
  },
  {
    name: 'Laser Labyrinth',
    gridSize: 6,
    emitter: { x: 0, y: 5, dir: 'U' },
    target: { x: 5, y: 0 },
    initialMirrors: [
      { x: 0, y: 1, type: null },
      { x: 3, y: 1, type: null },
      { x: 3, y: 3, type: null },
      { x: 5, y: 3, type: null },
    ],
    available: ['/', '\\', '/', '\\'],
  },
];

export default function LaserMirrorPuzzle() {
  const [levelIdx, setLevelIdx] = useState(0);
  const [mirrors, setMirrors] = useState({});
  const [won, setWon] = useState(false);
  const [path, setPath] = useState([]);

  const lvl = LEVELS[levelIdx];

  // Reset or setup level
  useEffect(() => {
    const init = {};
    lvl.initialMirrors.forEach((m) => {
      init[`${m.x},${m.y}`] = m.type;
    });
    setMirrors(init);
    setWon(false);
  }, [levelIdx]);

  // Trace laser beam
  useEffect(() => {
    let curX = lvl.emitter.x;
    let curY = lvl.emitter.y;
    let curDir = lvl.emitter.dir; // 'U', 'D', 'L', 'R'

    const visited = [{ x: curX, y: curY }];
    let reachedTarget = false;
    let steps = 0;

    while (steps < 40) {
      steps++;
      let nextX = curX;
      let nextY = curY;

      if (curDir === 'R') nextX++;
      else if (curDir === 'L') nextX--;
      else if (curDir === 'D') nextY++;
      else if (curDir === 'U') nextY--;

      if (nextX < 0 || nextX >= lvl.gridSize || nextY < 0 || nextY >= lvl.gridSize) {
        break;
      }

      visited.push({ x: nextX, y: nextY });
      curX = nextX;
      curY = nextY;

      if (curX === lvl.target.x && curY === lvl.target.y) {
        reachedTarget = true;
        break;
      }

      const mirror = mirrors[`${curX},${curY}`];
      if (mirror === '/') {
        if (curDir === 'R') curDir = 'U';
        else if (curDir === 'L') curDir = 'D';
        else if (curDir === 'D') curDir = 'L';
        else if (curDir === 'U') curDir = 'R';
      } else if (mirror === '\\') {
        if (curDir === 'R') curDir = 'D';
        else if (curDir === 'L') curDir = 'U';
        else if (curDir === 'D') curDir = 'R';
        else if (curDir === 'U') curDir = 'L';
      }
    }

    setPath(visited);

    if (reachedTarget && !won) {
      setWon(true);
      playCelebrationTune();
      confetti({ particleCount: 120, spread: 70 });
    }
  }, [mirrors, levelIdx, lvl]);

  const toggleMirror = (x, y) => {
    const key = `${x},${y}`;
    const curr = mirrors[key];
    playPop(520);
    setMirrors((prev) => {
      let nextType = null;
      if (curr === null || curr === undefined) nextType = '/';
      else if (curr === '/') nextType = '\\';
      else nextType = null;
      return { ...prev, [key]: nextType };
    });
  };

  const isPath = (x, y) => path.some((p) => p.x === x && p.y === y);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl text-white max-w-lg mx-auto">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-black bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Laser Mirror Puzzle 🪞
          </h2>
          <p className="text-xs text-slate-400">{lvl.name}</p>
        </div>
        <div className="flex gap-2">
          {LEVELS.map((_, i) => (
            <button
              key={i}
              onClick={() => { setLevelIdx(i); playPop(); }}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
                levelIdx === i
                  ? 'bg-emerald-500 text-slate-950 font-black'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Lvl {i + 1}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-slate-400 mb-4">
        Click grid squares to cycle mirrors ( <span className="text-emerald-400 font-bold">/</span> or <span className="text-cyan-400 font-bold">\</span> ) and guide the laser from the Emitter ⚡ to the Crystal 💎!
      </p>

      {/* Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${lvl.gridSize}, minmax(0, 1fr))`,
          gap: '8px',
        }}
        className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 mb-4"
      >
        {Array.from({ length: lvl.gridSize * lvl.gridSize }).map((_, idx) => {
          const x = idx % lvl.gridSize;
          const y = Math.floor(idx / lvl.gridSize);
          const key = `${x},${y}`;
          const isEmitter = x === lvl.emitter.x && y === lvl.emitter.y;
          const isTarget = x === lvl.target.x && y === lvl.target.y;
          const mirror = mirrors[key];
          const illuminated = isPath(x, y);

          return (
            <button
              key={key}
              onClick={() => {
                if (!isEmitter && !isTarget) toggleMirror(x, y);
              }}
              className={`aspect-square rounded-xl border flex items-center justify-center font-black text-xl transition-all relative select-none ${
                isEmitter
                  ? 'bg-amber-500/20 border-amber-500 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                  : isTarget
                  ? won
                    ? 'bg-emerald-500/30 border-emerald-400 text-emerald-300 shadow-[0_0_20px_rgba(52,211,153,0.8)]'
                    : 'bg-indigo-500/20 border-indigo-500 text-indigo-400'
                  : illuminated
                  ? 'bg-emerald-950/50 border-emerald-500/60 shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              {isEmitter && '⚡'}
              {isTarget && '💎'}
              {!isEmitter && !isTarget && mirror && (
                <span className="text-emerald-300 text-2xl filter drop-shadow-[0_0_5px_rgba(52,211,153,0.8)]">
                  {mirror}
                </span>
              )}
              {illuminated && !mirror && !isEmitter && !isTarget && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
              )}
            </button>
          );
        })}
      </div>

      {won && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 text-center">
          <h3 className="text-emerald-400 font-bold text-lg mb-1">🎉 Crystal Activated!</h3>
          <p className="text-xs text-slate-300 mb-3">Laser network successfully synchronized!</p>
          {levelIdx < LEVELS.length - 1 ? (
            <button
              onClick={() => { setLevelIdx((l) => l + 1); playPop(); }}
              className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-5 py-2 rounded-xl text-xs shadow-md transition"
            >
              Next Level ➡️
            </button>
          ) : (
            <div className="text-xs text-emerald-300 font-bold">You solved all laser puzzle levels! 🏆</div>
          )}
        </div>
      )}
    </div>
  );
}

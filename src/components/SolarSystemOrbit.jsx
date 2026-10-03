import React, { useState } from 'react';

export default function SolarSystemOrbit() {
  const [age, setAge] = useState(21);

  const planets = [
    { name: 'Mercury', days: 88, color: '#94a3b8', orbits: (age * 365.25 / 88).toFixed(1) },
    { name: 'Venus', days: 224.7, color: '#f59e0b', orbits: (age * 365.25 / 224.7).toFixed(1) },
    { name: 'Earth', days: 365.25, color: '#38bdf8', orbits: age.toFixed(1) },
    { name: 'Mars', days: 687, color: '#ef4444', orbits: (age * 365.25 / 687).toFixed(1) },
    { name: 'Jupiter', days: 4333, color: '#fb923c', orbits: (age * 365.25 / 4333).toFixed(2) },
    { name: 'Saturn', days: 10759, color: '#facc15', orbits: (age * 365.25 / 10759).toFixed(2) }
  ];

  return (
    <div className="bg-slate-900/80 backdrop-blur-xl border border-indigo-500/20 rounded-3xl p-6 shadow-2xl max-w-2xl mx-auto text-center">
      <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-mono text-xs uppercase tracking-widest mb-3">
        Cosmic Orbit Calculator
      </div>
      <h2 className="text-3xl font-extrabold text-white mb-2">Solar System Age Orbit 🌌</h2>
      <p className="text-slate-300 text-xs mb-4">
        Calculate your cosmic age and how many planetary laps around the sun you've completed!
      </p>

      {/* Age Selector */}
      <div className="flex items-center justify-center gap-3 mb-6 bg-slate-800/60 p-3 rounded-2xl border border-slate-700/60 max-w-xs mx-auto">
        <span className="text-xs text-slate-300 font-mono">Earth Years:</span>
        <input
          type="number"
          min="1"
          max="120"
          value={age}
          onChange={(e) => setAge(Math.max(1, Number(e.target.value)))}
          className="w-16 bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white font-bold text-center"
        />
      </div>

      {/* Planets Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {planets.map((p) => (
          <div
            key={p.name}
            className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60 flex flex-col items-center hover:border-indigo-400/40 transition-all"
          >
            <div
              className="w-8 h-8 rounded-full mb-2 shadow-lg animate-pulse"
              style={{ backgroundColor: p.color, boxShadow: `0 0 15px ${p.color}` }}
            />
            <h4 className="text-xs font-bold text-white mb-1">{p.name}</h4>
            <span className="text-lg font-black text-indigo-300 font-mono">{p.orbits}</span>
            <span className="text-[10px] text-slate-400">orbits completed</span>
          </div>
        ))}
      </div>
    </div>
  );
}

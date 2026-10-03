import React from 'react';

export default function CelebrationLeaderboard() {
  const records = [
    { rank: 1, title: 'Grand Cake Baker', score: '9,850 pts', badge: '👑 Legend', icon: '🍰' },
    { rank: 2, title: 'Sky Balloon Master', score: '8,420 pts', badge: '⭐ Master', icon: '🏎️' },
    { rank: 3, title: 'Treasure Explorer', score: '7,900 pts', badge: '💎 Master', icon: '🗺️' },
    { rank: 4, title: 'Candle Flame Whisperer', score: '6,650 pts', badge: '🔥 Expert', icon: '🎂' },
    { rank: 5, title: 'Space Odyssey Pilot', score: '5,200 pts', badge: '🚀 Expert', icon: '🌌' }
  ];

  return (
    <div className="bg-slate-900/80 backdrop-blur-xl border border-amber-500/20 rounded-3xl p-6 shadow-2xl max-w-2xl mx-auto text-center">
      <div className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs uppercase tracking-widest mb-3">
        Celebration Hall of Fame
      </div>
      <h2 className="text-3xl font-extrabold text-white mb-2">Hall of Fame & Leaderboard 🏆</h2>
      <p className="text-slate-300 text-xs mb-6">
        Top ranking party champions across arcade games, creative studios, and quests!
      </p>

      <div className="space-y-3">
        {records.map((r) => (
          <div
            key={r.rank}
            className="flex items-center justify-between p-3.5 bg-slate-800/80 rounded-2xl border border-slate-700/60 hover:border-amber-400/40 transition-all"
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 flex items-center justify-center font-bold text-xs">
                #{r.rank}
              </span>
              <span className="text-2xl">{r.icon}</span>
              <div className="text-left">
                <h4 className="text-xs font-bold text-white">{r.title}</h4>
                <span className="text-[10px] text-slate-400">{r.badge}</span>
              </div>
            </div>
            <span className="font-mono font-black text-emerald-400 text-sm">{r.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

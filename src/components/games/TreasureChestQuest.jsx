import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { playTreasureJingle, playPop } from '../../utils/audioSynth';
import { useAchievements } from '../../context/AchievementContext';

export default function TreasureChestQuest() {
  const [grid, setGrid] = useState([
    { id: 0, type: 'gem', label: '💎 Diamond Heart', opened: false, points: 50 },
    { id: 1, type: 'clue', label: '📜 Secret Riddle', opened: false, clueText: 'Look near the coral reef for the ancient key!' },
    { id: 2, type: 'trap', label: '💨 Confetti Burst', opened: false, points: 10 },
    { id: 3, type: 'key', label: '🗝️ Golden Key', opened: false, isKey: true },
    { id: 4, type: 'gem', label: '👑 Birthday Crown', opened: false, points: 100 },
    { id: 5, type: 'mystery', label: '🧁 Cupcake Boost', opened: false, points: 30 },
    { id: 6, type: 'gem', label: '⭐ Starlight Ruby', opened: false, points: 60 },
    { id: 7, type: 'trap', label: '🎈 Balloon Shower', opened: false, points: 15 },
    { id: 8, type: 'master_chest', label: '🎁 Master Vault', opened: false, locked: true }
  ]);
  const [hasKey, setHasKey] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [questLog, setQuestLog] = useState(['Embark on the island quest! Find the Golden Key to unlock the Master Vault.']);
  const { unlockAchievement } = useAchievements();

  const handleTileClick = (index) => {
    const tile = grid[index];
    if (tile.opened) return;

    playPop();

    if (tile.type === 'master_chest' && !hasKey) {
      setQuestLog(prev => ['⚠️ The Master Vault is sealed with a golden lock! Search the island for the Golden Key first.', ...prev.slice(0, 4)]);
      return;
    }

    const nextGrid = [...grid];
    nextGrid[index] = { ...tile, opened: true };
    setGrid(nextGrid);

    if (tile.isKey) {
      setHasKey(true);
      playTreasureJingle();
      setQuestLog(prev => ['🗝️ Eureka! You unearthed the Golden Key! The Master Vault can now be unlocked.', ...prev.slice(0, 4)]);
      return;
    }

    if (tile.type === 'master_chest' && hasKey) {
      playTreasureJingle();
      confetti({ particleCount: 150, spread: 90, origin: { y: 0.5 } });
      setTotalScore(prev => prev + 500);
      setQuestLog(prev => ['🏆 CONGRATULATIONS! You opened the Master Vault and claimed 500 Grand Birthday Points!', ...prev.slice(0, 4)]);
      unlockAchievement && unlockAchievement('treasure_hunter');
      return;
    }

    if (tile.points) {
      setTotalScore(prev => prev + tile.points);
      setQuestLog(prev => [`✨ Discovered ${tile.label} (+${tile.points} pts)`, ...prev.slice(0, 4)]);
    } else if (tile.clueText) {
      setQuestLog(prev => [`📜 Riddle Found: "${tile.clueText}"`, ...prev.slice(0, 4)]);
    }
  };

  const restartQuest = () => {
    setGrid(prev => prev.map(t => ({ ...t, opened: false })));
    setHasKey(false);
    setTotalScore(0);
    setQuestLog(['Quest reset! Begin unearthing the mysteries of Birthday Treasure Island.']);
  };

  return (
    <div className="bg-slate-900/80 backdrop-blur-xl border border-amber-500/30 rounded-3xl p-6 shadow-2xl max-w-2xl mx-auto text-center">
      <div className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs uppercase tracking-widest mb-3">
        Island Adventure Mini-Game
      </div>
      <h2 className="text-3xl font-extrabold text-white mb-1">Treasure Chest Quest 🗺️</h2>
      <p className="text-slate-300 text-xs mb-4">
        Uncover tiles on the 3x3 island grid. Find the golden key and unseal the master treasure vault!
      </p>

      {/* Header Info */}
      <div className="flex justify-between items-center bg-slate-800/80 px-4 py-2.5 rounded-2xl border border-slate-700/60 mb-6">
        <div className="text-left">
          <span className="text-xs text-slate-400 block">Inventory</span>
          <span className="text-sm font-bold text-amber-300">
            {hasKey ? '🗝️ Golden Key Acquired' : '🔒 No Key'}
          </span>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-400 block">Treasure Score</span>
          <span className="text-lg font-black text-emerald-400">{totalScore} PTS</span>
        </div>
      </div>

      {/* 3x3 Grid */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {grid.map((tile, idx) => (
          <button
            key={tile.id}
            onClick={() => handleTileClick(idx)}
            className={`h-28 rounded-2xl border-2 flex flex-col items-center justify-center p-2 transition-all transform active:scale-95 ${
              tile.opened
                ? 'bg-slate-800/90 border-amber-400/40 shadow-inner'
                : 'bg-gradient-to-br from-amber-600/30 to-slate-800/80 border-amber-500/30 hover:border-amber-400 hover:scale-[1.02] shadow-lg cursor-pointer'
            }`}
          >
            {tile.opened ? (
              <div className="animate-fade-in flex flex-col items-center">
                <span className="text-2xl mb-1">
                  {tile.type === 'master_chest' ? '👑' : tile.isKey ? '🗝️' : '💎'}
                </span>
                <span className="text-[11px] font-bold text-amber-200 line-clamp-1">{tile.label}</span>
                {tile.points && <span className="text-[10px] text-emerald-300 font-mono">+{tile.points} pts</span>}
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <span className="text-3xl filter drop-shadow-md">
                  {tile.type === 'master_chest' ? '🏰' : '📦'}
                </span>
                <span className="text-[10px] text-amber-300/80 font-mono mt-1">Sector #{idx + 1}</span>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Adventure Log */}
      <div className="bg-slate-950/70 p-3 rounded-2xl border border-slate-800 text-left mb-4">
        <span className="text-[10px] text-amber-400 font-mono uppercase tracking-wider block mb-1">Adventure Quest Log:</span>
        <div className="space-y-1">
          {questLog.map((log, i) => (
            <p key={i} className="text-xs text-slate-300 font-serif leading-relaxed">
              {log}
            </p>
          ))}
        </div>
      </div>

      <button
        onClick={restartQuest}
        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-all border border-slate-700"
      >
        🔄 Explore New Island
      </button>
    </div>
  );
}

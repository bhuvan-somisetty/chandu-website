import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cake, Flame, Sparkles, RefreshCw, Check } from 'lucide-react';
import { playPop, playFanfare, playSparkle } from '../../utils/audioSynth';
import { triggerPrideConfetti } from '../../utils/particles';
import { useAchievements } from '../../context/AchievementContext';

const FLAVORS = [
  { id: 'chocolate', name: 'Rich Chocolate', color: 'bg-amber-900', border: 'border-amber-800' },
  { id: 'vanilla', name: 'Sweet Vanilla', color: 'bg-amber-100 text-slate-900', border: 'border-amber-200' },
  { id: 'strawberry', name: 'Strawberry Velvet', color: 'bg-pink-400', border: 'border-pink-300' },
  { id: 'matcha', name: 'Matcha Blossom', color: 'bg-emerald-600', border: 'border-emerald-500' }
];

const TOPPINGS = [
  { id: 'berries', name: 'Fresh Berries', icon: '🍓' },
  { id: 'sprinkles', name: 'Rainbow Sprinkles', icon: '✨' },
  { id: 'macarons', name: 'Macarons', icon: '🍪' },
  { id: 'stars', name: 'Golden Stars', icon: '⭐' }
];

export default function CakeBaker() {
  const [flavor, setFlavor] = useState(FLAVORS[0]);
  const [topping, setTopping] = useState(TOPPINGS[0]);
  const [candlesLit, setCandlesLit] = useState([true, true, true]);
  const [candlesBlown, setCandlesBlown] = useState(false);
  const { unlockAchievement } = useAchievements();

  const handleBlowCandles = () => {
    setCandlesLit([false, false, false]);
    setCandlesBlown(true);
    playFanfare();
    triggerPrideConfetti();
    unlockAchievement('cake_designer');
    unlockAchievement('candle_blower');
  };

  const handleReset = () => {
    setCandlesLit([true, true, true]);
    setCandlesBlown(false);
    playSparkle();
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-white">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Cake className="w-6 h-6 text-pink-400" />
          <h2 className="text-2xl font-bold">Interactive Cake Bakery</h2>
        </div>
        <button
          onClick={handleReset}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 transition-all"
          title="Reset Cake"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      <div className="relative py-10 my-4 rounded-2xl bg-slate-950/40 border border-white/10 flex flex-col items-center justify-center min-h-[260px]">
        {/* Candles */}
        <div className="flex gap-8 mb-2 z-10">
          {candlesLit.map((lit, idx) => (
            <div key={idx} className="relative flex flex-col items-center">
              {lit && (
                <motion.div
                  animate={{ scale: [1, 1.2, 0.9, 1.1, 1], y: [0, -2, 1, -1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="w-4 h-6 bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-200 rounded-full blur-[1px] shadow-[0_0_12px_#ff9800]"
                />
              )}
              <div className="w-2.5 h-10 bg-gradient-to-b from-pink-300 via-white to-pink-200 rounded-t-sm shadow-sm" />
            </div>
          ))}
        </div>

        {/* Cake Tiers */}
        <div className="relative flex flex-col items-center">
          {/* Top Topping Layer */}
          <div className="text-2xl mb-[-8px] z-10 flex gap-2">
            {topping.icon} ✨ {topping.icon} ✨ {topping.icon}
          </div>

          {/* Top Tier */}
          <div className={`w-40 h-14 rounded-t-2xl shadow-lg border-t border-x relative ${flavor.color} ${flavor.border} flex items-center justify-center font-bold text-sm`}>
            <div className="absolute top-1 left-2 right-2 h-2 bg-white/30 rounded-full blur-[1px]" />
            Happy Birthday!
          </div>

          {/* Bottom Tier */}
          <div className={`w-56 h-18 rounded-t-xl rounded-b-2xl shadow-2xl border-t border-x relative -mt-1 ${flavor.color} ${flavor.border}`}>
            <div className="absolute top-1 left-3 right-3 h-2 bg-white/20 rounded-full blur-[1px]" />
          </div>

          {/* Cake Stand */}
          <div className="w-64 h-3.5 shadow-xl bg-gradient-to-r from-amber-200 via-white to-amber-100 rounded-full shadow-md mt-1" />
        </div>
      </div>

      {/* Flavor & Topping Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
        <div>
          <label className="text-xs font-semibold text-white/70 block mb-2">Cake Flavor</label>
          <div className="grid grid-cols-2 gap-2">
            {FLAVORS.map(f => (
              <button
                key={f.id}
                onClick={() => { setFlavor(f); playPop(); }}
                className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-between ${
                  flavor.id === f.id ? 'bg-white/20 border-amber-400' : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              >
                <span>{f.name}</span>
                {flavor.id === f.id && <Check className="w-3.5 h-3.5 text-amber-400" />}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-white/70 block mb-2">Toppings & Sparkles</label>
          <div className="grid grid-cols-2 gap-2">
            {TOPPINGS.map(t => (
              <button
                key={t.id}
                onClick={() => { setTopping(t); playPop(); }}
                className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-between ${
                  topping.id === t.id ? 'bg-white/20 border-pink-400' : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              >
                <span>{t.icon} {t.name}</span>
                {topping.id === t.id && <Check className="w-3.5 h-3.5 text-pink-400" />}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="text-center pt-2">
        {!candlesBlown ? (
          <button
            onClick={handleBlowCandles}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-amber-400 via-rose-500 to-pink-500 font-bold text-slate-950 hover:brightness-110 shadow-xl transform hover:scale-105 active:scale-95 transition-all flex items-center gap-2 mx-auto"
          >
            <Flame className="w-5 h-5 text-amber-950" /> Make a Wish & Blow Candles!
          </button>
        ) : (
          <div className="p-3 bg-emerald-500/20 border border-emerald-400/40 rounded-2xl text-emerald-200 text-sm font-semibold flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-300" />
            Wish Made! May this year bring endless joy and prosperity! ✨
          </div>
        )}
      </div>
    </div>
  );
}

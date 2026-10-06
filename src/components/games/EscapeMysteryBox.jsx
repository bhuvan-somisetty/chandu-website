import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { playPop, playCelebrationTune } from '../../utils/audioSynth';

export default function EscapeMysteryBox() {
  const [stage, setStage] = useState(1); // 1: Rune dial, 2: Gem color sequence, 3: Key slider, 4: Unlocked
  const [dialAngle, setDialAngle] = useState(0); // target: 180 (South Star)
  const [gemSequence, setGemSequence] = useState([]); // target: ['ruby', 'emerald', 'sapphire']
  const [sliderVal, setSliderVal] = useState(0); // target: 100

  const rotateDial = () => {
    const nextAngle = (dialAngle + 45) % 360;
    setDialAngle(nextAngle);
    playPop(350 + nextAngle);

    if (nextAngle === 180 && stage === 1) {
      setTimeout(() => {
        setStage(2);
        playCelebrationTune();
        confetti({ particleCount: 50, spread: 50 });
      }, 400);
    }
  };

  const pressGem = (color) => {
    const nextSeq = [...gemSequence, color];
    setGemSequence(nextSeq);
    playPop(color === 'ruby' ? 400 : color === 'emerald' ? 500 : 600);

    const target = ['ruby', 'emerald', 'sapphire'];
    if (nextSeq.length === 3) {
      if (nextSeq.every((val, idx) => val === target[idx])) {
        setTimeout(() => {
          setStage(3);
          playCelebrationTune();
          confetti({ particleCount: 80, spread: 60 });
        }, 400);
      } else {
        // Reset gem sequence
        setTimeout(() => setGemSequence([]), 500);
      }
    }
  };

  const handleSliderChange = (e) => {
    const val = Number(e.target.value);
    setSliderVal(val);
    if (val === 100 && stage === 3) {
      setStage(4);
      playCelebrationTune();
      confetti({ particleCount: 150, spread: 90 });
    }
  };

  const resetBox = () => {
    setStage(1);
    setDialAngle(0);
    setGemSequence([]);
    setSliderVal(0);
    playPop(440);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl text-white max-w-lg mx-auto">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-black bg-gradient-to-r from-amber-400 to-yellow-200 bg-clip-text text-transparent">
            Escape Mystery Box 🔐
          </h2>
          <p className="text-xs text-slate-400">Unlock three cipher mechanisms</p>
        </div>
        <div className="text-xs font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full">
          Layer {stage} / 3
        </div>
      </div>

      {/* Main Box Enclosure */}
      <div className="relative bg-gradient-to-b from-stone-900 to-stone-950 rounded-2xl border-4 border-amber-600/40 p-6 shadow-inner min-h-[300px] flex flex-col items-center justify-center mb-4">
        {stage === 1 && (
          <div className="text-center space-y-4">
            <p className="text-xs text-amber-200/80">Mechanism 1: Align Sun Dial with the South Star (180°)</p>
            <div className="relative w-40 h-40 mx-auto flex items-center justify-center">
              <button
                onClick={rotateDial}
                style={{ transform: `rotate(${dialAngle}deg)` }}
                className="w-36 h-36 rounded-full border-4 border-amber-500 bg-gradient-to-br from-amber-700 to-amber-950 shadow-2xl flex items-center justify-center transition-transform duration-300 relative group cursor-pointer"
              >
                <div className="absolute top-2 w-3 h-3 rounded-full bg-amber-300 shadow-[0_0_8px_#fde047]" />
                <span className="text-3xl">🧭</span>
              </button>
            </div>
            <div className="text-xs font-mono text-slate-400">Angle: {dialAngle}°</div>
          </div>
        )}

        {stage === 2 && (
          <div className="text-center space-y-4 w-full">
            <p className="text-xs text-amber-200/80">Mechanism 2: Press Gems in order: Ruby (❤️) ➔ Emerald (💚) ➔ Sapphire (💙)</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => pressGem('ruby')}
                className="w-14 h-14 rounded-2xl bg-rose-600/30 border-2 border-rose-500 hover:bg-rose-600/50 flex items-center justify-center text-2xl active:scale-95 transition"
              >
                💎
              </button>
              <button
                onClick={() => pressGem('emerald')}
                className="w-14 h-14 rounded-2xl bg-emerald-600/30 border-2 border-emerald-500 hover:bg-emerald-600/50 flex items-center justify-center text-2xl active:scale-95 transition"
              >
                💚
              </button>
              <button
                onClick={() => pressGem('sapphire')}
                className="w-14 h-14 rounded-2xl bg-cyan-600/30 border-2 border-cyan-500 hover:bg-cyan-600/50 flex items-center justify-center text-2xl active:scale-95 transition"
              >
                🔷
              </button>
            </div>
            <div className="text-xs text-slate-400">
              Sequence: {gemSequence.join(' ➔ ') || 'None'}
            </div>
          </div>
        )}

        {stage === 3 && (
          <div className="text-center space-y-4 w-full px-6">
            <p className="text-xs text-amber-200/80">Mechanism 3: Slide Golden Deadbolt to unlock!</p>
            <div className="space-y-2">
              <input
                type="range"
                min={0}
                max={100}
                value={sliderVal}
                onChange={handleSliderChange}
                className="w-full accent-amber-400 h-3 bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="text-xs font-mono text-amber-300">{sliderVal}% Complete</div>
            </div>
          </div>
        )}

        {stage === 4 && (
          <div className="text-center space-y-3 py-4 animate-fadeIn">
            <div className="text-6xl animate-bounce">🎁✨</div>
            <h3 className="text-xl font-black text-amber-300">Mystery Box Opened!</h3>
            <p className="text-xs text-slate-300 max-w-xs mx-auto">
              You discovered the secret birthday treasure: Infinite happiness, great friendships, and endless celebrations!
            </p>
            <button
              onClick={resetBox}
              className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold px-5 py-2 rounded-xl text-xs transition"
            >
              Lock Again 🔄
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

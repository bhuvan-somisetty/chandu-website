import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { playCandleBlowSound, playCelebrationTune } from '../utils/audioSynth';
import { useAchievements } from '../context/AchievementContext';

export default function MicrophoneCandleBlower() {
  const [candles, setCandles] = useState([
    { id: 1, lit: true, flavor: 'Strawberry' },
    { id: 2, lit: true, flavor: 'Vanilla' },
    { id: 3, lit: true, flavor: 'Chocolate' },
    { id: 4, lit: true, flavor: 'Blueberry' },
    { id: 5, lit: true, flavor: 'Caramel' }
  ]);
  const [micActive, setMicActive] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [allExtinguished, setAllExtinguished] = useState(false);
  const [wishText, setWishText] = useState('');
  const [wishSubmitted, setWishSubmitted] = useState(false);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const streamRef = useRef(null);
  const animFrameRef = useRef(null);
  const { unlockAchievement } = useAchievements();

  const blowThreshold = 45;

  const extinguishCandle = (id) => {
    setCandles(prev => {
      const next = prev.map(c => c.id === id ? { ...c, lit: false } : c);
      const remaining = next.filter(c => c.lit).length;
      playCandleBlowSound();
      if (remaining === 0 && !allExtinguished) {
        setAllExtinguished(true);
        playCelebrationTune();
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
        unlockAchievement && unlockAchievement('candle_master');
      }
      return next;
    });
  };

  const blowRandomCandle = () => {
    const active = candles.filter(c => c.lit);
    if (active.length > 0) {
      const target = active[Math.floor(Math.random() * active.length)];
      extinguishCandle(target.id);
    }
  };

  const startMicrophone = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;
      const source = ctx.createMediaStreamSource(stream);
      source.connect(analyser);
      setMicActive(true);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      let blowCooldown = false;

      const detectBlow = () => {
        analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
        }
        const avg = sum / dataArray.length;
        setVolumeLevel(Math.min(100, Math.round(avg * 1.6)));

        if (avg > blowThreshold && !blowCooldown) {
          blowRandomCandle();
          blowCooldown = true;
          setTimeout(() => { blowCooldown = false; }, 400);
        }

        animFrameRef.current = requestAnimationFrame(detectBlow);
      };

      detectBlow();
    } catch (err) {
      console.warn('Microphone access denied or unsupported:', err);
      setMicActive(false);
    }
  };

  const stopMicrophone = () => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close();
    }
    setMicActive(false);
    setVolumeLevel(0);
  };

  useEffect(() => {
    return () => {
      stopMicrophone();
    };
  }, []);

  const resetCandles = () => {
    setCandles(prev => prev.map(c => ({ ...c, lit: true })));
    setAllExtinguished(false);
    setWishSubmitted(false);
  };

  return (
    <div className="bg-slate-900/80 backdrop-blur-xl border border-pink-500/20 rounded-3xl p-6 shadow-2xl text-center max-w-2xl mx-auto">
      <div className="inline-block px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 font-mono text-xs uppercase tracking-widest mb-3">
        Mic & Physics Interactive
      </div>
      <h2 className="text-3xl font-extrabold text-white mb-2">Birthday Candle Blower 🎂</h2>
      <p className="text-slate-300 text-sm mb-6">
        Make a secret wish and blow into your microphone (or tap the candles) to extinguish the flames!
      </p>

      {/* Cake Display */}
      <div className="relative w-72 h-60 mx-auto my-6 flex flex-col items-center justify-end">
        {/* Candles */}
        <div className="flex justify-center gap-6 mb-2 z-10">
          {candles.map((c) => (
            <div
              key={c.id}
              onClick={() => c.lit && extinguishCandle(c.id)}
              className="group cursor-pointer flex flex-col items-center transition-transform hover:scale-110"
              title={`Click or blow to extinguish ${c.flavor} candle`}
            >
              {/* Flame */}
              <div className="h-8 flex items-end justify-center">
                {c.lit ? (
                  <div className="relative w-4 h-7 bg-gradient-to-t from-amber-500 via-yellow-300 to-white rounded-full animate-bounce shadow-[0_0_15px_#f59e0b]">
                    <div className="absolute inset-0 bg-yellow-400 blur-sm rounded-full opacity-70 animate-pulse"></div>
                  </div>
                ) : (
                  <div className="w-1.5 h-4 bg-slate-500 rounded-full animate-fade-out opacity-60">
                    <span className="text-[10px] absolute -top-3 text-slate-400">💨</span>
                  </div>
                )}
              </div>
              {/* Wick */}
              <div className="w-0.5 h-2 bg-slate-800"></div>
              {/* Candle Body */}
              <div className="w-4 h-14 bg-gradient-to-b from-pink-400 via-purple-300 to-indigo-400 rounded-t-sm shadow-md border border-white/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-white/10 opacity-30 transform -skew-y-12"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Top Tier */}
        <div className="w-48 h-14 bg-gradient-to-r from-pink-400 via-rose-300 to-pink-500 rounded-t-2xl shadow-inner border-t-2 border-white/40 flex items-center justify-around px-4">
          <span className="text-sm">🍓</span>
          <span className="text-sm">✨</span>
          <span className="text-sm">🍓</span>
          <span className="text-sm">✨</span>
        </div>
        {/* Base Tier */}
        <div className="w-64 h-16 bg-gradient-to-r from-purple-600 via-indigo-500 to-purple-700 rounded-b-2xl shadow-2xl border-t-4 border-amber-300/40 flex items-center justify-center relative">
          <span className="text-amber-200 font-serif font-bold text-xs tracking-wider">★ HAPPY BIRTHDAY ★</span>
          {/* Plate */}
          <div className="absolute -bottom-3 w-72 h-4 bg-slate-200/90 rounded-full shadow-lg border border-slate-300"></div>
        </div>
      </div>

      {/* Mic Controls & Volume Meter */}
      <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-3">
            <button
              onClick={micActive ? stopMicrophone : startMicrophone}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                micActive
                  ? 'bg-rose-500 text-white shadow-lg animate-pulse'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold'
              }`}
            >
              {micActive ? '🎙️ Mic Active (Listening...)' : '🎙️ Enable Microphone Blow'}
            </button>
            <button
              onClick={blowRandomCandle}
              disabled={allExtinguished}
              className="px-3 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-40 text-white rounded-xl text-xs font-bold transition-all"
            >
              💨 Blow 1 Candle
            </button>
          </div>
          <button
            onClick={resetCandles}
            className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-medium rounded-xl transition-all"
          >
            🔄 Relight All
          </button>
        </div>

        {/* Volume Visualizer */}
        <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-700 relative">
          <div
            className="h-full bg-gradient-to-r from-emerald-400 via-amber-400 to-rose-500 transition-all duration-75"
            style={{ width: `${volumeLevel}%` }}
          ></div>
          <div className="absolute top-0 bottom-0 left-[45%] w-0.5 bg-rose-400" title="Blow Threshold"></div>
        </div>
        <div className="flex justify-between text-[10px] text-slate-400 mt-1">
          <span>Ambient Quiet</span>
          <span className="text-rose-400">Blow Threshold (45%)</span>
          <span>Max Volume</span>
        </div>
      </div>

      {/* Celebration & Wish Modal */}
      {allExtinguished && (
        <div className="bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-indigo-500/20 border border-pink-500/40 p-5 rounded-2xl animate-fade-in mb-4">
          <h3 className="text-xl font-bold text-amber-300 mb-1">🎉 All Candles Blown Out! 🎉</h3>
          <p className="text-slate-200 text-xs mb-3">May all your birthday wishes come true in 2026!</p>
          {!wishSubmitted ? (
            <div className="flex gap-2 max-w-md mx-auto">
              <input
                type="text"
                value={wishText}
                onChange={(e) => setWishText(e.target.value)}
                placeholder="Seal your secret wish here..."
                className="flex-1 bg-slate-950/80 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-pink-400"
              />
              <button
                onClick={() => { if (wishText.trim()) setWishSubmitted(true); }}
                className="px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold rounded-xl shadow-md"
              >
                ✨ Make Wish
              </button>
            </div>
          ) : (
            <div className="p-3 bg-pink-500/20 rounded-xl text-pink-200 text-xs font-serif italic">
              "✨ Your wish '{wishText}' has been released into the cosmos! ✨"
            </div>
          )}
        </div>
      )}
    </div>
  );
}

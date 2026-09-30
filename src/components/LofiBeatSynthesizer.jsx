import React, { useState } from 'react';
import { Music, Play, Square, Volume2 } from 'lucide-react';
import { playLofiChord, playSparkle } from '../utils/audioSynth';

export default function LofiBeatSynthesizer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timerId, setTimerId] = useState(null);

  const chords = [
    [261.63, 329.63, 392.00, 493.88], // Cmaj7
    [220.00, 261.63, 329.63, 392.00], // Amin7
    [174.61, 220.00, 261.63, 329.63], // Fmaj7
    [196.00, 246.94, 293.66, 349.23]  // G7
  ];

  const handleToggle = () => {
    if (isPlaying) {
      clearInterval(timerId);
      setIsPlaying(false);
      setTimerId(null);
    } else {
      setIsPlaying(true);
      playSparkle();
      let step = 0;
      const id = setInterval(() => {
        playLofiChord(chords[step % chords.length]);
        step++;
      }, 1600);
      setTimerId(id);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-white text-center">
      <h2 className="text-2xl font-bold flex items-center justify-center gap-2 mb-2">
        <Music className="w-6 h-6 text-indigo-300" /> Lo-Fi Birthday Chill Synthesizer
      </h2>
      <p className="text-xs text-white/70 mb-6">Peaceful Rhodes piano chords for relaxed birthday vibes</p>

      <button
        onClick={handleToggle}
        className={`px-8 py-3 rounded-full font-bold text-xs flex items-center gap-2 mx-auto transition-all shadow-xl ${
          isPlaying
            ? 'bg-rose-500 text-white animate-pulse'
            : 'bg-gradient-to-r from-indigo-500 to-pink-500 text-white hover:brightness-110'
        }`}
      >
        {isPlaying ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        {isPlaying ? 'Pause Lo-Fi Vibes' : 'Play Lo-Fi Chords ☕'}
      </button>
    </div>
  );
}

import React, { useState, useRef } from 'react';
import { Palette, Download, Sparkles, Heart } from 'lucide-react';
import { playSparkle, playFanfare } from '../../utils/audioSynth';
import { triggerPrideConfetti } from '../../utils/particles';
import { useAchievements } from '../../context/AchievementContext';

export default function CardCreator() {
  const [recipient, setRecipient] = useState('My Wonderful Friend');
  const [message, setMessage] = useState('Wishing you a year filled with radiant joy, health, and big dreams come true!');
  const [bgStyle, setBgStyle] = useState('from-pink-500 to-amber-400');
  const cardRef = useRef(null);
  const { unlockAchievement } = useAchievements();

  const handleDownload = () => {
    playFanfare();
    triggerPrideConfetti();
    unlockAchievement('card_downloaded');
    alert('Greeting Card ready! Screenshot or save your personalized card ✨');
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-white">
      <div className="flex items-center gap-2 mb-4">
        <Palette className="w-6 h-6 text-amber-400" />
        <h2 className="text-2xl font-bold">Custom Greeting Card Studio</h2>
      </div>

      <div className="space-y-3 mb-6">
        <div>
          <label className="text-xs font-semibold text-white/70 block mb-1">To</label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-sm text-white"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-white/70 block mb-1">Personal Birthday Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={2}
            className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-sm text-white"
          />
        </div>
      </div>

      {/* Card Preview */}
      <div
        ref={cardRef}
        className={`p-8 rounded-3xl bg-gradient-to-br ${bgStyle} text-white shadow-2xl border border-white/30 text-center my-6 relative overflow-hidden`}
      >
        <div className="text-3xl mb-2">🎂✨</div>
        <h3 className="text-2xl font-extrabold mb-2">Happy Birthday, {recipient}!</h3>
        <p className="text-sm font-medium text-white/95 max-w-md mx-auto mb-4 italic">
          "{message}"
        </p>
        <div className="text-xs font-bold text-white/80">From Your Good Friend ✨</div>
      </div>

      <div className="text-center">
        <button
          onClick={handleDownload}
          className="px-6 py-3 rounded-full bg-white text-slate-900 font-bold hover:bg-white/90 shadow-xl flex items-center gap-2 mx-auto transition-all transform hover:scale-105"
        >
          <Download className="w-4 h-4" /> Save Greeting Card
        </button>
      </div>
    </div>
  );
}

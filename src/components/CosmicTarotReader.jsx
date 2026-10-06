import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { playPop, playChime } from '../utils/audioSynth';

export default function CosmicTarotReader() {
  const [drawnCard, setDrawnCard] = useState(null);
  const [flipped, setFlipped] = useState(false);

  const cards = [
    { id: 1, name: 'The Star of Triumph', icon: '⭐', meaning: 'A luminous year of bold breakthroughs, shining confidence, and soaring achievements.', energy: 'Cosmic Radiance' },
    { id: 2, name: 'The Sun of Unbounded Joy', icon: '☀️', meaning: 'Endless laughter, vibrant warmth, and heartfelt memories that brighten every day.', energy: 'Solar Vitality' },
    { id: 3, name: 'The Chariot of Ambition', icon: '🚀', meaning: 'Unstoppable momentum driving you toward your loftiest aspirations with ease.', energy: 'Kinetic Drive' },
    { id: 4, name: 'The Magician of Creativity', icon: '🪄', meaning: 'The power to turn innovative ideas into magical realities through ingenuity.', energy: 'Artistic Alchemy' },
    { id: 5, name: 'The Empress of Abundance', icon: '👑', meaning: 'Overflowing blessings, loyal companions, peace of mind, and inner serenity.', energy: 'Celestial Grace' },
    { id: 6, name: 'The World of Milestones', icon: '🌍', meaning: 'A glorious celebration of personal evolution and the joyful start of an exciting new era.', energy: 'Infinite Horizon' }
  ];

  const drawCard = () => {
    setFlipped(false);
    playPop();
    setTimeout(() => {
      const random = cards[Math.floor(Math.random() * cards.length)];
      setDrawnCard(random);
      setFlipped(true);
      playChime();
      confetti({ particleCount: 70, spread: 60 });
    }, 300);
  };

  return (
    <div className="bg-slate-900/80 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-6 shadow-2xl max-w-xl mx-auto text-center">
      <div className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 font-mono text-xs uppercase tracking-widest mb-3">
        Mystic Celestial Oracle
      </div>
      <h2 className="text-3xl font-extrabold text-white mb-2">Cosmic Birthday Tarot 🔮</h2>
      <p className="text-slate-300 text-xs mb-6">
        Consult the astral cards for your official birthday prophecy and cosmic fortune!
      </p>

      {/* Tarot Card View */}
      <div className="relative w-64 h-96 mx-auto mb-6 perspective-1000">
        <div
          onClick={drawCard}
          className={`w-full h-full rounded-3xl cursor-pointer transition-all duration-700 transform-style-3d shadow-2xl border-2 flex flex-col items-center justify-center p-6 ${
            flipped && drawnCard
              ? 'bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-950 border-purple-400/60 text-white scale-105'
              : 'bg-gradient-to-br from-purple-900 via-indigo-950 to-slate-900 border-purple-500/30 text-purple-200 hover:scale-102'
          }`}
        >
          {flipped && drawnCard ? (
            <div className="animate-fade-in flex flex-col items-center justify-between h-full py-2">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-300">★ {drawnCard.energy} ★</span>
              <div className="text-6xl filter drop-shadow-[0_0_20px_#a855f7] my-auto">
                {drawnCard.icon}
              </div>
              <div>
                <h3 className="text-lg font-serif font-black text-amber-200 mb-1">{drawnCard.name}</h3>
                <p className="text-xs text-slate-300 font-serif leading-relaxed px-2">
                  "{drawnCard.meaning}"
                </p>
              </div>
              <span className="text-[10px] text-purple-400 font-mono">Tap to Draw Another Card</span>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <span className="text-5xl mb-3 animate-pulse">🌌</span>
              <h4 className="text-sm font-serif font-bold text-amber-300 mb-1">Celestial Deck</h4>
              <span className="text-[10px] text-slate-400 font-mono">Tap Deck to Unveil Prophecy</span>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={drawCard}
        className="px-6 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold text-xs shadow-lg hover:scale-105 transition-all"
      >
        ✨ Draw Cosmic Oracle Card
      </button>
    </div>
  );
}

import React, { useState } from 'react';
import BalloonPopper from '../components/games/BalloonPopper';
import CakeCatcherRunner from '../components/games/CakeCatcherRunner';
import BirthdayQuiz from '../components/games/BirthdayQuiz';
import CakeBaker from '../components/games/CakeBaker';
import FortuneCookie from '../components/games/FortuneCookie';
import GiftBoxUnboxer from '../components/games/GiftBoxUnboxer';
import ChimePiano from '../components/games/ChimePiano';
import MemoryMatchGame from '../components/games/MemoryMatchGame';
import WhackACakeGame from '../components/games/WhackACakeGame';
import DJBeatmaker from '../components/DJBeatmaker';
import { playPop } from '../utils/audioSynth';

export default function GamesPage() {
  const [activeTab, setActiveTab] = useState('catcher');

  const tabs = [
    { id: 'catcher', label: 'Cake Catcher 2D 🧁', component: CakeCatcherRunner },
    { id: 'balloon', label: 'Balloon Popper 🎈', component: BalloonPopper },
    { id: 'whack', label: 'Whack-A-Cake 🎂', component: WhackACakeGame },
    { id: 'memory', label: 'Memory Match 🃏', component: MemoryMatchGame },
    { id: 'dj', label: 'Party DJ Beat 🪩', component: DJBeatmaker },
    { id: 'cake', label: 'Cake Baker 🍰', component: CakeBaker },
    { id: 'quiz', label: 'Friendship Quiz 🧠', component: BirthdayQuiz },
    { id: 'fortune', label: 'Fortune Cookie 🥠', component: FortuneCookie },
    { id: 'gift', label: 'Gift Unboxer 🎁', component: GiftBoxUnboxer },
    { id: 'piano', label: 'Chime Piano 🎹', component: ChimePiano }
  ];

  const CurrentGame = tabs.find(t => t.id === activeTab)?.component || CakeCatcherRunner;

  return (
    <div className="pt-24 pb-20 px-4 max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-white mb-2">Birthday Games Arcade 🎮</h1>
        <p className="text-sm text-white/70">Play 10 interactive arcade mini-games, earn points, and unlock achievements!</p>
      </div>

      <div className="flex justify-center gap-2 mb-8 flex-wrap">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => { setActiveTab(t.id); playPop(); }}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
              activeTab === t.id
                ? 'bg-gradient-to-r from-amber-400 to-pink-500 text-slate-950 shadow-lg scale-105'
                : 'bg-white/10 text-white/80 hover:bg-white/20'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-4">
        <CurrentGame />
      </div>
    </div>
  );
}

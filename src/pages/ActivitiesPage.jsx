import React, { useState } from 'react';
import FireworksSandbox from '../components/activities/FireworksSandbox';
import ConstellationWish from '../components/activities/ConstellationWish';
import WishJar from '../components/activities/WishJar';
import PolaroidWall from '../components/activities/PolaroidWall';
import CardCreator from '../components/activities/CardCreator';
import FriendshipBingo from '../components/activities/FriendshipBingo';
import ComplimentGenerator from '../components/activities/ComplimentGenerator';
import SparklerCanvas from '../components/SparklerCanvas';
import OrigamiEnvelope from '../components/OrigamiEnvelope';
import SpeechWishReader from '../components/SpeechWishReader';
import ZodiacStarlight from '../components/ZodiacStarlight';
import { playPop } from '../utils/audioSynth';

export default function ActivitiesPage() {
  const [activeTab, setActiveTab] = useState('fireworks');

  const tabs = [
    { id: 'fireworks', label: 'Fireworks 🎆', comp: FireworksSandbox },
    { id: 'sparkler', label: 'Sparklers ✨', comp: SparklerCanvas },
    { id: 'envelope', label: 'Envelope 💌', comp: OrigamiEnvelope },
    { id: 'wishjar', label: 'Wish Jar 🏺', comp: WishJar },
    { id: 'speech', label: 'Voice Wish 🔊', comp: SpeechWishReader },
    { id: 'constellation', label: 'Stars 🌌', comp: ConstellationWish },
    { id: 'polaroids', label: 'Polaroids 📸', comp: PolaroidWall },
    { id: 'card', label: 'Card Studio 🖼️', comp: CardCreator },
    { id: 'zodiac', label: 'Aura 🔮', comp: ZodiacStarlight },
    { id: 'bingo', label: 'Bingo 🏆', comp: FriendshipBingo },
    { id: 'compliment', label: 'Vibes 💖', comp: ComplimentGenerator }
  ];

  const CurrentComp = tabs.find(t => t.id === activeTab)?.comp || FireworksSandbox;

  return (
    <div className="pt-24 pb-20 px-4 max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-white mb-2">Creative Studio & Activities ✨</h1>
        <p className="text-sm text-white/70">Explore 11 interactive celebration activities, lightshows, and memory tools!</p>
      </div>

      <div className="flex justify-center gap-2 mb-8 flex-wrap">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => { setActiveTab(t.id); playPop(); }}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
              activeTab === t.id
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105'
                : 'bg-white/10 text-white/80 hover:bg-white/20'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-4">
        <CurrentComp />
      </div>
    </div>
  );
}

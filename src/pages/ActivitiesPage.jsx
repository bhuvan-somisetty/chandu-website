import React, { useState } from 'react';
import FireworksSandbox from '../components/activities/FireworksSandbox';
import PhotoboothCamera from '../components/PhotoboothCamera';
import SoundEffectsPad from '../components/SoundEffectsPad';
import ShareableCard from '../components/ShareableCard';
import FriendshipTimeMachine from '../components/FriendshipTimeMachine';
import HoloCard3D from '../components/HoloCard3D';
import WishCloud from '../components/WishCloud';
import LofiBeatSynthesizer from '../components/LofiBeatSynthesizer';
import SparklerCanvas from '../components/SparklerCanvas';
import OrigamiEnvelope from '../components/OrigamiEnvelope';
import WishJar from '../components/activities/WishJar';
import SpeechWishReader from '../components/SpeechWishReader';
import ConstellationWish from '../components/activities/ConstellationWish';
import PolaroidWall from '../components/activities/PolaroidWall';
import CardCreator from '../components/activities/CardCreator';
import ZodiacStarlight from '../components/ZodiacStarlight';
import FriendshipBingo from '../components/activities/FriendshipBingo';
import ComplimentGenerator from '../components/activities/ComplimentGenerator';
import { playPop } from '../utils/audioSynth';

export default function ActivitiesPage() {
  const [activeTab, setActiveTab] = useState('photobooth');

  const tabs = [
    { id: 'sfxpad', label: 'Sound FX 📢', comp: SoundEffectsPad },
    { id: 'share', label: 'Share Card 🔗', comp: ShareableCard },
    { id: 'photobooth', label: 'Photobooth 📸', comp: PhotoboothCamera },
    { id: 'timemachine', label: 'Time Machine ⏳', comp: FriendshipTimeMachine },
    { id: 'holocard', label: 'Holo Card 👑', comp: HoloCard3D },
    { id: 'sparkler', label: 'Sparklers ✨', comp: SparklerCanvas },
    { id: 'fireworks', label: 'Fireworks 🎆', comp: FireworksSandbox },
    { id: 'envelope', label: 'Envelope 💌', comp: OrigamiEnvelope },
    { id: 'wishjar', label: 'Wish Jar 🏺', comp: WishJar },
    { id: 'wishcloud', label: 'Wish Cloud 💭', comp: WishCloud },
    { id: 'lofi', label: 'Lo-Fi Chill ☕', comp: LofiBeatSynthesizer },
    { id: 'speech', label: 'Voice Wish 🔊', comp: SpeechWishReader },
    { id: 'constellation', label: 'Stars 🌌', comp: ConstellationWish },
    { id: 'polaroids', label: 'Polaroids 🖼️', comp: PolaroidWall },
    { id: 'card', label: 'Card Studio 🎨', comp: CardCreator },
    { id: 'zodiac', label: 'Aura 🔮', comp: ZodiacStarlight },
    { id: 'bingo', label: 'Bingo 🏆', comp: FriendshipBingo },
    { id: 'compliment', label: 'Vibes 💖', comp: ComplimentGenerator }
  ];

  const CurrentComp = tabs.find(t => t.id === activeTab)?.comp || PhotoboothCamera;

  return (
    <div className="pt-24 pb-20 px-4 max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-white mb-2">Creative Studio & Activities ✨</h1>
        <p className="text-sm text-white/70">Explore 18 interactive celebration activities, studios, and memory tools!</p>
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

import React, { useState } from 'react';
import FireworksSandbox from '../components/activities/FireworksSandbox';
import PhotoboothCamera from '../components/PhotoboothCamera';
import PixelArtStudio from '../components/PixelArtStudio';
import CosmicStarfield from '../components/CosmicStarfield';
import CrystalBallProphecy from '../components/CrystalBallProphecy';
import PartyBeatSequencer from '../components/PartyBeatSequencer';
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
import MicrophoneCandleBlower from '../components/MicrophoneCandleBlower';
import ChimeHarp from '../components/ChimeHarp';
import PopUpCard3D from '../components/PopUpCard3D';
import LaserLightShow from '../components/LaserLightShow';
import CelebrationLeaderboard from '../components/CelebrationLeaderboard';
import NeonGlowSketcher from '../components/NeonGlowSketcher';
import MemoryCapsuleVault from '../components/MemoryCapsuleVault';
import InteractiveDrumKit from '../components/InteractiveDrumKit';
import BirthdayCertificateGenerator from '../components/BirthdayCertificateGenerator';
import SolarSystemOrbit from '../components/SolarSystemOrbit';
import AuraEnergyScanner from '../components/AuraEnergyScanner';
import ChiptuneJukebox from '../components/ChiptuneJukebox';
import FriendshipScroll from '../components/FriendshipScroll';
import EmojiReactionMatrix from '../components/EmojiReactionMatrix';
import ConstellationSkyMap from '../components/ConstellationSkyMap';
import CosmicTarotReader from '../components/CosmicTarotReader';
import KalimbaPlayer from '../components/KalimbaPlayer';
import PostcardStudio from '../components/PostcardStudio';
import MeteorShowerGarden from '../components/MeteorShowerGarden';
import { playPop } from '../utils/audioSynth';

export default function ActivitiesPage() {
  const [activeTab, setActiveTab] = useState('tarot');

  const tabs = [
    { id: 'tarot', label: 'Cosmic Tarot 🔮', comp: CosmicTarotReader },
    { id: 'kalimba', label: 'Kalimba Piano 🎶', comp: KalimbaPlayer },
    { id: 'postcard', label: 'Postcard Studio 💌', comp: PostcardStudio },
    { id: 'meteors', label: 'Meteor Garden 💫', comp: MeteorShowerGarden },
    { id: 'aura', label: 'Aura Scanner 🔮', comp: AuraEnergyScanner },
    { id: 'scroll', label: 'Golden Scroll 📜', comp: FriendshipScroll },
    { id: 'emojipop', label: 'Emoji Matrix 💥', comp: EmojiReactionMatrix },
    { id: 'skymap', label: 'Sky Map 🌌', comp: ConstellationSkyMap },
    { id: 'jukebox', label: '8-Bit Jukebox 🎶', comp: ChiptuneJukebox },
    { id: 'neonglow', label: 'Neon Sketch 🎨', comp: NeonGlowSketcher },
    { id: 'drumkit', label: 'Party Drums 🥁', comp: InteractiveDrumKit },
    { id: 'vault', label: 'Memory Vault ⏳', comp: MemoryCapsuleVault },
    { id: 'certificate', label: 'Award Diploma 📜', comp: BirthdayCertificateGenerator },
    { id: 'orbit', label: 'Cosmic Orbit 🌌', comp: SolarSystemOrbit },
    { id: 'candle', label: 'Blow Candles 🎂', comp: MicrophoneCandleBlower },
    { id: 'harp', label: 'Chime Harp 🎵', comp: ChimeHarp },
    { id: 'popupcard', label: '3D Pop-Up Card 💌', comp: PopUpCard3D },
    { id: 'lasers', label: 'Laser Show 🎆', comp: LaserLightShow },
    { id: 'halloffame', label: 'Hall of Fame 🏆', comp: CelebrationLeaderboard },
    { id: 'pixelart', label: 'Pixel Art 🎨', comp: PixelArtStudio },
    { id: 'starfield', label: 'Cosmic Stars 🌌', comp: CosmicStarfield },
    { id: 'crystal', label: 'Crystal Ball 🔮', comp: CrystalBallProphecy },
    { id: 'sequencer', label: 'Beat Sequencer 🎛️', comp: PartyBeatSequencer },
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

  const CurrentComp = tabs.find(t => t.id === activeTab)?.comp || CosmicTarotReader;

  return (
    <div className="pt-24 pb-20 px-4 max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-white mb-2">Creative Studio & Activities ✨</h1>
        <p className="text-sm text-white/70">Explore 41 interactive celebration activities, studios, and memory tools!</p>
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

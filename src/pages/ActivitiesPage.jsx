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
import ZenSandRaker from '../components/ZenSandRaker';
import NebulaPainter from '../components/NebulaPainter';
import UkuleleStrummer from '../components/UkuleleStrummer';
import { playPop } from '../utils/audioSynth';

export default function ActivitiesPage() {
  const [activeTab, setActiveTab] = useState('zen');

  const tabs = [
    { id: 'zen', label: 'Zen Sand Raker 🪨', comp: ZenSandRaker },
    { id: 'nebula', label: 'Nebula Painter 🌌', comp: NebulaPainter },
    { id: 'ukulele', label: 'Ukulele Strummer 🎸', comp: UkuleleStrummer },
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
    { id: 'holocard', label: 'Holo Card 3D ✨', comp: HoloCard3D },
    { id: 'wishcloud', label: 'Wish Cloud ☁️', comp: WishCloud },
    { id: 'lofi', label: 'Lofi Synthesizer 🎧', comp: LofiBeatSynthesizer },
    { id: 'sparkler', label: 'Sparkler Wand ✨', comp: SparklerCanvas },
    { id: 'envelope', label: 'Origami Envelope ✉️', comp: OrigamiEnvelope },
    { id: 'wishjar', label: 'Wish Jar 🏺', comp: WishJar },
    { id: 'speech', label: 'Voice Wishes 🎙️', comp: SpeechWishReader },
    { id: 'constellation', label: 'Constellation ⭐', comp: ConstellationWish },
    { id: 'polaroid', label: 'Polaroid Wall 🖼️', comp: PolaroidWall },
    { id: 'fireworks', label: 'Fireworks Sandbox 🎆', comp: FireworksSandbox },
    { id: 'cardcreator', label: 'Card Creator 🎨', comp: CardCreator },
    { id: 'zodiac', label: 'Zodiac Signs ♈', comp: ZodiacStarlight },
    { id: 'bingo', label: 'Birthday Bingo 🎱', comp: FriendshipBingo },
    { id: 'compliment', label: 'Compliments 💌', comp: ComplimentGenerator }
  ];

  const CurrentComponent = tabs.find(t => t.id === activeTab)?.comp || ZenSandRaker;

  return (
    <div className="pt-24 pb-20 px-4 max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-white mb-2">Celebration Activities 🎈</h1>
        <p className="text-sm text-white/70">Explore 44 interactive celebration activities, creative workshops, and musical instruments!</p>
      </div>

      <div className="flex justify-center gap-2 mb-8 flex-wrap">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => { setActiveTab(t.id); playPop(); }}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
              activeTab === t.id
                ? 'bg-gradient-to-r from-pink-500 to-indigo-600 text-white shadow-lg scale-105'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="transition-all duration-300">
        <CurrentComponent />
      </div>
    </div>
  );
}

import React from 'react';
import Hero from '../components/Hero';
import SpecialPoints from '../components/SpecialPoints';
import BalloonPopper from '../components/games/BalloonPopper';
import CakeBaker from '../components/games/CakeBaker';
import MemoryMatchGame from '../components/games/MemoryMatchGame';
import DJBeatmaker from '../components/DJBeatmaker';
import PolaroidWall from '../components/activities/PolaroidWall';
import OrigamiEnvelope from '../components/OrigamiEnvelope';
import FortuneCookie from '../components/games/FortuneCookie';
import WishJar from '../components/activities/WishJar';
import { Link } from 'react-router-dom';
import { Sparkles, Gift, Camera, MessageCircleHeart } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-20 pb-20">
      <Hero />
      <SpecialPoints />
      
      {/* Quick Play Arcade Section */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-white mb-2">Featured Party Games 🎮</h2>
          <p className="text-sm text-white/70">Jump right into the arcade games and live DJ beatmaker!</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <MemoryMatchGame />
          <DJBeatmaker />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <BalloonPopper />
          <CakeBaker />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4">
        <PolaroidWall />
      </section>

      <section className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        <OrigamiEnvelope />
        <WishJar />
      </section>
    </div>
  );
}

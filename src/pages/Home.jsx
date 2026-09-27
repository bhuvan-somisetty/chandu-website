import React from 'react';
import Hero from '../components/Hero';
import SpecialPoints from '../components/SpecialPoints';
import BalloonPopper from '../components/games/BalloonPopper';
import CakeBaker from '../components/games/CakeBaker';
import PolaroidWall from '../components/activities/PolaroidWall';
import FortuneCookie from '../components/games/FortuneCookie';
import WishJar from '../components/activities/WishJar';
import { Link } from 'react-router-dom';
import { Sparkles, Gift, Camera, MessageCircleHeart } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-20 pb-20">
      <Hero />
      <SpecialPoints />
      
      {/* Quick Play Highlight */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-white mb-2">Party Highlight Activities 🎮</h2>
          <p className="text-sm text-white/70">Jump right into the birthday games and interactive fun!</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <BalloonPopper />
          <CakeBaker />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4">
        <PolaroidWall />
      </section>

      <section className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        <FortuneCookie />
        <WishJar />
      </section>
    </div>
  );
}

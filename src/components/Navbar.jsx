import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Gift, Camera, MessageCircleHeart, Trophy, Menu, X } from 'lucide-react';
import SoundboardToggle from './SoundboardToggle';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { to: '/', label: 'Home', icon: Sparkles },
    { to: '/games', label: 'Games', icon: Gift },
    { to: '/activities', label: 'Activities', icon: Camera },
    { to: '/gallery', label: 'Memories', icon: Camera },
    { to: '/message', label: 'Wishes', icon: MessageCircleHeart },
    { to: '/achievements', label: 'Trophies', icon: Trophy }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-extrabold text-lg text-white">
          <span className="text-2xl">🎂</span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-rose-300 to-purple-300 font-sans">
            Birthday Fest
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  active ? 'bg-white/20 text-amber-300 ring-1 ring-amber-400/40 shadow-sm' : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Audio controller */}
        <div className="hidden md:flex items-center">
          <SoundboardToggle />
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <SoundboardToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-xl bg-white/10 text-white"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-slate-950/95 border-b border-white/10 px-4 py-4 space-y-2">
          {links.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setIsOpen(false)}
                className={`w-full px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2.5 ${
                  active ? 'bg-white/20 text-amber-300' : 'text-white/80 hover:bg-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}

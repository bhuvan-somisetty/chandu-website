import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Sparkles, Image, Compass, PartyPopper } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const location = useLocation();

  const links = [
    { to: '/', label: 'Home', icon: <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 relative z-10" /> },
    { to: '/journey', label: 'Journey', icon: <Compass className="w-4 h-4 sm:w-5 sm:h-5 relative z-10" /> },
    { to: '/gallery', label: 'Gallery', icon: <Image className="w-4 h-4 sm:w-5 sm:h-5 relative z-10" /> },
    { to: '/message', label: 'Wishes', icon: <PartyPopper className="w-4 h-4 sm:w-5 sm:h-5 relative z-10" /> },
  ];

  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed top-3 sm:top-5 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-md"
    >
      <div className="flex items-center justify-between bg-black/60 backdrop-blur-2xl rounded-full p-1.5 sm:p-2 border border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        {links.map((link) => {
          const isActive = location.pathname === link.to;

          return (
            <NavLink
              key={link.to}
              to={link.to}
              className={`relative flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-2 px-2 sm:px-3.5 rounded-full transition-colors duration-300 flex-1 ${
                isActive ? 'text-white' : 'text-gray-400 hover:text-pink-300'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute inset-0 bg-gradient-to-r from-pink-500/70 via-purple-600/70 to-indigo-600/70 rounded-full shadow-[0_0_20px_rgba(236,72,153,0.4)] border border-pink-400/40 z-0"
                  initial={false}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {link.icon}
              <span className="text-[10px] sm:text-xs font-semibold tracking-wider relative z-10">
                {link.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </motion.nav>
  );
}

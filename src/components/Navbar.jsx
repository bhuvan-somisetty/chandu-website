import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Sparkles, Image, Heart, PartyPopper } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const location = useLocation();

  const links = [
    { to: '/', label: 'Home', icon: <Sparkles className="w-5 h-5 relative z-10" /> },
    { to: '/journey', label: 'Journey', icon: <Heart className="w-5 h-5 relative z-10" /> },
    { to: '/gallery', label: 'Gallery', icon: <Image className="w-5 h-5 relative z-10" /> },
    { to: '/message', label: 'Message', icon: <PartyPopper className="w-5 h-5 relative z-10" /> },
  ];

  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4"
    >
      <div className="flex items-center justify-between bg-black/40 backdrop-blur-xl rounded-full p-2 border border-white/20 shadow-[0_0_20px_rgba(192,38,211,0.3)]">
        {links.map((link) => {
          const isActive = location.pathname === link.to;

          return (
            <NavLink
              key={link.to}
              to={link.to}
              className={`relative flex flex-col items-center justify-center p-2 sm:p-3 sm:px-4 rounded-full transition-colors duration-300 w-1/4 ${
                isActive ? 'text-white' : 'text-gray-400 hover:text-pink-300'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute inset-0 bg-gradient-to-r from-pink-600/60 to-purple-600/60 rounded-full shadow-[0_0_15px_rgba(236,72,153,0.5)] border border-pink-400/50 z-0"
                  initial={false}
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              {link.icon}
              <span className="text-[10px] sm:text-xs uppercase font-bold tracking-widest mt-1 relative z-10 hidden sm:block">
                {link.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </motion.nav>
  );
}

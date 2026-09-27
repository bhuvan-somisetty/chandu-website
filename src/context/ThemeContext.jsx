import React, { createContext, useContext, useState, useEffect } from 'react';
import { KEYS, getStoredItem, setStoredItem } from '../utils/storage';

export const THEMES = {
  sunset: {
    id: 'sunset',
    name: 'Sunset Glow',
    icon: '🌅',
    bgGradient: 'from-amber-950 via-rose-950 to-purple-950',
    accentColor: '#f43f5e',
    secondaryColor: '#fb923c',
    cardBg: 'rgba(255, 255, 255, 0.05)',
    cardBorder: 'rgba(244, 63, 94, 0.25)',
    textColor: 'text-rose-100',
    buttonGradient: 'from-rose-500 via-pink-500 to-amber-500'
  },
  midnight: {
    id: 'midnight',
    name: 'Midnight Starlight',
    icon: '🌌',
    bgGradient: 'from-slate-950 via-indigo-950 to-slate-900',
    accentColor: '#6366f1',
    secondaryColor: '#38bdf8',
    cardBg: 'rgba(255, 255, 255, 0.04)',
    cardBorder: 'rgba(99, 102, 241, 0.25)',
    textColor: 'text-indigo-100',
    buttonGradient: 'from-indigo-500 via-purple-500 to-sky-500'
  },
  cyberpunk: {
    id: 'cyberpunk',
    name: 'Cyber Neon Fest',
    icon: '⚡',
    bgGradient: 'from-zinc-950 via-purple-950 to-fuchsia-950',
    accentColor: '#d946ef',
    secondaryColor: '#06b6d4',
    cardBg: 'rgba(255, 255, 255, 0.05)',
    cardBorder: 'rgba(217, 70, 239, 0.3)',
    textColor: 'text-fuchsia-100',
    buttonGradient: 'from-fuchsia-500 via-cyan-500 to-pink-500'
  },
  emerald: {
    id: 'emerald',
    name: 'Emerald Blossom',
    icon: '🌿',
    bgGradient: 'from-emerald-950 via-teal-950 to-slate-950',
    accentColor: '#10b981',
    secondaryColor: '#14b8a6',
    cardBg: 'rgba(255, 255, 255, 0.05)',
    cardBorder: 'rgba(16, 185, 129, 0.25)',
    textColor: 'text-emerald-100',
    buttonGradient: 'from-emerald-500 via-teal-500 to-cyan-500'
  },
  rosegold: {
    id: 'rosegold',
    name: 'Rose Gold Luxury',
    icon: '✨',
    bgGradient: 'from-rose-950 via-pink-950 to-amber-950',
    accentColor: '#fb7185',
    secondaryColor: '#f59e0b',
    cardBg: 'rgba(255, 255, 255, 0.06)',
    cardBorder: 'rgba(251, 113, 133, 0.25)',
    textColor: 'text-rose-100',
    buttonGradient: 'from-rose-400 via-amber-400 to-pink-400'
  },
  pastel: {
    id: 'pastel',
    name: 'Pastel Dream',
    icon: '🌸',
    bgGradient: 'from-purple-950 via-pink-950 to-sky-950',
    accentColor: '#ec4899',
    secondaryColor: '#8b5cf6',
    cardBg: 'rgba(255, 255, 255, 0.05)',
    cardBorder: 'rgba(236, 72, 153, 0.25)',
    textColor: 'text-pink-100',
    buttonGradient: 'from-pink-400 via-purple-400 to-indigo-400'
  }
};

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState(() => {
    return getStoredItem(KEYS.THEME, 'sunset');
  });

  useEffect(() => {
    setStoredItem(KEYS.THEME, currentTheme);
  }, [currentTheme]);

  const themeData = THEMES[currentTheme] || THEMES.sunset;

  return (
    <ThemeContext.Provider value={{ currentTheme, setCurrentTheme, themeData, THEMES }}>
      <div className={`min-h-screen bg-gradient-to-br ${themeData.bgGradient} transition-colors duration-500 text-white font-sans`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

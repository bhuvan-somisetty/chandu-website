import React, { createContext, useContext, useState, useEffect } from 'react';
import { KEYS, getStoredItem, setStoredItem } from '../utils/storage';
import { playSparkle } from '../utils/audioSynth';

export const ALL_ACHIEVEMENTS = [
  { id: 'first_visit', title: 'Party Starter 🎉', desc: 'Arrived at the birthday celebration!', icon: '✨', points: 10 },
  { id: 'confetti_master', title: 'Confetti Rainmaker 🎊', desc: 'Triggered 5 confetti celebrations', icon: '🌟', points: 25 },
  { id: 'balloon_popper', title: 'Pop Master 🎈', desc: 'Popped 10 floating balloons in the mini-game', icon: '🎯', points: 30 },
  { id: 'quiz_champ', title: 'Trivia Genius 🧠', desc: 'Completed the friendship quiz', icon: '🏆', points: 50 },
  { id: 'cake_designer', title: 'Master Baker 🎂', desc: 'Baked and customized a special birthday cake', icon: '🍰', points: 40 },
  { id: 'candle_blower', title: 'Wish Maker 🕯️', desc: 'Blew out all birthday candles', icon: '🔥', points: 35 },
  { id: 'fortune_cracked', title: 'Destiny Seeker 🥠', desc: 'Cracked open a birthday fortune cookie', icon: '🔮', points: 20 },
  { id: 'gift_unboxed', title: 'Mystery Unboxer 🎁', desc: 'Opened a mystery celebration gift box', icon: '📦', points: 25 },
  { id: 'piano_maestro', title: 'Chime Virtuoso 🎵', desc: 'Played a melody on the chime piano', icon: '🎹', points: 30 },
  { id: 'wish_placed', title: 'Heartfelt Friend 💌', desc: 'Dropped a memory into the glowing wish jar', icon: '🏺', points: 30 },
  { id: 'fireworks_sparked', title: 'Pyrotechnic Star 🎆', desc: 'Launched a custom fireworks lightshow', icon: '🎇', points: 35 },
  { id: 'theme_explorer', title: 'Chameleon Stylist 🎨', desc: 'Tried 3 different celebratory themes', icon: '🌈', points: 20 },
  { id: 'bingo_winner', title: 'Friendship Legend ⭐', desc: 'Marked 5 tiles on the friendship bingo card', icon: '🏅', points: 45 },
  { id: 'card_downloaded', title: 'Card Artisan 🖼️', desc: 'Designed and saved a greeting card', icon: '🖌️', points: 50 }
];

const AchievementContext = createContext();

export function AchievementProvider({ children }) {
  const [unlocked, setUnlocked] = useState(() => {
    const saved = getStoredItem(KEYS.ACHIEVEMENTS, ['first_visit']);
    return Array.isArray(saved) ? saved : ['first_visit'];
  });

  const [recentUnlock, setRecentUnlock] = useState(null);

  useEffect(() => {
    setStoredItem(KEYS.ACHIEVEMENTS, unlocked);
  }, [unlocked]);

  const unlockAchievement = (id) => {
    if (!unlocked.includes(id)) {
      const ach = ALL_ACHIEVEMENTS.find(a => a.id === id);
      if (ach) {
        setUnlocked(prev => [...prev, id]);
        setRecentUnlock(ach);
        playSparkle();
        setTimeout(() => {
          setRecentUnlock(null);
        }, 4000);
      }
    }
  };

  const totalPoints = unlocked.reduce((sum, id) => {
    const item = ALL_ACHIEVEMENTS.find(a => a.id === id);
    return sum + (item ? item.points : 0);
  }, 0);

  return (
    <AchievementContext.Provider value={{ unlocked, unlockAchievement, recentUnlock, totalPoints, ALL_ACHIEVEMENTS }}>
      {children}
    </AchievementContext.Provider>
  );
}

export function useAchievements() {
  const context = useContext(AchievementContext);
  if (!context) {
    throw new Error('useAchievements must be used within AchievementProvider');
  }
  return context;
}

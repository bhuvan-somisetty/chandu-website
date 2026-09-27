import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, X, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAchievements } from '../context/AchievementContext';
import { playSparkle } from '../utils/audioSynth';

export default function ThemeSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentTheme, setCurrentTheme, THEMES } = useTheme();
  const { unlockAchievement } = useAchievements();
  const [themesTried, setThemesTried] = useState(new Set([currentTheme]));

  const handleSelectTheme = (themeId) => {
    setCurrentTheme(themeId);
    playSparkle();
    const updated = new Set(themesTried).add(themeId);
    setThemesTried(updated);
    if (updated.size >= 3) {
      unlockAchievement('theme_explorer');
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 shadow-lg text-white transition-all transform hover:scale-105 active:scale-95"
        title="Customize Theme"
      >
        <Palette className="w-5 h-5 text-amber-300" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-md bg-slate-900/90 border border-white/20 rounded-3xl p-6 shadow-2xl relative text-white"
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <Palette className="w-6 h-6 text-pink-400" />
                  <h3 className="text-xl font-bold">Celebration Themes</h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {Object.values(THEMES).map(t => {
                  const isSelected = currentTheme === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => handleSelectTheme(t.id)}
                      className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between relative overflow-hidden bg-gradient-to-br ${t.bgGradient} ${
                        isSelected ? 'border-amber-400 ring-2 ring-amber-400/50 scale-[1.02]' : 'border-white/10 hover:border-white/30'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-2xl">{t.icon}</span>
                        <div>
                          <div className="font-semibold text-sm">{t.name}</div>
                          <div className="text-[10px] text-white/60">Color Palette</div>
                        </div>
                      </div>
                      {isSelected && (
                        <div className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center">
                          <Check className="w-4 h-4 font-bold" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 text-center text-xs text-white/60">
                Choose any aesthetic mood to personalize your birthday celebration ✨
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

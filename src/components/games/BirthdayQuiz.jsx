import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, CheckCircle, Award, RotateCcw, Sparkles } from 'lucide-react';
import { playSparkle, playFanfare } from '../../utils/audioSynth';
import { triggerPrideConfetti } from '../../utils/particles';
import { useAchievements } from '../../context/AchievementContext';

const QUESTIONS = [
  {
    q: 'What is the absolute best way to celebrate a fantastic birthday?',
    options: ['Laughter, music & endless cake 🎂', 'Quiet naps with cute pets 🐱', 'Epic dance parties with friends 💃', 'All of the above! 🎉'],
    correct: 3,
    note: 'Every way is the right way when celebrating someone amazing!'
  },
  {
    q: 'What superpower does a true best friend have?',
    options: ['Making you laugh when you need it most', 'Always sharing their snacks', 'Telepathic understanding', 'All of these superpowers!'],
    correct: 3,
    note: 'Best friends are real-life superheroes!'
  },
  {
    q: 'What is the key ingredient to an unforgettable celebration?',
    options: ['Extra frosting on the cake', 'Good vibes and wholesome memories', 'Confetti and sparkly lights', 'Awesome friends like you!'],
    correct: 3,
    note: 'Your positive energy makes every day brighter!'
  },
  {
    q: 'What is the official birthday wish rule?',
    options: ['Keep it secret so it comes true 🤫', 'Make at least three giant wishes ✨', 'Share positive vibes with everyone 💖', 'Wish for infinite happiness! 🌟'],
    correct: 3,
    note: 'May all your greatest wishes come true this year!'
  }
];

export default function BirthdayQuiz() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const { unlockAchievement } = useAchievements();

  const handleSelect = (idx) => {
    if (selectedOpt !== null) return;
    setSelectedOpt(idx);
    playSparkle();
    if (idx === QUESTIONS[currentIdx].correct) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < QUESTIONS.length) {
      setCurrentIdx(c => c + 1);
      setSelectedOpt(null);
    } else {
      setFinished(true);
      playFanfare();
      triggerPrideConfetti();
      unlockAchievement('quiz_champ');
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setScore(0);
    setFinished(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-white">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Brain className="w-6 h-6 text-purple-400" />
          <h2 className="text-2xl font-bold">Friendship & Birthday Trivia</h2>
        </div>
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/10 border border-white/20">
          Question {currentIdx + 1} / {QUESTIONS.length}
        </span>
      </div>

      {!finished ? (
        <div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-5">
            <h3 className="text-lg font-semibold">{QUESTIONS[currentIdx].q}</h3>
          </div>

          <div className="space-y-3 mb-6">
            {QUESTIONS[currentIdx].options.map((opt, idx) => {
              const isSelected = selectedOpt === idx;
              const isCorrect = idx === QUESTIONS[currentIdx].correct;
              let btnStyle = 'bg-white/5 border-white/10 hover:bg-white/10';

              if (selectedOpt !== null) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-500/40 shadow-lg border-emerald-400 text-emerald-200';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-500/30 border-rose-400 text-rose-200';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  className={`w-full p-4 rounded-xl border text-left transition-all font-medium flex items-center justify-between ${btnStyle}`}
                >
                  <span>{opt}</span>
                  {selectedOpt !== null && isCorrect && <CheckCircle className="w-5 h-5 text-emerald-400" />}
                </button>
              );
            })}
          </div>

          {selectedOpt !== null && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-between items-center pt-2"
            >
              <div className="text-xs text-white/70 italic max-w-sm">
                💡 {QUESTIONS[currentIdx].note}
              </div>
              <button
                onClick={handleNext}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:brightness-110 shadow-lg transition-all"
              >
                {currentIdx + 1 === QUESTIONS.length ? 'See Results' : 'Next Question →'}
              </button>
            </motion.div>
          )}
        </div>
      ) : (
        <div className="text-center py-6">
          <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-amber-400 to-pink-500 flex items-center justify-center text-3xl shadow-lg">
            🏆
          </div>
          <h3 className="text-2xl font-extrabold mb-1">Trivia Completed!</h3>
          <p className="text-sm text-white/80 mb-4">
            You scored {score} out of {QUESTIONS.length}! You are truly a celebration legend ✨
          </p>
          <button
            onClick={handleRestart}
            className="px-6 py-3 rounded-full bg-white/20 hover:bg-white/30 border border-white/30 font-bold text-white transition-all flex items-center gap-2 mx-auto"
          >
            <RotateCcw className="w-4 h-4" /> Play Again
          </button>
        </div>
      )}
    </div>
  );
}

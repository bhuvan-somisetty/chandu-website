import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Sparkles, Star, Heart, Flame, Trophy } from 'lucide-react';
import { useHeartNavigation } from '../context/NavigationContext';

const milestones = [
  {
    badge: "Chapter 1",
    icon: <Sparkles className="w-5 h-5 text-yellow-300" />,
    title: "The First Hello",
    text: "From simple beginnings to discovering an instant connection. It didn't take long to realize this was the start of an awesome friendship."
  },
  {
    badge: "Chapter 2",
    icon: <Flame className="w-5 h-5 text-orange-400" />,
    title: "Non-Stop Laughter & Chaos",
    text: "Endless jokes, relatable rants, sharing random thoughts, and laughing at the silliest things. Never a dull moment together!"
  },
  {
    badge: "Chapter 3",
    icon: <Star className="w-5 h-5 text-cyan-300" />,
    title: "Always In Your Corner",
    text: "Through every stressful day, big decision, and proud victory—having a true friend to talk to made everything easier and brighter."
  },
  {
    badge: "Chapter 4",
    icon: <Heart className="w-5 h-5 text-pink-400" />,
    title: "An Unshakeable Bond",
    text: "No matter how busy life gets or where each day takes us, our friendship stays rock solid, genuine, and always full of good vibes."
  },
  {
    badge: "Chapter 5",
    icon: <Trophy className="w-5 h-5 text-emerald-400" />,
    title: "Stepping into Another Epic Year",
    text: "Here’s to another fantastic year filled with happiness, new milestones, great memories, and continued success. The best is yet to come!"
  }
];

export default function JourneyPage() {
  const { navigateWithHeart } = useHeartNavigation();

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
      className="min-h-[100dvh] pt-24 sm:pt-28 pb-24 px-4 sm:px-6 md:px-12 relative overflow-hidden"
    >
      {/* Background ambient blurs */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-purple-600/20 rounded-full filter blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-pink-600/20 rounded-full filter blur-[100px] pointer-events-none"></div>

      <div className="max-w-3xl mx-auto relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold uppercase tracking-widest mb-4">
            Memories & Milestones
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-200 mb-3 drop-shadow-md tracking-tight">
            Our Friendship Journey
          </h2>
          <p className="text-gray-300 text-sm sm:text-lg font-light max-w-lg mx-auto">
            A celebration of shared laughs, solid trust, and the best memories.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative border-l-2 border-purple-500/30 ml-3 sm:ml-6 md:ml-8 space-y-8 sm:space-y-10">
          {milestones.map((milestone, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-40px" }}
              className="relative pl-6 sm:pl-10 md:pl-12"
            >
              {/* Timeline Indicator Dot */}
              <div className="absolute w-4 h-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 -left-[9px] top-4 shadow-[0_0_15px_#ec4899] ring-4 ring-[#0f0c29]"></div>
              
              {/* Timeline Card */}
              <div className="group backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-7 hover:bg-white/10 hover:border-pink-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(236,72,153,0.15)] relative overflow-hidden">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs sm:text-sm font-bold text-pink-300 uppercase tracking-widest">
                    {milestone.badge}
                  </span>
                  <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                    {milestone.icon}
                  </div>
                </div>
                
                <h3 className="text-lg sm:text-2xl font-bold text-white mb-2 group-hover:text-pink-200 transition-colors">
                  {milestone.title}
                </h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-light">
                  {milestone.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Next Page Navigation CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 sm:mt-16 flex justify-center w-full"
        >
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => navigateWithHeart('/gallery')}
            className="group px-8 py-3.5 sm:py-4 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white font-bold tracking-wider text-sm sm:text-base rounded-full shadow-[0_0_25px_rgba(236,72,153,0.35)] hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] transition-all flex items-center gap-3"
          >
            <span>Next: Photo Gallery</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>

      </div>
    </motion.div>
  );
}

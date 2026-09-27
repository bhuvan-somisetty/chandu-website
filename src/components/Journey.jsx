import React from 'react';
import { motion } from 'framer-motion';

const milestones = [
  { year: "Chapter 1", title: "The First Hello", text: "From strangers crossing paths to realizing we share an awesome wavelength." },
  { year: "Chapter 2", title: "Endless Laughter", text: "Inside jokes, non-stop banter, and sharing random rants about everything." },
  { year: "Chapter 3", title: "Through Every High & Low", text: "Supporting each other through challenges and celebrating every victory together." },
  { year: "Chapter 4", title: "Rock Solid Friendship", text: "Distance and busy schedules mean nothing—true friendship that never fades." },
  { year: "Chapter 5", title: "Cheers to Many More Years", text: "Stepping into another fantastic year filled with happiness, growth, and epic memories!" }
];

export default function Journey() {
  return (
    <section className="py-20 px-4 md:px-12 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-200 mb-3 drop-shadow-md">
            Our Friendship Journey ✨
          </h2>
          <p className="text-gray-300 text-sm sm:text-base font-light">A timeline of wonderful memories and great milestones.</p>
        </motion.div>

        <div className="relative border-l-2 border-purple-500/30 ml-4 md:ml-8 space-y-10">
          {milestones.map((milestone, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true, margin: "-40px" }}
              className="relative pl-7 md:pl-12"
            >
              {/* Timeline Dot */}
              <div className="absolute w-4 h-4 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 -left-[9px] top-1.5 shadow-[0_0_10px_#ec4899]"></div>
              
              <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 hover:bg-white/10 transition-colors">
                <span className="text-xs sm:text-sm font-bold text-pink-400 uppercase tracking-widest block mb-2">{milestone.year}</span>
                <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">{milestone.title}</h3>
                <p className="text-gray-300 leading-relaxed font-light text-sm sm:text-base">{milestone.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

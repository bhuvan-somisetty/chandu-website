import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useHeartNavigation } from '../context/NavigationContext';

const milestones = [
  { year: "Year 1", title: "The Beautiful Beginning", text: "Two strangers crossing paths, little did we know it was the start of something forever." },
  { year: "Year 2", title: "Shared Secrets & Smiles", text: "The late-night talks, the endless laughter, and realizing we were two parts of the same soul." },
  { year: "Year 3", title: "Through Every Storm", text: "Holding each other up when things got tough. You became my safest place." },
  { year: "Year 4", title: "More Than Friends", text: "Distance and time meant nothing. The friendship morphed into an unbreakable family bond." },
  { year: "Year 5", title: "Still Going Strong", text: "Running into our 5th year! To more chaos, more love, and sticking together no matter what. I love you!" }
];

export default function JourneyPage() {
  const { navigateWithHeart } = useHeartNavigation();
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen pt-24 pb-20 px-6 md:px-12 relative overflow-hidden"
    >
      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 mb-4 drop-shadow-[0_0_15px_rgba(236,72,153,0.4)]">
            Our Timeline
          </h2>
          <p className="text-pink-200 text-lg md:text-xl font-light">From strangers to absolute soulmates.</p>
        </motion.div>

        <div className="relative border-l-2 border-purple-500/30 ml-4 md:ml-8 space-y-12">
          {milestones.map((milestone, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true, margin: "-50px" }}
              className="relative pl-8 md:pl-12"
            >
              {/* Glowing Dot */}
              <div className="absolute w-4 h-4 rounded-full bg-pink-500 -left-[9px] top-1.5 shadow-[0_0_15px_#ec4899] animate-pulse"></div>
              
              <div className="group backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-pink-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(236,72,153,0.15)] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="text-sm font-black text-pink-400 uppercase tracking-[0.2em] block mb-3 relative z-10">{milestone.year}</span>
                <h3 className="text-2xl font-bold text-white mb-3 relative z-10">{milestone.title}</h3>
                <p className="text-gray-300 text-lg leading-relaxed font-light relative z-10 group-hover:text-white transition-colors">{milestone.text}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 flex justify-center w-full"
        >
          <button
            onClick={() => navigateWithHeart('/gallery')}
            className="group relative px-8 py-4 bg-white/5 backdrop-blur-md rounded-full border border-white/20 text-white font-medium tracking-widest text-lg shadow-[0_0_30px_rgba(192,38,211,0.3)] hover:shadow-[0_0_50px_rgba(236,72,153,0.5)] transition-all flex items-center gap-3 overflow-hidden"
          >
            <span className="relative z-10 transition-transform group-hover:-translate-x-1">Next: Gallery</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 group-hover:translate-x-1 transition-transform"><path d="m9 18 6-6-6-6"/></svg>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}

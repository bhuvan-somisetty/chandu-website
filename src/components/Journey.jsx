import React from 'react';
import { motion } from 'framer-motion';

const milestones = [
  { year: "Year 1", title: "The Beginning", text: "When strangers became friends. 5 years ago, our story started." },
  { year: "Year 2", title: "Growing Closer", text: "Endless talks, shared secrets, and realizing we are basically the same person." },
  { year: "Year 3", title: "Through Thick & Thin", text: "Supporting each other through the lowest lows and celebrating the highest highs." },
  { year: "Year 4", title: "Unbreakable Bond", text: "Distance or time couldn't fade what we built. The friendship turned into family." },
  { year: "Year 5", title: "Forever Besties", text: "5 years completed! Here's to stepping into our 6th year of absolute madness and love." }
];

export default function Journey() {
  return (
    <section className="py-24 px-6 md:px-12 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            Our 5-Year Journey 🚀
          </h2>
          <p className="text-pink-300 text-lg">A timeline of our beautiful friendship.</p>
        </motion.div>

        <div className="relative border-l-2 border-purple-500/30 ml-4 md:ml-8 space-y-12">
          {milestones.map((milestone, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true, margin: "-50px" }}
              className="relative pl-8 md:pl-12"
            >
              {/* Timeline Dot */}
              <div className="absolute w-4 h-4 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 -left-[9px] top-1.5 shadow-[0_0_10px_#ec4899]"></div>
              
              <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                <span className="text-sm font-bold text-pink-400 uppercase tracking-widest block mb-2">{milestone.year}</span>
                <h3 className="text-2xl font-semibold text-white mb-2">{milestone.title}</h3>
                <p className="text-gray-300 leading-relaxed font-light">{milestone.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const traits = [
  "Your beautiful, genuine smile that lights up the room.",
  "How you always listen, even to my craziest rants.",
  "Your strength and how you handle everything life throws at you.",
  "The fun, chaotic energy you bring into my life.",
  "Your pure heart and how deeply you care for people you love."
];

export default function SpecialPoints() {
  return (
    <section className="py-24 px-6 md:px-12 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-pink-300 to-purple-300">
            Why You Are Special To Me ✨
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {traits.map((trait, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              viewport={{ once: true }}
              className={`flex items-start gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors shadow-lg ${index === traits.length - 1 ? 'md:col-span-2 md:w-1/2 md:mx-auto' : ''}`}
            >
              <div className="mt-1 flex-shrink-0 animate-pulse-glow">
                <Star className="text-yellow-300 w-6 h-6 fill-yellow-300/50" />
              </div>
              <p className="text-gray-200 text-lg font-light leading-relaxed">
                {trait}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

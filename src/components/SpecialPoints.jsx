import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const traits = [
  "Your bright, genuine smile that brings instant cheer.",
  "How you're always there to listen and share honest advice.",
  "Your resilience, confidence, and how you handle challenges with grace.",
  "The fun, unmatched energy and laughter you bring to every conversation.",
  "Your kind, authentic heart and how caring you are as a true friend."
];

export default function SpecialPoints() {
  return (
    <section className="py-20 px-4 md:px-12 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-pink-300 to-purple-300">
            Why You're An Amazing Friend ✨
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
          {traits.map((trait, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className={`flex items-start gap-4 p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors shadow-lg ${index === traits.length - 1 ? 'md:col-span-2 md:w-2/3 md:mx-auto' : ''}`}
            >
              <div className="mt-1 flex-shrink-0 animate-pulse-glow">
                <Star className="text-yellow-300 w-5 h-5 fill-yellow-300/50" />
              </div>
              <p className="text-gray-200 text-sm sm:text-base font-light leading-relaxed">
                {trait}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

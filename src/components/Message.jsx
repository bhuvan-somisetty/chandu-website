import React from 'react';
import { motion } from 'framer-motion';

export default function Message() {
  return (
    <section className="py-24 px-6 md:px-20 max-w-4xl mx-auto flex flex-col items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        className="backdrop-blur-lg bg-white/5 p-8 md:p-12 rounded-3xl shadow-[0_0_40px_rgba(192,38,211,0.15)] border border-white/10"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-purple-300">
          To My Beautiful Bestie,
        </h2>
        <div className="space-y-6 text-lg md:text-xl text-gray-200 leading-relaxed font-light">
          <p>
            Five years. Can you believe it? We've completed 5 amazing years and are now stepping into our 6th year of this beautiful chaos we call friendship.
          </p>
          <p>
            Through all the highs and lows, the crazy memories, the endless laughter, and having each other's back, you've been my constant. I couldn't have asked for a better friend to navigate life with.
          </p>
          <p>
            Today, on your special day, I want to remind you of how incredibly special you are to me. Thank you for being you, for your beautiful heart, and for a lifelong bond I'll formally cherish forever. 
          </p>
          <p className="text-xl font-medium text-pink-300 mt-4">
            Happy Birthday, Chandu! 🎂💖
          </p>
        </div>
      </motion.div>
    </section>
  );
}

import React from 'react';
import { motion } from 'framer-motion';

export default function Message() {
  return (
    <section className="py-20 px-4 md:px-20 max-w-4xl mx-auto flex flex-col items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
        className="backdrop-blur-xl bg-white/5 p-6 sm:p-10 md:p-12 rounded-3xl shadow-[0_0_40px_rgba(192,38,211,0.15)] border border-white/10"
      >
        <h2 className="text-2xl sm:text-4xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-200">
          To Manvitha ✨
        </h2>
        <div className="space-y-5 text-base sm:text-lg text-gray-200 leading-relaxed font-light">
          <p>
            Happy Birthday Manvitha! Today is all about celebrating you—your vibrant smile, your kindness, and the unmatched energy you bring everywhere.
          </p>
          <p>
            From random late-night chats and laughing till our stomachs hurt to always being there as a supportive and genuine friend, having you in my corner is truly wonderful.
          </p>
          <p>
            Wishing you a year ahead filled with happiness, great health, and huge success in everything you do!
          </p>
          <p className="text-xl sm:text-2xl font-bold text-pink-300 mt-4">
            Happy Birthday Manvitha! 🎂✨
          </p>
        </div>
      </motion.div>
    </section>
  );
}

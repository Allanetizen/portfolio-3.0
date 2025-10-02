'use client';

import { motion } from 'framer-motion';

interface AboutSectionProps {
  aboutText: string;
}

export default function AboutSection({ aboutText }: AboutSectionProps) {
  return (
    <section id="about" className="w-screen h-screen flex items-center justify-center snap-center relative">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass p-8 md:p-12 rounded-2xl"
        >
          <h2 className="headline mb-6 bleed-text">VISUAL POETRY</h2>
          <p className="body-text text-lg md:text-xl leading-relaxed">{aboutText}</p>
        </motion.div>
      </div>
    </section>
  );
}

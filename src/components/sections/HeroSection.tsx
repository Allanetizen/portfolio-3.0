'use client';

import { motion } from 'framer-motion';

interface HeroSectionProps {
  heroName: string;
  heroDescription: string;
  contactEmail: string;
  contactLinkedIn: string;
  contactGitHub: string;
}

export default function HeroSection({
  heroName,
  heroDescription,
  contactEmail,
  contactLinkedIn,
  contactGitHub
}: HeroSectionProps) {
  return (
    <section id="hero" className="w-screen h-screen flex items-center justify-center snap-center relative">
      <div className="text-center max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass p-8 md:p-12 rounded-2xl"
        >
          <h1 className="headline text-4xl md:text-6xl mb-6 bleed-text">{heroName}</h1>
          <p className="body-text text-lg md:text-xl mb-8 max-w-2xl mx-auto">{heroDescription}</p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <a href={contactEmail} className="glass px-6 py-3 rounded-lg hover:bg-accent/10 transition-colors">📧 Contact</a>
            <a href={contactLinkedIn} target="_blank" rel="noopener noreferrer" className="glass px-6 py-3 rounded-lg hover:bg-accent/10 transition-colors">💼 LinkedIn</a>
            <a href={contactGitHub} target="_blank" rel="noopener noreferrer" className="glass px-6 py-3 rounded-lg hover:bg-accent/10 transition-colors">🐙 GitHub</a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

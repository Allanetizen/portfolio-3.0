'use client';

import { motion } from 'framer-motion';

interface ContactSectionProps {
  contactEmail: string;
  contactLinkedIn: string;
  contactInstagram: string;
  contactMedium: string;
  contactGitHub: string;
}

export default function ContactSection({
  contactEmail,
  contactLinkedIn,
  contactInstagram,
  contactMedium,
  contactGitHub
}: ContactSectionProps) {
  return (
    <section id="contact" className="w-screen h-screen flex items-center justify-center snap-center relative">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass p-8 md:p-12 rounded-2xl"
        >
          <h2 className="headline text-3xl md:text-4xl mb-8 bleed-text">LET&apos;S CONNECT</h2>
          <p className="body-text text-lg md:text-xl mb-8">Ready to bring your ideas to life? Let&apos;s create something amazing together.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={contactEmail} className="glass px-6 py-3 rounded-lg hover:bg-accent/10 transition-colors">📧 Email</a>
            <a href={contactLinkedIn} target="_blank" rel="noopener noreferrer" className="glass px-6 py-3 rounded-lg hover:bg-accent/10 transition-colors">💼 LinkedIn</a>
            <a href={contactInstagram} target="_blank" rel="noopener noreferrer" className="glass px-6 py-3 rounded-lg hover:bg-accent/10 transition-colors">📸 Instagram</a>
            <a href={contactMedium} target="_blank" rel="noopener noreferrer" className="glass px-6 py-3 rounded-lg hover:bg-accent/10 transition-colors">📝 Medium</a>
            <a href={contactGitHub} target="_blank" rel="noopener noreferrer" className="glass px-6 py-3 rounded-lg hover:bg-accent/10 transition-colors">🐙 GitHub</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

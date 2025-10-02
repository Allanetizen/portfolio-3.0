'use client';

import { motion } from 'framer-motion';

interface Experience {
  id: number;
  title: string;
  company: string;
  period: string;
  description: string;
}

interface ExperienceSectionProps {
  experiences: Experience[];
}

export default function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <section id="experience" className="w-screen h-screen flex flex-col items-center justify-center snap-center relative p-8">
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="headline text-4xl font-bold mb-12 text-center"
      >
        EXPERIENCE
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        className="w-full max-w-6xl"
      >
        <div className="space-y-8">
          {experiences.length === 0 ? (
            <div className="flex items-center justify-center w-full h-64">
              <div className="text-center">
                <p className="text-gray-600">No experience available</p>
              </div>
            </div>
          ) : (
            experiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                className="glass rounded-xl p-6 flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-4"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 glass rounded-full flex items-center justify-center text-3xl md:text-4xl">
                  🏢
                </div>
                <div className="flex-grow text-center md:text-left">
                  <h3 className="font-bold text-lg md:text-xl mb-1">{experience.title}</h3>
                  <p className="text-accent mb-2 text-sm">{experience.company} • {experience.period}</p>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">{experience.description}</p>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    </section>
  );
}

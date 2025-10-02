'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Background from './Background';

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  stats: {
    users: string;
    rating: string;
    growth: string;
  };
  imageUrl: string;
  challenge: string;
  solution: string;
  chartImageUrl: string;
  sections: { title: string; content: string; imageUrl: string }[];
}

interface Experience {
  id: number;
  title: string;
  company: string;
  period: string;
  description: string;
}

interface PortfolioData {
  projects: Project[];
  experiences: Experience[];
  heroName: string;
  heroDescription: string;
  aboutText: string;
  contactEmail: string;
  contactLinkedIn: string;
  contactInstagram: string;
  contactMedium: string;
  contactGitHub: string;
  profileImageUrl: string;
  layout: string;
}

interface PortfolioClientProps {
  data: PortfolioData;
}

export default function PortfolioClient({ data }: PortfolioClientProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const mainRef = useRef<HTMLDivElement>(null);

  // Use data directly from props (already fetched on server)
  const projects = data.projects;
  const experiences = data.experiences;
  const heroName = data.heroName;
  const heroDescription = data.heroDescription;
  const aboutText = data.aboutText;
  const contactEmail = data.contactEmail;
  const contactLinkedIn = data.contactLinkedIn;
  const contactInstagram = data.contactInstagram;
  const contactMedium = data.contactMedium;
  const contactGitHub = data.contactGitHub;
  // const profileImageUrl = data.profileImageUrl;
  // const layout = data.layout;

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    const currentMainRef = mainRef.current;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        currentMainRef?.scrollBy({ left: -window.innerWidth, behavior: 'smooth' });
      } else if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        currentMainRef?.scrollBy({ left: window.innerWidth, behavior: 'smooth' });
      }
    };

    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (currentMainRef) {
          const newSection = Math.round(currentMainRef.scrollLeft / window.innerWidth);
          setCurrentSection(newSection);
        }
      }, 100);
    };

    window.addEventListener('keydown', handleKeyDown);
    currentMainRef?.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (currentMainRef) {
        currentMainRef.removeEventListener('scroll', handleScroll);
      }
      clearTimeout(scrollTimeout);
    };
  }, []);

  const pageVariants = {
    initial: { rotateY: -90, opacity: 0 },
    in: { rotateY: 0, opacity: 1 },
    out: { rotateY: 90, opacity: 0 }
  };

  const sectionCount = 5; // Hero, Projects, About, Experience, Contact

  const scrollToSection = (index: number) => {
    if (mainRef.current) {
      mainRef.current.scrollTo({
        left: index * window.innerWidth,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen overflow-hidden">
      <Background currentSection={currentSection} />
      <motion.main
        ref={mainRef}
        className="relative z-10 flex w-max min-h-screen snap-x snap-mandatory"
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {/* Hero Section */}
        <section id="hero" className="w-screen h-screen flex items-center justify-center snap-center relative">
          <div className="text-center max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="glass p-8 md:p-12 rounded-2xl"
            >
              <h1 className="headline text-4xl md:text-6xl mb-6 bleed-text">{heroName}</h1>
              <p className="body-text text-lg md:text-xl mb-8 max-w-2xl mx-auto">{heroDescription}</p>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="flex flex-wrap justify-center gap-4"
              >
                <a href={contactEmail} className="glass px-6 py-3 rounded-lg hover:bg-accent/10 transition-colors">📧 Contact</a>
                <a href={contactLinkedIn} target="_blank" rel="noopener noreferrer" className="glass px-6 py-3 rounded-lg hover:bg-accent/10 transition-colors">💼 LinkedIn</a>
                <a href={contactGitHub} target="_blank" rel="noopener noreferrer" className="glass px-6 py-3 rounded-lg hover:bg-accent/10 transition-colors">🐙 GitHub</a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="w-screen h-screen flex flex-col items-center justify-center snap-center relative p-8">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="headline text-4xl font-bold mb-8 text-center"
          >
            PROJECTS
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full max-w-6xl"
          >
            <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory">
              {projects.length === 0 ? (
                <div className="flex items-center justify-center w-full h-64">
                  <div className="text-center">
                    <p className="text-gray-600">No projects available</p>
                  </div>
                </div>
              ) : (
                projects.map((project) => (
                  <motion.div
                    key={project.id}
                    className="flex-shrink-0 w-64 sm:w-72 md:w-80 h-72 sm:h-80 md:h-96 glass rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 snap-center cursor-pointer relative group overflow-visible"
                    onClick={() => setExpandedSection(expandedSection === `project-${project.id}` ? null : `project-${project.id}`)}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.02 }}
                    viewport={{ once: true }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative w-full h-32 sm:h-40 mb-4 rounded-lg overflow-hidden">
                      {project.imageUrl ? (
                        <Image
                          src={project.imageUrl}
                          alt={project.title}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-lg"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-accent/30 to-accent/10 flex items-center justify-center">
                          <span className="text-3xl md:text-4xl">📱</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="relative z-10">
                      <h3 className="font-bold text-lg md:text-xl mb-2">{project.title}</h3>
                      <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">{project.description}</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {project.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="px-2 py-1 bg-accent/10 rounded-full text-xs font-medium">{tag}</span>
                        ))}
                      </div>
                      <div className="space-y-1 text-xs md:text-sm text-gray-500 dark:text-gray-400">
                        <div>{project.stats.users}</div>
                        <div>{project.stats.rating}</div>
                        <div>{project.stats.growth}</div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>

          {expandedSection && projects.find(p => `project-${p.id}` === expandedSection) && (
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setExpandedSection(null)}
            >
              <motion.div
                className="glass rounded-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto relative"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setExpandedSection(null)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
                >
                  &times;
                </button>
                {(() => {
                  const project = projects.find(p => `project-${p.id}` === expandedSection);
                  if (!project) return null;
                  
                  return (
                    <div>
                      <h2 className="text-3xl font-bold mb-4">{project.title}</h2>
                      <p className="text-gray-600 dark:text-gray-300 mb-6">{project.description}</p>
                      
                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h3 className="font-semibold mb-2">Challenge</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{project.challenge}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">Solution</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{project.solution}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="px-3 py-1 bg-accent/20 rounded-full text-sm font-medium">{tag}</span>
                        ))}
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-accent">{project.stats.users}</div>
                          <div className="text-xs text-gray-500">Users</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-accent">{project.stats.rating}</div>
                          <div className="text-xs text-gray-500">Rating</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-accent">{project.stats.growth}</div>
                          <div className="text-xs text-gray-500">Growth</div>
                        </div>
                      </div>
                      
                      {project.sections && project.sections.length > 0 && (
                        <div className="space-y-4">
                          <h3 className="font-semibold">Project Details</h3>
                          {project.sections.map((section, sectionIndex) => (
                            <div key={sectionIndex} className="border-l-4 border-accent/30 pl-4">
                              <h4 className="font-medium mb-2">{section.title}</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{section.content}</p>
                              {section.imageUrl && (
                                <div className="relative w-full h-48 rounded-lg overflow-hidden">
                                  <Image
                                    src={section.imageUrl}
                                    alt={section.title}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-lg"
                                  />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })()}
              </motion.div>
            </motion.div>
          )}
        </section>

        {/* About Section */}
        <section id="about" className="w-screen h-screen flex items-center justify-center snap-center relative">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="glass p-8 md:p-12 rounded-2xl"
            >
              <h2 className="headline mb-6 bleed-text">VISUAL POETRY</h2>
              <p className="body-text text-lg md:text-xl leading-relaxed">{aboutText}</p>
            </motion.div>
          </div>
        </section>

        {/* Experience Section */}
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

        {/* Contact Section */}
        <section id="contact" className="w-screen h-screen flex items-center justify-center snap-center relative">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
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
      </motion.main>

      <div className="fixed left-4 top-1/2 transform -translate-y-1/2 text-4xl opacity-50 cursor-pointer z-20" onClick={() => scrollToSection(currentSection - 1)}>←</div>
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 text-4xl opacity-50 cursor-pointer z-20" onClick={() => scrollToSection(currentSection + 1)}>→</div>

      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {Array.from({ length: sectionCount }).map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full cursor-pointer transition-colors ${currentSection === index ? 'bg-accent' : 'bg-gray-400'}`}
            onClick={() => scrollToSection(index)}
          ></div>
        ))}
      </div>
    </div>
  );
}

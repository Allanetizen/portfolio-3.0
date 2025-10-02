/* eslint-disable react/no-unescaped-entities */

'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Background from '../components/Background';

// Default data to ensure content is always available
const defaultData = {
  projects: [
    {
      id: 1,
      title: "Project 1",
      description: "Innovative app design with focus on user experience.",
      tags: ["#UX", "#Mobile"],
      stats: {
        users: "+5k users",
        rating: "⭐ 4.8 rating",
        growth: "📈 40% growth"
      },
      imageUrl: "",
      challenge: "The challenge was to redesign the user experience for a complex application, making it intuitive and accessible to users.",
      solution: "Implemented a clean, minimalist design with progressive disclosure, improving user experience and satisfaction.",
      chartImageUrl: "",
      sections: []
    }
  ],
  experiences: [
    {
      id: 1,
      title: "Senior Product Manager",
      company: "Company Name",
      period: "2020 - Present",
      description: "Led product strategy and design for key features, resulting in 40% user growth."
    }
  ],
  heroName: "YOUR NAME",
  heroDescription: "Product Manager & Designer crafting innovative solutions with strategic thinking and creative design.",
  aboutText: "Crafting digital experiences that blend strategic thinking with artistic design. I bridge the gap between user needs and technical innovation, creating products that not only work beautifully but tell compelling stories.",
  contactEmail: "mailto:your.email@example.com",
  contactLinkedIn: "https://linkedin.com/in/yourprofile",
  contactInstagram: "https://instagram.com/yourprofile",
  contactMedium: "https://medium.com/@yourprofile",
  contactGitHub: "https://github.com/yourprofile",
  profileImageUrl: "",
  layout: "regular"
};

interface Section {
  id: string;
  type: 'header' | 'image' | 'text' | 'title' | 'paragraph';
  content: string;
}

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
  sections: Section[];
}

interface Experience {
  id: number;
  title: string;
  company: string;
  period: string;
  description: string;
}

export default function Home() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const mainRef = useRef<HTMLDivElement>(null);

  // Read-only state - initialize with default data, then fetch from API
  const [projects, setProjects] = useState<Project[]>(defaultData.projects);
  const [experiences, setExperiences] = useState<Experience[]>(defaultData.experiences);
  const [heroName, setHeroName] = useState(defaultData.heroName);
  const [heroDescription, setHeroDescription] = useState(defaultData.heroDescription);
  const [aboutText, setAboutText] = useState(defaultData.aboutText);
  const [contactEmail, setContactEmail] = useState(defaultData.contactEmail);
  const [contactLinkedIn, setContactLinkedIn] = useState(defaultData.contactLinkedIn);
  const [contactInstagram, setContactInstagram] = useState(defaultData.contactInstagram);
  const [contactMedium, setContactMedium] = useState(defaultData.contactMedium);
  const [contactGitHub, setContactGitHub] = useState(defaultData.contactGitHub);
  const [profileImageUrl, setProfileImageUrl] = useState(defaultData.profileImageUrl);
  const [layout, setLayout] = useState<'regular' | 'bento' | 'circular'>(defaultData.layout as 'regular' | 'bento' | 'circular');
  const [dataLoaded, setDataLoaded] = useState(true); // Start as true since we have default data

  // Fetch data from API on component mount
  useEffect(() => {
    fetch('/api/portfolio')
      .then(response => response.json())
      .then(data => {
        // Update all state with fetched data
        setProjects(data.projects || []);
        setExperiences(data.experiences || []);
        setHeroName(data.heroName || 'YOUR NAME');
        setHeroDescription(data.heroDescription || 'Product Manager & Designer crafting innovative solutions with strategic thinking and creative design.');
        setAboutText(data.aboutText || 'Crafting digital experiences that blend strategic thinking with artistic design. I bridge the gap between user needs and technical innovation, creating products that not only work beautifully but tell compelling stories.');
        setContactEmail(data.contactEmail || 'mailto:your.email@example.com');
        setContactLinkedIn(data.contactLinkedIn || 'https://linkedin.com/in/yourprofile');
        setContactInstagram(data.contactInstagram || 'https://instagram.com/yourprofile');
        setContactMedium(data.contactMedium || 'https://medium.com/@yourprofile');
        setContactGitHub(data.contactGitHub || 'https://github.com/yourprofile');
        setProfileImageUrl(data.profileImageUrl || '');
        setLayout(data.layout || 'regular');
        setDataLoaded(true);
      })
      .catch(error => {
        console.error('Error loading data:', error);
        setDataLoaded(true); // Still set to true to show default content
      });
  }, []);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        mainRef.current?.scrollBy({ left: -window.innerWidth, behavior: 'smooth' });
      } else if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        mainRef.current?.scrollBy({ left: window.innerWidth, behavior: 'smooth' });
      }
    };

    const handleScroll = () => {
      if (mainRef.current) {
        const scrollLeft = mainRef.current.scrollLeft;
        const sectionWidth = window.innerWidth;
        const section = Math.round(scrollLeft / sectionWidth);
        setCurrentSection(section);

        // Clear existing timeout
        if (scrollTimeout) {
        clearTimeout(scrollTimeout);
        }

        // Set new timeout to snap after scroll stops
        scrollTimeout = setTimeout(() => {
          const targetScroll = section * sectionWidth;
          mainRef.current?.scrollTo({ left: targetScroll, behavior: 'smooth' });
        }, 50);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    mainRef.current?.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      const currentMainRef = mainRef.current;
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

  const pageTransition = {
    type: "tween" as const,
    duration: 0.8
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
        transition={pageTransition}
      >
        {/* Hero Section */}
        <section className="w-screen h-screen flex items-center justify-center snap-center relative">
          <div className="text-center max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass p-8 md:p-12 rounded-2xl"
            >
              <h1 className="headline text-4xl md:text-6xl mb-6 bleed-text">
                  {heroName}
                </h1>
              <p className="body-text text-lg md:text-xl mb-8 max-w-2xl mx-auto">
                  {heroDescription}
                </p>
          <motion.div 
                className="flex flex-wrap justify-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <a href={contactEmail} className="glass px-6 py-3 rounded-lg hover:bg-accent/10 transition-colors">
                  📧 Contact
                </a>
                <a href={contactLinkedIn} target="_blank" rel="noopener noreferrer" className="glass px-6 py-3 rounded-lg hover:bg-accent/10 transition-colors">
                  💼 LinkedIn
                </a>
                <a href={contactGitHub} target="_blank" rel="noopener noreferrer" className="glass px-6 py-3 rounded-lg hover:bg-accent/10 transition-colors">
                  🐙 GitHub
                </a>
                    </motion.div>
                          </motion.div>
                    </div>
        </section>

        {/* Projects Section */}
        <section className="w-screen h-screen flex items-center justify-center snap-center relative">
          <div className="w-full max-w-7xl mx-auto px-6">
            <motion.h2 
              className="headline text-3xl md:text-4xl mb-8 text-center bleed-text"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              PROJECTS
            </motion.h2>
            
            <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory">
              {!dataLoaded ? (
                <div className="flex items-center justify-center w-full h-64">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading projects...</p>
                  </div>
                </div>
              ) : projects.length === 0 ? (
                <div className="flex items-center justify-center w-full h-64">
                  <div className="text-center">
                    <p className="text-gray-600">No projects available</p>
                  </div>
                </div>
              ) : (
                projects.map((project) => (
                  <motion.div
                    key={project.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                    whileHover={{
                      scale: 1.02,
                      y: -2,
                      boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                      transition: { duration: 0.2 }
                    }}
                  className="relative flex-shrink-0 w-64 sm:w-72 md:w-80 h-72 sm:h-80 md:h-96 glass rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 cursor-pointer group snap-center overflow-visible"
                    onClick={() => setExpandedSection(`project-${project.id}`)}
                  >
                    {/* Background gradient animation */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Project image */}
                  <div className="relative w-full h-32 sm:h-40 mb-4 rounded-lg overflow-hidden">
                      {project.imageUrl ? (
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-accent/30 to-accent/10 flex items-center justify-center">
                        <motion.span
                          className="text-3xl md:text-4xl"
                          animate={{
                            rotate: [0, 5, -5, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut"
                          }}
                        >
                          📱
                        </motion.span>
                      </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>

                    {/* Content */}
                    <div className="relative z-10">
                    <h3 className="font-bold text-lg md:text-xl mb-2">{project.title}</h3>
                    <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                            {project.description}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-accent/10 rounded-full text-xs font-medium">
                                {tag}
                        </span>
                            ))}
                            {project.tags.length > 3 && (
                              <span className="px-2 py-1 bg-accent/10 rounded-full text-xs font-medium">
                                +{project.tags.length - 3}
                              </span>
                      )}
                    </div>

                    {/* Stats */}
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
              </div>
        </section>

        {/* About Section */}
        <section className="w-screen h-screen flex items-center justify-center snap-center relative">
          <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass p-8 md:p-12 rounded-2xl"
            >
              <h2 className="headline mb-6 bleed-text">VISUAL POETRY</h2>
              <p className="body-text text-lg md:text-xl leading-relaxed">
                  {aboutText}
                </p>
            </motion.div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="w-screen h-screen flex items-center justify-center snap-center relative">
          <div className="w-full max-w-6xl mx-auto px-6">
            <motion.h2
              className="headline text-3xl md:text-4xl mb-12 text-center bleed-text"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              EXPERIENCE
            </motion.h2>
            
            <div className="space-y-8">
              {!dataLoaded ? (
                <div className="flex items-center justify-center w-full h-64">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading experience...</p>
                  </div>
                </div>
              ) : experiences.length === 0 ? (
                <div className="flex items-center justify-center w-full h-64">
                  <div className="text-center">
                    <p className="text-gray-600">No experience available</p>
                  </div>
                </div>
              ) : (
                experiences.map((experience, index) => (
                  <motion.div
                    key={experience.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                    className={`relative flex flex-col md:flex-row items-center justify-${index % 2 === 0 ? 'end' : 'start'} md:p${index % 2 === 0 ? 'r' : 'l'}-8`}
                  >
                    {index % 2 === 0 ? (
                      <>
                          <div className="sticky-note p-4 md:p-6 max-w-md mb-4 md:mb-0 md:mr-8 order-2 md:order-1 space-y-2">
                            <h3 className="font-bold text-base md:text-lg mb-2">{experience.title}</h3>
                            <p className="text-accent mb-2 text-sm">{experience.company} • {experience.period}</p>
                            <p className="text-xs md:text-sm">{experience.description}</p>
                          </div>
                        <motion.div
                          whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(99, 102, 241, 0.5)" }}
                          className="w-16 h-16 md:w-20 md:h-20 glass rounded-full flex items-center justify-center cursor-pointer relative z-10 order-1 md:order-2"
                        >
                          <span className="text-xl md:text-2xl">{index === 0 ? '🏢' : index === 1 ? '💼' : '🎓'}</span>
                        </motion.div>
                      </>
                    ) : (
                      <>
                        <motion.div
                        whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(99, 102, 241, 0.5)" }}
                          className="w-16 h-16 md:w-20 md:h-20 glass rounded-full flex items-center justify-center cursor-pointer relative z-10 order-1 md:order-1"
                        >
                          <span className="text-xl md:text-2xl">{index === 0 ? '🏢' : index === 1 ? '💼' : '🎓'}</span>
                        </motion.div>
                          <div className="sticky-note p-4 md:p-6 max-w-md mt-4 md:mt-0 md:ml-8 order-2 md:order-2 space-y-2">
                            <h3 className="font-bold text-base md:text-lg mb-2">{experience.title}</h3>
                            <p className="text-accent mb-2 text-sm">{experience.company} • {experience.period}</p>
                            <p className="text-xs md:text-sm">{experience.description}</p>
                          </div>
                      </>
                    )}
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="w-screen h-screen flex items-center justify-center snap-center relative">
          <div className="max-w-4xl mx-auto px-6 text-center">
              <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
              className="glass p-8 md:p-12 rounded-2xl"
            >
              <h2 className="headline text-3xl md:text-4xl mb-8 bleed-text">LET'S CONNECT</h2>
              <p className="body-text text-lg md:text-xl mb-8">
                Ready to bring your ideas to life? Let's create something amazing together.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href={contactEmail} className="glass px-6 py-3 rounded-lg hover:bg-accent/10 transition-colors">
                  📧 Email
                </a>
                <a href={contactLinkedIn} target="_blank" rel="noopener noreferrer" className="glass px-6 py-3 rounded-lg hover:bg-accent/10 transition-colors">
                  💼 LinkedIn
                </a>
                <a href={contactInstagram} target="_blank" rel="noopener noreferrer" className="glass px-6 py-3 rounded-lg hover:bg-accent/10 transition-colors">
                  📸 Instagram
                </a>
                <a href={contactMedium} target="_blank" rel="noopener noreferrer" className="glass px-6 py-3 rounded-lg hover:bg-accent/10 transition-colors">
                  📝 Medium
                </a>
                <a href={contactGitHub} target="_blank" rel="noopener noreferrer" className="glass px-6 py-3 rounded-lg hover:bg-accent/10 transition-colors">
                  🐙 GitHub
              </a>
            </div>
            </motion.div>
          </div>
        </section>
      </motion.main>

      {/* Navigation Controls */}
      <div className="fixed left-4 top-1/2 transform -translate-y-1/2 text-4xl opacity-50 cursor-pointer z-20" onClick={() => {
        if (currentSection > 0) {
          const targetScroll = (currentSection - 1) * window.innerWidth;
          mainRef.current?.scrollTo({ left: targetScroll, behavior: 'smooth' });
        }
      }}>
        &larr;
      </div>
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 text-4xl opacity-50 cursor-pointer z-20" onClick={() => {
        if (currentSection < 3) {
          const targetScroll = (currentSection + 1) * window.innerWidth;
          mainRef.current?.scrollTo({ left: targetScroll, behavior: 'smooth' });
        }
      }}>
        &rarr;
      </div>

      {/* Section Indicators */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full cursor-pointer transition-colors ${i === currentSection ? 'bg-accent' : 'bg-gray-400'}`}
            onClick={() => mainRef.current?.scrollTo({ left: i * window.innerWidth, behavior: 'smooth' })}
          ></div>
        ))}
      </div>

      {/* Project Detail Modal */}
      {expandedSection && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setExpandedSection(null)}
          >
            <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="glass p-8 max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setExpandedSection(null)} className="absolute top-4 right-4 text-2xl">&times;</button>
            
            {(() => {
              const projectId = parseInt(expandedSection.replace('project-', ''));
              const project = projects.find(p => p.id === projectId);
              if (!project) return null;

              return (
                <div>
                  <h2 className="headline text-3xl mb-6">{project.title}</h2>
              <div className="mb-8">
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag, index) => (
                        <span key={index} className="px-3 py-1 bg-accent/10 rounded-full">{tag}</span>
                      ))}
              </div>
              <div className="space-y-6">
                      {project.sections.map((section) => {
                      switch (section.type) {
                        case 'title':
                            return <h2 key={section.id} className="headline text-3xl mb-4">{section.content}</h2>;
                        case 'header':
                            return <h3 key={section.id} className="font-bold text-xl mb-4">{section.content}</h3>;
                        case 'paragraph':
                            return <p key={section.id} className="body-text mb-6">{section.content}</p>;
                        case 'text':
                            return <p key={section.id} className="body-text mb-6">{section.content}</p>;
                        case 'image':
                          return section.content ? (
                              <Image key={section.id} src={section.content} alt="Section image" width={400} height={300} className="w-full h-auto rounded-lg mb-6" />
                          ) : null;
                        default:
                          return null;
                      }
                    })}
                  </div>
                      </div>
                          </div>
              );
            })()}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
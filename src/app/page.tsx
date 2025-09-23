/* eslint-disable react/no-unescaped-entities */

'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Background from '../components/Background';
import { useAuth } from '../contexts/AuthContext';

interface Section {
  id: string;
  type: 'header' | 'image' | 'text' | 'title';
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
  const { isAuthenticated } = useAuth();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>, setter: (url: string) => void) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        if (data.url) {
          setter(data.url);
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      title: 'Project 1',
      description: 'Innovative app design with focus on user experience.',
      tags: ['#UX', '#Mobile'],
      stats: { users: '+5k users', rating: '⭐ 4.8 rating', growth: '📈 40% growth' },
      imageUrl: '',
      challenge: 'The challenge was to redesign the user experience for a complex application, making it intuitive and accessible to users.',
      solution: 'Implemented a clean, minimalist design with progressive disclosure, improving user experience and satisfaction.',
      chartImageUrl: '',
      sections: []
    },
    {
      id: 2,
      title: 'Project 2',
      description: 'Innovative app design with focus on user experience.',
      tags: ['#UX', '#Mobile'],
      stats: { users: '+5k users', rating: '⭐ 4.8 rating', growth: '📈 40% growth' },
      imageUrl: '',
      challenge: 'The challenge was to redesign the user experience for a complex application, making it intuitive and accessible to users.',
      solution: 'Implemented a clean, minimalist design with progressive disclosure, improving user experience and satisfaction.',
      chartImageUrl: '',
      sections: []
    },
    {
      id: 3,
      title: 'Project 3',
      description: 'Innovative app design with focus on user experience.',
      tags: ['#UX', '#Mobile'],
      stats: { users: '+5k users', rating: '⭐ 4.8 rating', growth: '📈 40% growth' },
      imageUrl: '',
      challenge: 'The challenge was to redesign the user experience for a complex application, making it intuitive and accessible to users.',
      solution: 'Implemented a clean, minimalist design with progressive disclosure, improving user experience and satisfaction.',
      chartImageUrl: '',
      sections: []
    },
    {
      id: 4,
      title: 'Project 4',
      description: 'Innovative app design with focus on user experience.',
      tags: ['#UX', '#Mobile'],
      stats: { users: '+5k users', rating: '⭐ 4.8 rating', growth: '📈 40% growth' },
      imageUrl: '',
      challenge: 'The challenge was to redesign the user experience for a complex application, making it intuitive and accessible to users.',
      solution: 'Implemented a clean, minimalist design with progressive disclosure, improving user experience and satisfaction.',
      chartImageUrl: '',
      sections: []
    },
    {
      id: 5,
      title: 'Project 5',
      description: 'Innovative app design with focus on user experience.',
      tags: ['#UX', '#Mobile'],
      stats: { users: '+5k users', rating: '⭐ 4.8 rating', growth: '📈 40% growth' },
      imageUrl: '',
      challenge: 'The challenge was to redesign the user experience for a complex application, making it intuitive and accessible to users.',
      solution: 'Implemented a clean, minimalist design with progressive disclosure, improving user experience and satisfaction.',
      chartImageUrl: '',
      sections: []
    }
  ]);

  const [experiences, setExperiences] = useState([
    {
      id: 1,
      title: 'Senior Product Manager',
      company: 'Company Name',
      period: '2020 - Present',
      description: 'Led product strategy and design for key features, resulting in 40% user growth.'
    },
    {
      id: 2,
      title: 'Product Designer',
      company: 'Previous Company',
      period: '2018 - 2020',
      description: 'Designed user interfaces and conducted user research to improve product usability.'
    },
    {
      id: 3,
      title: "Master's in Design",
      company: 'University Name',
      period: '2016 - 2018',
      description: 'Focused on human-centered design and product development.'
    }
  ]);

  const [heroName, setHeroName] = useState('YOUR NAME');
  const [heroDescription, setHeroDescription] = useState('Product Manager & Designer crafting innovative solutions with strategic thinking and creative design.');
  const [aboutText, setAboutText] = useState('Crafting digital experiences that blend strategic thinking with artistic design. I bridge the gap between user needs and technical innovation, creating products that not only work beautifully but tell compelling stories.');
  const [contactEmail, setContactEmail] = useState('mailto:your.email@example.com');
  const [contactLinkedIn, setContactLinkedIn] = useState('https://linkedin.com/in/yourprofile');
  const [contactInstagram, setContactInstagram] = useState('https://instagram.com/yourprofile');
  const [contactMedium, setContactMedium] = useState('https://medium.com/@yourprofile');
  const [contactGitHub, setContactGitHub] = useState('https://github.com/yourprofile');
  const [profileImageUrl, setProfileImageUrl] = useState('');

  useEffect(() => {
    // Load data from API
    fetch('/api/portfolio')
      .then(response => response.json())
      .then((data: unknown) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const d = data as any;
        if (d && d.projects) {
          setProjects(d.projects.map((p: Project) => ({
            ...p,
            imageUrl: p.imageUrl || '',
            challenge: p.challenge || 'The challenge was to redesign the user experience for a complex application, making it intuitive and accessible to users.',
            solution: p.solution || 'Implemented a clean, minimalist design with progressive disclosure, improving user experience and satisfaction.',
            chartImageUrl: p.chartImageUrl || '',
            sections: p.sections || []
          })));
          setExperiences(d.experiences || []);
          setHeroName(d.heroName || 'YOUR NAME');
          setHeroDescription(d.heroDescription || 'Product Manager & Designer crafting innovative solutions with strategic thinking and creative design.');
          setAboutText(d.aboutText || 'Crafting digital experiences that blend strategic thinking with artistic design. I bridge the gap between user needs and technical innovation, creating products that not only work beautifully but tell compelling stories.');
          setContactEmail(d.contactEmail || 'mailto:your.email@example.com');
          setContactLinkedIn(d.contactLinkedIn || 'https://linkedin.com/in/yourprofile');
          setContactInstagram(d.contactInstagram || 'https://instagram.com/yourprofile');
          setContactMedium(d.contactMedium || 'https://medium.com/@yourprofile');
          setContactGitHub(d.contactGitHub || 'https://github.com/yourprofile');
          setProfileImageUrl(d.profileImageUrl || '');
        } else {
          // Use defaults if data is invalid
          console.log('Using default data');
        }
      })
      .catch(error => console.error('Error loading data:', error));
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      setEditMode(false);
    }
  }, [isAuthenticated]);

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
        clearTimeout(scrollTimeout);

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
      mainRef.current?.removeEventListener('scroll', handleScroll);
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
    <div className="relative min-h-screen overflow-x-auto overflow-y-hidden">
      <Background currentSection={currentSection} />

      {/* Edit Mode Controls */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        {isAuthenticated ? (
          <>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setEditMode(!editMode)}
              className={`glass p-3 rounded-lg hover:bg-accent/10 transition-colors ${editMode ? 'bg-accent text-white' : ''}`}
              title={editMode ? 'View Mode' : 'Edit Mode'}
            >
              ✏️
            </motion.button>
            {editMode && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={async () => {
                  const data = {
                    projects,
                    experiences,
                    heroName,
                    heroDescription,
                    aboutText,
                    contactEmail,
                    contactLinkedIn,
                    contactInstagram,
                    contactMedium,
                    contactGitHub,
                    profileImageUrl
                  };
                  try {
                    const response = await fetch('/api/portfolio', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(data)
                    });
                    if (response.ok) {
                      setEditMode(false); // Switch to view mode after saving
                      alert('Changes saved!');
                    } else {
                      alert('Failed to save changes');
                    }
                  } catch (error) {
                    console.error('Error saving:', error);
                    alert('Error saving changes');
                  }
                }}
                className="glass px-4 py-2 rounded-lg font-bold hover:bg-accent/10 transition-colors"
              >
                SAVE
              </motion.button>
            )}
          </>
        ) : (
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/login"
            className="glass px-4 py-2 rounded-lg font-bold hover:bg-accent/10 transition-colors"
          >
            LOGIN TO EDIT
          </motion.a>
        )}
      </div>

      <motion.main
        ref={mainRef}
        className="relative z-10 flex w-max min-h-screen snap-x snap-mandatory"
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        {/* Home/Projects Section */}
        <section className="w-screen min-h-screen flex flex-col items-center justify-center px-4 py-20 snap-center">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            className="text-center mb-16"
          >
            {editMode ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={heroName}
                  onChange={(e) => setHeroName(e.target.value)}
                  className="w-full text-center headline mb-4 bleed-text bg-transparent border-b border-accent/50 focus:outline-none focus:border-accent"
                  placeholder="Your Name"
                />
                <textarea
                  value={heroDescription}
                  onChange={(e) => setHeroDescription(e.target.value)}
                  className="w-full text-center body-text max-w-2xl mx-auto bleed-text bg-transparent border-b border-accent/50 focus:outline-none focus:border-accent resize-none"
                  placeholder="Your description"
                  rows={2}
                />
              </div>
            ) : (
              <>
                <h1 className="headline mb-4 bleed-text">
                  {heroName}
                </h1>
                <p className="body-text max-w-2xl mx-auto bleed-text">
                  {heroDescription}
                </p>
              </>
            )}
          </motion.div>

          {/* Projects Carousel */}
          <div className="relative w-full max-w-7xl">
            <div className="overflow-x-auto scrollbar-hide snap-x snap-mandatory">
              <div className="flex space-x-6 md:space-x-10 px-4 pb-8">
                {projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{
                      scale: 1.02,
                      y: -2,
                      boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                      transition: { duration: 0.2 }
                    }}
                    className="relative flex-shrink-0 w-72 md:w-80 h-80 md:h-96 glass rounded-2xl p-4 md:p-6 cursor-pointer group snap-center overflow-visible"
                    onClick={() => setExpandedSection(`project-${project.id}`)}
                  >
                    {/* Background gradient animation */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={false}
                    />
  
                    {/* Image container with subtle animation */}
                    <motion.div
                      className="h-32 md:h-40 bg-gradient-to-br from-accent/20 to-accent/5 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      {project.imageUrl ? (
                        <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
                      ) : (
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
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {editMode && (
                        <div className="absolute bottom-2 left-2 right-2 bg-white/90 text-black px-2 py-1 text-xs rounded space-y-1">
                          <input
                            type="text"
                            value={project.imageUrl}
                            onChange={(e) => {
                              const newProjects = projects.map(p =>
                                p.id === project.id ? { ...p, imageUrl: e.target.value } : p
                              );
                              setProjects(newProjects);
                            }}
                            placeholder="Image URL or upload file"
                            className="w-full bg-transparent border-none outline-none text-xs"
                          />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, (url) => {
                              const newProjects = projects.map(p =>
                                p.id === project.id ? { ...p, imageUrl: url } : p
                              );
                              setProjects(newProjects);
                            })}
                            className="w-full text-xs"
                          />
                        </div>
                      )}
                    </motion.div>
  
                    {/* Content */}
                    <div className="relative z-10">
                      {editMode ? (
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={project.title}
                            onChange={(e) => {
                              const newProjects = projects.map(p =>
                                p.id === project.id ? { ...p, title: e.target.value } : p
                              );
                              setProjects(newProjects);
                            }}
                            className="w-full font-bold text-lg md:text-xl mb-2 bg-transparent border-b border-accent/50 focus:outline-none focus:border-accent"
                            placeholder="Project title"
                          />
                          <textarea
                            value={project.description}
                            onChange={(e) => {
                              const newProjects = projects.map(p =>
                                p.id === project.id ? { ...p, description: e.target.value } : p
                              );
                              setProjects(newProjects);
                            }}
                            className="w-full body-text mb-4 text-sm md:text-base bg-transparent border-b border-accent/50 focus:outline-none focus:border-accent resize-none"
                            placeholder="Project description"
                            rows={2}
                          />
                          <input
                            type="text"
                            value={project.tags.join(', ')}
                            onChange={(e) => {
                              const newProjects = projects.map(p =>
                                p.id === project.id ? { ...p, tags: e.target.value.split(', ') } : p
                              );
                              setProjects(newProjects);
                            }}
                            className="w-full text-xs bg-transparent border-b border-accent/50 focus:outline-none focus:border-accent"
                            placeholder="Tags (comma separated)"
                          />
                        </div>
                      ) : (
                        <>
                          <motion.h3
                            className="font-bold text-lg md:text-xl mb-2 group-hover:text-accent transition-colors duration-200"
                            initial={{ x: 0 }}
                            whileHover={{ x: 2 }}
                            transition={{ duration: 0.2 }}
                          >
                            {project.title}
                          </motion.h3>
      
                          <motion.p
                            className="body-text mb-4 text-sm md:text-base line-clamp-3"
                            initial={{ opacity: 0.8 }}
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 0.2 }}
                          >
                            {project.description}
                          </motion.p>
      
                          <motion.div
                            className="flex flex-wrap gap-2"
                            initial={{ y: 0 }}
                            whileHover={{ y: -1 }}
                            transition={{ duration: 0.2 }}
                          >
                            {project.tags.slice(0, 3).map((tag, tagIndex) => (
                              <motion.span
                                key={tagIndex}
                                className="px-2 py-1 bg-accent/10 rounded-full text-xs font-medium"
                                initial={{ scale: 1 }}
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.1, delay: tagIndex * 0.05 }}
                              >
                                {tag}
                              </motion.span>
                            ))}
                            {project.tags.length > 3 && (
                              <span className="px-2 py-1 bg-accent/10 rounded-full text-xs font-medium">
                                +{project.tags.length - 3}
                              </span>
                            )}
                          </motion.div>
                        </>
                      )}
                    </div>
  
                    {/* Hover sticky note with enhanced animation */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                      whileHover={{
                        opacity: 1,
                        scale: 1,
                        rotate: 0,
                        transition: {
                          type: "spring",
                          stiffness: 300,
                          damping: 20
                        }
                      }}
                      className="absolute -top-2 -right-2 sticky-note w-28 md:w-32 h-20 md:h-24 p-2 text-xs opacity-90 pointer-events-none z-20"
                    >
                      <motion.div
                        className="font-bold mb-1 text-accent"
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.1 }}
                      >
                        {project.stats.users}
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0.8 }}
                        whileHover={{ opacity: 1 }}
                      >
                        {project.stats.rating}
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0.8 }}
                        whileHover={{ opacity: 1 }}
                      >
                        {project.stats.growth}
                      </motion.div>
                    </motion.div>
  
                    {/* Subtle border animation */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl border border-accent/10 group-hover:border-accent/20 transition-colors duration-300"
                      initial={false}
                    />

                    {/* Delete button */}
                    {editMode && (
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm('Are you sure you want to delete this project?')) {
                            setProjects(projects.filter(p => p.id !== project.id));
                          }
                        }}
                        className="absolute top-2 right-2 w-6 h-6 bg-red-500/80 hover:bg-red-500 text-white rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30"
                      >
                        ×
                      </motion.button>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {editMode && (
              <div className="flex justify-center mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const newProject: Project = {
                      id: projects.length + 1,
                      title: 'New Project',
                      description: 'Project description',
                      tags: ['#Tag'],
                      stats: { users: '0 users', rating: '⭐ 0 rating', growth: '📈 0% growth' },
                      imageUrl: '',
                      challenge: 'Challenge description',
                      solution: 'Solution description',
                      chartImageUrl: '',
                      sections: []
                    };
                    setProjects([...projects, newProject]);
                  }}
                  className="glass px-6 py-3 rounded-lg font-bold hover:bg-accent/10 transition-colors"
                >
                  ADD PROJECT
                </motion.button>
              </div>
            )}

            {/* Carousel Navigation */}
            <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="glass p-3 rounded-full hover:bg-accent/10 transition-colors"
                onClick={() => {
                  const container = document.querySelector('.overflow-x-auto');
                  if (container) {
                    container.scrollBy({ left: -320, behavior: 'smooth' });
                  }
                }}
              >
                <span className="text-xl">←</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="glass p-3 rounded-full hover:bg-accent/10 transition-colors"
                onClick={() => {
                  const container = document.querySelector('.overflow-x-auto');
                  if (container) {
                    container.scrollBy({ left: 320, behavior: 'smooth' });
                  }
                }}
              >
                <span className="text-xl">→</span>
              </motion.button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="w-screen min-h-screen flex items-center justify-center px-4 py-20 snap-center relative">
          {/* Background sticky notes */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="sticky-note absolute top-20 left-10 p-3 opacity-70 text-sm font-bold">VISION</div>
            <div className="sticky-note absolute top-40 right-20 p-3 opacity-60 text-sm font-bold">DESIGN</div>
            <div className="sticky-note absolute bottom-32 left-1/4 p-3 opacity-80 text-sm font-bold">IMPACT</div>
            <div className="sticky-note absolute bottom-20 right-1/3 p-3 opacity-65 text-sm font-bold">STRATEGY</div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-12 max-w-6xl">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex-1 text-center md:text-left"
            >
              <h2 className="headline mb-6 bleed-text">VISUAL POETRY</h2>
              {editMode ? (
                <textarea
                  value={aboutText}
                  onChange={(e) => setAboutText(e.target.value)}
                  className="w-full body-text mb-8 bleed-text bg-transparent border-b border-accent/50 focus:outline-none focus:border-accent resize-none"
                  placeholder="About text"
                  rows={4}
                />
              ) : (
                <p className="body-text mb-8 bleed-text">
                  {aboutText}
                </p>
              )}
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <span className="px-4 py-2 bg-accent/10 rounded-full font-medium">Product Strategy</span>
                <span className="px-4 py-2 bg-accent/10 rounded-full font-medium">UX Design</span>
                <span className="px-4 py-2 bg-accent/10 rounded-full font-medium">Leadership</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="sticky-note p-2 absolute -top-4 -left-4 z-10 rotate-6">
                <span className="text-xs font-bold">PHOTO</span>
              </div>
              <div className="glass rounded-3xl p-6 relative overflow-hidden">
                <div className="w-64 h-80 bg-gradient-to-br from-accent/20 to-accent/5 rounded-2xl flex items-center justify-center">
                  {profileImageUrl ? (
                    <img src={profileImageUrl} alt="Profile" className="w-full h-full object-cover rounded-2xl" />
                  ) : (
                    <span className="text-8xl">👤</span>
                  )}
                </div>
                {editMode && (
                  <div className="absolute bottom-12 left-4 right-4 bg-white/90 text-black px-2 py-1 text-xs rounded space-y-1">
                    <input
                      type="text"
                      value={profileImageUrl}
                      onChange={(e) => setProfileImageUrl(e.target.value)}
                      placeholder="Profile image URL or upload file"
                      className="w-full bg-transparent border-none outline-none text-xs"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, setProfileImageUrl)}
                      className="w-full text-xs"
                    />
                  </div>
                )}
                <div className="absolute bottom-4 right-4 sticky-note p-2 rotate-12">
                  <span className="text-xs">Creative Mind</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>


        {/* Experience Section */}
        <section className="w-screen min-h-screen flex items-center justify-center px-4 py-20 snap-center">
          <div className="max-w-4xl w-full">
            <motion.h2
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="headline text-center mb-16"
            >
              EXPERIENCE
            </motion.h2>
            <div className="relative flex justify-center">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-accent/50 h-full hidden md:block"></div>
              <div className="space-y-8 md:space-y-16">
                {experiences.map((experience, index) => (
                  <motion.div
                    key={experience.id}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.05 }}
                    className={`relative flex flex-col md:flex-row items-center justify-${index % 2 === 0 ? 'end' : 'start'} md:p${index % 2 === 0 ? 'r' : 'l'}-8`}
                  >
                    {index % 2 === 0 ? (
                      <>
                        {editMode ? (
                          <div className="sticky-note p-4 md:p-6 max-w-md mb-4 md:mb-0 md:mr-8 order-2 md:order-1 space-y-2">
                            <input
                              type="text"
                              value={experience.title}
                              onChange={(e) => {
                                const newExperiences = experiences.map(exp =>
                                  exp.id === experience.id ? { ...exp, title: e.target.value } : exp
                                );
                                setExperiences(newExperiences);
                              }}
                              className="w-full font-bold text-base md:text-lg mb-2 bg-transparent border-b border-accent/50 focus:outline-none focus:border-accent"
                              placeholder="Title"
                            />
                            <input
                              type="text"
                              value={experience.company}
                              onChange={(e) => {
                                const newExperiences = experiences.map(exp =>
                                  exp.id === experience.id ? { ...exp, company: e.target.value } : exp
                                );
                                setExperiences(newExperiences);
                              }}
                              className="w-full text-accent mb-2 text-sm bg-transparent border-b border-accent/50 focus:outline-none focus:border-accent"
                              placeholder="Company"
                            />
                            <input
                              type="text"
                              value={experience.period}
                              onChange={(e) => {
                                const newExperiences = experiences.map(exp =>
                                  exp.id === experience.id ? { ...exp, period: e.target.value } : exp
                                );
                                setExperiences(newExperiences);
                              }}
                              className="w-full text-accent mb-2 text-sm bg-transparent border-b border-accent/50 focus:outline-none focus:border-accent"
                              placeholder="Period"
                            />
                            <textarea
                              value={experience.description}
                              onChange={(e) => {
                                const newExperiences = experiences.map(exp =>
                                  exp.id === experience.id ? { ...exp, description: e.target.value } : exp
                                );
                                setExperiences(newExperiences);
                              }}
                              className="w-full text-xs md:text-sm bg-transparent border-b border-accent/50 focus:outline-none focus:border-accent resize-none"
                              placeholder="Description"
                              rows={3}
                            />
                          </div>
                        ) : (
                          <div className="sticky-note p-4 md:p-6 max-w-md mb-4 md:mb-0 md:mr-8 order-2 md:order-1">
                            <h3 className="font-bold text-base md:text-lg mb-2">{experience.title}</h3>
                            <p className="text-accent mb-2 text-sm">{experience.company} • {experience.period}</p>
                            <p className="text-xs md:text-sm">{experience.description}</p>
                          </div>
                        )}
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
                          whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" }}
                          className="w-16 h-16 md:w-20 md:h-20 glass rounded-full flex items-center justify-center cursor-pointer relative z-10 order-1 md:order-1"
                        >
                          <span className="text-xl md:text-2xl">{index === 0 ? '🏢' : index === 1 ? '💼' : '🎓'}</span>
                        </motion.div>
                        {editMode ? (
                          <div className="sticky-note p-4 md:p-6 max-w-md mt-4 md:mt-0 md:ml-8 order-2 md:order-2 space-y-2">
                            <input
                              type="text"
                              value={experience.title}
                              onChange={(e) => {
                                const newExperiences = experiences.map(exp =>
                                  exp.id === experience.id ? { ...exp, title: e.target.value } : exp
                                );
                                setExperiences(newExperiences);
                              }}
                              className="w-full font-bold text-base md:text-lg mb-2 bg-transparent border-b border-accent/50 focus:outline-none focus:border-accent"
                              placeholder="Title"
                            />
                            <input
                              type="text"
                              value={experience.company}
                              onChange={(e) => {
                                const newExperiences = experiences.map(exp =>
                                  exp.id === experience.id ? { ...exp, company: e.target.value } : exp
                                );
                                setExperiences(newExperiences);
                              }}
                              className="w-full text-accent mb-2 text-sm bg-transparent border-b border-accent/50 focus:outline-none focus:border-accent"
                              placeholder="Company"
                            />
                            <input
                              type="text"
                              value={experience.period}
                              onChange={(e) => {
                                const newExperiences = experiences.map(exp =>
                                  exp.id === experience.id ? { ...exp, period: e.target.value } : exp
                                );
                                setExperiences(newExperiences);
                              }}
                              className="w-full text-accent mb-2 text-sm bg-transparent border-b border-accent/50 focus:outline-none focus:border-accent"
                              placeholder="Period"
                            />
                            <textarea
                              value={experience.description}
                              onChange={(e) => {
                                const newExperiences = experiences.map(exp =>
                                  exp.id === experience.id ? { ...exp, description: e.target.value } : exp
                                );
                                setExperiences(newExperiences);
                              }}
                              className="w-full text-xs md:text-sm bg-transparent border-b border-accent/50 focus:outline-none focus:border-accent resize-none"
                              placeholder="Description"
                              rows={3}
                            />
                          </div>
                        ) : (
                          <div className="sticky-note p-4 md:p-6 max-w-md mt-4 md:mt-0 md:ml-8 order-2 md:order-2">
                            <h3 className="font-bold text-base md:text-lg mb-2">{experience.title}</h3>
                            <p className="text-accent mb-2 text-sm">{experience.company} • {experience.period}</p>
                            <p className="text-xs md:text-sm">{experience.description}</p>
                          </div>
                        )}
                      </>
                    )}
                  </motion.div>
                ))}
                {editMode && (
                  <div className="flex justify-center mt-8">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        const newExperience = {
                          id: experiences.length + 1,
                          title: 'New Position',
                          company: 'Company Name',
                          period: 'Start - End',
                          description: 'Description of your role and achievements.'
                        };
                        setExperiences([...experiences, newExperience]);
                      }}
                      className="glass px-6 py-3 rounded-lg font-bold hover:bg-accent/10 transition-colors"
                    >
                      ADD EXPERIENCE
                    </motion.button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="w-screen min-h-screen flex items-center justify-center px-4 py-20 snap-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="glass rounded-3xl p-12 max-w-2xl w-full text-center relative"
          >
            <h2 className="headline mb-8 bleed-text">LET'S WORK TOGETHER</h2>
            <p className="body-text mb-12 bleed-text">Ready to bring your vision to life? Let's create something amazing.</p>

            <div className="flex justify-center items-center gap-8 mb-8">
              <div className="sticky-note p-4 rotate-2">
                <div className="text-sm font-bold mb-2">Connect With Me</div>
                <div className="space-y-1 text-xs">
                  <div>📧 Email</div>
                  <div>💼 LinkedIn</div>
                  <div>📸 Instagram</div>
                  <div>✍️ Medium</div>
                  <div>💻 GitHub</div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="sticky-note px-8 py-4 font-bold text-lg hover:bg-accent/20 transition-colors"
              >
                START A PROJECT
              </motion.button>
            </div>

            {editMode ? (
              <div className="flex justify-center space-x-4">
                <div className="flex flex-col items-center space-y-2">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                  <input
                    type="text"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-32 text-xs bg-transparent border-b border-accent/50 focus:outline-none focus:border-accent text-center"
                    placeholder="Email link"
                  />
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  <input
                    type="text"
                    value={contactLinkedIn}
                    onChange={(e) => setContactLinkedIn(e.target.value)}
                    className="w-32 text-xs bg-transparent border-b border-accent/50 focus:outline-none focus:border-accent text-center"
                    placeholder="LinkedIn link"
                  />
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  <input
                    type="text"
                    value={contactInstagram}
                    onChange={(e) => setContactInstagram(e.target.value)}
                    className="w-32 text-xs bg-transparent border-b border-accent/50 focus:outline-none focus:border-accent text-center"
                    placeholder="Instagram link"
                  />
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/></svg>
                  <input
                    type="text"
                    value={contactMedium}
                    onChange={(e) => setContactMedium(e.target.value)}
                    className="w-32 text-xs bg-transparent border-b border-accent/50 focus:outline-none focus:border-accent text-center"
                    placeholder="Medium link"
                  />
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  <input
                    type="text"
                    value={contactGitHub}
                    onChange={(e) => setContactGitHub(e.target.value)}
                    className="w-32 text-xs bg-transparent border-b border-accent/50 focus:outline-none focus:border-accent text-center"
                    placeholder="GitHub link"
                  />
                </div>
              </div>
            ) : (
              <div className="flex justify-center space-x-4">
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  href={contactEmail}
                  className="glass p-4 rounded-full hover:bg-accent/10 transition-colors"
                >
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  href={contactLinkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass p-4 rounded-full hover:bg-accent/10 transition-colors"
                >
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  href={contactInstagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass p-4 rounded-full hover:bg-accent/10 transition-colors"
                >
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  href={contactMedium}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass p-4 rounded-full hover:bg-accent/10 transition-colors"
                >
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/></svg>
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  href={contactGitHub}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass p-4 rounded-full hover:bg-accent/10 transition-colors"
                >
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </motion.a>
              </div>
            )}
          </motion.div>
        </section>
      </motion.main>

      {/* Navigation Arrows */}
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

      {/* Section Tracker */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full cursor-pointer transition-colors ${i === currentSection ? 'bg-accent' : 'bg-gray-400'}`}
            onClick={() => mainRef.current?.scrollTo({ left: i * window.innerWidth, behavior: 'smooth' })}
          ></div>
        ))}
      </div>

      {/* Project Overlays */}
      {projects.map((project) => (
        expandedSection === `project-${project.id}` && (
          <motion.div
            key={project.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setExpandedSection(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="glass rounded-2xl p-8 max-w-4xl w-full max-h-[80vh] overflow-y-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setExpandedSection(null)} className="absolute top-4 right-4 text-2xl">&times;</button>
              <div className="mb-8">
                {editMode ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={project.title}
                      onChange={(e) => {
                        const newProjects = projects.map(p =>
                          p.id === project.id ? { ...p, title: e.target.value } : p
                        );
                        setProjects(newProjects);
                      }}
                      className="w-full headline text-5xl mb-4 bg-transparent border-b border-accent/50 focus:outline-none focus:border-accent"
                      placeholder="Project title"
                    />
                    <textarea
                      value={project.description}
                      onChange={(e) => {
                        const newProjects = projects.map(p =>
                          p.id === project.id ? { ...p, description: e.target.value } : p
                        );
                        setProjects(newProjects);
                      }}
                      className="w-full body-text mb-6 bg-transparent border-b border-accent/50 focus:outline-none focus:border-accent resize-none"
                      placeholder="Project description"
                      rows={3}
                    />
                    <input
                      type="text"
                      value={project.tags.join(', ')}
                      onChange={(e) => {
                        const newProjects = projects.map(p =>
                          p.id === project.id ? { ...p, tags: e.target.value.split(', ') } : p
                        );
                        setProjects(newProjects);
                      }}
                      className="w-full text-sm bg-transparent border-b border-accent/50 focus:outline-none focus:border-accent"
                      placeholder="Tags (comma separated)"
                    />
                  </div>
                ) : (
                  <>
                    <h2 className="headline text-5xl mb-4">{project.title}</h2>
                    <p className="body-text mb-6">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag, index) => (
                        <span key={index} className="px-3 py-1 bg-accent/10 rounded-full">{tag}</span>
                      ))}
                    </div>
                  </>
                )}
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  {editMode ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block font-bold text-xl mb-2">Sections</label>
                        <div className="space-y-2">
                          {project.sections.map((section) => (
                            <div key={section.id} className="flex gap-2 items-center">
                              <select
                                value={section.type}
                                onChange={(e) => {
                                  const newProjects = projects.map(p =>
                                    p.id === project.id ? {
                                      ...p,
                                      sections: p.sections.map(s =>
                                        s.id === section.id ? { ...s, type: e.target.value as Section['type'] } : s
                                      )
                                    } : p
                                  );
                                  setProjects(newProjects);
                                }}
                                className="glass rounded px-2 py-1 text-sm"
                              >
                                <option value="header">Header</option>
                                <option value="image">Image</option>
                                <option value="text">Text</option>
                                <option value="title">Title</option>
                              </select>
                              <input
                                type="text"
                                value={section.content}
                                onChange={(e) => {
                                  const newProjects = projects.map(p =>
                                    p.id === project.id ? {
                                      ...p,
                                      sections: p.sections.map(s =>
                                        s.id === section.id ? { ...s, content: e.target.value } : s
                                      )
                                    } : p
                                  );
                                  setProjects(newProjects);
                                }}
                                className="flex-1 glass rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                                placeholder="Content"
                              />
                              <button
                                onClick={() => {
                                  const newProjects = projects.map(p =>
                                    p.id === project.id ? { ...p, sections: p.sections.filter(s => s.id !== section.id) } : p
                                  );
                                  setProjects(newProjects);
                                }}
                                className="text-red-400 hover:text-red-600 text-sm"
                              >
                                Remove
                              </button>
                            </div>
                          ))}
                          <button
                            onClick={() => {
                              const newProjects = projects.map(p =>
                                p.id === project.id ? { ...p, sections: [...p.sections, { id: Date.now().toString(), type: 'text' as Section['type'], content: '' }] } : p
                              );
                              setProjects(newProjects);
                            }}
                            className="text-accent hover:text-accent/80 text-sm"
                          >
                            + Add Section
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {project.sections.map((section) => {
                        if (section.type === 'header') return <h3 key={section.id} className="font-bold text-xl">{section.content}</h3>;
                        if (section.type === 'image') return <img key={section.id} src={section.content} alt="" className="w-full rounded-lg" />;
                        if (section.type === 'text') return <p key={section.id} className="body-text">{section.content}</p>;
                        if (section.type === 'title') return <h2 key={section.id} className="font-bold text-2xl">{section.content}</h2>;
                        return null;
                      })}
                    </div>
                  )}
                </div>
                <div>
                  {editMode ? (
                    <div className="space-y-4">
                      <div className="sticky-note p-4">
                        <div className="font-bold mb-2">Key Metrics</div>
                        <input
                          type="text"
                          value={project.stats.users}
                          onChange={(e) => {
                            const newProjects = projects.map(p =>
                              p.id === project.id ? { ...p, stats: { ...p.stats, users: e.target.value } } : p
                            );
                            setProjects(newProjects);
                          }}
                          className="w-full bg-transparent border-b border-accent/50 focus:outline-none focus:border-accent mb-2"
                          placeholder="Users stat"
                        />
                        <input
                          type="text"
                          value={project.stats.rating}
                          onChange={(e) => {
                            const newProjects = projects.map(p =>
                              p.id === project.id ? { ...p, stats: { ...p.stats, rating: e.target.value } } : p
                            );
                            setProjects(newProjects);
                          }}
                          className="w-full bg-transparent border-b border-accent/50 focus:outline-none focus:border-accent mb-2"
                          placeholder="Rating stat"
                        />
                        <input
                          type="text"
                          value={project.stats.growth}
                          onChange={(e) => {
                            const newProjects = projects.map(p =>
                              p.id === project.id ? { ...p, stats: { ...p.stats, growth: e.target.value } } : p
                            );
                            setProjects(newProjects);
                          }}
                          className="w-full bg-transparent border-b border-accent/50 focus:outline-none focus:border-accent"
                          placeholder="Growth stat"
                        />
                      </div>
                      <div className="h-48 bg-gradient-to-br from-accent/20 to-accent/5 rounded-lg flex items-center justify-center relative">
                        {project.chartImageUrl ? (
                          <img src={project.chartImageUrl} alt="Chart" className="w-full h-full object-cover rounded-lg" />
                        ) : (
                          <span className="text-6xl">📊</span>
                        )}
                        <div className="absolute bottom-2 left-2 right-2 bg-white/90 text-black px-2 py-1 text-xs rounded space-y-1">
                          <input
                            type="text"
                            value={project.chartImageUrl}
                            onChange={(e) => {
                              const newProjects = projects.map(p =>
                                p.id === project.id ? { ...p, chartImageUrl: e.target.value } : p
                              );
                              setProjects(newProjects);
                            }}
                            placeholder="Chart image URL"
                            className="w-full bg-transparent border-none outline-none text-xs"
                          />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, (url) => {
                              const newProjects = projects.map(p =>
                                p.id === project.id ? { ...p, chartImageUrl: url } : p
                              );
                              setProjects(newProjects);
                            })}
                            className="w-full text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="sticky-note p-4 mb-6">
                        <div className="font-bold mb-2">Key Metrics</div>
                        <div>• {project.stats.users}</div>
                        <div>• {project.stats.rating}</div>
                        <div>• {project.stats.growth}</div>
                      </div>
                      <div className="h-48 bg-gradient-to-br from-accent/20 to-accent/5 rounded-lg flex items-center justify-center">
                        {project.chartImageUrl ? (
                          <img src={project.chartImageUrl} alt="Chart" className="w-full h-full object-cover rounded-lg" />
                        ) : (
                          <span className="text-6xl">📊</span>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )
      ))}

      {/* Overlays */}
      {expandedSection === 'hero' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setExpandedSection(null)}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="glass rounded-2xl p-8 max-w-2xl text-center relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setExpandedSection(null)} className="absolute top-4 right-4 text-2xl">&times;</button>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
              Your Name
            </h1>
            <p className="text-xl md:text-2xl mb-6 text-foreground/80">
              Product Manager & Designer
            </p>
            <p className="text-lg mb-8 leading-relaxed">
              Crafting innovative solutions with a blend of strategic thinking and creative design.
              Passionate about building products that matter.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass px-8 py-3 rounded-full font-semibold hover:bg-accent/10 transition-colors"
            >
              View My Work
            </motion.button>
          </motion.div>
        </motion.div>
      )}

      {expandedSection === 'about' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setExpandedSection(null)}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="glass rounded-2xl p-8 max-w-4xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setExpandedSection(null)} className="absolute top-4 right-4 text-2xl">&times;</button>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">About Me</h2>
            <p className="text-lg leading-relaxed mb-6">
              With over X years in product management and design, I bridge the gap between user needs
              and technical feasibility. My approach combines data-driven decision making with
              empathetic design thinking to create products that resonate.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="glass p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Strategy</h3>
                <p>Defining product vision and roadmap</p>
              </div>
              <div className="glass p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Design</h3>
                <p>Creating intuitive user experiences</p>
              </div>
              <div className="glass p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Leadership</h3>
                <p>Guiding cross-functional teams</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {expandedSection === 'projects' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setExpandedSection(null)}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="glass rounded-2xl p-8 max-w-6xl w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setExpandedSection(null)} className="absolute top-4 right-4 text-2xl">&times;</button>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Featured Projects</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -10 }}
                  className="glass rounded-xl p-6"
                >
                  <div className="h-32 bg-gradient-to-br from-accent/20 to-accent/5 rounded-lg mb-4"></div>
                  <h3 className="font-semibold mb-2">Project {i}</h3>
                  <p className="text-sm text-foreground/70">Description of the project and its impact.</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}

      {expandedSection === 'experience' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setExpandedSection(null)}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="glass rounded-2xl p-8 max-w-4xl w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setExpandedSection(null)} className="absolute top-4 right-4 text-2xl">&times;</button>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Experience</h2>
            <div className="space-y-6">
              <div className="glass p-6 rounded-lg">
                <h3 className="font-semibold text-lg">Senior Product Manager</h3>
                <p className="text-accent mb-2">Company Name • 2020 - Present</p>
                <p>Led product strategy and design for key features, resulting in 40% user growth.</p>
              </div>
              <div className="glass p-6 rounded-lg">
                <h3 className="font-semibold text-lg">Product Designer</h3>
                <p className="text-accent mb-2">Previous Company • 2018 - 2020</p>
                <p>Designed user interfaces and conducted user research to improve product usability.</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {expandedSection === 'contact' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setExpandedSection(null)}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="glass rounded-2xl p-8 max-w-2xl w-full text-center relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setExpandedSection(null)} className="absolute top-4 right-4 text-2xl">&times;</button>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Get In Touch</h2>
            <p className="text-lg mb-8">Let's discuss how we can work together on your next project.</p>
            <div className="flex justify-center space-x-6">
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="mailto:your.email@example.com"
                className="glass px-6 py-3 rounded-full font-semibold hover:bg-accent/10"
              >
                Email
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://linkedin.com/in/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="glass px-6 py-3 rounded-full font-semibold hover:bg-accent/10"
              >
                LinkedIn
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

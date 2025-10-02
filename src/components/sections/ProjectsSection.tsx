'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

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
  sections: { id: string; type: 'header' | 'image' | 'text' | 'title' | 'paragraph'; content: string; imageUrl: string }[];
}

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  return (
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
    </section>
  );
}

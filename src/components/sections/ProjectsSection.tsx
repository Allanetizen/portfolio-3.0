'use client';

import { useState } from 'react';
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

  console.log('🎨 [CLIENT] ProjectsSection received projects:', {
    count: projects.length,
    projects: projects.map(p => ({ id: p.id, title: p.title }))
  });

  return (
    <section id="projects" className="w-full h-full flex flex-col items-center justify-center snap-center relative p-4 sm:p-6 lg:p-8 bg-purple-500/10">
      <div className="container mx-auto max-w-7xl w-full">
        <h2 className="headline text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-center text-white">
          PROJECTS
        </h2>
        <div className="w-full">
          <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
            {projects.length === 0 ? (
              <div className="flex items-center justify-center w-full h-64">
                <div className="text-center">
                  <p className="text-gray-600 text-white">No projects available</p>
                </div>
              </div>
            ) : (
              projects.map((project) => (
                <div
                  key={project.id}
                  className="flex-shrink-0 w-64 sm:w-72 md:w-80 h-72 sm:h-80 md:h-96 glass rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 snap-center cursor-pointer relative group overflow-visible hover:scale-105 transition-transform duration-300 bg-white/10 backdrop-blur-sm"
                  onClick={() => setExpandedSection(expandedSection === `project-${project.id}` ? null : `project-${project.id}`)}
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
                    <h3 className="font-bold text-lg md:text-xl mb-2 text-white">{project.title}</h3>
                    <p className="text-sm md:text-base text-gray-200 mb-3 line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="px-2 py-1 bg-accent/10 rounded-full text-xs font-medium text-white">{tag}</span>
                      ))}
                    </div>
                    <div className="space-y-1 text-xs md:text-sm text-gray-300">
                      <div>{project.stats.users}</div>
                      <div>{project.stats.rating}</div>
                      <div>{project.stats.growth}</div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {expandedSection && projects.find(p => `project-${p.id}` === expandedSection) && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setExpandedSection(null)}
        >
          <div
            className="glass rounded-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto relative"
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
          </div>
        </div>
      )}
    </section>
  );
}

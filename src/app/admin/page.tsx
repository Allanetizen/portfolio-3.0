'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

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
  sections: Section[];
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
}

export default function AdminPage() {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      title: 'Project 1',
      description: 'Innovative app design with focus on user experience.',
      tags: ['#UX', '#Mobile'],
      stats: { users: '+5k users', rating: '⭐ 4.8 rating', growth: '📈 40% growth' },
      sections: []
    },
    {
      id: 2,
      title: 'Project 2',
      description: 'Innovative app design with focus on user experience.',
      tags: ['#UX', '#Mobile'],
      stats: { users: '+5k users', rating: '⭐ 4.8 rating', growth: '📈 40% growth' },
      sections: []
    },
    {
      id: 3,
      title: 'Project 3',
      description: 'Innovative app design with focus on user experience.',
      tags: ['#UX', '#Mobile'],
      stats: { users: '+5k users', rating: '⭐ 4.8 rating', growth: '📈 40% growth' },
      sections: []
    }
  ]);

  const [experiences, setExperiences] = useState<Experience[]>([
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
    }
  ]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else {
      // Load data from API
      fetch('/api/portfolio')
        .then(response => response.json())
        .then((data: PortfolioData) => {
          setProjects(data.projects);
          setExperiences(data.experiences);
        })
        .catch(error => console.error('Error loading data:', error));
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  const saveData = async () => {
    const data = { projects, experiences };
    try {
      const response = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        alert('Data saved successfully!');
      } else {
        alert('Failed to save data');
      }
    } catch (error) {
      console.error('Error saving:', error);
      alert('Error saving data');
    }
  };

  const updateProject = (id: number, field: keyof Project, value: unknown) => {
    setProjects(projects.map(p =>
      p.id === id ? { ...p, [field]: value } : p
    ));
  };

  const updateExperience = (id: number, field: keyof Experience, value: string) => {
    setExperiences(experiences.map(e =>
      e.id === id ? { ...e, [field]: value } : e
    ));
  };

  const addSection = (projectId: number) => {
    setProjects(projects.map(p =>
      p.id === projectId ? { ...p, sections: [...p.sections, { id: Date.now().toString(), type: 'text', content: '' }] } : p
    ));
  };

  const updateSection = (projectId: number, sectionId: string, field: keyof Section, value: string) => {
    setProjects(projects.map(p =>
      p.id === projectId ? {
        ...p,
        sections: p.sections.map(s =>
          s.id === sectionId ? { ...s, [field]: value } : s
        )
      } : p
    ));
  };

  const removeSection = (projectId: number, sectionId: string) => {
    setProjects(projects.map(p =>
      p.id === projectId ? { ...p, sections: p.sections.filter(s => s.id !== sectionId) } : p
    ));
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="headline">ADMIN DASHBOARD</h1>
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={saveData}
              className="glass px-6 py-3 rounded-lg font-bold hover:bg-accent/10"
            >
              SAVE CHANGES
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={logout}
              className="glass px-6 py-3 rounded-lg font-bold hover:bg-red-500/10 text-red-400"
            >
              LOGOUT
            </motion.button>
          </div>
        </div>

        <div className="flex gap-6 mb-8">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-6 py-3 rounded-lg font-bold transition-colors ${
              activeTab === 'projects' ? 'bg-accent text-white' : 'glass hover:bg-accent/10'
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => setActiveTab('experience')}
            className={`px-6 py-3 rounded-lg font-bold transition-colors ${
              activeTab === 'experience' ? 'bg-accent text-white' : 'glass hover:bg-accent/10'
            }`}
          >
            Experience
          </button>
        </div>

        {activeTab === 'projects' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Manage Projects</h2>
            {projects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass rounded-xl p-6"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block body-text mb-2">Title</label>
                      <input
                        type="text"
                        value={project.title}
                        onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                        className="w-full glass rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                    <div>
                      <label className="block body-text mb-2">Description</label>
                      <textarea
                        value={project.description}
                        onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                        className="w-full glass rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent h-20"
                      />
                    </div>
                    <div>
                      <label className="block body-text mb-2">Tags (comma separated)</label>
                      <input
                        type="text"
                        value={project.tags.join(', ')}
                        onChange={(e) => updateProject(project.id, 'tags', e.target.value.split(', '))}
                        className="w-full glass rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                    <div>
                      <label className="block body-text mb-2">Sections</label>
                      <div className="space-y-2">
                        {project.sections.map((section) => (
                          <div key={section.id} className="flex gap-2 items-center">
                            <select
                              value={section.type}
                              onChange={(e) => updateSection(project.id, section.id, 'type', e.target.value)}
                              className="glass rounded px-2 py-1 text-sm"
                            >
                              <option value="header">Header</option>
                              <option value="image">Image</option>
                              <option value="text">Text</option>
                              <option value="title">Title</option>
                              <option value="paragraph">Paragraph</option>
                            </select>
                            <input
                              type="text"
                              value={section.content}
                              onChange={(e) => updateSection(project.id, section.id, 'content', e.target.value)}
                              className="flex-1 glass rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                              placeholder="Content"
                            />
                            <button
                              onClick={() => removeSection(project.id, section.id)}
                              className="text-red-400 hover:text-red-600 text-sm"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => addSection(project.id)}
                          className="text-accent hover:text-accent/80 text-sm"
                        >
                          + Add Section
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block body-text mb-2">Users Stat</label>
                      <input
                        type="text"
                        value={project.stats.users}
                        onChange={(e) => updateProject(project.id, 'stats', { ...project.stats, users: e.target.value })}
                        className="w-full glass rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                    <div>
                      <label className="block body-text mb-2">Rating Stat</label>
                      <input
                        type="text"
                        value={project.stats.rating}
                        onChange={(e) => updateProject(project.id, 'stats', { ...project.stats, rating: e.target.value })}
                        className="w-full glass rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                    <div>
                      <label className="block body-text mb-2">Growth Stat</label>
                      <input
                        type="text"
                        value={project.stats.growth}
                        onChange={(e) => updateProject(project.id, 'stats', { ...project.stats, growth: e.target.value })}
                        className="w-full glass rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'experience' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Manage Experience</h2>
            {experiences.map((experience) => (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass rounded-xl p-6"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block body-text mb-2">Title</label>
                      <input
                        type="text"
                        value={experience.title}
                        onChange={(e) => updateExperience(experience.id, 'title', e.target.value)}
                        className="w-full glass rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                    <div>
                      <label className="block body-text mb-2">Company</label>
                      <input
                        type="text"
                        value={experience.company}
                        onChange={(e) => updateExperience(experience.id, 'company', e.target.value)}
                        className="w-full glass rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                    <div>
                      <label className="block body-text mb-2">Period</label>
                      <input
                        type="text"
                        value={experience.period}
                        onChange={(e) => updateExperience(experience.id, 'period', e.target.value)}
                        className="w-full glass rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block body-text mb-2">Description</label>
                    <textarea
                      value={experience.description}
                      onChange={(e) => updateExperience(experience.id, 'description', e.target.value)}
                      className="w-full glass rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent h-32"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
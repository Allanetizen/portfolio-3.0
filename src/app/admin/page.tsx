'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
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

interface PortfolioData {
  projects: Project[];
  experiences: Experience[];
}

export default function AdminPage() {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('projects');
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editStep, setEditStep] = useState<'cover' | 'details'>('cover');
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

  const updateEditingProject = (field: keyof Project, value: unknown) => {
    if (editingProject) {
      setEditingProject({ ...editingProject, [field]: value });
    }
  };

  const saveEditingProject = () => {
    if (editingProject) {
      setProjects(projects.map(p => p.id === editingProject.id ? editingProject : p));
      setEditingProject(null);
    }
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

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      throw new Error('Upload failed');
    }
    const data = await response.json();
    return data.url;
  };

  const ImageDropzone = ({ onUpload }: { onUpload: (url: string) => void }) => {
    const onDrop = useCallback(async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        try {
          const url = await uploadImage(file);
          onUpload(url);
        } catch {
          alert('Failed to upload image');
        }
      }
    }, [onUpload]);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: {'image/*': []} });
    return (
      <div {...getRootProps()} className="border-2 border-dashed border-gray-300 p-4 text-center cursor-pointer rounded">
        <input {...getInputProps()} />
        {isDragActive ? <p>Drop the image here...</p> : <p>Drag &apos;n&apos; drop an image here, or click to select</p>}
      </div>
    );
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
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold">{project.title}</h3>
                    <p className="body-text">{project.description}</p>
                    <div className="flex gap-2 mt-2">
                      {project.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-accent/10 rounded-full text-sm">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setEditingProject(project);
                        setEditStep('cover');
                      }}
                      className="glass px-4 py-2 rounded-lg font-bold hover:bg-accent/10"
                    >
                      EDIT
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        if (confirm('Are you sure you want to delete this project?')) {
                          setProjects(projects.filter(p => p.id !== project.id));
                        }
                      }}
                      className="glass px-4 py-2 rounded-lg font-bold hover:bg-red-500/10 text-red-400"
                    >
                      DELETE
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
            <div className="flex justify-center">
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
                className="glass px-6 py-3 rounded-lg font-bold hover:bg-accent/10"
              >
                ADD PROJECT
              </motion.button>
            </div>
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

        {/* Edit Project Overlay */}
        {editingProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setEditingProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="glass rounded-2xl p-8 max-w-4xl w-full max-h-[80vh] overflow-y-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setEditingProject(null)} className="absolute top-4 right-4 text-2xl">&times;</button>
              <h2 className="text-3xl font-bold mb-6">Edit Project</h2>

              {editStep === 'cover' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold">Step 1: Upload Cover Image</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block body-text mb-2">Cover Image URL</label>
                      <input
                        type="text"
                        value={editingProject.imageUrl}
                        onChange={(e) => updateEditingProject('imageUrl', e.target.value)}
                        className="w-full glass rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder="Enter image URL or upload file"
                      />
                    </div>
                    <div>
                      <label className="block body-text mb-2">Or Upload Image</label>
                      <ImageDropzone onUpload={(url) => updateEditingProject('imageUrl', url)} />
                    </div>
                    {editingProject.imageUrl && (
                      <div className="mt-4">
                        <img src={editingProject.imageUrl} alt="Cover" className="max-w-full max-h-64 object-cover rounded-lg" />
                      </div>
                    )}
                  </div>
                  <div className="flex justify-end">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setEditStep('details')}
                      disabled={!editingProject.imageUrl}
                      className={`px-6 py-3 rounded-lg font-bold ${editingProject.imageUrl ? 'glass hover:bg-accent/10' : 'bg-gray-500 cursor-not-allowed'}`}
                    >
                      Next: Edit Details
                    </motion.button>
                  </div>
                </div>
              )}

              {editStep === 'details' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold">Step 2: Edit Project Details</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block body-text mb-2">Title</label>
                        <input
                          type="text"
                          value={editingProject.title}
                          onChange={(e) => updateEditingProject('title', e.target.value)}
                          className="w-full glass rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                      </div>
                      <div>
                        <label className="block body-text mb-2">Description</label>
                        <textarea
                          value={editingProject.description}
                          onChange={(e) => updateEditingProject('description', e.target.value)}
                          className="w-full glass rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent h-20"
                        />
                      </div>
                      <div>
                        <label className="block body-text mb-2">Tags (comma separated)</label>
                        <input
                          type="text"
                          value={editingProject.tags.join(', ')}
                          onChange={(e) => updateEditingProject('tags', e.target.value.split(', '))}
                          className="w-full glass rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                      </div>
                      <div>
                        <label className="block body-text mb-2">Challenge</label>
                        <textarea
                          value={editingProject.challenge}
                          onChange={(e) => updateEditingProject('challenge', e.target.value)}
                          className="w-full glass rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent h-20"
                        />
                      </div>
                      <div>
                        <label className="block body-text mb-2">Solution</label>
                        <textarea
                          value={editingProject.solution}
                          onChange={(e) => updateEditingProject('solution', e.target.value)}
                          className="w-full glass rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent h-20"
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block body-text mb-2">Users Stat</label>
                        <input
                          type="text"
                          value={editingProject.stats.users}
                          onChange={(e) => updateEditingProject('stats', { ...editingProject.stats, users: e.target.value })}
                          className="w-full glass rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                      </div>
                      <div>
                        <label className="block body-text mb-2">Rating Stat</label>
                        <input
                          type="text"
                          value={editingProject.stats.rating}
                          onChange={(e) => updateEditingProject('stats', { ...editingProject.stats, rating: e.target.value })}
                          className="w-full glass rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                      </div>
                      <div>
                        <label className="block body-text mb-2">Growth Stat</label>
                        <input
                          type="text"
                          value={editingProject.stats.growth}
                          onChange={(e) => updateEditingProject('stats', { ...editingProject.stats, growth: e.target.value })}
                          className="w-full glass rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                      </div>
                      <div>
                        <label className="block body-text mb-2">Chart Image URL</label>
                        <input
                          type="text"
                          value={editingProject.chartImageUrl}
                          onChange={(e) => updateEditingProject('chartImageUrl', e.target.value)}
                          className="w-full glass rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                          placeholder="Enter chart image URL or upload file"
                        />
                      </div>
                      <div>
                        <label className="block body-text mb-2">Or Upload Chart Image</label>
                        <ImageDropzone onUpload={(url) => updateEditingProject('chartImageUrl', url)} />
                      </div>
                      {editingProject.chartImageUrl && (
                        <div className="mt-4">
                          <img src={editingProject.chartImageUrl} alt="Chart" className="max-w-full max-h-32 object-cover rounded" />
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block body-text mb-2">Sections</label>
                    <div className="space-y-2">
                      {editingProject.sections.map((section) => (
                        <div key={section.id} className="flex gap-2 items-center">
                          <select
                            value={section.type}
                            onChange={(e) => {
                              const newSections = editingProject.sections.map(s =>
                                s.id === section.id ? { ...s, type: e.target.value as Section['type'] } : s
                              );
                              updateEditingProject('sections', newSections);
                            }}
                            className="glass rounded px-2 py-1 text-sm"
                          >
                            <option value="header">Header</option>
                            <option value="image">Image</option>
                            <option value="text">Text</option>
                            <option value="title">Title</option>
                            <option value="paragraph">Paragraph</option>
                          </select>
                          {section.type === 'image' ? (
                            <div className="flex-1 space-y-2">
                              {section.content && <img src={section.content} alt="Uploaded" className="max-w-32 max-h-32 object-cover rounded" />}
                              <ImageDropzone onUpload={(url) => {
                                const newSections = editingProject.sections.map(s =>
                                  s.id === section.id ? { ...s, content: url } : s
                                );
                                updateEditingProject('sections', newSections);
                              }} />
                            </div>
                          ) : (
                            <input
                              type="text"
                              value={section.content}
                              onChange={(e) => {
                                const newSections = editingProject.sections.map(s =>
                                  s.id === section.id ? { ...s, content: e.target.value } : s
                                );
                                updateEditingProject('sections', newSections);
                              }}
                              className="flex-1 glass rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                              placeholder="Content"
                            />
                          )}
                          <button
                            onClick={() => {
                              const newSections = editingProject.sections.filter(s => s.id !== section.id);
                              updateEditingProject('sections', newSections);
                            }}
                            className="text-red-400 hover:text-red-600 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => {
                          const newSection = { id: Date.now().toString(), type: 'text' as Section['type'], content: '' };
                          updateEditingProject('sections', [...editingProject.sections, newSection]);
                        }}
                        className="text-accent hover:text-accent/80 text-sm"
                      >
                        + Add Section
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setEditStep('cover')}
                      className="glass px-6 py-3 rounded-lg font-bold hover:bg-accent/10"
                    >
                      Back to Cover
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={saveEditingProject}
                      className="glass px-6 py-3 rounded-lg font-bold hover:bg-accent/10"
                    >
                      Save Project
                    </motion.button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
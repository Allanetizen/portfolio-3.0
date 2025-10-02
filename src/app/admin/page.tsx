'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
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
  ctaLink?: string;
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
  heroName: string;
  heroDescription: string;
  aboutText: string;
  contactEmail: string;
  contactLinkedIn: string;
  contactInstagram: string;
  contactMedium: string;
  contactGitHub: string;
  profileImageUrl: string;
  layout: 'regular' | 'bento' | 'circular';
}

export default function AdminPage() {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('hero');
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
      ctaLink: '',
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

  // Hero and site content state
  const [heroName, setHeroName] = useState('YOUR NAME');
  const [heroDescription, setHeroDescription] = useState('Product Manager & Designer crafting innovative solutions with strategic thinking and creative design.');
  const [aboutText, setAboutText] = useState('Crafting digital experiences that blend strategic thinking with artistic design. I bridge the gap between user needs and technical innovation, creating products that not only work beautifully but tell compelling stories.');
  const [contactEmail, setContactEmail] = useState('mailto:your.email@example.com');
  const [contactLinkedIn, setContactLinkedIn] = useState('https://linkedin.com/in/yourprofile');
  const [contactInstagram, setContactInstagram] = useState('https://instagram.com/yourprofile');
  const [contactMedium, setContactMedium] = useState('https://medium.com/@yourprofile');
  const [contactGitHub, setContactGitHub] = useState('https://github.com/yourprofile');
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [layout, setLayout] = useState<'regular' | 'bento' | 'circular'>('regular');

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
          setHeroName(data.heroName);
          setHeroDescription(data.heroDescription);
          setAboutText(data.aboutText);
          setContactEmail(data.contactEmail);
          setContactLinkedIn(data.contactLinkedIn);
          setContactInstagram(data.contactInstagram);
          setContactMedium(data.contactMedium);
          setContactGitHub(data.contactGitHub);
          setProfileImageUrl(data.profileImageUrl);
          setLayout(data.layout);
        })
        .catch(error => console.error('Error loading data:', error));
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="glass rounded-3xl p-8 max-w-md w-full text-center">
          <h1 className="headline text-2xl mb-4">Access Denied</h1>
          <p className="body-text mb-6">Please log in to access the admin panel.</p>
          <button
            onClick={() => router.push('/login')}
            className="glass px-6 py-3 rounded-lg hover:bg-accent/10 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const saveData = async () => {
    try {
      // First, fetch existing data to merge with current changes
      const existingResponse = await fetch('/api/portfolio');
      let existingData = {};
      
      if (existingResponse.ok) {
        existingData = await existingResponse.json();
      }
      
      // Merge existing data with current changes (current changes take precedence)
      const mergedData = {
        ...existingData,
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
        profileImageUrl, 
        layout 
      };
      
      const response = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mergedData)
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
            onClick={() => setActiveTab('hero')}
            className={`px-6 py-3 rounded-lg font-bold transition-colors ${
              activeTab === 'hero' ? 'bg-accent text-white' : 'glass hover:bg-accent/10'
            }`}
          >
            Hero & About
          </button>
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
          <button
            onClick={() => setActiveTab('contact')}
            className={`px-6 py-3 rounded-lg font-bold transition-colors ${
              activeTab === 'contact' ? 'bg-accent text-white' : 'glass hover:bg-accent/10'
            }`}
          >
            Contact & Links
          </button>
        </div>

        {activeTab === 'hero' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Hero Section & About</h2>
            <div className="glass rounded-xl p-6 space-y-6">
              <div>
                <label className="block body-text mb-2">Hero Name</label>
                <input
                  type="text"
                  value={heroName}
                  onChange={(e) => setHeroName(e.target.value)}
                  className="w-full glass rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="block body-text mb-2">Hero Description</label>
                <textarea
                  value={heroDescription}
                  onChange={(e) => setHeroDescription(e.target.value)}
                  className="w-full glass rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent h-24"
                  placeholder="Brief description of yourself and your role"
                />
              </div>
              <div>
                <label className="block body-text mb-2">About Text</label>
                <textarea
                  value={aboutText}
                  onChange={(e) => setAboutText(e.target.value)}
                  className="w-full glass rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent h-32"
                  placeholder="Detailed about section text"
                />
              </div>
              <div>
                <label className="block body-text mb-2">Profile Image URL</label>
                <input
                  type="text"
                  value={profileImageUrl}
                  onChange={(e) => setProfileImageUrl(e.target.value)}
                  className="w-full glass rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="https://example.com/profile.jpg"
                />
              </div>
              <div>
                <label className="block body-text mb-2">Layout Style</label>
                <select
                  value={layout}
                  onChange={(e) => setLayout(e.target.value as 'regular' | 'bento' | 'circular')}
                  className="w-full glass rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="regular">Regular</option>
                  <option value="bento">Bento</option>
                  <option value="circular">Circular</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Manage Projects</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="glass rounded-xl p-6 relative overflow-hidden"
                >
                  <div className="h-32 bg-gradient-to-br from-accent/20 to-accent/5 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                    {project.imageUrl ? (
                      <Image src={project.imageUrl} alt={project.title} fill className="object-cover" />
                    ) : (
                      <span className="text-3xl">📱</span>
                    )}
                  </div>
                  <div className="relative z-10">
                    <h3 className="font-bold text-lg mb-2">{project.title}</h3>
                    <p className="body-text mb-4 text-sm line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.slice(0, 2).map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-accent/10 rounded-full text-xs">{tag}</span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setEditingProject(project);
                          setEditStep('cover');
                        }}
                        className="flex-1 glass px-2 py-2 rounded-lg font-bold hover:bg-accent/10 text-sm"
                      >
                        EDIT COVER
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          if (project.imageUrl) {
                            setEditingProject(project);
                            setEditStep('details');
                          } else {
                            alert('Please set a cover image first by clicking "EDIT COVER"');
                          }
                        }}
                        className="flex-1 glass px-2 py-2 rounded-lg font-bold hover:bg-accent/10 text-sm"
                      >
                        EDIT DETAILS
                      </motion.button>
                    </div>
                  </div>
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
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02, y: -2 }}
                className="glass rounded-xl p-6 flex items-center justify-center cursor-pointer min-h-[200px]"
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
                    ctaLink: '',
                    sections: []
                  };
                  setProjects([...projects, newProject]);
                }}
              >
                <div className="text-center">
                  <div className="text-4xl mb-2">+</div>
                  <div className="font-bold">ADD PROJECT</div>
                </div>
              </motion.div>
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

        {activeTab === 'contact' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Contact Information & Social Links</h2>
            <div className="glass rounded-xl p-6 space-y-6">
              <div>
                <label className="block body-text mb-2">Email</label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full glass rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="mailto:your.email@example.com"
                />
              </div>
              <div>
                <label className="block body-text mb-2">LinkedIn URL</label>
                <input
                  type="url"
                  value={contactLinkedIn}
                  onChange={(e) => setContactLinkedIn(e.target.value)}
                  className="w-full glass rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>
              <div>
                <label className="block body-text mb-2">Instagram URL</label>
                <input
                  type="url"
                  value={contactInstagram}
                  onChange={(e) => setContactInstagram(e.target.value)}
                  className="w-full glass rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="https://instagram.com/yourprofile"
                />
              </div>
              <div>
                <label className="block body-text mb-2">Medium URL</label>
                <input
                  type="url"
                  value={contactMedium}
                  onChange={(e) => setContactMedium(e.target.value)}
                  className="w-full glass rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="https://medium.com/@yourprofile"
                />
              </div>
              <div>
                <label className="block body-text mb-2">GitHub URL</label>
                <input
                  type="url"
                  value={contactGitHub}
                  onChange={(e) => setContactGitHub(e.target.value)}
                  className="w-full glass rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="https://github.com/yourprofile"
                />
              </div>
            </div>
          </div>
        )}

        {/* Upload Cover Overlay */}
        {editingProject && editStep === 'cover' && (
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
              className="glass rounded-2xl p-8 max-w-md w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setEditingProject(null)} className="absolute top-4 right-4 text-2xl">&times;</button>
              <h2 className="text-2xl font-bold mb-6">Upload Project Cover</h2>
              <div className="space-y-4">
                <div>
                  <label className="block body-text mb-2">Cover Image URL</label>
                  <input
                    type="text"
                    value={editingProject.imageUrl}
                    onChange={(e) => updateEditingProject('imageUrl', e.target.value)}
                    className="w-full glass rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="Enter image URL"
                  />
                </div>
                <div>
                  <label className="block body-text mb-2">Or Upload Image</label>
                  <ImageDropzone onUpload={(url) => updateEditingProject('imageUrl', url)} />
                </div>
                {editingProject.imageUrl && (
                  <div className="mt-4 relative w-full h-64">
                    <Image src={editingProject.imageUrl} alt="Cover" fill className="object-cover rounded-lg" />
                  </div>
                )}
              </div>
              <div className="flex justify-between mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setEditingProject(null)}
                  className="glass px-6 py-3 rounded-lg font-bold hover:bg-accent/10"
                >
                  Cancel
                </motion.button>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      saveEditingProject();
                      setEditingProject(null);
                    }}
                    disabled={!editingProject.imageUrl}
                    className={`px-4 py-3 rounded-lg font-bold ${editingProject.imageUrl ? 'glass hover:bg-accent/10' : 'bg-gray-500 cursor-not-allowed'}`}
                  >
                    Save Cover
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      saveEditingProject();
                      setEditStep('details');
                    }}
                    disabled={!editingProject.imageUrl}
                    className={`px-4 py-3 rounded-lg font-bold ${editingProject.imageUrl ? 'glass hover:bg-accent/10' : 'bg-gray-500 cursor-not-allowed'}`}
                  >
                    Continue to Edit Details
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Edit Project Overlay */}
        {editingProject && editStep === 'details' && (
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
              <h2 className="text-3xl font-bold mb-6">Edit Project Info</h2>
              <div className="space-y-6">
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
                      <div className="mt-4 relative w-full h-32">
                        <Image src={editingProject.chartImageUrl} alt="Chart" fill className="object-cover rounded" />
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
                            {section.content && (
                              <div className="relative w-32 h-32">
                                <Image src={section.content} alt="Uploaded" fill className="object-cover rounded" />
                              </div>
                            )}
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
                <div className="flex justify-between items-center">
                  <div>
                    <label className="block body-text mb-2">CTA Link (for &quot;Read Full Case Study&quot;)</label>
                    <input
                      type="text"
                      value={editingProject.ctaLink || ''}
                      onChange={(e) => updateEditingProject('ctaLink', e.target.value)}
                      className="w-full glass rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="https://example.com/case-study"
                    />
                  </div>
                  <div className="flex gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setEditStep('cover')}
                      className="glass px-6 py-3 rounded-lg font-bold hover:bg-accent/10"
                    >
                      Back to Upload Cover
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setEditingProject(null)}
                      className="glass px-6 py-3 rounded-lg font-bold hover:bg-accent/10"
                    >
                      Cancel
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
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
'use client';

import { useState, useEffect, useRef } from 'react';
import Background from './Background';
import HeroSection from './sections/HeroSection';
import ProjectsSection from './sections/ProjectsSection';
import AboutSection from './sections/AboutSection';
import ExperienceSection from './sections/ExperienceSection';
import ContactSection from './sections/ContactSection';
import FooterSection from './sections/FooterSection';

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

  const sectionCount = 6; // Hero, Projects, About, Experience, Contact, Footer

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
      <main
        ref={mainRef}
        className="relative z-10 flex w-max min-h-screen snap-x snap-mandatory"
      >
        {/* Hero Section */}
        <HeroSection
          heroName={heroName}
          heroDescription={heroDescription}
          contactEmail={contactEmail}
          contactLinkedIn={contactLinkedIn}
          contactGitHub={contactGitHub}
        />

        {/* Projects Section */}
        <ProjectsSection projects={projects} />

        {/* About Section */}
        <AboutSection aboutText={aboutText} />

        {/* Experience Section */}
        <ExperienceSection experiences={experiences} />

        {/* Contact Section */}
        <ContactSection
          contactEmail={contactEmail}
          contactLinkedIn={contactLinkedIn}
          contactInstagram={contactInstagram}
          contactMedium={contactMedium}
          contactGitHub={contactGitHub}
        />

        {/* Footer Section */}
        <FooterSection
          contactEmail={contactEmail}
          contactLinkedIn={contactLinkedIn}
          contactInstagram={contactInstagram}
          contactGitHub={contactGitHub}
        />
      </main>

      <div 
        className={`fixed left-4 top-1/2 transform -translate-y-1/2 text-4xl cursor-pointer z-20 transition-opacity ${
          currentSection > 0 ? 'opacity-50 hover:opacity-100' : 'opacity-20 cursor-not-allowed'
        }`} 
        onClick={() => currentSection > 0 && scrollToSection(currentSection - 1)}
      >
        ←
      </div>
      <div 
        className={`fixed right-4 top-1/2 transform -translate-y-1/2 text-4xl cursor-pointer z-20 transition-opacity ${
          currentSection < sectionCount - 1 ? 'opacity-50 hover:opacity-100' : 'opacity-20 cursor-not-allowed'
        }`} 
        onClick={() => currentSection < sectionCount - 1 && scrollToSection(currentSection + 1)}
      >
        →
      </div>

      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 z-20">
        <div className="flex gap-2">
          {Array.from({ length: sectionCount }).map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full cursor-pointer transition-colors ${currentSection === index ? 'bg-accent' : 'bg-gray-400'}`}
              onClick={() => scrollToSection(index)}
            ></div>
          ))}
        </div>
        <div className="text-xs text-gray-400 font-medium">
          {['Hero', 'Projects', 'About', 'Experience', 'Contact', 'Footer'][currentSection]}
        </div>
      </div>
    </div>
  );
}

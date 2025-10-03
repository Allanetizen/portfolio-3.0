'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
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

  // Debug logging
  console.log('🎯 [CLIENT] PortfolioClient received data:', {
    projects: data.projects?.length || 0,
    experiences: data.experiences?.length || 0,
    heroName: data.heroName,
    aboutText: data.aboutText?.substring(0, 50) + '...',
    fullData: data
  });

  // Use data directly from props (already fetched on server)
  const projects = data.projects || [];
  const experiences = data.experiences || [];
  const heroName = data.heroName || 'Default Name';
  const heroDescription = data.heroDescription || 'Default Description';
  const aboutText = data.aboutText || 'Default About';
  const contactEmail = data.contactEmail || 'mailto:default@example.com';
  const contactLinkedIn = data.contactLinkedIn || 'https://linkedin.com/in/default';
  const contactInstagram = data.contactInstagram || 'https://instagram.com/default';
  const contactMedium = data.contactMedium || 'https://medium.com/@default';
  const contactGitHub = data.contactGitHub || 'https://github.com/default';
  // const profileImageUrl = data.profileImageUrl;
  // const layout = data.layout;

  console.log('📋 [CLIENT] Processed data:', {
    projectsCount: projects.length,
    experiencesCount: experiences.length,
    heroName,
    aboutText: aboutText.substring(0, 30) + '...'
  });

  const sectionCount = 6; // Hero, Projects, About, Experience, Contact, Footer

  const scrollToSection = useCallback((index: number) => {
    console.log('🎯 [CLIENT] Scrolling to section:', index, 'currentSection:', currentSection);
    
    if (mainRef.current) {
      const sectionWidth = window.innerWidth;
      const targetScrollLeft = index * sectionWidth;
      
      console.log('📍 [CLIENT] Scrolling to position:', targetScrollLeft, 'sectionWidth:', sectionWidth);
      console.log('📏 [CLIENT] Main container scrollWidth:', mainRef.current.scrollWidth, 'clientWidth:', mainRef.current.clientWidth);
      
      mainRef.current.scrollTo({
        left: targetScrollLeft,
        behavior: 'smooth'
      });
      
      // Update state immediately for better UX
      setCurrentSection(index);
    } else {
      console.error('❌ [CLIENT] mainRef.current is null');
    }
  }, [currentSection]);

  useEffect(() => {
    console.log('🔄 [CLIENT] Setting up scroll handlers, currentSection:', currentSection);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        if (currentSection > 0) {
          scrollToSection(currentSection - 1);
        }
      } else if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        if (currentSection < sectionCount - 1) {
          scrollToSection(currentSection + 1);
        }
      }
    };

    const handleScroll = () => {
      if (mainRef.current) {
        const scrollLeft = mainRef.current.scrollLeft;
        const sectionWidth = window.innerWidth;
        const newSection = Math.round(scrollLeft / sectionWidth);
        console.log('📜 [CLIENT] Scroll detected, scrollLeft:', scrollLeft, 'sectionWidth:', sectionWidth, 'newSection:', newSection, 'currentSection:', currentSection);
        if (newSection !== currentSection && newSection >= 0 && newSection < sectionCount) {
          console.log('🔄 [CLIENT] Updating currentSection from', currentSection, 'to', newSection);
          setCurrentSection(newSection);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const mainElement = mainRef.current;
    if (mainElement) {
      mainElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (mainElement) {
        mainElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, [currentSection, sectionCount, scrollToSection]);

  return (
    <div className="min-h-screen overflow-hidden relative">
      <Background currentSection={currentSection} />
      <main
        id="main-container"
        ref={mainRef}
        className="relative z-10 flex min-h-screen snap-x snap-mandatory overflow-x-auto scrollbar-hide"
        style={{ 
          width: `${sectionCount * 100}vw`,
          scrollBehavior: 'smooth'
        }}
      >
        {/* Hero Section */}
        <div className="flex-shrink-0 w-screen h-screen">
          <HeroSection
            heroName={heroName}
            heroDescription={heroDescription}
            contactEmail={contactEmail}
            contactLinkedIn={contactLinkedIn}
            contactGitHub={contactGitHub}
          />
        </div>

        {/* Projects Section */}
        <div className="flex-shrink-0 w-screen h-screen">
          <ProjectsSection projects={projects} />
        </div>

        {/* About Section */}
        <div className="flex-shrink-0 w-screen h-screen">
          <AboutSection aboutText={aboutText} />
        </div>

        {/* Experience Section */}
        <div className="flex-shrink-0 w-screen h-screen">
          <ExperienceSection experiences={experiences} />
        </div>

        {/* Contact Section */}
        <div className="flex-shrink-0 w-screen h-screen">
          <ContactSection
            contactEmail={contactEmail}
            contactLinkedIn={contactLinkedIn}
            contactInstagram={contactInstagram}
            contactMedium={contactMedium}
            contactGitHub={contactGitHub}
          />
        </div>

        {/* Footer Section */}
        <div className="flex-shrink-0 w-screen h-screen">
          <FooterSection
            contactEmail={contactEmail}
            contactLinkedIn={contactLinkedIn}
            contactInstagram={contactInstagram}
            contactGitHub={contactGitHub}
          />
        </div>
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
        <div className="text-xs text-gray-500 mt-2">
          Use ← → arrows or click dots to navigate
        </div>
      </div>
    </div>
  );
}

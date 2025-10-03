'use client';

interface HeroSectionProps {
  heroName: string;
  heroDescription: string;
  contactEmail: string;
  contactLinkedIn: string;
  contactGitHub: string;
}

export default function HeroSection({
  heroName,
  heroDescription,
  contactEmail,
  contactLinkedIn,
  contactGitHub
}: HeroSectionProps) {
  return (
    <section id="hero" className="w-full h-full flex items-center justify-center snap-center relative bg-green-500/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center">
          <div className="glass p-6 sm:p-8 md:p-12 rounded-2xl bg-white/20 backdrop-blur-sm">
            <h1 className="headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6 bleed-text text-white leading-tight">{heroName}</h1>
            <p className="body-text text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-3xl mx-auto text-white leading-relaxed">{heroDescription}</p>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              <a href={contactEmail} className="glass px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-accent/10 transition-colors bg-white/10 text-white text-sm sm:text-base font-medium">📧 Contact</a>
              <a href={contactLinkedIn} target="_blank" rel="noopener noreferrer" className="glass px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-accent/10 transition-colors bg-white/10 text-white text-sm sm:text-base font-medium">💼 LinkedIn</a>
              <a href={contactGitHub} target="_blank" rel="noopener noreferrer" className="glass px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-accent/10 transition-colors bg-white/10 text-white text-sm sm:text-base font-medium">🐙 GitHub</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

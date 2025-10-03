'use client';

interface FooterSectionProps {
  contactEmail: string;
  contactLinkedIn: string;
  contactInstagram: string;
  contactGitHub: string;
}

export default function FooterSection({
  contactEmail,
  contactLinkedIn,
  contactInstagram,
  contactGitHub
}: FooterSectionProps) {
  console.log('🦶 [CLIENT] FooterSection received contact data:', {
    email: contactEmail,
    linkedin: contactLinkedIn,
    instagram: contactInstagram,
    github: contactGitHub
  });
  
  return (
    <section id="footer" className="w-full h-full flex items-center justify-center snap-center relative bg-blue-500/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center">
          <div className="glass p-6 sm:p-8 md:p-12 rounded-2xl bg-white/20 backdrop-blur-sm">
            <h2 className="headline text-2xl sm:text-3xl md:text-4xl mb-6 sm:mb-8 bleed-text text-white">THANK YOU</h2>
            <p className="body-text text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-white">Thanks for exploring my portfolio. Let&apos;s create something amazing together.</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
              <a href={contactEmail} className="glass p-3 sm:p-4 rounded-lg hover:bg-accent/10 transition-colors text-center bg-white/10">
                <div className="text-xl sm:text-2xl mb-1 sm:mb-2">📧</div>
                <div className="text-xs sm:text-sm font-medium text-white">Email</div>
              </a>
              <a href={contactLinkedIn} target="_blank" rel="noopener noreferrer" className="glass p-3 sm:p-4 rounded-lg hover:bg-accent/10 transition-colors text-center bg-white/10">
                <div className="text-xl sm:text-2xl mb-1 sm:mb-2">💼</div>
                <div className="text-xs sm:text-sm font-medium text-white">LinkedIn</div>
              </a>
              <a href={contactInstagram} target="_blank" rel="noopener noreferrer" className="glass p-3 sm:p-4 rounded-lg hover:bg-accent/10 transition-colors text-center bg-white/10">
                <div className="text-xl sm:text-2xl mb-1 sm:mb-2">📸</div>
                <div className="text-xs sm:text-sm font-medium text-white">Instagram</div>
              </a>
              <a href={contactGitHub} target="_blank" rel="noopener noreferrer" className="glass p-3 sm:p-4 rounded-lg hover:bg-accent/10 transition-colors text-center bg-white/10">
                <div className="text-xl sm:text-2xl mb-1 sm:mb-2">🐙</div>
                <div className="text-xs sm:text-sm font-medium text-white">GitHub</div>
              </a>
            </div>

            <div className="border-t border-gray-300/20 pt-4 sm:pt-6">
              <p className="text-xs sm:text-sm text-gray-300">
                © 2024 Portfolio. Built with Next.js, Framer Motion & Tailwind CSS.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

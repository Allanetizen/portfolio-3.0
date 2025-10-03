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
    <section id="footer" className="w-screen h-screen flex items-center justify-center snap-center relative">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="glass p-8 md:p-12 rounded-2xl">
          <h2 className="headline text-3xl md:text-4xl mb-8 bleed-text">THANK YOU</h2>
          <p className="body-text text-lg md:text-xl mb-8">Thanks for exploring my portfolio. Let&apos;s create something amazing together.</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <a href={contactEmail} className="glass p-4 rounded-lg hover:bg-accent/10 transition-colors text-center">
              <div className="text-2xl mb-2">📧</div>
              <div className="text-sm font-medium">Email</div>
            </a>
            <a href={contactLinkedIn} target="_blank" rel="noopener noreferrer" className="glass p-4 rounded-lg hover:bg-accent/10 transition-colors text-center">
              <div className="text-2xl mb-2">💼</div>
              <div className="text-sm font-medium">LinkedIn</div>
            </a>
            <a href={contactInstagram} target="_blank" rel="noopener noreferrer" className="glass p-4 rounded-lg hover:bg-accent/10 transition-colors text-center">
              <div className="text-2xl mb-2">📸</div>
              <div className="text-sm font-medium">Instagram</div>
            </a>
            <a href={contactGitHub} target="_blank" rel="noopener noreferrer" className="glass p-4 rounded-lg hover:bg-accent/10 transition-colors text-center">
              <div className="text-2xl mb-2">🐙</div>
              <div className="text-sm font-medium">GitHub</div>
            </a>
          </div>

          <div className="border-t border-gray-300/20 pt-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © 2024 Portfolio. Built with Next.js, Framer Motion & Tailwind CSS.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

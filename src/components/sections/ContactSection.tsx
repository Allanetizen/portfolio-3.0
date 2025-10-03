'use client';

interface ContactSectionProps {
  contactEmail: string;
  contactLinkedIn: string;
  contactInstagram: string;
  contactMedium: string;
  contactGitHub: string;
}

export default function ContactSection({
  contactEmail,
  contactLinkedIn,
  contactInstagram,
  contactMedium,
  contactGitHub
}: ContactSectionProps) {
  console.log('📧 [CLIENT] ContactSection received contact data:', {
    email: contactEmail,
    linkedin: contactLinkedIn,
    instagram: contactInstagram,
    medium: contactMedium,
    github: contactGitHub
  });
  
  return (
    <section id="contact" className="w-full h-full flex items-center justify-center snap-center relative bg-orange-500/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center">
          <div className="glass p-6 sm:p-8 md:p-12 rounded-2xl bg-white/20 backdrop-blur-sm">
            <h2 className="headline text-2xl sm:text-3xl md:text-4xl mb-6 sm:mb-8 bleed-text text-white">LET&apos;S CONNECT</h2>
            <p className="body-text text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-white">Ready to bring your ideas to life? Let&apos;s create something amazing together.</p>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              <a href={contactEmail} className="glass px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-accent/10 transition-colors bg-white/10 text-white text-sm sm:text-base font-medium">📧 Email</a>
              <a href={contactLinkedIn} target="_blank" rel="noopener noreferrer" className="glass px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-accent/10 transition-colors bg-white/10 text-white text-sm sm:text-base font-medium">💼 LinkedIn</a>
              <a href={contactInstagram} target="_blank" rel="noopener noreferrer" className="glass px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-accent/10 transition-colors bg-white/10 text-white text-sm sm:text-base font-medium">📸 Instagram</a>
              <a href={contactMedium} target="_blank" rel="noopener noreferrer" className="glass px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-accent/10 transition-colors bg-white/10 text-white text-sm sm:text-base font-medium">📝 Medium</a>
              <a href={contactGitHub} target="_blank" rel="noopener noreferrer" className="glass px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-accent/10 transition-colors bg-white/10 text-white text-sm sm:text-base font-medium">🐙 GitHub</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

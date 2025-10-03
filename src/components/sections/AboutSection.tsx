'use client';

interface AboutSectionProps {
  aboutText: string;
}

export default function AboutSection({ aboutText }: AboutSectionProps) {
  console.log('📖 [CLIENT] AboutSection received aboutText:', aboutText);
  
  return (
    <section id="about" className="w-full h-full flex items-center justify-center snap-center relative bg-red-500/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center">
          <div className="glass p-6 sm:p-8 md:p-12 rounded-2xl bg-white/20 backdrop-blur-sm">
            <h2 className="headline mb-4 sm:mb-6 bleed-text text-white text-2xl sm:text-3xl md:text-4xl">VISUAL POETRY</h2>
            <p className="body-text text-base sm:text-lg md:text-xl leading-relaxed text-white max-w-4xl mx-auto">{aboutText}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

interface AboutSectionProps {
  aboutText: string;
}

export default function AboutSection({ aboutText }: AboutSectionProps) {
  console.log('📖 [CLIENT] AboutSection received aboutText:', aboutText);
  
  return (
    <section id="about" className="w-screen h-screen flex items-center justify-center snap-center relative bg-red-500/10">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="glass p-8 md:p-12 rounded-2xl bg-white/20">
          <h2 className="headline mb-6 bleed-text text-white">VISUAL POETRY</h2>
          <p className="body-text text-lg md:text-xl leading-relaxed text-white">{aboutText}</p>
        </div>
      </div>
    </section>
  );
}

'use client';

interface Experience {
  id: number;
  title: string;
  company: string;
  period: string;
  description: string;
}

interface ExperienceSectionProps {
  experiences: Experience[];
}

export default function ExperienceSection({ experiences }: ExperienceSectionProps) {
  console.log('💼 [CLIENT] ExperienceSection received experiences:', {
    count: experiences.length,
    experiences: experiences.map(e => ({ id: e.id, title: e.title, company: e.company }))
  });
  
  return (
    <section id="experience" className="w-screen h-screen flex flex-col items-center justify-center snap-center relative p-8 bg-yellow-500/10">
              <h2 className="headline text-4xl font-bold mb-12 text-center text-white">
                EXPERIENCE
              </h2>
              <div className="w-full max-w-6xl">
        <div className="space-y-8">
          {experiences.length === 0 ? (
            <div className="flex items-center justify-center w-full h-64">
              <div className="text-center">
                <p className="text-gray-600">No experience available</p>
              </div>
            </div>
          ) : (
                    experiences.map((experience) => (
                      <div
                        key={experience.id}
                        className="glass rounded-xl p-6 flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-4"
                      >
                <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 glass rounded-full flex items-center justify-center text-3xl md:text-4xl">
                  🏢
                </div>
                <div className="flex-grow text-center md:text-left">
                  <h3 className="font-bold text-lg md:text-xl mb-1">{experience.title}</h3>
                  <p className="text-accent mb-2 text-sm">{experience.company} • {experience.period}</p>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">{experience.description}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
    </section>
  );
}

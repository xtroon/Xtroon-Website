import { Briefcase, Trophy, Code, Users, Youtube } from 'lucide-react';

const Experience = () => {

  const categories = [
    {
      name: "Experience",
      id: "professional",
      items: [
        {
          icon: Briefcase,
          title: 'Software Engineering Intern',
          company: 'Binary29',
          period: 'Nov 2025 - Feb 2026',
          description: [
            'Developed on full-stack e-commerce platform with automated inventory for 100+ products.',
            'Improved frontend and backend integration while debugging real issues.',
          ],
          skills: ['React', 'NextJS', 'Express', 'NodeJS', 'MySQL'],
        },
        {
          icon: Code,
          title: 'Intern',
          company: 'Essence World (UK)',
          period: 'June 2025 - July 2025',
          description: [
            'Contributed to an automated product publishing pipeline for an international dropshipping store.',
            'Reduced manual listing effort by approximately 60% through process automation.',
          ],
          skills: ['Nodejs', 'JavaScript', 'excel'],
        },
      ]
    },
    {
      name: "Leadership",
      id: "leadership",
      items: [
        {
          icon: Trophy,
          title: 'Core Lead & NEC Finalist (IITB)',
          company: 'EIC - Entrepreneurship Cell',
          period: 'Aug 2025 - Present',
          description: [
            'Led initiatives as a core member of the Entrepreneurship Cell (EIC).',
            'Achieved All India Rank (AIR) 34 at National Engineering Challenge Finalist at IIT Bombay.',
          ],
          skills: ['Leadership', 'Strategic Planning', 'Public Speaking'],
        },
        {
          icon: Users,
          title: 'DOT Officer (Member)',
          company: 'Dept. of Telecommunications',
          period: 'Aug 2025 - Present',
          description: [
            'Actively participating in technical initiatives and government-led discussions.',
            'Recognized for contributing to the telecommunications development ecosystem.',
          ],
          skills: ['Networking', 'Telecommunications', 'Leadership'],
        },
        {
          icon: Youtube,
          title: 'Digital Content Strategist',
          company: 'YouTube (Xtroon)',
          period: 'Oct 2019 - Present',
          description: [
            'Built and grew a YouTube channel to 20K+ subscribers through consistent content creation.',
            'Managed end-to-end content production, from ideation to publishing.',
          ],
          skills: ['Content Strategy', 'Multimedia Production', 'Data Analytics'],
        },
      ]
    }
  ];

  return (
    <section id="experience" className="pt-10 pb-24 md:pt-12 md:pb-32 px-4 sm:px-6 bg-[var(--bg-primary)]">
      <div className="max-w-6xl mx-auto pb-10">
        
        {/* HEADER */}
        <div className="mb-16 exp-header flex flex-col items-center text-center">
          <h2 className="text-3xl md:text-5xl text-blue-500 font-semibold tracking-tight">
            My Work
          </h2>
        </div>

        {/* CONTENT */}
        <div className="space-y-16">
          {categories.map((cat) => (
            <div key={cat.id} className="fade-up flex flex-col items-center">
              <h3 className="text-xs font-bold uppercase tracking-[0.4em] text-blue-500/80 mb-6 text-center">
                {cat.name}
              </h3>
              
              <div className="space-y-6 w-full max-w-5xl">
                {cat.items.map((exp, index) => (
                  <div key={index} className="exp-card group w-full flex flex-col items-start text-left bg-[var(--bg-secondary)] p-5 md:p-6 rounded-2xl border border-[var(--border-primary)] shadow-sm hover:border-blue-500/20 hover:shadow-md transition-all duration-300">
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-2 mb-1">
                      <h4 className="text-xl md:text-2xl font-extrabold tracking-tight uppercase text-[var(--text-primary)] group-hover:text-blue-500 transition-colors duration-300">
                        {exp.title}
                      </h4>
                      
                      <span className="text-[10px] md:text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
                        {exp.period}
                      </span>
                    </div>
                    
                    <p className="text-xs font-semibold text-[var(--text-secondary)] mt-0.5 uppercase tracking-wider mb-2">
                      {exp.company}
                    </p>
                    
                    <div className="text-[var(--text-secondary)] text-sm md:text-base leading-relaxed font-medium space-y-2 mb-4 max-w-4xl">
                      {exp.description.map((item, i) => (
                        <p key={i}>{item}</p>
                      ))}
                    </div>
                    
                    <div className="flex flex-wrap justify-start gap-2 w-full border-t border-[var(--border-primary)]/50 pt-3">
                      {exp.skills.map((skill, i) => (
                        <span key={i} className="text-[10px] md:text-[11px] px-3 py-1 bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-md font-extrabold uppercase tracking-widest text-[var(--text-secondary)]">
                          {skill}
                        </span>
                      ))}
                    </div>

                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
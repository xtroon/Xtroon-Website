import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Trophy, Code, Users, Youtube } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".exp-header > *", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".exp-header",
          start: "top 90%",
        }
      });

      gsap.utils.toArray('.exp-card').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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
            'Collaborated with developers to understand production-level workflows.',
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
            'Learned practical development practices and project structuring.',
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
          icon: Users,
          title: 'DOT Officer (Member)',
          company: 'Dept. of Telecommunications',
          period: 'Aug 2025 - Present',
          description: [
            'Official member of the Department of Telecommunications (DOT) community.',
            'Actively participating in technical initiatives and government-led discussions.',
            'Recognized for contributing to the telecommunications development ecosystem.',
          ],
          skills: ['Networking', 'Telecommunications', 'Leadership'],
        },
        {
          icon: Trophy,
          title: 'Core Lead & NEC Finalist',
          company: 'EIC - Entrepreneurship Cell',
          period: 'Aug 2025 - Present',
          description: [
            'Led initiatives as a core member of the Entrepreneurship Cell (EIC).',
            'Represented the club at National Engineering Challenge Finalist at IIT Bombay.',
            'Achieved All India Rank (AIR) 34, competing against top engineering talent.',
          ],
          skills: ['Leadership', 'Strategic Planning', 'Public Speaking'],
        },
        {
          icon: Youtube,
          title: 'Digital Content Strategist',
          company: 'YouTube (Xtroon)',
          period: 'Oct 2019 - Present',
          description: [
            'Built and grew a YouTube channel to 20K+ subscribers through consistent content creation.',
            'Analyzed audience behavior to improve retention and engagement.',
            'Managed end-to-end content production, from ideation to publishing.',
          ],
          skills: ['Content Strategy', 'Multimedia Production', 'Data Analytics'],
        },
      ]
    }
  ];

  return (
    <section id="experience" ref={sectionRef} className="py-24 px-6 bg-[var(--bg-primary)]">
      <div className="max-w-6xl mx-auto py-10">
        
        {/* HEADER */}
        <div className="mb-20 exp-header">
          <p className="text-xs text-blue-500 uppercase tracking-[0.3em] font-bold mb-4">
            Journey
          </p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Path</span>.
          </h2>
          <p className="text-[var(--text-secondary)] mt-8 max-w-2xl text-lg font-medium leading-relaxed">
            A specialized look into my professional journey, leadership roles, and technical growth.
          </p>
        </div>

        {/* CONTENT */}
        <div className="space-y-32">
          {categories.map((cat) => (
            <div key={cat.id} className="fade-up">
              <h3 className="text-xs font-bold uppercase tracking-[0.4em] text-blue-500/80 mb-12 border-b border-[var(--border-primary)] pb-4">
                {cat.name}
              </h3>
              
              <div className="space-y-12">
                {cat.items.map((exp, index) => (
                  <div key={index} className="exp-card grid md:grid-cols-[1fr_2fr] gap-8 md:gap-20 group">
                    <div>
                       <div className="flex items-center gap-3 mb-4">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-blue-500 bg-blue-500/5 px-2 py-1 rounded border border-blue-500/10">
                            {exp.period}
                          </span>
                       </div>
                       <h4 className="text-xl font-bold tracking-tight uppercase group-hover:text-blue-500 transition-colors">
                          {exp.title}
                       </h4>
                       <p className="text-sm text-[var(--text-secondary)] mt-1">{exp.company}</p>
                    </div>

                    <div className="space-y-6">
                      <ul className="space-y-4">
                        {exp.description.map((item, i) => (
                          <li key={i} className="flex gap-4 text-[var(--text-secondary)] text-base leading-relaxed">
                            <span className="mt-2.5 w-1 h-1 bg-blue-500 rounded-full shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-2 pt-4">
                        {exp.skills.map((skill, i) => (
                          <span key={i} className="text-[10px] px-2 py-1 bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded font-bold uppercase tracking-tighter text-[var(--text-secondary)] hover:border-blue-500/30 transition-all">
                            {skill}
                          </span>
                        ))}
                      </div>
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
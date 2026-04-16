import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Trophy, Code, Lightbulb, Calendar, Users, Youtube } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const sectionRef = useRef(null);
  const scrollBarRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Header animation
      gsap.from(".exp-header > *", {
        y: 30,
        opacity: 0,
        filter: "blur(10px)",
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".exp-header",
          start: "top 90%",
        }
      });

      // Card & Dot activation
      gsap.utils.toArray('.exp-card').forEach((el) => {
        // Card entrance
        gsap.fromTo(
          el,
          { opacity: 0, x: -20, filter: "blur(10px)" },
          {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            duration: 1,
            ease: "expo.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            },
          }
        );

        // Dot highlight
        const innerDot = el.querySelector('.exp-dot div:first-child');
        const glow = el.querySelector('.exp-dot div:last-child');
        
        if (innerDot && glow) {
          gsap.timeline({
            scrollTrigger: {
              trigger: el,
              start: "top 60%",
              toggleActions: "play none none reverse",
            }
          })
          .to(innerDot, {
            backgroundColor: '#3b82f6',
            borderColor: '#60a5fa',
            scale: 1.3,
            duration: 0.4
          })
          .to(glow, {
            opacity: 1,
            scale: 1.5,
            duration: 0.4
          }, "<");
        }
      });

      // 🔥 Professional dynamic line animation
      gsap.to(scrollBarRef.current, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 40%",
          end: "bottom 70%",
          scrub: 0.5,
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const categories = [
    {
      name: "Professional Internships",
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
      name: "Leadership & Community",
      id: "leadership",
      items: [
        {
          icon: Users,
          title: 'DOT Officer (Member)',
          company: 'Department of Telecommunications (Govt. of India)',
          period: 'Aug 2025 - Present',
          description: [
            'Honoured as an official member of the Department of Telecommunications (DOT) community.',
            'Actively participating in technical initiatives and government-led infrastructure discussions.',
            'Recognized for contributing to the telecommunications development ecosystem and technical leadership.',
          ],
          skills: ['Networking', 'Telecommunications', 'Technical Expertise', 'Leadership'],
        },
        {
          icon: Trophy,
          title: 'Core Lead & NEC Finalist',
          company: 'EIC - Entrepreneurship Cell',
          period: 'Aug 2025 - Present',
          description: [
            'Led initiatives as a core member of the Entrepreneurship Cell (EIC).',
            'Represented the club at National Engineering Challenge (NEC) Finalist at IIT Bombay.',
            'Achieved All India Rank (AIR) 34, competing against top engineering talent nationwide.',
            'Collaborated on business model development and technical problem-solving strategies.',
          ],
          skills: ['Leadership', 'Team Collaboration', 'Strategic Planning', 'Public Speaking'],
        },
        {
          icon: Youtube,
          title: 'Digital Content Strategist',
          company: 'YouTube (Ome Tiwari)',
          period: 'Oct 2019 - Present',
          description: [
            'Built and grew a YouTube channel to 20K+ subscribers through consistent content creation.',
            'Analyzed audience behavior to improve retention and engagement.',
            'Managed end-to-end content production, from ideation to publishing.',
          ],
          skills: ['Content Strategy', 'Multimedia Production', 'Data Analytics', 'Brand Development'],
        },
        {
          icon: Code,
          title: 'Core Team Member & Web Developer',
          company: 'Spark Coding Club - MBM',
          period: 'Aug 2024 - July 2025',
          description: [
            'Developed and maintained the official club website using modern web technologies.',
            'Collaborated with the core team to organize coding competitions and hackathons.',
            'Mentored junior developers and conducted sessions on web development and DSA.',
          ],
          skills: ['HTML', 'CSS', 'Javascript','dsa', 'Teamwork', 'Web Development'],
        },
      ]
    },
    {
      name: "Learning & Foundations",
      id: "learning",
      items: [
        {
          icon: Lightbulb,
          title: 'Student Developer',
          company: 'Projects & Learning',
          period: 'Jan 2023 - Present',
          description: [
            'Built multiple projects to strengthen software engineering and AI fundamentals.',
            'Worked with backend systems, APIs, and scalable application structures.',
            'Focused on learning through execution and continuous iteration.',
          ],
          skills: ['Python', 'JavaScript', 'AI Basics'],
        },
      ]
    }
  ];

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="section-spacing px-6 bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto py-20 relative">
        
        {/* Glow effect for header */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-2/3 h-64 bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

        {/* HEADER */}
        <div className="mb-12 text-center exp-header">
          <p className="text-sm text-blue-500 font-bold uppercase tracking-[0.2em] mb-2">
            Professional Path
          </p>
          <h2 className="text-4xl md:text-6xl font-extrabold text-[var(--text-primary)] tracking-tight">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Journey</span>
          </h2>
          <p className="text-[var(--text-secondary)] mt-6 max-w-2xl mx-auto text-lg font-medium leading-relaxed transition-colors">
            A specialized look into my professional journey, leadership roles, and technical growth.
          </p>
        </div>

        {/* TIMELINE */}
        <div className="relative mt-32">

          {/* 🔥 DYNAMIC LINE CONTAINER - SINGLE UNBROKEN LINE */}
          <div className="absolute left-[23px] top-0 bottom-0 w-[2.5px] bg-[var(--border-primary)] rounded-full">
            <div
              ref={scrollBarRef}
              className="w-full h-full origin-top scale-y-0"
              style={{
                background: 'linear-gradient(to bottom, #3b82f6, #60a5fa)',
                boxShadow: '0 0 15px rgba(59, 130, 246, 0.5)',
              }}
            />
          </div>

          {/* CONTENT */}
          <div className="space-y-24">
            {categories.map((cat) => (
              <div key={cat.id} className="relative">
                
                {/* CATEGORY HEADER - Sit on top of the line */}
                <div className="relative pl-14 mb-16 fade-up">
                  <div className="absolute left-[24px] top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-lg flex items-center justify-center z-20">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-black uppercase tracking-[0.2em] text-blue-500/90 leading-none">
                    {cat.name}
                  </h3>
                </div>

                <div className="space-y-16">
                  {cat.items.map((exp, index) => (
                    <div key={index} className="exp-card relative pl-16 group">

                      {/* DOT */}
                      <div className="exp-dot absolute left-[24px] top-[30px] sm:top-[40px] -translate-x-1/2 -translate-y-1/2 w-[24px] h-[24px] flex items-center justify-center z-30">
                        <div className="w-3 h-3 rounded-full border-2 border-[var(--border-primary)] bg-[var(--bg-secondary)] z-10 transition-all duration-300 group-hover:scale-125 group-hover:bg-blue-500 group-hover:border-blue-400" />
                        <div className="absolute inset-0 w-full h-full bg-blue-500/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>

                      {/* CARD */}
                      <div className="relative bg-[var(--bg-secondary)] backdrop-blur-sm border border-[var(--border-primary)] rounded-2xl p-6 sm:p-8 hover:border-blue-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/5 group">
                        
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 flex items-center justify-center bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/20 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300 shadow-sm">
                              <exp.icon size={22} />
                            </div>

                            <div>
                              <h3 className="font-bold text-xl text-[var(--text-primary)] group-hover:text-blue-400 transition-colors uppercase tracking-tight leading-tight">
                                {exp.title}
                              </h3>
                              <p className="text-[var(--text-secondary)] font-medium text-sm mt-0.5">{exp.company}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 px-3 py-1 bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-full text-[10px] font-bold text-blue-400 uppercase tracking-widest whitespace-nowrap self-start sm:self-center">
                            <Calendar size={12} />
                            {exp.period}
                          </div>
                        </div>

                        <div className="grid lg:grid-cols-[1fr_200px] gap-8">
                          <div>
                            <ul className="space-y-3">
                              {exp.description.map((item, i) => (
                                <li key={i} className="flex gap-3 text-[var(--text-secondary)] leading-relaxed text-sm">
                                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="flex flex-col gap-4">
                            <h4 className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold border-b border-[var(--border-primary)] pb-2">Technical proficiency</h4>
                            <div className="flex flex-wrap gap-2">
                              {exp.skills.map((skill, i) => (
                                <span
                                  key={i}
                                  className="text-[10px] px-2.5 py-1 bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-md text-[var(--text-secondary)] hover:border-blue-500/50 hover:text-blue-400 transition-all cursor-default font-bold uppercase tracking-tighter"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
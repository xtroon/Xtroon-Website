import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Trophy, Code, Lightbulb, Calendar, Users } from 'lucide-react';

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

  const experiences = [
    {
      icon: Briefcase,
      title: 'Software Engineering Intern',
      company: 'Binary29',
      period: '2025 - Present',
      description: [
        'Worked on real-world web applications focusing on performance and usability.',
        'Collaborated with developers to understand production-level workflows.',
        'Improved frontend and backend integration while debugging real issues.',
      ],
      skills: ['React', 'JavaScript', 'APIs', 'Problem Solving'],
    },
    {
      icon: Users,
      title: 'DOT Officer (Member)',
      company: 'Department of Telecommunications (Govt. of India)',
      period: '2024 - Present',
      description: [
        'Honoured as an official member of the Department of Telecommunications (DOT) community.',
        'Actively participating in technical initiatives and government-led infrastructure discussions.',
        'Recognized for contribute to the telecommunications development ecosystem and technical leadership.',
      ],
      skills: ['Networking', 'Telecommunications', 'Technical Expertise', 'Leadership'],
    },
    {
      icon: Code,
      title: 'Intern',
      company: 'Essence World',
      period: '2025',
      description: [
        'Contributed to frontend development and UI improvements.',
        'Learned practical development practices and project structuring.',
        'Enhanced debugging and implementation skills in real environments.',
      ],
      skills: ['HTML', 'CSS', 'JavaScript'],
    },
    {
      icon: Trophy,
      title: 'Core Lead & NEC Finalist',
      company: 'EIC - Entrepreneurship Cell',
      period: '2024',
      description: [
        'Led initiatives as a core member of the Entrepreneurship Cell (EIC).',
        'Represented the club as a National Engineering Challenge (NEC) Finalist at IIT Bombay.',
        'Achieved All India Rank (AIR) 34, competing against top engineering talent nationwide.',
        'Orchestrated team strategies for business model development and technical problem-solving.',
      ],
      skills: ['Leadership', 'Strategic Planning', 'Problem Solving', 'Public Speaking'],
    },
    {
      icon: Code,
      title: 'Core Team Member & Web Developer',
      company: 'Spark Coding Club - MBM',
      period: '2024 - Present',
      description: [
        'Instrumental in developing and maintaining the official club website using modern tech stacks.',
        'Collaborating with the core team to organize national-level coding competitions and hackathons.',
        'Mentoring junior developers and conducting workshops on web technologies and competitive programming.',
        'Driving technical innovation and community engagement within the university coding ecosystem.',
      ],
      skills: ['React', 'Next.js', 'Team Leadership', 'Full-Stack Development'],
    },
    {
      icon: Lightbulb,
      title: 'Student Developer',
      company: 'Projects & Learning',
      period: '2023 - Present',
      description: [
        'Building projects to strengthen software engineering and AI fundamentals.',
        'Exploring backend systems, APIs, and scalable architecture.',
        'Learning by building and continuously improving through execution.',
      ],
      skills: ['Python', 'JavaScript', 'AI Basics'],
    },
  ];

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-24 px-6 bg-black text-white"
    >
      <div className="max-w-5xl mx-auto relative">
        
        {/* Glow effect for header */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-2/3 h-64 bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

        {/* HEADER */}
        <div className="mb-12 text-center exp-header">
          <p className="text-sm text-blue-500 font-bold uppercase tracking-[0.2em] mb-2">
            Professional Path
          </p>
          <h2 className="text-3xl sm:text-6xl font-extrabold text-white tracking-tight">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Journey</span>
          </h2>
          <p className="text-zinc-400 mt-6 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
            A timeline of my professional growth, documenting the key roles and achievements that have defined my career in software engineering.
          </p>
        </div>

        {/* TIMELINE */}
        <div className="relative mt-20">

          {/* 🔥 DYNAMIC LINE CONTAINER */}
          <div className="absolute left-[23px] top-0 bottom-0 w-[2px] bg-zinc-800/30">
            <div
              ref={scrollBarRef}
              className="w-full h-full origin-top scale-y-0 bg-blue-500"
              style={{
                background: 'linear-gradient(to bottom, #3b82f6, #60a5fa)',
                boxShadow: '0 0 15px rgba(59, 130, 246, 0.5)',
                maskImage: 'linear-gradient(to bottom, black 90%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 90%, transparent 100%)'
              }}
            />
          </div>

          {/* CONTENT */}
          <div className="space-y-16">

            {experiences.map((exp, index) => (
              <div key={index} className="exp-card relative pl-16 group">

                {/* DOT */}
                <div className="exp-dot absolute left-[24px] top-[40px] -translate-x-1/2 -translate-y-1/2 w-[24px] h-[24px] flex items-center justify-center">
                   <div className="w-3 h-3 rounded-full border-2 border-zinc-700 bg-zinc-900 z-10 transition-all duration-300 group-hover:scale-125" />
                   <div className="absolute inset-0 w-full h-full bg-blue-500/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* CARD */}
                <div className="relative bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-8 hover:border-blue-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/5 group">
                  
                  {/* Decorative corner element */}
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                    <exp.icon size={48} className="text-zinc-600" />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 flex items-center justify-center bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/20 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                        <exp.icon size={22} />
                      </div>

                      <div>
                        <h3 className="font-bold text-xl text-white group-hover:text-blue-400 transition-colors uppercase tracking-tight">{exp.title}</h3>
                        <p className="text-zinc-400 font-medium">{exp.company}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 px-3 py-1 bg-zinc-800/50 rounded-full text-xs font-semibold text-zinc-300 border border-zinc-700/50">
                      <Calendar size={14} className="text-blue-400" />
                      {exp.period}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-[1fr_200px] gap-8">
                    <div>
                      <ul className="space-y-3">
                        {exp.description.map((item, i) => (
                          <li key={i} className="flex gap-3 text-zinc-400 leading-relaxed text-sm">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-col gap-3">
                      <h4 className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Key Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="text-[11px] px-2.5 py-1 bg-zinc-800/30 border border-zinc-700/30 rounded-md text-zinc-300 hover:border-blue-500/50 hover:bg-zinc-800/80 transition-all cursor-default"
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
      </div>
    </section>
  );
};

export default Experience;
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Monitor, Server, Brain, Zap, BookOpen, Database } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from(".reveal-header", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".skills-header",
          start: "top 90%",
        }
      });

      // Individual Card Animation for better visibility
      const cards = document.querySelectorAll('.reveal-card');
      cards.forEach((card) => {
        gsap.from(card, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 92%",
            toggleActions: "play none none reverse",
          }
        });
      });

      // Progress Bar Animation
      const bars = document.querySelectorAll('.skill-progress');
      bars.forEach((bar) => {
        gsap.to(bar, {
          width: bar.getAttribute('data-width') || '0%',
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: {
            trigger: bar,
            start: "top 95%",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const skillGroups = [
    {
      title: "Languages",
      icon: Code2,
      items: ["Python", "C", "C++", "JavaScript (ES6)", "SQL"],
    },
    {
      title: "Frontend",
      icon: Monitor,
      items: ["React.js", "Next.js", "Tailwind CSS", "HTML", "CSS"],
    },
    {
      title: "Backend",
      icon: Server,
      items: ["Node.js", "Express.js", "Django", "REST APIs"],
    },
    {
      title: "Databases & Tools",
      icon: Database,
      items: ["MongoDB", "PostgreSQL", "Git", "GitHub", "Postman", "Vercel", "Render"],
    },
    {
      title: "Core Concepts",
      icon: Brain,
      items: ["Data Structures & Algorithms", "OOP", "Problem Solving"],
    },
    {
      title: "Data / AI",
      icon: Zap,
      items: ["NumPy", "Pandas", "Basic Data Analysis", "Automation"],
    },
  ];

  const core = [
  { name: "Python", level: 80 },
  { name: "Full-Stack (React/Node)", level: 80 },
  { name: "C++ (DSA)", level: 75 },
  { name: "Backend Development", level: 75 },
  { name: "Data Analysis (NumPy/Pandas)", level: 70 },
  ];

  const academics = [
    "Data Structures & Algorithms", "Database Management System", "Computer Networks", 
    "Object Oriented Programming", "Software Engineering", "Computer Organization & Architecture",
  ];

  return (
    <section id="skills" ref={sectionRef} className="section-spacing px-6 bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300 overflow-hidden relative">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="section-padding relative">

        {/* Header Section */}
        <div className="mb-20 skills-header text-center">
          <p className="reveal-header text-sm text-blue-500 font-bold uppercase tracking-[0.2em] mb-4">
            Technical Stack
          </p>
          <h2 className="reveal-header text-4xl md:text-6xl font-extrabold text-[var(--text-primary)] tracking-tight mb-6 transition-colors font-sans">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Arsenal</span>
          </h2>
          <p className="reveal-header text-[var(--text-secondary)] text-lg max-w-2xl mx-auto font-medium leading-relaxed transition-colors">
            A specialized collection of tools and technologies I use to build scalable, high-performance applications and AI systems.
          </p>
        </div>

        {/* Skill Categories Grid */}
        <div className="grid sm:grid-cols-2 gap-6 mb-12">
          {skillGroups.map((group, i) => (
            <div key={i} className="reveal-card group bg-[var(--bg-secondary)] backdrop-blur-md border border-[var(--border-primary)] rounded-2xl p-8 hover:border-blue-500/40 transition-all duration-500 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 flex items-center justify-center bg-blue-500/10 text-blue-400 rounded-xl group-hover:bg-blue-500 group-hover:text-white transition-all shadow-lg shadow-blue-500/5">
                  <group.icon size={22} />
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] group-hover:text-blue-400 transition-colors">
                  {group.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {group.items.map((item, index) => (
                  <span
                    key={index}
                    className="px-4 py-1.5 text-sm bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-lg text-[var(--text-secondary)] font-bold hover:text-blue-500 hover:border-blue-500/50 transition-all cursor-default shadow-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Academic Coursework Section - Solid Background for High Visibility */}
        <div className="reveal-card group bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-2xl p-8 mb-16 hover:border-blue-500/40 transition-all duration-500 relative shadow-sm">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 flex items-center justify-center bg-blue-500/10 text-blue-400 rounded-xl group-hover:bg-blue-500 group-hover:text-white transition-all">
              <BookOpen size={22} />
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] group-hover:text-blue-400 transition-colors uppercase">
              Academic Coursework
            </h3>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {academics.map((subject, index) => (
              <span
                key={index}
                className="px-3 py-1.5 sm:px-5 sm:py-2 text-[11px] sm:text-sm bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-lg sm:rounded-xl text-[var(--text-secondary)] font-bold hover:bg-blue-500/10 hover:text-blue-400 hover:border-blue-500/50 transition-all cursor-default shadow-sm"
              >
                {subject}
              </span>
            ))}
          </div>
        </div>

        {/* Core Competencies Section */}
        <div className="reveal-card bg-[var(--bg-secondary)] backdrop-blur-md border border-[var(--border-primary)] rounded-3xl p-8 md:p-12 shadow-lg">
          <div className="flex items-center gap-4 mb-10 justify-center">
            <Zap className="text-blue-500" size={24} />
            <h3 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] tracking-tight leading-none text-center">
              Core Competencies
            </h3>
          </div>

          <div className="grid lg:grid-cols-2 gap-x-16 gap-y-10">
            {core.map((skill, i) => (
              <div key={i} className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-lg font-bold text-[var(--text-primary)]">{skill.name}</span>
                  <span className="text-blue-500 font-bold font-mono text-lg">{skill.level}%</span>
                </div>

                <div className="w-full h-2 bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-full overflow-hidden">
                  <div
                    className="skill-progress h-full bg-gradient-to-r from-blue-600 to-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.3)] rounded-full w-0"
                    data-width={`${skill.level}%`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements & Ranks */}
      </div>
    </section>
  );
};

export default Skills;
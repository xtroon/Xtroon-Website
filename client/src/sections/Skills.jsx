import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  SiPython, SiCplusplus, SiJavascript, SiReact, SiNextdotjs, 
  SiTailwindcss, SiNodedotjs, SiMongodb, SiPostgresql, SiGit,
  SiDjango, SiC, SiExpress, SiGithub, SiVercel, SiPostman
} from "react-icons/si";
import { FaHtml5, FaCss3Alt } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".reveal-header", 
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".skills-header",
            start: "top 90%",
          }
        }
      );

      gsap.fromTo(".skill-icon-box", 
        { scale: 0.8, opacity: 1 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".skills-grid",
            start: "top 85%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const techStack = [
    { name: "C", icon: SiC, color: "#A8B9CC" },
    { name: "C++", icon: SiCplusplus, color: "#00599C" },
    { name: "Python", icon: SiPython, color: "#3776AB" },
    { name: "HTML5", icon: FaHtml5, color: "#E34F26" },
    { name: "CSS3", icon: FaCss3Alt, color: "#1572B6" },
    { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
    { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
    { name: "React", icon: SiReact, color: "#61DAFB" },
    { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
    { name: "Express", icon: SiExpress, color: "theme" },
    { name: "Next.js", icon: SiNextdotjs, color: "theme" },
    { name: "Django", icon: SiDjango, color: "#092E20" },
    { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
    { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
    { name: "Git", icon: SiGit, color: "#F05032" },
    { name: "GitHub", icon: SiGithub, color: "theme" },
    { name: "Postman", icon: SiPostman, color: "#FF6C37" },
    { name: "Vercel", icon: SiVercel, color: "theme" },
  ];

  return (
    <section id="skills" ref={sectionRef} className="py-8 px-6 bg-[var(--bg-primary)] text-[var(--text-primary)] relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative">
        {/* Header Section */}
        <div className="mb-16 skills-header text-center">
          <p className="reveal-header text-[25px] text-xs text-blue-500 font-bold uppercase tracking-[0.3em] mb-1">
            Tech Stack
          </p>
        </div>

        {/* Skills Grid */}
        <div className="skills-grid flex flex-wrap justify-center gap-5 md:gap-0">
          {techStack.map((tech, i) => (
            <div 
              key={i} 
              className="skill-icon-box group flex flex-col items-center gap-3 p-4 md:p-5"
              style={tech.color !== "theme" ? { "--tech-color": tech.color } : {}}
            >
              <div className="relative transition-all duration-300 transform group-hover:scale-110">
                <tech.icon 
                  size={45} 
                  className={`transition-all duration-500 opacity-90 group-hover:opacity-100 drop-shadow-sm ${
                    tech.color === "theme" 
                      ? "text-[var(--text-primary)] group-hover:drop-shadow-[0_0_12px_var(--text-primary)]" 
                      : "text-[var(--tech-color)] group-hover:drop-shadow-[0_0_12px_var(--tech-color)]"
                  }`}
                />
              </div>
              
              {/* Tech Name */}
              <span className={`opacity-90 transition-all duration-300 text-[11px] md:text-xs font-bold uppercase tracking-widest text-center whitespace-nowrap ${
                tech.color === "theme" 
                  ? "text-[var(--text-primary)]" 
                  : "text-[var(--text-primary)] group-hover:text-[var(--tech-color)]"
              }`}>
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
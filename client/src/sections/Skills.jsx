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

      gsap.from(".skill-icon-box", {
        scale: 0.8,
        opacity: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".skills-grid",
          start: "top 85%",
        }
      });
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
    { name: "Express", icon: SiExpress, color: "#FFFFFF" },
    { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
    { name: "Django", icon: SiDjango, color: "#092E20" },
    { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
    { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
    { name: "Git", icon: SiGit, color: "#F05032" },
    { name: "GitHub", icon: SiGithub, color: "#FFFFFF" },
    { name: "Postman", icon: SiPostman, color: "#FF6C37" },
    { name: "Vercel", icon: SiVercel, color: "#FFFFFF" },
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
              className="skill-icon-box group relative flex flex-col items-center"
              style={{ "--tech-color": tech.color }}
            >
              <div className="relative p-4 md:p-6 transition-all duration-300 transform group-hover:scale-110">
                <tech.icon 
                  size={40} 
                  className="transition-all duration-500 text-gray-500/50 group-hover:text-[var(--tech-color)] group-hover:opacity-100"
                />
              </div>
              
              {/* Tooltip Name */}
              <span className="absolute -bottom-4 opacity-0 group-hover:opacity-100 transition-all duration-300 text-[10px] md:text-xs font-bold uppercase tracking-widest text-blue-500 whitespace-nowrap">
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
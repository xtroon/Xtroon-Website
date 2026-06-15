import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef(null);

  const projects = [
    {
      title: 'NearSwap',
      subtitle: 'Campus Marketplace Platform',
      period: 'Nov 2025 - Feb 2026',
      description: 'A location-based campus marketplace enabling students to buy and sell items securely, integrated with WhatsApp Cloud API and OTP verification.',
      skills: ['React Native', 'Node.js', 'Express.js', 'MySQL', 'Firebase FCM'],
      github: null,
      live: 'https://near-swap-website.vercel.app/',
    },
    {
      title: 'Swadeshika',
      subtitle: 'Full-Stack E-Commerce Platform',
      period: 'Nov 2025 - Feb 2026',
      description: 'A robust e-commerce platform built with an SSR architecture to optimize SEO performance and dynamic MySQL schemas for efficient catalog management.',
      skills: ['Next.js', 'Node.js', 'Express.js', 'MySQL', 'Tailwind CSS'],
      github: null,
      live: 'https://swadeshika.in/',
    },
    {
      title: 'Realtime Chat Application',
      subtitle: 'WebSocket-Based Messaging App',
      period: 'Sept 2025 - Oct 2025',
      description: 'A high-performance chat application utilizing WebSockets for instant, low-latency client-side rendering and messaging.',
      skills: ['JavaScript', 'WebSockets', 'HTML', 'CSS'],
      github: 'https://github.com/ometiwari-ai/Realtime-Chat-Application',
      live: 'https://realtime-chat-application-8u95.onrender.com//',
    },
    {
      title: 'Image Downloader Extension',
      subtitle: 'Light weight chrome extension.',
      period: 'Sept 2025 - Oct 2025',
      description: 'A chrome web extension to download webpage images in high quality.',
      skills: ['JavaScript', 'Chrome Extension APIs', 'HTML', 'CSS'],
      github: 'https://github.com/ometiwari-ai/Realtime-Chat-Application',
      live: null,
    },
    {
      title: 'Notes Management Tool',
      subtitle: 'Cloud based notes management tool',
      period: 'Sept 2025 - Oct 2025',
      description: 'A full-stack notes management application with secure authentication, allowing users to create, update, delete, and organize notes with persistent cloud storage and protected user access.',
      skills:  ['Node.js', 'Express.js', 'React', 'MongoDB', 'JWT', 'Tailwind CSS'],
      github: 'https://github.com/ometiwari-ai/Realtime-Chat-Application',
      live: 'https://notes-management-tool.vercel.app/',
    },
    {
      title: 'Bill Management System',
      subtitle: 'Console-Based Retail Billing Application',
      period: 'June 2025 - July 2025',
      description: 'A clean retail billing application written in C++ with customized file-based storage systems to track inventory and daily retail transactions.',
      skills: ['C++', 'File Handling', 'Data Structures'],
      github: 'https://github.com/ometiwari-ai/Bill-Management-System.git',
      live: null,
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".proj-header > *", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".proj-header",
          start: "top 90%",
        }
      });

      gsap.fromTo(".project-card", 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".project-card",
            start: "top 80%"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="pt-10 pb-24 md:pt-12 md:pb-32 px-4 sm:px-6 bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <div className="max-w-5xl mx-auto">
        
        {/* HEADER */}
        <div className="mb-16 proj-header flex flex-col items-center text-center">
          <h2 className="text-3xl md:text-5xl text-blue-500 font-semibold tracking-tight">
            Featured Projects
          </h2>
          <p className="text-[var(--text-secondary)] mt-4 max-w-2xl text-base font-medium leading-relaxed">
            Exploring the boundaries between design and technology through innovative solutions.
          </p>
        </div>

        {/* LIST */}
        <div className="space-y-6 w-full flex flex-col items-center">
          {projects.map((proj, index) => (
            <div key={index} className="project-card group w-full flex flex-col items-start text-left bg-[var(--bg-secondary)] p-5 md:p-6 rounded-2xl border border-[var(--border-primary)] shadow-sm hover:border-blue-500/20 hover:shadow-md transition-all duration-300">
              
              <div className="flex flex-wrap items-center justify-between w-full mb-1">
                <div className="flex flex-wrap items-baseline gap-3">
                  <h4 className="text-xl md:text-2xl font-extrabold tracking-tight uppercase text-[var(--text-primary)] group-hover:text-blue-500 transition-colors duration-300">
                    {proj.title}
                  </h4>
                  
                  <span className="text-[10px] md:text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] border-l border-[var(--border-primary)] pl-3">
                    {proj.period}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  {proj.github && (
                    <a 
                      href={proj.github} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="flex items-center gap-1.5 px-3 py-1 bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-lg text-xs font-bold text-[var(--text-secondary)] hover:text-blue-500 hover:border-blue-500/30 transition-all duration-300"
                      title="GitHub Repository"
                    >
                      <Github size={13} className="shrink-0" />
                      <span>Code</span>
                    </a>
                  )}
                  {proj.live && (
                    <a 
                      href={proj.live} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-lg text-xs font-bold text-blue-500 hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-all duration-300"
                      title="Live Site"
                    >
                      <ExternalLink size={13} className="shrink-0" />
                      <span>Live</span>
                    </a>
                  )}
                </div>
              </div>
              
              <p className="text-xs font-semibold text-[var(--text-secondary)] mt-0.5 uppercase tracking-wider mb-2">
                {proj.subtitle}
              </p>
              
              <p className="text-[var(--text-secondary)] text-sm md:text-base leading-relaxed font-medium mb-4 max-w-4xl">
                {proj.description}
              </p>
              
              <div className="flex flex-wrap justify-start gap-2 w-full border-t border-[var(--border-primary)]/50 pt-3">
                {proj.skills.map((skill, i) => (
                  <span key={i} className="text-[10px] md:text-[11px] px-3 py-1 bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-md font-extrabold uppercase tracking-widest text-[var(--text-secondary)]">
                    {skill}
                  </span>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;

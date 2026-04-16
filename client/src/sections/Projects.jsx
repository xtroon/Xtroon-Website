import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, ChevronLeft, ChevronRight, ImageIcon } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance
      gsap.from(".proj-header > *", {
        y: 30,
        opacity: 0,
        filter: "blur(10px)",
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".proj-header",
          start: "top 90%",
        }
      });

      // Project content fade-in
      gsap.fromTo(".project-content", 
        { opacity: 0, x: -30, filter: "blur(10px)" },
        { 
          opacity: 1, 
          x: 0, 
          filter: "blur(0px)", 
          duration: 0.8, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".project-content",
            start: "top 80%"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const projects = [
    {
      title: 'NearSwap',
      subtitle: 'Campus Marketplace Platform',
      period: '2026',
      description: [
        'Built a location-based marketplace enabling 80+ students to buy and sell items on campus.',
        'Developed full-stack application using React Native, Node.js, and Express.js.',
        'Integrated OTP verification and WhatsApp Cloud API for secure user authentication.',
        'Reduced fraud and unauthorized access by 40% through improved verification system.',
      ],
      skills: ['React Native', 'Node.js', 'Express.js', 'MySQL', 'Firebase Cloud Messaging'],
      gradient: 'from-blue-600 to-blue-400',
      github: null,
      live: 'https://near-swap-website.vercel.app/',
      image: 'nearswap.png',
    },
    {
    title: 'AI Resume Analyzer',
    subtitle: 'Resume Optimization Tool using Gemini API',
    period: '2026',
    description: [
      'Built a MERN-based application to analyze and improve resumes using Gemini API.',
      'Generated ATS-friendly resume suggestions based on user input and job requirements.',
      'Implemented secure user authentication and dynamic resume processing workflows.',
    ],
    skills: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Gemini API'],
    gradient: 'from-purple-500 to-pink-500',
    github: 'https://github.com/ometiwari-ai/AI-Resume-Analyzer',
    live: 'https://ai-resume-analyzer-ome.vercel.app/',
    image: 'resume-ai.png',
    },
    {
      title: 'Bill Management System',
      subtitle: 'Console-Based Retail Billing Application',
      period: '2025',
      description: [
        'Developed a console-based billing system for small retail stores using C++.',
        'Implemented product inventory management and automated bill generation.',
        'Designed file-based storage system for maintaining transaction records.',
        'Enabled efficient handling of daily sales and inventory tracking.',
      ],
      skills: ['C++', 'File Handling', 'Data Structures'],
      gradient: 'from-blue-400 to-indigo-500',
      github: 'https://github.com/ometiwari-ai/Billing-Management-System',
      live: null,
      image: 'billing.png',
    },
    {
      title: 'Realtime Chat Application',
      subtitle: 'WebSocket-Based Messaging App',
      period: '2025',
      description: [
        'Built a real-time chat application using HTML, CSS, and JavaScript.',
        'Implemented WebSocket-based communication for instant message exchange.',
        'Handled client-side message rendering and dynamic UI updates.',
        'Enabled low-latency communication for seamless real-time interaction.',
      ],
      skills: ['JavaScript', 'WebSockets', 'HTML', 'CSS'],
      gradient: 'from-blue-500 to-cyan-500',
      github: 'https://github.com/ometiwari-ai/Realtime-Chat-Application',
      live: 'https://realtime-chat-ome.vercel.app/',
      image: 'chatapp.png',
    }
  ];

  const nextProject = () => {
    gsap.to(".project-display", { opacity: 0, scale: 0.95, filter: "blur(10px)", duration: 0.3, onComplete: () => {
      setActiveIndex((prev) => (prev + 1) % projects.length);
      gsap.to(".project-display", { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.5, clearProps: "all" });
    }});
  };

  const prevProject = () => {
    gsap.to(".project-display", { opacity: 0, scale: 0.95, filter: "blur(10px)", duration: 0.3, onComplete: () => {
      setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
      gsap.to(".project-display", { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.5, clearProps: "all" });
    }});
  };

  return (
    <section id="projects" ref={sectionRef} className="section-spacing px-6 bg-[var(--bg-primary)] text-[var(--text-primary)] relative overflow-hidden transition-colors duration-300">
      
      {/* Background Blobs */}
      <div className="absolute top-1/4 -right-48 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full" />
      <div className="absolute bottom-1/4 -left-48 w-[500px] h-[500px] bg-blue-500/5 blur-[150px] rounded-full" />

      <div className="section-padding relative">
        
        {/* Glow effect for header */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-1/2 h-32 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

        {/* HEADER */}
        <div className="mb-20 text-center proj-header relative">
          <p className="text-sm text-blue-500 font-bold uppercase tracking-[0.2em] mb-4">
            Curated Portfolio
          </p>
          <h2 className="text-4xl sm:text-6xl font-extrabold text-[var(--text-primary)] tracking-tight">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Projects</span>
          </h2>
          <p className="text-[var(--text-secondary)] mt-6 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
            Exploring the boundaries between design and technology through innovative solutions in AI, systems, and web architecture.
          </p>
        </div>

        {/* MAIN DISPLAY */}
        <div className="project-display grid lg:grid-cols-5 gap-10 items-start">
          
          {/* LEFT: Project Details (3 cols) */}
          <div className="lg:col-span-3 space-y-8 project-content">
            <div className="bg-[var(--bg-secondary)] backdrop-blur-xl border border-[var(--border-primary)] rounded-3xl p-8 md:p-12 relative overflow-hidden group shadow-xl">
              
              {/* Animated Accent Line */}
              <div className={`absolute top-0 left-0 h-1 bg-gradient-to-r ${projects[activeIndex].gradient} transition-all duration-700`} style={{ width: '100%' }} />

              <div className="flex items-center justify-between mb-8">
                <div className="px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest">
                  {projects[activeIndex].period}
                </div>
                <div className="flex gap-3">
                  {projects[activeIndex].github && (
                    <a href={projects[activeIndex].github} target="_blank" rel="noreferrer" className="p-2.5 bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-xl hover:bg-blue-500 hover:text-white transition-all shadow-sm">
                      <Github size={20} />
                    </a>
                  )}
                  {projects[activeIndex].live ? (
                    <a href={projects[activeIndex].live} target="_blank" rel="noreferrer" className="p-2.5 bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-xl hover:bg-blue-500 hover:text-white transition-all shadow-sm">
                      <ExternalLink size={20} />
                    </a>
                  ) : (
                    <button className="p-2.5 bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-xl opacity-30 cursor-not-allowed shadow-sm">
                      <ExternalLink size={20} />
                    </button>
                  )}
                </div>
              </div>

              <h3 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight group-hover:text-blue-400 transition-colors text-[var(--text-primary)]">
                {projects[activeIndex].title}
              </h3>
              <p className="text-xl text-[var(--text-secondary)] font-medium mb-8">
                {projects[activeIndex].subtitle}
              </p>

              <div className="space-y-4 mb-10">
                {projects[activeIndex].description.map((item, i) => (
                  <div key={i} className="flex gap-4 text-[var(--text-secondary)] leading-relaxed group/item">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 group-hover/item:scale-150 transition-transform" />
                    {item}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2.5">
                {projects[activeIndex].skills.map((skill, i) => (
                  <span key={i} className="px-4 py-1.5 bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-lg text-sm text-[var(--text-secondary)] font-bold shadow-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* CONTROLS (Desktop Bottom) */}
            <div className="hidden lg:flex items-center gap-6">
              <button onClick={prevProject} className="w-14 h-14 flex items-center justify-center bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-2xl hover:bg-blue-600 hover:text-white transition-all group shadow-lg">
                <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
              </button>
              
              <div className="flex gap-3 items-center">
                {projects.map((_, i) => (
                  <div 
                    key={i} 
                    onClick={() => setActiveIndex(i)}
                    className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${i === activeIndex ? 'w-12 bg-blue-500' : 'w-3 bg-zinc-800 hover:bg-zinc-700'}`} 
                  />
                ))}
              </div>

              <button onClick={nextProject} className="w-14 h-14 flex items-center justify-center bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-2xl hover:bg-blue-600 hover:text-white transition-all group shadow-lg">
                <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* RIGHT: Visual (2 cols) */}
          <div className="lg:col-span-2 space-y-6 lg:space-y-10 group order-first lg:order-last">
            
            <div className="relative aspect-video sm:aspect-[4/3] lg:aspect-square w-full">
              {/* Decorative Frame */}
              <div className={`absolute inset-0 bg-gradient-to-br ${projects[activeIndex].gradient} opacity-20 blur-2xl rounded-3xl group-hover:opacity-40 transition-opacity`} />
              
              <div className="absolute inset-0 bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-3xl overflow-hidden shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
                {/* Browser Header Mockup */}
                <div className="h-8 bg-[var(--bg-primary)] border-b border-[var(--border-primary)] flex items-center px-4 gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                </div>
                
                <div className="w-full h-full relative group/img cursor-zoom-in">
                  {projects[activeIndex].image ? (
                    <>
                      <img 
                        src={`/${projects[activeIndex].image}`} 
                        alt={projects[activeIndex].title}
                        className="w-full h-full object-cover transition-all duration-1000 group-hover/img:scale-110"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      {/* Fallback hidden by default unless img fails */}
                      <div className="hidden absolute inset-0 items-center justify-center bg-[var(--bg-secondary)] text-[var(--text-muted)]">
                        <div className="text-center p-10">
                          <ImageIcon size={64} className="mx-auto mb-4 opacity-20" />
                          <p className="text-xs uppercase tracking-widest font-bold opacity-30">{projects[activeIndex].title} Preview</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[var(--bg-secondary)] text-[var(--text-muted)] group-hover:text-blue-500 transition-colors">
                      <div className="text-center p-10">
                        <ImageIcon size={64} className="mx-auto mb-4 opacity-10 group-hover:opacity-100 transition-opacity duration-1000" />
                        <p className="text-xs uppercase tracking-widest font-bold opacity-30 text-[var(--text-muted)]">{projects[activeIndex].title} Preview</p>
                      </div>
                    </div>
                  )}

                  {/* Subtle Dark Overlay for better depth */}
                  <div className="absolute inset-0 bg-black/10 group-hover/img:bg-black/0 transition-colors duration-500 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Selector Grid (Desktop Right Bottom / Tablet) */}
            <div className="grid grid-cols-2 gap-4">
              {projects.map((proj, i) => (
                <div 
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer group/nav shadow-sm ${i === activeIndex ? 'bg-blue-500/10 border-blue-500/50' : 'bg-[var(--bg-secondary)] border-[var(--border-primary)] hover:border-blue-400'}`}
                >
                  <p className={`text-xs font-bold uppercase tracking-wider mb-2 ${i === activeIndex ? 'text-blue-400' : 'text-[var(--text-muted)]'}`}>0{i + 1}</p>
                  <h4 className={`text-sm font-bold ${i === activeIndex ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)] group-hover/nav:text-[var(--text-primary)] transition-colors'}`}>{proj.title}</h4>
                </div>
              ))}
            </div>

          </div>

          {/* Mobile Controls */}
          <div className="lg:hidden flex items-center justify-between col-span-1 mt-6">
            <button onClick={prevProject} className="p-4 bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-2xl shadow-md">
              <ChevronLeft size={24} className="text-[var(--text-primary)]" />
            </button>
            <div className="flex gap-2">
              {projects.map((_, i) => (
                <div key={i} className={`w-2 h-2 rounded-full transition-all duration-300 ${i === activeIndex ? 'bg-blue-500 w-6' : 'bg-[var(--border-primary)]'}`} />
              ))}
            </div>
            <button onClick={nextProject} className="p-4 bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-2xl shadow-md">
              <ChevronRight size={24} className="text-[var(--text-primary)]" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Projects;
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
      title: 'CureNet',
      subtitle: 'Health Intelligence SaaS Platform',
      period: '2026',
      description: [
        'Architecting patient-owned decentralized health records on ABDM framework.',
        'Engineered secure interoperability with Zero-Knowledge Proofs for data exchange.',
        'Developed AI-driven clinical summarization engine for rapid doctor insights.',
        'Built offline-first QR access and automated claims pre-audit systems.',
      ],
      skills: ['Flutter', 'FHIR R4', 'ABDM', 'ZK-Proofs', 'AI Summarization'],
      gradient: 'from-blue-600 to-blue-400',
      github: 'https://github.com/labishbardiya/CureNet',
      image: 'curenet.png',
    },
    {
      title: 'MVC System',
      subtitle: 'Mini Version Control Kernel',
      period: '2025',
      description: [
        'Built a core version control kernel in C with init, add, commit, and log features.',
        'Implemented FNV-1a hashing and dynamic file maps for efficient tracking.',
        'Engineered deterministic IDs and integrity checkers for commit verification.',
        'Developed a visual timeline frontend to track file history and state changes.',
      ],
      skills: ['C', 'Low-level Programming', 'Hashing', 'Data Structures', 'JavaScript'],
      gradient: 'from-blue-500 to-cyan-400',
      github: 'https://github.com/labishbardiya/Mini-Version-Control-System',
      image: 'mvc.png',
    },
    {
      title: 'JKLURide',
      subtitle: 'Smart Campus Sharing',
      period: '2025',
      description: [
        'Production-grade ride-sharing backend with JWT authentication systems.',
        'Designed scalable DB schema using Prisma ORM and PostgreSQL.',
        'Implemented dynamic fare-splitting and user credibility scoring.',
        'Integrated UPI-first payment processing and SOS monitoring modules.',
      ],
      skills: ['TypeScript', 'Node.js', 'PostgreSQL', 'Prisma', 'APIs'],
      gradient: 'from-blue-400 to-indigo-500',
      github: 'https://github.com/labishbardiya/ride_sharing_project',
      image: 'jkluride.png',
    },
    {
      title: 'Grid Optimizer',
      subtitle: 'Power Network Analysis',
      period: '2025',
      description: [
        'Engineered optimization tools using Dijkstra\'s and Kruskal\'s MST algorithms.',
        'Interactive Dash visualization platform for mapping grid routing and failures.',
        'Computed edge criticality from load demand and failure probability metrics.',
        'Visualized flow-cuts and grid dynamics for improved failure impact analysis.',
      ],
      skills: ['Python', 'NetworkX', 'Plotly', 'Algorithm Design', 'Graph Theory'],
      gradient: 'from-blue-700 to-blue-500',
      github: 'https://github.com/labishbardiya/Power-Grid-Optimization-and-Visualization-Tool',
      image: 'powergrid.png',
    },
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
    <section id="projects" ref={sectionRef} className="py-24 px-6 bg-[#030303] text-white relative overflow-hidden">
      
      {/* Background Blobs */}
      <div className="absolute top-1/4 -right-48 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full" />
      <div className="absolute bottom-1/4 -left-48 w-[500px] h-[500px] bg-blue-500/5 blur-[150px] rounded-full" />

      <div className="max-w-7xl mx-auto relative">
        
        {/* Glow effect for header */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-1/2 h-32 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

        {/* HEADER */}
        <div className="mb-20 text-center proj-header relative">
          <p className="text-sm text-blue-500 font-bold uppercase tracking-[0.2em] mb-4">
            Curated Portfolio
          </p>
          <h2 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Projects</span>
          </h2>
          <p className="text-zinc-400 mt-6 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
            Exploring the boundaries between design and technology through innovative solutions in AI, systems, and web architecture.
          </p>
        </div>

        {/* MAIN DISPLAY */}
        <div className="project-display grid lg:grid-cols-5 gap-10 items-start">
          
          {/* LEFT: Project Details (3 cols) */}
          <div className="lg:col-span-3 space-y-8 project-content">
            <div className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/50 rounded-3xl p-8 md:p-12 relative overflow-hidden group">
              
              {/* Animated Accent Line */}
              <div className={`absolute top-0 left-0 h-1 bg-gradient-to-r ${projects[activeIndex].gradient} transition-all duration-700`} style={{ width: '100%' }} />

              <div className="flex items-center justify-between mb-8">
                <div className="px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest">
                  {projects[activeIndex].period}
                </div>
                <div className="flex gap-3">
                  <a href={projects[activeIndex].github} target="_blank" className="p-2.5 bg-zinc-800/50 rounded-xl hover:bg-blue-500 hover:text-white transition-all">
                    <Github size={20} />
                  </a>
                  <button className="p-2.5 bg-zinc-800/50 rounded-xl hover:bg-blue-500 hover:text-white transition-all opacity-30 cursor-not-allowed">
                    <ExternalLink size={20} />
                  </button>
                </div>
              </div>

              <h3 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight group-hover:text-blue-400 transition-colors">
                {projects[activeIndex].title}
              </h3>
              <p className="text-xl text-zinc-400 font-medium mb-8">
                {projects[activeIndex].subtitle}
              </p>

              <div className="space-y-4 mb-10">
                {projects[activeIndex].description.map((item, i) => (
                  <div key={i} className="flex gap-4 text-zinc-300 leading-relaxed group/item">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 group-hover/item:scale-150 transition-transform" />
                    {item}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2.5">
                {projects[activeIndex].skills.map((skill, i) => (
                  <span key={i} className="px-4 py-1.5 bg-zinc-800/30 border border-zinc-700/30 rounded-lg text-sm text-zinc-300 font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* CONTROLS (Desktop Bottom) */}
            <div className="hidden lg:flex items-center gap-6">
              <button onClick={prevProject} className="w-14 h-14 flex items-center justify-center bg-zinc-900 border border-zinc-800 rounded-2xl hover:bg-blue-600 hover:border-blue-500 transition-all group">
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

              <button onClick={nextProject} className="w-14 h-14 flex items-center justify-center bg-zinc-900 border border-zinc-800 rounded-2xl hover:bg-blue-600 hover:border-blue-500 transition-all group">
                <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* RIGHT: Visual (2 cols) */}
          <div className="lg:col-span-2 space-y-10 group">
            
            <div className="relative aspect-square md:aspect-[4/3] lg:aspect-square w-full">
              {/* Decorative Frame */}
              <div className={`absolute inset-0 bg-gradient-to-br ${projects[activeIndex].gradient} opacity-20 blur-2xl rounded-3xl group-hover:opacity-40 transition-opacity`} />
              
              <div className="absolute inset-0 bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
                {/* Browser Header Mockup */}
                <div className="h-8 bg-zinc-800/80 border-b border-zinc-700/50 flex items-center px-4 gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                </div>
                
                <div className="w-full h-full flex items-center justify-center bg-zinc-950/50 text-zinc-700 group-hover:text-blue-500 transition-colors">
                  <div className="text-center p-10">
                    <ImageIcon size={64} className="mx-auto mb-4 opacity-10 group-hover:opacity-100 transition-opacity duration-1000" />
                    <p className="text-xs uppercase tracking-widest font-bold opacity-30">{projects[activeIndex].title} Preview</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Selector Grid (Desktop Right Bottom / Tablet) */}
            <div className="grid grid-cols-2 gap-4">
              {projects.map((proj, i) => (
                <div 
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer group/nav ${i === activeIndex ? 'bg-blue-500/10 border-blue-500/50' : 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-600'}`}
                >
                  <p className={`text-xs font-bold uppercase tracking-wider mb-2 ${i === activeIndex ? 'text-blue-400' : 'text-zinc-600'}`}>0{i + 1}</p>
                  <h4 className={`text-sm font-bold ${i === activeIndex ? 'text-white' : 'text-zinc-500 group-hover/nav:text-zinc-300'}`}>{proj.title}</h4>
                </div>
              ))}
            </div>

          </div>

          {/* Mobile Controls */}
          <div className="lg:hidden flex items-center justify-between col-span-1 mt-6">
            <button onClick={prevProject} className="p-4 bg-zinc-900 border border-zinc-800 rounded-2xl">
              <ChevronLeft size={24} />
            </button>
            <div className="flex gap-2">
              {projects.map((_, i) => (
                <div key={i} className={`w-2 h-2 rounded-full ${i === activeIndex ? 'bg-blue-500' : 'bg-zinc-800'}`} />
              ))}
            </div>
            <button onClick={nextProject} className="p-4 bg-zinc-900 border border-zinc-800 rounded-2xl">
              <ChevronRight size={24} />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Projects;
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, ChevronLeft, ChevronRight, ImageIcon } from 'lucide-react';

// Images
import nearswapImg from '../assets/projects/nearswap.png';
import swadeshikaImg from '../assets/projects/swadeshika.png';
import billingImg from '../assets/projects/billing.png';
import livechatImg from '../assets/projects/livechat.png';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const projects = [
    {
      title: 'NearSwap',
      subtitle: 'Campus Marketplace Platform',
      period: 'Nov 2025 - Feb 2026',
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
      image: nearswapImg,
    },
    {
      title: 'Swadeshika',
      subtitle: 'Full-Stack E-Commerce Platform',
      period: 'Nov 2025 - Feb 2026',
      description: [
        'Built a full-stack e-commerce platform using Next.js, Node.js, Express.js, and MySQL.',
        'Implemented SSR architecture, improving SEO performance and reducing page load time.',
        'Designed and optimized MySQL database schemas for handling 100+ SKUs efficiently.',
        'Developed 12+ RESTful APIs for product management, orders, and user workflows.',
      ],
      skills: ['Next.js', 'Node.js', 'Express.js', 'MySQL', 'Tailwind CSS'],
      gradient: 'from-green-500 to-emerald-500',
      github: null,
      live: 'https://swadeshika.in/',
      image: swadeshikaImg,
    },
    {
      title: 'Bill Management System',
      subtitle: 'Console-Based Retail Billing Application',
      period: 'June 2025 - July 2025',
      description: [
        'Developed a console-based billing system for small retail stores using C++.',
        'Implemented product inventory management and automated bill generation.',
        'Designed file-based storage system for maintaining transaction records.',
        'Enabled efficient handling of daily sales and inventory tracking.',
      ],
      skills: ['C++', 'File Handling', 'Data Structures'],
      gradient: 'from-blue-400 to-indigo-500',
      github: 'https://github.com/ometiwari-ai/Bill-Management-System.git',
      live: null,
      image: billingImg,
    },
    {
      title: 'Realtime Chat Application',
      subtitle: 'WebSocket-Based Messaging App',
      period: 'Sept 2025 - Oct 2025',
      description: [
        'Built a real-time chat application using HTML, CSS, and JavaScript.',
        'Implemented WebSocket-based communication for instant message exchange.',
        'Handled client-side message rendering and dynamic UI updates.',
        'Enabled low-latency communication for seamless real-time interaction.',
      ],
      skills: ['JavaScript', 'WebSockets', 'HTML', 'CSS'],
      gradient: 'from-blue-500 to-cyan-500',
      github: 'https://github.com/ometiwari-ai/Realtime-Chat-Application',
      live: 'https://chat-app-c5jx.onrender.com/',
      image: livechatImg,
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
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

  const nextProject = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section id="projects" ref={sectionRef} className="section-spacing px-6 bg-[var(--bg-primary)] text-[var(--text-primary)] relative overflow-hidden transition-colors duration-300">
      
      {/* Background Blobs */}
      <div className="absolute top-1/4 -right-48 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full" />
      <div className="absolute bottom-1/4 -left-48 w-[500px] h-[500px] bg-blue-500/5 blur-[150px] rounded-full" />

      <div className="section-padding relative">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-1/2 h-32 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

        {/* HEADER */}
        <div className="mb-20 text-center proj-header relative">
          <p className="text-sm text-blue-500 font-bold uppercase tracking-[0.2em] mb-4">Curated Portfolio</p>
          <h2 className="text-4xl sm:text-6xl font-extrabold text-[var(--text-primary)] tracking-tight">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Projects</span>
          </h2>
          <p className="text-[var(--text-secondary)] mt-6 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
            Exploring the boundaries between design and technology through innovative solutions.
          </p>
        </div>

        <div className="project-display grid lg:grid-cols-2 gap-12 items-center">
          
          {/* LEFT: Project Details */}
          <div className="space-y-8 project-content">
            <div className="bg-[var(--bg-secondary)] backdrop-blur-xl border border-[var(--border-primary)] rounded-3xl p-8 md:p-12 relative overflow-hidden group shadow-xl">
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
                  {projects[activeIndex].live && (
                    <a href={projects[activeIndex].live} target="_blank" rel="noreferrer" className="p-2.5 bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-xl hover:bg-blue-500 hover:text-white transition-all shadow-sm">
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>
              </div>

              <h3 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight text-[var(--text-primary)]">
                {projects[activeIndex].title}
              </h3>
              <p className="text-xl text-[var(--text-secondary)] font-medium mb-8">
                {projects[activeIndex].subtitle}
              </p>

              <div className="space-y-4 mb-10">
                {projects[activeIndex].description.map((item, i) => (
                  <div key={i} className="flex gap-4 text-[var(--text-secondary)] leading-relaxed">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
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
          </div>

          {/* RIGHT: Visual & Navigation */}
          <div className="space-y-6 group order-first lg:order-last">
            <div className="relative aspect-video sm:aspect-square lg:aspect-[3/2] w-full">
              <div className={`absolute inset-0 bg-gradient-to-br ${projects[activeIndex].gradient} opacity-20 blur-2xl rounded-3xl group-hover:opacity-40 transition-opacity`} />
              <div className="absolute inset-0 bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-3xl overflow-hidden shadow-2xl transition-transform duration-700 group-hover:scale-[1.02] cursor-pointer">
                <div className="h-8 bg-[var(--bg-primary)] border-b border-[var(--border-primary)] flex items-center px-4 gap-1.5 z-20 relative">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                </div>
                
                <div className="w-full h-full relative group/img overflow-hidden">
                  {projects.map((proj, idx) => (
                    <div key={idx} className={`absolute inset-0 transition-opacity duration-500 ${idx === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                      <img src={proj.image} alt="project" className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover/img:scale-105" />
                    </div>
                  ))}
                  <div className={`absolute inset-0 bg-gradient-to-br transition-all duration-700 ${projects[activeIndex].gradient} opacity-10`} />
                </div>
              </div>
            </div>

            {/* Navigation Buttons Row */}
            <div className="flex items-center gap-4">
              <button onClick={prevProject} className="w-12 h-12 flex items-center justify-center bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-2xl hover:bg-blue-600 hover:text-white transition-all group shadow-md cursor-pointer">
                <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              </button>
              <div className="flex-1 h-px bg-gradient-to-r from-[var(--border-primary)] via-blue-500/30 to-[var(--border-primary)]" />
              <button onClick={nextProject} className="w-12 h-12 flex items-center justify-center bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-2xl hover:bg-blue-600 hover:text-white transition-all group shadow-md cursor-pointer">
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM ROW: Full-width Project Selector */}
        <div className="mt-16 pt-10 border-t border-[var(--border-primary)]">
          <div className="flex flex-wrap justify-center gap-4">
            {projects.map((proj, i) => (
              <button 
                key={i} 
                onClick={() => setActiveIndex(i)} 
                className={`group/btn relative px-6 py-4 rounded-2xl border transition-all duration-300 flex items-center gap-4 min-w-[200px] cursor-pointer ${i === activeIndex ? 'bg-blue-500/10 border-blue-500/50 shadow-lg shadow-blue-500/5' : 'bg-[var(--bg-secondary)] border-[var(--border-primary)] hover:border-blue-500/50 hover:bg-blue-500/[0.02]'}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${i === activeIndex ? 'bg-blue-500 text-white' : 'bg-[var(--bg-primary)] text-[var(--text-muted)] group-hover/btn:bg-blue-500/20 group-hover/btn:text-blue-500'}`}>
                  0{i + 1}
                </div>
                <div className="text-left">
                  <h4 className={`text-sm font-bold transition-colors ${i === activeIndex ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)] group-hover/btn:text-[var(--text-primary)]'}`}>
                    {proj.title}
                  </h4>
                  <p className={`text-[10px] font-medium uppercase tracking-wider transition-colors ${i === activeIndex ? 'text-blue-500' : 'text-[var(--text-muted)] group-hover/btn:text-blue-400'}`}>
                    {proj.subtitle.split(' ').slice(0, 2).join(' ')}
                  </p>
                </div>
                {i === activeIndex && (
                  <div className="absolute -bottom-px left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-blue-500 rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';

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

  const nextProject = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section id="projects" ref={sectionRef} className="py-24 px-4 sm:px-6 bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <div className="mb-20 proj-header">
          <p className="text-xs text-blue-500 uppercase tracking-[0.3em] font-bold mb-4">Portfolio</p>
          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Projects</span>.
          </h2>
          <p className="text-[var(--text-secondary)] mt-8 max-w-2xl text-lg font-medium leading-relaxed">
            Exploring the boundaries between design and technology through innovative solutions.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-16 items-center">
          
          {/* DETAILS */}
          <div className="project-card">
            <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-3xl p-8 md:p-12 transition-all duration-500 hover:border-blue-500/20">
              <div className="flex items-center justify-between mb-10">
                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-500 border border-blue-500/20 px-3 py-1 rounded-full bg-blue-500/5">
                  {projects[activeIndex].period}
                </span>
                <div className="flex gap-4">
                  {projects[activeIndex].github && (
                    <a href={projects[activeIndex].github} target="_blank" rel="noreferrer" className="text-[var(--text-secondary)] hover:text-blue-500 transition-colors">
                      <Github size={20} />
                    </a>
                  )}
                  {projects[activeIndex].live && (
                    <a href={projects[activeIndex].live} target="_blank" rel="noreferrer" className="text-[var(--text-secondary)] hover:text-blue-500 transition-colors">
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>
              </div>

              <h3 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight">
                {projects[activeIndex].title}
              </h3>
              <p className="text-lg text-[var(--text-secondary)] mb-8">
                {projects[activeIndex].subtitle}
              </p>

              <div className="space-y-4 mb-12">
                {projects[activeIndex].description.map((item, i) => (
                  <div key={i} className="flex gap-4 text-[var(--text-secondary)] leading-relaxed">
                    <span className="mt-2.5 w-1 h-1 bg-blue-500 rounded-full shrink-0" />
                    {item}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {projects[activeIndex].skills.map((skill, i) => (
                  <span key={i} className="px-3 py-1 bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-md text-[10px] font-bold uppercase tracking-tighter text-[var(--text-secondary)] hover:border-blue-500/30 transition-all cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* VISUAL & NAV */}
          <div className="space-y-8">
            <div className="relative aspect-video lg:aspect-square rounded-3xl overflow-hidden border border-[var(--border-primary)] shadow-2xl bg-[var(--bg-secondary)]">
               {projects.map((proj, idx) => (
                  <div key={idx} className={`absolute inset-0 transition-opacity duration-700 ${idx === activeIndex ? 'opacity-100' : 'opacity-0'}`}>
                    <img src={proj.image} alt={proj.title} className="w-full h-full object-cover transition-all duration-1000" />
                  </div>
                ))}
            </div>

            <div className="flex items-center gap-6">
              <button onClick={prevProject} className="w-14 h-14 flex items-center justify-center border border-[var(--border-primary)] rounded-full hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-all cursor-pointer group">
                <ChevronLeft size={24} className="group-hover:-translate-x-0.5 transition-transform" />
              </button>
              <div className="text-sm font-bold tracking-widest text-[var(--text-muted)]">
                0{activeIndex + 1} <span className="mx-1 text-blue-500">/</span> 0{projects.length}
              </div>
              <button onClick={nextProject} className="w-14 h-14 flex items-center justify-center border border-[var(--border-primary)] rounded-full hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-all cursor-pointer group">
                <ChevronRight size={24} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;

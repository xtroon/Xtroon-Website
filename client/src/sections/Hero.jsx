import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowDown, Github, Linkedin, Mail, Download, Twitter, Code2 } from 'lucide-react';
import resumePdf from '../assets/resume/ometiwari.ai.pdf';
import heroProfileImg from '../assets/profile/me1.jpeg';

const ROLES = ['Full Stack Developer', 'Competitive Programmer', 'Tech Explorer', 'Problem Solver'];  

const Hero = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const imageRef = useRef(null);

  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // ✨ Cleaner typewriter
  useEffect(() => {
    const current = ROLES[roleIndex];
    let speed = isDeleting ? 80 : 150;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText === current) {
          setIsDeleting(true);
        } else {
          setDisplayText(current.slice(0, displayText.length + 1));
        }
      } else {
        if (displayText === '') {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % ROLES.length);
        } else {
          setDisplayText(current.slice(0, displayText.length - 1));
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  // 🚀 NEW animation style (minimal + premium)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 60, filter: "blur(10px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "power3.out" }
      );

      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" }
      );

      // subtle floating
      gsap.to(imageRef.current, {
        y: -10,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Mouse tracking parallax for image
      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 30;
        const yPos = (clientY / window.innerHeight - 0.5) * 30;

        gsap.to(imageRef.current, {
          x: xPos,
          y: yPos - 10, // combine with floating
          rotationY: xPos / 2,
          rotationX: -yPos / 2,
          duration: 1,
          ease: "power2.out"
        });
      };

      window.addEventListener('mousemove', handleMouseMove);

      gsap.fromTo(
        '.hero-btns',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.5, stagger: 0.2, ease: "power2.out" }
      );

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={heroRef} className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">

      {/* 🌌 DYNAMIC BACKGROUND */}
      <div 
        className="absolute inset-0 opacity-95 transition-colors duration-500" 
        style={{ 
          background: 'linear-gradient(to bottom right, var(--bg-primary), var(--bg-secondary), var(--bg-primary))' 
        }} 
      />

      {/* subtle radial glow */}
      <div className="absolute top-1/3 left-1/2 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full -translate-x-1/2 pointer-events-none" />

      <div className="section-padding relative z-10 w-full grid lg:grid-cols-2 gap-10 lg:gap-20 items-center py-20 mt-10">

        {/* LEFT */}
        <div>
          <h1
            ref={titleRef}
            className="text-[1.75rem] sm:text-5xl md:text-6xl lg:text-6xl font-extrabold text-[var(--text-primary)] mb-6 leading-[1.1] tracking-tight whitespace-nowrap"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Ome Tiwari</span>
          </h1>

          <p className="text-xl text-[var(--text-secondary)] h-8 mb-6">
            {displayText}
            <span className="ml-1 animate-pulse text-cyan-400">|</span>
          </p>

          <p className="text-zinc-400 max-w-lg mb-8">
            I build scalable systems and AI-driven products. Focused on creating impactful solutions and continuously learning.
          </p>

          <div className="flex gap-4 flex-wrap">
            <button 
              onClick={scrollToAbout} 
              className="hero-btns group relative px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white cursor-pointer font-bold rounded-xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:-translate-y-1 transition-all duration-300 overflow-hidden flex items-center gap-2"
            >
              <span className="relative z-10">Explore Work</span>
              <ArrowDown size={18} className="relative z-10 group-hover:translate-y-1 transition-transform duration-300" />
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:animate-shimmer" />
            </button>

            <a 
              href={resumePdf}
              download="Ome-Tiwari-Resume.pdf"
              className="hero-btns group px-8 py-3 border-2 border-cyan-500/30 text-[var(--text-primary)] font-bold rounded-xl hover:bg-cyan-500/10 hover:border-cyan-500/50 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 shadow-sm"
            >
              <span>Download CV</span>
              <Download size={18} className="group-hover:translate-y-1 transition-transform duration-300" />
            </a>
          </div>

          {/* Socials */}
          <div className="flex gap-4 mt-8 text-[var(--text-muted)]">
            <a href="https://github.com/ometiwari-ai" target="_blank" rel="noreferrer" className="hover:text-[var(--text-primary)] transition-colors">
              <Github size={20} />
            </a>
            <a href="https://www.linkedin.com/in/ometiwari-ai/" target="_blank" rel="noreferrer" className="hover:text-[var(--text-primary)] transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="https://x.com/ometiwari18?s=20" target="_blank" rel="noreferrer" className="hover:text-[var(--text-primary)] transition-colors">
              <Twitter size={20} />
            </a>
            <a href="https://leetcode.com/u/omtiwari0/" target="_blank" rel="noreferrer" className="hover:text-[var(--text-primary)] transition-colors" aria-label="LeetCode">
              <Code2 size={20} />
            </a>
            <a href="mailto:ometiwari.ai@gmail.com" className="hover:text-[var(--text-primary)] transition-colors">
              <Mail size={20} />
            </a>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex justify-center order-first lg:order-last mb-10 lg:mb-0 relative py-10 [perspective:1000px]">
          <div ref={imageRef} className="relative group cursor-pointer transition-all duration-700">
            
            {/* Spinning Gradient Border Surround */}
            <div className="absolute -inset-1 bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 rounded-full blur-[2px] opacity-20 group-hover:opacity-100 group-hover:blur-md transition-all duration-700 -z-10 animate-[spin_10s_linear_infinite]" />
            
            {/* Animated Rings */}
            <div className="absolute -inset-4 border border-cyan-500/20 rounded-full animate-[spin_8s_linear_infinite] -z-10" />
            <div className="absolute -inset-8 border border-blue-500/10 rounded-full animate-[spin_12s_linear_infinite_reverse] -z-10" />
            
            {/* Main Image Container */}
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-full p-2 bg-white/5 backdrop-blur-md border border-white/20 shadow-[0_0_50px_-12px_rgba(34,211,238,0.3)] overflow-visible">
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-[var(--border-primary)] shadow-inner">
                <img 
                  src={heroProfileImg}
                  alt="Ome Tiwari" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
              </div>

              {/* Decorative floating badges/dots */}
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center text-white shadow-lg animate-bounce delay-75">
                <div className="w-2 h-2 bg-white rounded-full animate-ping" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl flex items-center justify-center shadow-xl rotate-12 group-hover:rotate-0 transition-transform duration-500 hidden sm:flex">
                <div className="text-cyan-500 font-bold text-xs">AI</div>
              </div>
            </div>

            {/* Enhanced Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-cyan-500/20 blur-[60px] rounded-full -z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="absolute inset-0 rounded-full bg-blue-600/10 blur-3xl -z-10 animate-pulse" />
          </div>
        </div>

      </div>

      {/* Scroll */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <ArrowDown onClick={scrollToAbout} className="text-zinc-500 cursor-pointer animate-bounce" />
      </div>

    </section>
  );
};

export default Hero;
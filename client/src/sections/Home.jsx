import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowDown, Download, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import resumePdf from '../assets/resume/ometiwari.ai.pdf';
import heroProfileImg from '../assets/profile/me2.jpg';
import GithubStats from '../components/GithubStats';

const Hero = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const mobileImageRef = useRef(null);
  const navigate = useNavigate();

  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // 🚀 NEW animation style (minimal + premium)
  useEffect(() => {
    if (isResumeOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isResumeOpen]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );

      // Animate both image refs
      [imageRef.current, mobileImageRef.current].forEach(ref => {
        if (ref) {
          gsap.fromTo(
            ref,
            { opacity: 0, scale: 0.95 },
            { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" }
          );

          // subtle floating
          gsap.to(ref, {
            y: -10,
            duration: 4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          });
        }
      });

      gsap.fromTo(
        '.hero-btns',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.5, stagger: 0.2, ease: "power2.out" }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const goToAbout = () => {
    navigate('/about');
  };

  return (
    <>
      <section ref={heroRef} className="min-h-screen flex items-center justify-center px-4 sm:px-6 relative overflow-hidden bg-[var(--bg-primary)]">

      <div className="section-padding relative z-10 w-full flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-20 py-10 md:py-16">

        {/* CONTENT WRAPPER */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left flex-1">
          {/* 1. GREETING */}
          <h1
            ref={titleRef}
            className="text-[1.75rem] sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-[1.1] tracking-tight text-white"
          >
            Hi, I'm
          </h1>

          {/* 2. MOBILE IMAGE (Visible only on mobile) */}
          <div className="lg:hidden my-8">
            <div ref={mobileImageRef} className="relative group">
              <div className="relative w-52 h-52 sm:w-64 sm:h-64 rounded-full p-1 bg-[var(--border-primary)] overflow-hidden transition-all duration-500 shadow-xl shadow-blue-500/5">
                <div className="w-full h-full overflow-hidden bg-[var(--bg-secondary)] rounded-full">
                  <img 
                    src={heroProfileImg}
                    alt="Ome Tiwari" 
                    className="w-full h-full object-cover transition-all duration-1000" 
                  />
                </div>
              </div>
              <div className="absolute -bottom-2 -left-2 w-10 h-10 bg-blue-600 border border-blue-500 rounded-xl flex items-center justify-center shadow-xl rotate-12 text-white">
                <div className="font-bold text-[10px] uppercase tracking-tighter">AI</div>
              </div>
            </div>
          </div>

          {/* 3. NAME */}
          <p className="text-4xl sm:text-5xl md:text-6xl text-blue-500 min-h-[3rem] mb-6 font-bold">
            Ome Tiwari
          </p>

          {/* 4. BIO */}
          <p className="text-[var(--text-muted)] max-w-lg mb-8 text-lg leading-relaxed">
            I build scalable systems and AI-driven products. Focused on creating impactful solutions and continuously learning.
          </p>

          {/* 5. BUTTONS */}
          <div className="flex gap-4 flex-wrap justify-center lg:justify-start">
            <button 
              onClick={() => setIsResumeOpen(true)}
              className="hero-btns group relative px-8 py-4 bg-blue-600 text-white cursor-pointer font-bold rounded-full hover:bg-blue-700 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-blue-500/20"
            >
              <span>View my CV</span>
              <Download size={18} className="group-hover:translate-y-1 transition-transform duration-300" />
            </button>
          </div>
        </div>

        {/* DESKTOP IMAGE (Visible only on desktop) */}
        <div className="hidden lg:flex justify-center relative flex-1">
          <div ref={imageRef} className="relative group">
            <div className="relative w-64 h-64 lg:w-72 lg:h-72 rounded-full p-1 bg-[var(--border-primary)] overflow-hidden transition-all duration-500 shadow-xl shadow-blue-500/5">
              <div className="w-full h-full overflow-hidden bg-[var(--bg-secondary)] rounded-full">
                <img 
                  src={heroProfileImg}
                  alt="Ome Tiwari" 
                  className="w-full h-full object-cover transition-all duration-1000" 
                />
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-blue-600 border border-blue-500 rounded-2xl flex items-center justify-center shadow-xl rotate-12 text-white">
              <div className="font-bold text-xs uppercase tracking-tighter">AI</div>
            </div>
          </div>
        </div>

      </div>

      {/* RESUME OVERLAY */}
      {isResumeOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-2 sm:p-4 md:p-10">
          <div className="relative w-full h-full max-w-5xl bg-[var(--bg-secondary)] rounded-xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col">
            
            <div className="p-4 border-b border-[var(--border-primary)] flex items-center justify-between bg-[var(--bg-primary)]">
              <h3 className="font-bold text-lg hidden md:block">Ome Tiwari - Resume</h3>
              <div className="flex items-center gap-4 ml-auto">
                <a 
                  href={resumePdf} 
                  download="Ome-Tiwari-Resume.pdf"
                  className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-bold flex items-center gap-2 hover:bg-blue-700 transition-all"
                >
                  <Download size={16} />
                  <span>Download</span>
                </a>
                <button 
                  onClick={() => setIsResumeOpen(false)}
                  className="p-2 hover:bg-red-500/10 text-red-500 rounded-full transition-all"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="flex-1 w-full bg-white overflow-hidden">
              <iframe 
                src={`${resumePdf}#toolbar=0`} 
                className="w-full h-full border-none"
                title="Resume Viewer"
              />
            </div>
          </div>
        </div>
      )}

    </section>
    <GithubStats />
    </>
  );
};

export default Hero;
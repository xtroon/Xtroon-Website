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
  const [weather, setWeather] = useState(null);
  const [thoughts, setThoughts] = useState(null);
  const [currentThought, setCurrentThought] = useState(null);
  const thoughtsRef = useRef(null);

  // Get current thought based on time of day
  const getCurrentThought = (thoughtsData) => {
    const hour = new Date().getHours();
    
    if (hour >= 8 && hour < 13) return thoughtsData.morning;
    if (hour >= 13 && hour < 19) return thoughtsData.afternoon;
    if (hour >= 19 && hour < 24) return thoughtsData.evening;
    if (hour >= 0 && hour < 3) return thoughtsData.night;
    if (hour >= 3 && hour < 8) return thoughtsData.earlyMorning;
    
    return thoughtsData.morning; // default
  };

  // Fetch thoughts from status.json
  useEffect(() => {
    fetch("/status.json")
      .then((res) => res.json())
      .then((data) => {
        setThoughts(data);
        setCurrentThought(getCurrentThought(data));
        
        // Update thought every minute
        const interval = setInterval(() => {
          setCurrentThought(getCurrentThought(data));
        }, 60000);
        
        return () => clearInterval(interval);
      })
      .catch((err) => console.error("Error fetching thoughts:", err));
  }, []);

  // Live weather fetcher for Kishangarh, Ajmer, India
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=26.1633&longitude=74.8711&current_weather=true"
        );
        const data = await response.json();
        const { temperature, weathercode, is_day } = data.current_weather;

        let type = "sun";
        let icon = "☀️";
        let label = "Sunny";

        if (is_day === 0 && (weathercode === 0 || weathercode === 1)) {
          type = "night";
          icon = "🌙";
          label = "Clear Night";
        } else if ([2, 3, 45, 48].includes(weathercode)) {
          type = "cloud";
          icon = "☁️";
          label = "Cloudy";
        } else if ([51, 53, 55, 61, 63, 65, 80, 81, 82, 95, 96, 99].includes(weathercode)) {
          type = "rain";
          icon = "🌧️";
          label = "Rainy";
        }

        setWeather({
          temp: Math.round(temperature),
          type,
          icon,
          label,
        });
      } catch (err) {
        console.error("Failed to fetch weather:", err);
      }
    };
    fetchWeather();
  }, []);

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
        { opacity: 0, y: 40 },
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

      // Animate thoughts with floating motion
      if (thoughtsRef.current) {
        gsap.fromTo(
          thoughtsRef.current,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 1, delay: 0.3, ease: "power2.out" }
        );

        gsap.to(thoughtsRef.current, {
          y: -8,
          duration: 3.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }

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
              className="text-[1.75rem] sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-[1.1] tracking-tight text-[var(--text-primary)]"
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

                {/* THOUGHTS BUBBLE MOBILE */}
                {currentThought && (
                  <div 
                    ref={thoughtsRef}
                    className="absolute -top-6 -right-4 px-3 py-1.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/40 rounded-full backdrop-blur-md shadow-lg hover:border-blue-400/60 transition-all duration-300 whitespace-nowrap"
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="text-base">{currentThought.emoji}</span>
                      <span className="text-[10px] font-medium text-[var(--text-primary)]">{currentThought.thought}</span>
                    </div>
                  </div>
                )}
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

            {/* DYNAMIC WEATHER WIDGET pill button */}
            <div className="mt-6 hero-btns text-xs sm:text-sm text-[var(--text-secondary)]   px-5 py-1.5 inline-flex items-center cursor-default transition-all duration-300">
              <span>
                Building cool at 
                {weather ? (
                  <span> {weather.temp}°C {weather.icon}</span>
                ) : (
                  <span className="text-[var(--text-muted)] animate-pulse ml-1">...</span>
                )}
                in Kishangarh, Ajmer
              </span>
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

            {/* THOUGHTS BUBBLE - UPPER RIGHT */}
            {currentThought && (
              <div 
                ref={thoughtsRef}
                className="absolute -top-6 -right-8 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/40 rounded-full backdrop-blur-md shadow-lg hover:border-blue-400/60 transition-all duration-300 whitespace-nowrap"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{currentThought.emoji}</span>
                  <span className="text-xs font-medium text-[var(--text-primary)]">{currentThought.thought}</span>
                </div>
              </div>
            )}
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

      {/* CURRENTLY WORKING ON SECTION */}
      {/* <section className="py-12 px-4 sm:px-6 bg-[var(--bg-primary)] border-t border-[var(--border-primary)]">
        <div className="section-padding max-w-6xl mx-auto">
          <div className="flex flex-col gap-3">
            <p className=" text-blue-400 text-[var(--text-secondary)] text-[3px] sm:text-[35px] font-medium">
              Currently working on:
            </p>
            <a href="https://github.com/xtroon/FormSphere-Smart-Form-Management-Tool" target="_blank" rel="noopener noreferrer" className=" hover:text-blue-300 text-xl sm:text-2xl lg:text-3xl font-bold transition-colors hover:underline">
              FormSphere - Smart Form management Tool with Docs
            </a>
          </div>
        </div>
      </section> */}

      <GithubStats />
    </>
  );
};

export default Hero;
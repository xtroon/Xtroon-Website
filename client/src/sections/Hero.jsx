import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';

const ROLES = ['AI Engineer', 'Problem Solver', 'Builder', 'Tech Explorer'];

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
    let speed = isDeleting ? 40 : 90;

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

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={heroRef} className="min-h-screen flex items-center justify-center px-6">

      {/* 🌌 CLEAN BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-black opacity-95" />

      {/* subtle radial glow */}
      <div className="absolute top-1/3 left-1/2 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full -translate-x-1/2" />

      <div className="relative z-10 max-w-6xl w-full grid lg:grid-cols-2 gap-10 items-center">

        {/* LEFT */}
        <div>
          <h1
            ref={titleRef}
            className="text-4xl sm:text-6xl font-bold text-white mb-4 leading-tight"
          >
            Hi, I'm <span className="text-cyan-400">Ome Tiwari</span>
          </h1>

          <p className="text-xl text-zinc-400 h-8 mb-6">
            {displayText}
            <span className="ml-1 animate-pulse text-cyan-400">|</span>
          </p>

          <p className="text-zinc-400 max-w-lg mb-8">
            I build scalable systems and AI-driven products. Focused on creating impactful solutions and continuously learning.
          </p>

          <div className="flex gap-4 flex-wrap">
            <button onClick={scrollToAbout} className="px-6 py-3 bg-cyan-500 text-black font-semibold rounded-lg hover:scale-105 transition">
              Explore
            </button>

            <a href="#" className="px-6 py-3 border border-zinc-700 text-white rounded-lg hover:bg-zinc-800 transition">
              Resume
            </a>
          </div>

          {/* Socials */}
          <div className="flex gap-4 mt-8 text-zinc-400">
            <Github className="cursor-pointer hover:text-white" />
            <Linkedin className="cursor-pointer hover:text-white" />
            <Mail className="cursor-pointer hover:text-white" />
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex justify-center">
          <div ref={imageRef} className="relative">
            <div className="w-64 h-64 rounded-full overflow-hidden border border-zinc-700">
              <img src="/images/profile.png" className="w-full h-full object-cover" />
            </div>

            {/* subtle glow */}
            <div className="absolute inset-0 rounded-full bg-cyan-500/10 blur-2xl" />
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
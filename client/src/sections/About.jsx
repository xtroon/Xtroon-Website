import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaTrophy, FaAward,FaCode, FaYoutube, FaMicrochip, FaGraduationCap } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".fade-up").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30, filter: "blur(5px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
            },
          }
        );
      });

      gsap.utils.toArray(".stat-number").forEach((stat) => {
        const targetStr = stat.getAttribute("data-target");
        const isNumeric = /^(\d+\.?\d*|\.\d+)$/.test(targetStr);
        if (isNumeric) {
          const target = parseFloat(targetStr);
          const isDecimal = targetStr.includes(".");
          gsap.to(stat, {
            innerText: target,
            duration: 1.5,
            snap: { innerText: isDecimal ? 0.01 : 1 },
            scrollTrigger: { trigger: stat, start: "top 90%" },
          });
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const stats = [
    { icon: FaTrophy, value: "AIR 34", label: "NEC IIT Bombay Finalist" },
    { icon: FaMicrochip, value: "7.94", label: "Current CGPA" },
    { icon: FaCode, value: "400+", label: "DSA Problems Solved" }, // adjust if needed
    { icon: FaYoutube, value: "20K+", label: "YouTube Subscribers" },
  ];

  return (
    <section id="about" ref={sectionRef} className="py-24 md:py-32 px-6 bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="mb-20 fade-up text-center">
          <p className="text-sm md:text-base text-cyan-500 uppercase tracking-widest font-bold mb-4">
            About Me
          </p>
          <h2 className="text-4xl md:text-6xl font-extrabold mt-2 tracking-tight">
            Building with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Purpose</span>
          </h2>
          <p className="text-[var(--text-secondary)] mt-6 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
            I am a full-stack developer and AI enthusiast, dedicated to crafting high-performance systems that blend elegance with raw computational power.
          </p>
        </div>

        {/* CONTENT */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* TEXT */}
          <div className="space-y-8 text-[var(--text-secondary)] fade-up">
            <div className="space-y-4">
              <p className="text-xl md:text-2xl leading-relaxed font-medium text-[var(--text-primary)]">
                I’m <span className="text-cyan-400">Om Tiwari</span>, currently pursuing Computer Science at MBM University.
              </p>
              <p className="text-lg leading-relaxed">
                My work focuses on the intersection of <span className="font-semibold text-[var(--text-primary)]">AI-driven web applications</span> and 
                <span className="font-semibold text-[var(--text-primary)]"> scalable backend architectures</span>. I thrive on solving complex problems with clean, efficient code.
              </p>
              <p className="text-lg leading-relaxed">
                Whether it's optimizing system-level performance or designing intuitive user experiences, I am driven by a commitment to engineering excellence and real-world impact.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12">
              {stats.map((stat, i) => (
                <div key={i} className="aspect-square flex flex-col items-center justify-center p-2 border border-[var(--border-primary)] bg-[var(--bg-secondary)] rounded-xl transition-all hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-400/5">
                  <stat.icon className="text-cyan-400 mb-2" size={20} />
                  <div className="text-xl md:text-2xl font-bold text-white stat-number" data-target={stat.value}>
                    {stat.value}
                  </div>
                  <p className="text-[9px] md:text-[10px] text-[var(--text-muted)] uppercase mt-1 font-bold tracking-widest text-center leading-tight">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* IMAGE */}
          <div className="flex justify-center fade-up lg:justify-end py-10">
            <div className="relative w-72 h-96 md:w-80 md:h-[450px] group">
              
              {/* Outer Glow / Pulse */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 animate-pulse" />
              
              {/* Main Image Wrapper */}
              <div className="relative w-full h-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-[var(--bg-secondary)] transition-all duration-500 group-hover:shadow-cyan-500/20 group-hover:-translate-y-2">
                <img
                  src="/me2.jpg"
                  alt="Om Tiwari"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                
                {/* Technical Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                
                {/* Corner Brackets */}
                <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-cyan-400/50 rounded-tl-sm" />
                <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-cyan-400/50 rounded-tr-sm" />
                <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-cyan-400/50 rounded-bl-sm" />
                <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-cyan-400/50 rounded-br-sm" />

                {/* Glass Tag */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100">
                   <div className="text-center space-y-1">
                      <p className="text-cyan-400 text-[10px] font-bold tracking-[0.3em] uppercase">Tech Profile</p>
                      <p className="text-white font-bold text-sm">Ome Tiwari</p>
                      <div className="flex justify-center gap-1 mt-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                      </div>
                   </div>
                </div>

                {/* Animated Bottom Progress */}
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
              </div>

              {/* Decorative Floating Element */}
              <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-[var(--bg-primary)] border border-cyan-500/20 rounded-2xl flex flex-col items-center justify-center shadow-2xl rotate-12 group-hover:rotate-0 transition-transform duration-500 z-20">
                <span className="text-cyan-400 font-black text-xl leading-none">AI</span>
                <span className="text-[8px] text-[var(--text-muted)] font-bold uppercase tracking-tighter">Powered</span>
              </div>
            </div>
          </div>
        </div>

        {/* EDUCATION */}
        <div className="mt-24 fade-up">
          <div className="flex items-center gap-4 mb-10 justify-center">
            <FaGraduationCap className="text-cyan-500" size={28} />
            <h3 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] tracking-tight text-center">
              Education
            </h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                school: "MBM University",
                degree: "Bachelor of Engineering in Computer Science and Engineering",
                period: "2024 - Present",
                grade: "7.94 CGPA",
                desc: "Focusing on Software Engineering & AI"
              },
              {
                school: "Govt. School, Jodhpur",
                degree: "12th Grade · Science/Math",
                period: "2022 - 2023",
                grade: "93.60%", 
                desc: "Completed with high distinction"
              },
            ].map((edu, i) => (
              <div
                key={i}
                className="border border-[var(--border-primary)] bg-[var(--bg-secondary)] rounded-2xl p-6 flex flex-col justify-between transition-all hover:border-cyan-400/30 group"
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-lg font-bold text-[var(--text-primary)] group-hover:text-cyan-400 transition-colors">{edu.school}</p>
                    <span className="text-[11px] text-cyan-400 font-bold uppercase tracking-widest border border-cyan-400/20 px-2 py-1 rounded">
                      {edu.period}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm text-[var(--text-secondary)] font-medium">{edu.degree}</p>
                    <span className="text-xs font-bold text-[var(--text-primary)] bg-cyan-400/10 px-2 py-0.5 rounded">{edu.grade}</span>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] mt-2">{edu.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

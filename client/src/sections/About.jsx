import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaTrophy, FaCode, FaYoutube, FaMicrochip } from "react-icons/fa";

import Achievements from "./Achievements";
import Skills from "./Skills";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".fade-up").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
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
    { icon: FaCode, value: "400+", label: "DSA Problems Solved" },
    { icon: FaYoutube, value: "20K+", label: "YouTube Subscribers" },
  ];

  return (
    <section id="about" ref={sectionRef} className="pt-10 pb-24 md:pt-12 md:pb-32 px-6 bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="mb-10 fade-up">
          <h2 className="text-3xl md:text-5xl text-center font-semibold tracking-tight text-blue-500">
            About Me
          </h2>
        </div>

        {/* CONTENT */}
        <div className="fade-up">
          {/* TEXT */}
          <div className="text-[var(--text-secondary)] text-center">
            <p className="text-lg md:text-xl leading-relaxed text-[var(--text-primary)] max-w-3xl mx-auto">
              I’m Om Tiwari, a Computer Science student at MBM University interested in software engineering, AI, and building products that are both functional and polished.
              I enjoy creating projects across web development and AI — from full-stack applications to experimental tools and interfaces. Outside of coding, I also work on content creation through my YouTube channel.
              My focus is on continuously improving as an engineer while combining technology and creativity to build impactful digital experiences.
            </p>
          </div>

          {/* STATS */}
          <div className="flex flex-wrap justify-center gap-x-8 md:gap-x-16 gap-y-8 mt-16 max-w-4xl mx-auto pb-10">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center group cursor-default">
                <div className="mb-2 text-blue-500 opacity-60 group-hover:opacity-100 transition-opacity transform group-hover:scale-110 duration-300">
                  <stat.icon size={18} />
                </div>
                <div className="text-lg md:text-xl font-semibold text-[var(--text-primary)] stat-number" data-target={stat.value}>
                  {stat.value}
                </div>
                <p className="text-[9px] text-[var(--text-muted)] uppercase mt-1 font-semibold tracking-widest text-center">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Skills />
    </section>
  );
};

export default About;

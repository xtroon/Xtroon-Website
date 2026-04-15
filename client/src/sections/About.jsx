import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Trophy, Cpu, Award, FileText, Youtube } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ✨ smoother reveal (not slide-heavy)
      gsap.utils.toArray(".fade-up").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            },
          },
        );
      });

      // stats counter
      gsap.utils.toArray(".stat-number").forEach((stat) => {
        const targetStr = stat.getAttribute("data-target");
        
        // Only animate if it's a pure number (no letters/symbols)
        const isNumeric = /^(\d+\.?\d*|\.\d+)$/.test(targetStr);
        
        if (isNumeric) {
          const target = parseFloat(targetStr);
          const isDecimal = targetStr.includes(".");
          
          gsap.to(stat, {
            innerText: target,
            duration: 1.5,
            snap: { innerText: isDecimal ? 0.01 : 1 },
            ease: "power2.out",
            scrollTrigger: {
              trigger: stat,
              start: "top 90%",
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
  { icon: Trophy, value: '1', label: 'NEC Finalist' },
  { icon: Award, value: '34', label: 'AIR Rank' },
  { icon: Cpu, value: '7.94', label: 'CGPA' },
  { icon: Youtube, value: '20k+', label: 'Subscribers' }, // adjust if needed
];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 px-6 bg-black text-white"
    >
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="mb-12 fade-up">
          <p className="text-sm text-zinc-500 uppercase tracking-widest">
            About
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold mt-2">
            Building with <span className="text-cyan-400">purpose</span>
          </h2>
        </div>

        {/* CONTENT */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* TEXT */}
          <div className="space-y-6 text-zinc-400 fade-up">
            <p>
              I’m a Computer Science student focused on building real-world
              systems and exploring AI-driven solutions. Currently pursuing my
              B.Tech, I maintain a CGPA of{" "}
              <span className="text-cyan-400 font-semibold">7.94</span>.
            </p>

            <p>
              I was a{" "}
              <span className="text-cyan-400 font-semibold">
                National Engineering Challenge (NEC) Finalist
              </span>
              at IIT Bombay, securing an{" "}
              <span className="text-cyan-400 font-semibold">AIR 34</span>, which
              reflects my problem-solving ability and competitive mindset.
            </p>

            <p>
              My focus is on developing strong fundamentals in software
              engineering and AI, while building projects that solve meaningful
              problems. I believe in learning by building and continuously
              improving through execution.
            </p>

            <p>
              Alongside development, I also document my journey and experiments,
              aiming to grow both as an engineer and as a creator.
            </p>

            {/* STATS */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-8">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="border border-zinc-800 rounded-lg p-4 text-center fade-up"
                >
                  <stat.icon className="mx-auto mb-2 text-cyan-400" size={20} />
                  <div className="text-2xl font-bold">
                    <span className="stat-number" data-target={stat.value}>
                      {stat.value}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* IMAGE */}
          <div className="flex justify-center fade-up">
            <div className="relative w-72 h-96 overflow-hidden rounded-xl border border-zinc-800">
              <img
                src="/images/profile.png"
                alt="profile"
                className="w-full h-full object-cover"
              />

              {/* subtle overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
          </div>
        </div>

        {/* EDUCATION */}
        <div className="mt-20 fade-up">
          <h3 className="text-2xl font-semibold mb-6">Education</h3>

          <div className="space-y-4">
            {[
              {
                school: "MBM University, Jodhpur",
                degree: "B.Tech CSE",
                period: "2023 - Present",
              },
              {
                school: "Govt. Senior Secondary School, Jodhpur",
                degree: "12th Grade",
                period: "2022 - 2023",
              },
            ].map((edu, i) => (
              <div
                key={i}
                className="border border-zinc-800 rounded-lg p-5 flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{edu.school}</p>
                  <p className="text-sm text-zinc-500">{edu.degree}</p>
                </div>
                <p className="text-sm text-cyan-400">{edu.period}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

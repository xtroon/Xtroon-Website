import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trophy, Zap, Code2, Users, GraduationCap, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Achievements = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from(".achievements-header > *", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".achievements-header",
          start: "top 90%",
        }
      });

      // Individual Card Animation for absolute reliability
      const cards = document.querySelectorAll('.achievement-card');
      cards.forEach((card) => {
        gsap.from(card, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 92%",
            toggleActions: "play none none reverse",
          }
        });
      });

      // banner reveal
      gsap.from(".excellence-banner", {
        scale: 0.95,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".excellence-banner",
          start: "top 95%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const achievements = [
    {
      icon: Code2,
      title: '400+ Problems Solved',
      organization: 'LEETCODE / CODECHEF',
      description: 'Solved over 400 complex algorithmic problems with a consistent record of high-performance coding.',
    },
    {
      icon: Users,
      title: 'DOT Member',
      organization: 'Department of Telecommunications',
      description: 'Honoured as a member of the Department of Telecommunications (Govt. of India) community.',
    },
    {
      icon: Zap,
      title: '97.4 Percentile',
      organization: 'JEE MAIN EXAMINATION',
      description: 'Ranked among the top candidates nationwide in the highly competitive engineering entrance exam.',
    },
    {
      icon: GraduationCap,
      title: 'Academic Performer',
      organization: 'CGPA: 7.94 / 10',
      description: 'Maintaining a consistent and strong academic standing throughout the engineering program.',
    },
  ];

  return (
    <section id="achievements" ref={sectionRef} className="relative py-24 px-6 bg-black text-white overflow-hidden">
      
      {/* Background Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        
        {/* HEADER */}
        <div className="mb-20 text-center achievements-header">
          <p className="reveal-header text-sm text-blue-500 font-bold uppercase tracking-[0.2em] mb-4">
            Key Highlights
          </p>
          <h2 className="reveal-header text-4xl md:text-6xl font-extrabold text-white tracking-tight">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Achievements</span>
          </h2>
          <p className="reveal-header text-zinc-400 mt-6 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
            A focused record of my competitive rankings, professional memberships, and academic performance.
          </p>
        </div>

        {/* ACHIEVEMENTS GRID */}
        <div className="grid md:grid-cols-2 gap-6 mb-20 achievements-grid max-w-4xl mx-auto">
          {achievements.map((achievement, index) => (
            <div key={index} className="achievement-card p-8 bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/50 rounded-3xl hover:border-blue-500/30 transition-all group relative overflow-hidden">
               <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 blur-2xl group-hover:bg-blue-500/10 transition-all" />
              
              <div className="w-12 h-12 flex items-center justify-center bg-blue-500/10 text-blue-400 rounded-xl mb-6 group-hover:bg-blue-500 group-hover:text-white transition-all">
                <achievement.icon size={24} />
              </div>

              <h3 className="text-xl font-bold text-white mb-1 tracking-tight group-hover:text-blue-400 transition-colors">
                {achievement.title}
              </h3>
              <p className="text-blue-400 font-bold text-[10px] uppercase tracking-[0.15em] mb-4">
                {achievement.organization}
              </p>
              <p className="text-zinc-400 text-sm leading-relaxed">
                {achievement.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Achievements;
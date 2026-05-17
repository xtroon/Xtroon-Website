import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Hero from './sections/Hero';
import About from './sections/About';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

// Scroll to top and update title on route change
function PageManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const scrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.body.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    };

    scrollToTop();

    // Multiple deferred checks to aggressively combat async loading heights and browser auto-restoration
    const timer1 = setTimeout(scrollToTop, 5);
    const timer2 = setTimeout(scrollToTop, 50);
    const timer3 = setTimeout(scrollToTop, 150);

    // Dynamic Titles
    const titles = {
      '/': 'Xtroon-Portfolio | About & Projects',
      '/about': 'About | Xtroon-Portfolio',
      '/experience': 'Work | Xtroon-Portfolio',
      '/projects': 'Projects | Xtroon-Portfolio',
      '/contact': 'Contact | Xtroon-Portfolio',
    };

    document.title = titles[pathname] || 'Xtroon-Portfolio | About & Projects';

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [pathname]);

  return null;
}

function App() {
  const mainRef = useRef(null);
  const [showWip, setShowWip] = useState(true);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const revealElements = document.querySelectorAll('.reveal');

      revealElements.forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <ThemeProvider>
      <PageManager />
      <div ref={mainRef} className="relative min-h-screen transition-colors duration-300">
        <div className="noise-overlay" />

        <Navigation />

        <main className="pt-20">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/about" element={<About />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <Footer />

        {/* Under Construction Popup Modal */}
        {showWip && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md transition-all duration-300">
            <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] shadow-2xl rounded-3xl p-6 md:p-8 max-w-md w-full relative flex flex-col items-center text-center">
              
              {/* Close Button Icon */}
              <button 
                onClick={() => setShowWip(false)}
                className="absolute top-4 right-4 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors p-1.5 rounded-full hover:bg-[var(--border-primary)]/50"
                aria-label="Close modal"
              >
                <X size={18} strokeWidth={2.5} />
              </button>

              {/* Emoji Icon */}
              <div className="w-16 h-16 flex items-center justify-center bg-blue-500/10 border border-blue-500/20 rounded-full mb-5 text-3xl">
                🚧
              </div>

              {/* Title */}
              <h3 className="text-2xl font-extrabold tracking-tight uppercase text-[var(--text-primary)] mb-3">
                Under Development
              </h3>

              {/* Message */}
              <p className="text-[var(--text-secondary)] text-sm md:text-base leading-relaxed font-medium mb-6">
                Some parts of the portfolio are under development, but you can still explore it with a happy vibe! 😊✨
              </p>

              {/* Main Action Button */}
              <button
                onClick={() => setShowWip(false)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-lg hover:shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                Explore with a Happy Vibe!
              </button>
            </div>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
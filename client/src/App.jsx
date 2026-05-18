import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Home from './sections/Home';
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

      // Target the active scrollable container (#root) found by browser subagent
      const root = document.getElementById('root');
      if (root) {
        root.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        root.scrollTop = 0;
      }
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
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
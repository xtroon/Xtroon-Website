import { useEffect, useRef } from 'react';
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
    window.scrollTo(0, 0);

    // Dynamic Titles
    const titles = {
      '/': 'Xtroon-Portfolio | About & Projects',
      '/about': 'About | Xtroon-Portfolio',
      '/experience': 'Experience | Xtroon-Portfolio',
      '/projects': 'Projects | Xtroon-Portfolio',
      '/contact': 'Contact | Xtroon-Portfolio',
    };

    document.title = titles[pathname] || 'Ome Tiwari | Portfolio';
  }, [pathname]);

  return null;
}

function App() {
  const mainRef = useRef(null);

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
      </div>
    </ThemeProvider>
  );
}

export default App;
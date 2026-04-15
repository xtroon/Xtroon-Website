import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Send } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'py-3 backdrop-blur-lg border-b border-zinc-800 bg-black/60'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-[90rem] mx-auto px-6 md:px-10 flex items-center justify-between">

          {/* LOGO */}
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="cursor-pointer font-extrabold text-2xl md:text-3xl tracking-tighter"
          >
            <span className="text-white">Ome</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200"> Tiwari</span>
            <span className="text-blue-500">.</span>
          </div>

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex items-center gap-10 text-sm text-zinc-400">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="hover:text-blue-400 transition-colors uppercase tracking-widest font-bold relative group py-2 cursor-pointer"
              >
                {link.name}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-blue-500 transition-all duration-300 w-0 group-hover:w-full shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
              </button>
            ))}
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4">

            {/* THEME TOGGLE */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 flex items-center justify-center rounded-md bg-zinc-800 hover:bg-zinc-700 transition cursor-pointer"
            >
              {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            </button>

            {/* CTA */}
            <button
              onClick={() => scrollToSection('#contact')}
              className="hidden lg:flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600/10 border border-blue-500/20 text-white font-bold text-[13px] hover:bg-blue-600 hover:border-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all duration-300 group cursor-pointer"
            >
              Get in Touch
              <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white cursor-pointer"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-black transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        {navLinks.map((link) => (
          <button
            key={link.name}
            onClick={() => scrollToSection(link.href)}
            className="text-3xl font-extrabold text-white hover:text-blue-400 transition-all uppercase tracking-tighter relative group py-2 cursor-pointer"
          >
            {link.name}
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] bg-blue-500 transition-all duration-300 w-0 group-hover:w-full" />
          </button>
        ))}

        <button
          onClick={() => scrollToSection('#contact')}
          className="mt-6 px-8 py-4 bg-blue-600 text-white font-bold rounded-xl transition-all hover:bg-blue-500 hover:scale-105 active:scale-95 cursor-pointer shadow-[0_0_15px_rgba(59,130,246,0.3)]"
        >
          Get in Touch
        </button>
      </div>
    </>
  );
};

export default Navigation;
import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import logoImage from '../assets/logoPortfolio.png';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'About', path: '/about' },
    { name: 'Work', path: '/experience' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'py-3 lg:py-2 backdrop-blur-lg border-b bg-[rgba(var(--bg-primary-rgb),0.8)]'
            : 'py-5 lg:py-3 backdrop-blur-md bg-[rgba(var(--bg-primary-rgb),0.6)]'
        }`}
        style={{ 
          borderColor: isScrolled ? 'var(--border-secondary)' : 'transparent',
        }}
      >
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 md:px-10 flex items-center justify-between">

          {/* LOGO */}
          <Link
            to="/"
            className="group flex items-center gap-2 cursor-pointer"
          >
            <div className="relative">
              <img 
                src={logoImage} 
                alt="Logo" 
                className="w-8 h-8 md:w-10 md:h-10 object-contain border border-[var(--border-primary)] rounded-[12px] transition-all duration-300 group-hover:border-blue-500/50 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]" 
              />
            </div>
            <div className="px-3 py-1.5 rounded-xl transition-all duration-300 group-hover:bg-blue-500/5 flex items-center">
              <span className="text-[var(--text-primary)] font-extrabold text-xl sm:text-2xl md:text-3xl tracking-tighter group-hover:text-blue-500 transition-colors">
                Xtroon
              </span>
              <span className="text-blue-500 font-extrabold text-xl sm:text-2xl md:text-3xl">.</span>
            </div>
          </Link>
          {/* DESKTOP NAV */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-10 text-sm text-[var(--text-secondary)]">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`hover:text-blue-400 transition-colors uppercase tracking-widest font-bold relative group py-2 cursor-pointer ${
                  location.pathname === link.path ? 'text-blue-400' : ''
                }`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-blue-500 transition-all duration-300 ${
                  location.pathname === link.path ? 'w-full shadow-[0_0_8px_rgba(59,130,246,0.6)]' : 'w-0 group-hover:w-full shadow-[0_0_8px_rgba(59,130,246,0.6)]'
                }`} />
              </Link>
            ))}
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4">

            {/* THEME TOGGLE */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 flex items-center justify-center rounded-md bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-[var(--text-primary)] hover:bg-[var(--border-primary)] transition cursor-pointer"
            >
              {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            </button>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-[var(--text-primary)] cursor-pointer"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 bg-[var(--bg-primary)]/95 backdrop-blur-xl transition-all duration-500 ${
          isMobileMenuOpen ? 'translate-y-0 opacity-100 visible' : '-translate-y-full opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-2xl sm:text-3xl font-extrabold transition-all uppercase tracking-tighter relative group py-2 cursor-pointer ${
                location.pathname === link.path ? 'text-blue-400' : 'text-[var(--text-primary)]'
              }`}
            >
              {link.name}
              <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] bg-blue-500 transition-all duration-300 ${
                location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navigation;
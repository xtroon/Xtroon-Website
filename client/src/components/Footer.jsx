import { Mail } from 'lucide-react';
import { 
  SiX, 
  SiInstagram, 
  SiDiscord, 
  SiLeetcode 
} from 'react-icons/si';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const socials = [
    { icon: FaGithub, href: 'https://github.com/xtroon', label: 'GitHub' },
    { icon: FaLinkedin, href: 'https://www.linkedin.com/in/ometiwari-ai/', label: 'LinkedIn' },
    { icon: SiX, href: 'https://x.com/ometiwari18?s=20', label: 'Twitter' },
    { icon: SiInstagram, href: 'https://www.instagram.com/xtroon0/', label: 'Instagram' },
    { icon: SiDiscord, href: 'https://discord.com/users/899655419310514186', label: 'Discord' },
    { icon: SiLeetcode, href: 'https://leetcode.com/u/omtiwari0/', label: 'LeetCode' },
    { icon: Mail, href: 'mailto:ometiwari.ai@gmail.com', label: 'Email' },
  ];

  return (
    <footer className="pt-16 pb-0 border-t bg-[var(--bg-primary)] transition-colors duration-300 overflow-hidden" style={{ borderColor: 'var(--border-primary)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center gap-8">
          
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-blue-500/80">
            Find me here
          </p>

          {/* Social Links */}
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
            {socials.map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="p-3 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-[var(--text-secondary)] hover:text-blue-500 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all duration-300 transform hover:-translate-y-1 shadow-sm"
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>

        </div>
      </div>

      {/* Big xtroon text taking full width */}
      <div className="w-full border-t border-[var(--border-primary)] text-center mt-16 pt-12 pb-6 select-none overflow-hidden relative group">
        {/* Subtle accent glow on hover */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/0 to-blue-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        
        <h1 className="text-[14vw] font-black tracking-tighter leading-none text-gray-400/40 hover:text-gray-900 dark:text-neutral-800 dark:hover:text-neutral-100 transition-all duration-700 cursor-default transform hover:scale-[1.01] origin-center">
          xtroon
        </h1>
      </div>
    </footer>
  );
};

export default Footer;

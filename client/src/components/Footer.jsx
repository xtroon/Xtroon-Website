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
    <footer className="py-12 border-t bg-[var(--bg-primary)] transition-colors duration-300" style={{ borderColor: 'var(--border-primary)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center gap-6">
          
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-blue-500/80 mb-2">
            Find me here
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-6">
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

          {/* Copyright */}
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm text-[var(--text-muted)] font-medium">
              © {new Date().getFullYear()} <span className="text-[var(--text-primary)] font-bold">Xtroon</span>. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

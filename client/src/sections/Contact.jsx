import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, MapPin, Laptop, Send, Github, Linkedin, Twitter, ArrowRight, Code2, CheckCircle2, AlertCircle, LoaderCircle } from "lucide-react";
import emailjs from '@emailjs/browser';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from(".contact-header > *", {
        y: 30,
        opacity: 0,
        filter: "blur(10px)",
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".contact-header",
          start: "top 90%",
        }
      });

      // Left Info stagger
      gsap.from(".contact-info-item", {
        x: -30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-info-item",
          start: "top 85%",
        }
      });

      // Form entrance
      gsap.from(".contact-form", {
        x: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-form",
          start: "top 85%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // EmailJS credentials from environment variables
    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID; 
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    try {
      await emailjs.sendForm(
        SERVICE_ID,
        TEMPLATE_ID,
        formRef.current,
        PUBLIC_KEY
      );

      setForm({ name: "", email: "", message: "" });
      setSubmitStatus({
        type: "success",
        message: "Message sent successfully. I will get back to you soon.",
      });
    } catch (error) {
      console.error("EmailJS Error:", error);
      setSubmitStatus({
        type: "error",
        message: "Message failed to send. Please try again or email me directly.",
      });
    } finally {
      setIsSubmitting(false);
      window.setTimeout(() => setSubmitStatus(null), 4500);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "ometiwari.ai@gmail.com",
      link: "mailto:ometiwari.ai@gmail.com"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Rajasthan, India",
    },
    {
      icon: Laptop,
      label: "Current Focus",
      value: "AI + Full Stack Engineering",
    }
  ];

  return (
    <section id="contact" ref={sectionRef} className="relative section-spacing px-6 bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300 overflow-hidden">
      
      {/* Background Accents */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="section-padding relative z-10">

        {/* HEADER */}
        <div className="mb-20 contact-header text-center">
          <p className="text-sm text-blue-500 font-bold uppercase tracking-[0.2em] mb-4">
            Get In Touch
          </p>
          <h2 className="text-4xl md:text-6xl font-extrabold text-[var(--text-primary)] tracking-tight">
            Let's Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Something Great.</span>
          </h2>
          <p className="text-[var(--text-secondary)] mt-6 max-w-xl mx-auto text-lg font-medium leading-relaxed">
            I'm currently looking for new opportunities and collaborations. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-16 lg:gap-24">

          {/* LEFT COLUMN: Info & Socials */}
          <div className="space-y-10">
            <div className="space-y-8">
              {contactInfo.map((info, i) => (
                <div key={i} className="contact-info-item group flex items-start gap-4 sm:gap-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 flex items-center justify-center bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-xl group-hover:border-blue-500/50 group-hover:bg-blue-500/10 transition-all duration-300 shadow-sm">
                    <info.icon size={18} className="text-blue-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-1">{info.label}</p>
                    {info.link ? (
                       <a href={info.link} className="text-base sm:text-lg font-bold text-[var(--text-primary)] hover:text-blue-400 transition-colors break-words">
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-base sm:text-lg font-bold text-[var(--text-primary)]">{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links Card */}
            <div className="contact-info-item p-8 bg-[var(--bg-secondary)] backdrop-blur-xl border border-[var(--border-primary)] rounded-[2rem] space-y-6 shadow-sm">
              <p className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest">Connect with me</p>
              <div className="flex flex-wrap gap-4">
                {[
                  { icon: Github, label: "GitHub", href: "https://github.com/ometiwari-ai" },
                  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/ometiwari-ai/" },
                  { icon: Twitter, label: "Twitter", href: "https://x.com/ometiwari_ai" },
                  { icon: Mail, label: "Email", href: "mailto:ometiwari.ai@gmail.com" },
                  { icon: Code2, label: "LeetCode", href: "https://leetcode.com/u/omtiwari0/" }
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="w-12 h-12 flex items-center justify-center bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-xl text-[var(--text-primary)] hover:bg-blue-600 hover:text-white hover:border-blue-400 hover:-translate-y-1 transition-all shadow-sm"
                    aria-label={social.label}
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Form */}
          <div className="contact-form relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/10 to-transparent blur-2xl opacity-50 rounded-full pointer-events-none" />
            
            <form ref={formRef} onSubmit={handleSubmit} className="relative bg-[var(--bg-secondary)] backdrop-blur-xl border border-[var(--border-primary)] p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] space-y-6 shadow-xl">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest ml-1">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Ome Tiwari"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full bg-[var(--bg-primary)] border border-[var(--border-primary)] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none px-6 py-4 rounded-2xl text-[var(--text-primary)] transition-all shadow-inner"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest ml-1">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="name@example.com"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full bg-[var(--bg-primary)] border border-[var(--border-primary)] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none px-6 py-4 rounded-2xl text-[var(--text-primary)] transition-all shadow-inner"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest ml-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  placeholder="Hey, let's collaborate on..."
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  className="w-full bg-[var(--bg-primary)] border border-[var(--border-primary)] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none px-6 py-4 rounded-2xl text-[var(--text-primary)] transition-all resize-none shadow-inner"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-5 rounded-2xl transition-all flex items-center justify-center gap-3 group relative overflow-hidden disabled:opacity-50"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {isSubmitting ? "Sending..." : "Send Message"}
                  {isSubmitting ? (
                    <LoaderCircle size={18} className="animate-spin" />
                  ) : (
                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  )}
                </span> 
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              {submitStatus && (
                <div
                  className={`flex items-start gap-3 rounded-2xl border px-4 py-4 transition-all duration-300 ${
                    submitStatus.type === "success"
                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                      : "border-red-500/30 bg-red-500/10 text-red-300"
                  }`}
                >
                  {submitStatus.type === "success" ? (
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                  ) : (
                    <AlertCircle size={18} className="mt-0.5 shrink-0" />
                  )}
                  <p className="text-sm font-medium leading-relaxed">{submitStatus.message}</p>
                </div>
              )}

              <div className="flex items-center gap-2 text-zinc-500 text-xs justify-center pt-2">
                <p>I typically respond within 24-48 hours.</p>
                <ArrowRight size={12} className="text-blue-500" />
              </div>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;
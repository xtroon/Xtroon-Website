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
    <section id="contact" ref={sectionRef} className="py-24 px-6 bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <div className="max-w-6xl mx-auto py-10">

        {/* HEADER */}
        <div className="mb-20 contact-header">
          <p className="text-xs text-blue-500 uppercase tracking-[0.3em] font-bold mb-4">
            Connect
          </p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Talk</span>.
          </h2>
          <p className="text-[var(--text-secondary)] mt-8 max-w-xl text-lg font-medium leading-relaxed">
            I'm currently looking for new opportunities and collaborations. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-16 lg:gap-24">

          {/* LEFT */}
          <div className="space-y-12">
            <div className="space-y-8">
              {contactInfo.map((info, i) => (
                <div key={i} className="contact-info-item group flex items-start gap-6">
                  <div className="w-12 h-12 shrink-0 flex items-center justify-center bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-2xl group-hover:border-blue-500/50 transition-all duration-300">
                    <info.icon size={18} className="text-blue-500" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-1">{info.label}</p>
                    {info.link ? (
                       <a href={info.link} className="text-lg font-bold hover:text-blue-500 transition-colors break-words">
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-lg font-bold">{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="contact-info-item p-10 bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-[2.5rem] space-y-8">
              <p className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest">Socials</p>
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
                    className="w-12 h-12 flex items-center justify-center bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-xl text-[var(--text-primary)] hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-all shadow-sm"
                    aria-label={social.label}
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="contact-form">
            <form ref={formRef} onSubmit={handleSubmit} className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] p-8 md:p-12 rounded-[2.5rem] space-y-8 shadow-2xl">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label htmlFor="name" className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest ml-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Xtroon"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full bg-[var(--bg-primary)] border border-[var(--border-primary)] focus:border-blue-500 outline-none px-6 py-4 rounded-2xl text-[var(--text-primary)] transition-all"
                  />
                </div>
                <div className="space-y-3">
                  <label htmlFor="email" className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest ml-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="hello@xtroon.ai"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full bg-[var(--bg-primary)] border border-[var(--border-primary)] focus:border-blue-500 outline-none px-6 py-4 rounded-2xl text-[var(--text-primary)] transition-all"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label htmlFor="message" className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest ml-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  placeholder="How can I help?"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  className="w-full bg-[var(--bg-primary)] border border-[var(--border-primary)] focus:border-blue-500 outline-none px-6 py-4 rounded-2xl text-[var(--text-primary)] transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 rounded-2xl transition-all flex items-center justify-center gap-3 group disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
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

              <div className="flex items-center gap-2 text-zinc-500 text-[10px] justify-center pt-2">
                <p>Typical response: 24-48 hours</p>
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
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, MapPin, Laptop, Send, Github, Linkedin, Youtube, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

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
    // Simulate API call
    setTimeout(() => {
      alert("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
      setIsSubmitting(false);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "omtiwari9828@gmail.com",
      link: "mailto:omtiwari9828@gmail.com"
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
    <section id="contact" ref={sectionRef} className="relative py-24 px-6 bg-black text-white overflow-hidden">
      
      {/* Background Accents */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* HEADER */}
        <div className="mb-20 contact-header text-center lg:text-left">
          <p className="text-sm text-blue-500 font-bold uppercase tracking-[0.2em] mb-4">
            Get In Touch
          </p>
          <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
            Let's Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Something Great.</span>
          </h2>
          <p className="text-zinc-400 mt-6 max-w-xl text-lg font-medium leading-relaxed">
            I'm currently looking for new opportunities and collaborations. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-16 lg:gap-24">

          {/* LEFT COLUMN: Info & Socials */}
          <div className="space-y-10">
            <div className="space-y-8">
              {contactInfo.map((info, i) => (
                <div key={i} className="contact-info-item group flex items-start gap-6">
                  <div className="w-12 h-12 shrink-0 flex items-center justify-center bg-zinc-900 border border-zinc-800 rounded-xl group-hover:border-blue-500/50 group-hover:bg-blue-500/10 transition-all duration-300">
                    <info.icon size={20} className="text-blue-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">{info.label}</p>
                    {info.link ? (
                       <a href={info.link} className="text-lg font-bold text-zinc-100 hover:text-blue-400 transition-colors">
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-lg font-bold text-zinc-200">{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links Card */}
            <div className="contact-info-item p-8 bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/50 rounded-[2rem] space-y-6">
              <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Connect with me</p>
              <div className="flex flex-wrap gap-4">
                {[
                  { icon: Github, label: "GitHub", href: "https://github.com" },
                  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
                  { icon: Youtube, label: "YouTube", href: "https://youtube.com" }
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="w-12 h-12 flex items-center justify-center bg-zinc-800 border border-zinc-700 rounded-xl hover:bg-blue-600 hover:border-blue-400 hover:-translate-y-1 transition-all"
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
            
            <form onSubmit={handleSubmit} className="relative bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/50 p-8 md:p-12 rounded-[2.5rem] space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-bold text-zinc-400 uppercase tracking-widest ml-1">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Ome Tiwari"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full bg-zinc-950/50 border border-zinc-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none px-6 py-4 rounded-2xl text-zinc-100 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-bold text-zinc-400 uppercase tracking-widest ml-1">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="name@example.com"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full bg-zinc-950/50 border border-zinc-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none px-6 py-4 rounded-2xl text-zinc-100 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-bold text-zinc-400 uppercase tracking-widest ml-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  placeholder="Hey, let's collaborate on..."
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  className="w-full bg-zinc-950/50 border border-zinc-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none px-6 py-4 rounded-2xl text-zinc-100 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-5 rounded-2xl transition-all flex items-center justify-center gap-3 group relative overflow-hidden disabled:opacity-50"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

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
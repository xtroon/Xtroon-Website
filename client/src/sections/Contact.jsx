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

  return (
    <section id="contact" ref={sectionRef} className="pt-10 pb-24 md:pt-12 md:pb-32 px-4 sm:px-6 bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <div className="max-w-6xl mx-auto pb-10">

        {/* HEADER */}
        <div className="mb-16 contact-header flex flex-col items-center text-center">
          <h2 className="text-3xl md:text-5xl text-blue-500 font-semibold tracking-tight">
            Let’s Connect
          </h2>
          <p className="text-[var(--text-secondary)] mt-4 max-w-xl text-base font-medium">
            Have an idea, opportunity, or project in mind? Feel free to reach out.
          </p>
        </div>

        <div className="flex flex-col items-center gap-8 max-w-2xl mx-auto w-full">

          <div className="contact-form w-full">
            <form ref={formRef} onSubmit={handleSubmit} className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] p-6 md:p-8 rounded-2xl space-y-5 shadow-sm">
              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-bold text-[var(--text-secondary)] ml-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Xtroon"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full bg-[var(--bg-primary)] border border-[var(--border-primary)] focus:border-blue-500 outline-none px-4 py-3 rounded-xl text-[var(--text-primary)] transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-bold text-[var(--text-secondary)] ml-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="xtroon@email.ai"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full bg-[var(--bg-primary)] border border-[var(--border-primary)] focus:border-blue-500 outline-none px-4 py-3 rounded-xl text-[var(--text-primary)] transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-bold text-[var(--text-secondary)] ml-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  placeholder="Connect with Xtroon!"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  className="w-full bg-[var(--bg-primary)] border border-[var(--border-primary)] focus:border-blue-500 outline-none px-4 py-3 rounded-xl text-[var(--text-primary)] transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>

              <a
                href="mailto:ometiwari.ai@gmail.com"
                className="flex items-center justify-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors group py-2"
              >
                <Mail className="text-blue-500 group-hover:scale-110 transition-transform" size={18} />
                <span className="text-sm font-medium">
                  Or email directly at <span className="font-bold text-blue-500 underline underline-offset-4">ometiwari.ai@gmail.com</span>
                </span>
              </a>

              {submitStatus && (
                <div
                  className={`flex items-start gap-3 rounded-xl border px-4 py-3 transition-all duration-300 ${submitStatus.type === "success"
                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-500"
                      : "border-red-500/30 bg-red-500/10 text-red-500"
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
            </form>
          </div>
        </div>
      </div >
    </section >
  );
};

export default Contact;
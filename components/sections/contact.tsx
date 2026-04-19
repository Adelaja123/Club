"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { RevealText } from "../reveal-text";
import { MagneticButton } from "../magnetic-button";
import { CONTACT_LINKS } from "@/lib/constants";

const socialLinks = [
  {
    name: "GitHub",
    url: CONTACT_LINKS.github,
    ariaLabel: "Visit GitHub profile",
  },
  {
    name: "LinkedIn",
    url: CONTACT_LINKS.linkedin,
    ariaLabel: "Visit LinkedIn profile",
  },
];

export function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to send message");
      }

      setSuccess(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <section
      ref={ref}
      id="contact"
      className="snap-section relative py-32 bg-foreground text-background"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* LEFT SIDE unchanged */}
          <div>
            <RevealText delay={0.1}>
              <span className="text-sm text-background/60 tracking-widest uppercase mb-4 block">
                Get In Touch
              </span>
            </RevealText>
            <RevealText delay={0.2}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-6 text-balance">
                Let&apos;s Create
                <br />
                Something Great
              </h2>
            </RevealText>
            <RevealText delay={0.3}>
              <p className="text-background/70 text-lg leading-relaxed mb-8 max-w-md">
                Have a project in mind or just want to chat? I&apos;m always
                open to discussing new opportunities and ideas.
              </p>
            </RevealText>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-4"
            >
              <a
                href="mailto:hello@gbotemi.dev"
                className="block text-2xl md:text-3xl font-light hover:text-background/80 transition-colors"
              >
                hello@gbotemi.dev
              </a>
              <p className="text-background/60">Lagos, Nigeria</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex gap-6 mt-12"
            >
              {socialLinks.map((link) => (
                <MagneticButton key={link.name} strength={0.2}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.ariaLabel}
                    className="text-sm text-background/60 hover:text-background transition-colors"
                  >
                    {link.name}
                  </a>
                </MagneticButton>
              ))}
            </motion.div>
          </div>

          {/* RIGHT SIDE (FORM) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full px-0 py-3 bg-transparent border-b border-background/20 text-background placeholder:text-background/40 focus:outline-none focus:border-background"
                />
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full px-0 py-3 bg-transparent border-b border-background/20 text-background placeholder:text-background/40 focus:outline-none focus:border-background"
                />
              </div>

              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Project inquiry"
                className="w-full px-0 py-3 bg-transparent border-b border-background/20 text-background placeholder:text-background/40 focus:outline-none focus:border-background"
              />

              <textarea
                name="message"
                rows={4}
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project..."
                className="w-full px-0 py-3 bg-transparent border-b border-background/20 text-background placeholder:text-background/40 focus:outline-none focus:border-background resize-none"
              />

              <MagneticButton strength={0.15}>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-background text-foreground font-medium rounded-full hover:bg-background/90 transition-all group mt-4 disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </MagneticButton>

              {success && (
                <p className="text-sm text-green-400 mt-2">
                  Message sent successfully.
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

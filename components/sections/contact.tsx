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
  {
    name: "Twitter",
    url: CONTACT_LINKS.twitter,
    ariaLabel: "Visit Twitter profile",
  },
  {
    name: "Instagram",
    url: CONTACT_LINKS.instagram,
    ariaLabel: "Visit Instagram profile",
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
    company: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // basic guard
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setSuccess(false);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Failed to send message");
      }

      setSuccess(true);
      setForm({ name: "", email: "", subject: "", message: "", company: "" });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong"
      );
    }

    setLoading(false);
  };

  return (
    <section
      ref={ref}
      id="contact"
      className="snap-section relative py-16 md:py-24 lg:py-32 bg-foreground text-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          {/* LEFT SIDE unchanged */}
          <div>
            <RevealText delay={0.1}>
              <span className="text-sm text-background/60 tracking-widest uppercase mb-4 block">
                Get In Touch
              </span>
            </RevealText>
            <RevealText delay={0.2}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-6 text-balance">
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
                href="mailto:hello@oluwagbotemi.space"
                className="block text-lg sm:text-2xl md:text-3xl font-light hover:text-background/80 transition-colors break-all"
              >
                hello@oluwagbotemi.space
              </a>
              <p className="text-background/60">Lagos, Nigeria</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap gap-4 sm:gap-6 mt-8 sm:mt-12"
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

          {/* RIGHT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="hidden" aria-hidden="true">
                <label htmlFor="company">Company</label>
                <input
                  id="company"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.company}
                  onChange={handleChange}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-2 block text-xs uppercase tracking-[0.18em] text-background/60"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    autoComplete="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="w-full px-0 py-3 bg-transparent border-b border-background/20 text-background placeholder:text-background/40 focus:outline-none focus:border-background"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-2 block text-xs uppercase tracking-[0.18em] text-background/60"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    className="w-full px-0 py-3 bg-transparent border-b border-background/20 text-background placeholder:text-background/40 focus:outline-none focus:border-background"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="mb-2 block text-xs uppercase tracking-[0.18em] text-background/60"
                >
                  Subject
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  autoComplete="off"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Project inquiry"
                  className="w-full px-0 py-3 bg-transparent border-b border-background/20 text-background placeholder:text-background/40 focus:outline-none focus:border-background"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-2 block text-xs uppercase tracking-[0.18em] text-background/60"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  autoComplete="off"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  required
                  className="w-full px-0 py-3 bg-transparent border-b border-background/20 text-background placeholder:text-background/40 focus:outline-none focus:border-background resize-none"
                />
              </div>

              <MagneticButton strength={0.15}>
                <button
                  type="submit"
                  disabled={
                    loading || !form.name || !form.email || !form.message
                  }
                  className="inline-flex items-center gap-3 px-8 py-4 bg-background text-foreground font-medium rounded-full hover:bg-background/90 transition-all mt-4 disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </MagneticButton>

              {success && (
                <p className="text-sm text-green-400" role="status" aria-live="polite">
                  Message sent successfully. Check your Mail
                </p>
              )}

              {error && (
                <p className="text-sm text-red-400" role="alert">
                  {error}
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

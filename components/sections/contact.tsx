"use client";

import { useRef } from "react";
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

  return (
    <section
      ref={ref}
      id="contact"
      className="snap-section relative py-32 bg-foreground text-background"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column - Content */}
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
                hello@oluwagbotemi.space
              </a>
              <p className="text-background/60">Lagos, Nigeria</p>
            </motion.div>

            {/* Social Links */}
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

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm text-background/60 mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Your name"
                    className="w-full px-0 py-3 bg-transparent border-b border-background/20 text-background placeholder:text-background/40 focus:outline-none focus:border-background transition-colors"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm text-background/60 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="your@email.com"
                    className="w-full px-0 py-3 bg-transparent border-b border-background/20 text-background placeholder:text-background/40 focus:outline-none focus:border-background transition-colors"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm text-background/60 mb-2"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="Project inquiry"
                  className="w-full px-0 py-3 bg-transparent border-b border-background/20 text-background placeholder:text-background/40 focus:outline-none focus:border-background transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm text-background/60 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Tell me about your project..."
                  className="w-full px-0 py-3 bg-transparent border-b border-background/20 text-background placeholder:text-background/40 focus:outline-none focus:border-background transition-colors resize-none"
                />
              </div>

              <MagneticButton strength={0.15}>
                <button
                  type="submit"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-background text-foreground font-medium rounded-full hover:bg-background/90 transition-all group mt-4"
                >
                  Send Message
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>
              </MagneticButton>
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-32 pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-sm text-background/40">
            © 2024 Oluwagbotemi Adelaja. All rights reserved.
          </p>
          <p className="text-sm text-background/40">
            Designed & Built with care
          </p>
        </motion.footer>
      </div>
    </section>
  );
}

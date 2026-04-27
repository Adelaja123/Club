"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { RevealText } from "../reveal-text";

const highlights = [
  "Problem solver by nature",
  "Design-driven developer",
  "Open source contributor",
];

export function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!buttonRef.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } =
      buttonRef.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setButtonPosition({ x: middleX * 0.3, y: middleY * 0.3 });
  };

  const handleMouseLeave = () => {
    setButtonPosition({ x: 0, y: 0 });
  };

  return (
    <section
      ref={ref}
      id="about"
      className="snap-section relative flex items-center py-16 md:py-24 lg:py-32"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="grid items-center gap-10 sm:gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Left Column - Image with Magnetic Button */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
            className="relative"
          >
            <div className="relative aspect-[4/3] sm:aspect-[4/5] overflow-hidden rounded-2xl bg-secondary">
              <Image
                src="/images/about-photo.jpg"
                alt="Profile photo"
                fill
                className="object-cover object-top"
                priority
              />
              {/* Overlay gradient for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent" />
            </div>

            {/* Open to Work badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -right-2 -top-2 sm:-right-4 sm:-top-4 rounded-full bg-foreground px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-background shadow-lg"
            >
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Open to Work
              </span>
            </motion.div>

            {/* Circular Magnetic "About Me" Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute -bottom-8 -right-4 sm:-bottom-10 sm:-right-8 lg:-bottom-12 lg:-right-12 z-10"
            >
              <motion.a
                ref={buttonRef}
                href="/about"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                animate={{ x: buttonPosition.x, y: buttonPosition.y }}
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 15,
                  mass: 0.5,
                }}
                className="group relative flex h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 lg:h-36 lg:w-36 items-center justify-center rounded-full bg-foreground text-background shadow-2xl transition-shadow hover:shadow-[0_20px_60px_-10px_rgba(0,0,0,0.4)]"
              >
                {/* Rotating border animation */}
                <span className="absolute inset-0 rounded-full border-2 border-dashed border-foreground/30 animate-[spin_20s_linear_infinite]" />
                
                {/* Inner content */}
                <span className="relative flex flex-col items-center justify-center text-center">
                  <span className="text-xs sm:text-sm font-medium tracking-wide uppercase">
                    About
                  </span>
                  <span className="text-base sm:text-lg md:text-xl font-semibold -mt-0.5">
                    Me
                  </span>
                  {/* Arrow icon */}
                  <svg
                    className="mt-1 h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>

                {/* Pulse effect on hover */}
                <span className="absolute inset-0 rounded-full bg-foreground opacity-0 group-hover:animate-ping group-hover:opacity-20" />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right Column - Teaser Content */}
          <div className="space-y-6 sm:space-y-8 lg:pl-4">
            <div>
              <RevealText delay={0.1}>
                <span className="mb-3 sm:mb-4 block text-xs sm:text-sm uppercase tracking-widest text-muted-foreground">
                  Get to Know Me
                </span>
              </RevealText>

              <RevealText delay={0.2}>
                <h2 className="text-balance text-3xl sm:text-4xl md:text-5xl font-light tracking-tight">
                  More than just
                  <br />
                  <span className="text-muted-foreground">a developer</span>
                </h2>
              </RevealText>
            </div>

            <RevealText delay={0.3}>
              <p className="text-base sm:text-lg leading-relaxed text-muted-foreground max-w-lg">
                I believe great software is born at the intersection of
                technical excellence and human empathy. Every project is an
                opportunity to create something meaningful.
              </p>
            </RevealText>

            {/* Highlight pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap gap-2 sm:gap-3"
            >
              {highlights.map((highlight, i) => (
                <motion.span
                  key={highlight}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                  className="inline-flex items-center rounded-full border border-border bg-secondary/50 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-foreground/80"
                >
                  {highlight}
                </motion.span>
              ))}
            </motion.div>

            {/* Teaser stats - just a glimpse */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex items-center gap-6 sm:gap-8 border-t border-border pt-6 sm:pt-8"
            >
              <div>
                <div className="text-2xl sm:text-3xl font-light tracking-tight">
                  5+
                </div>
                <div className="mt-1 text-xs sm:text-sm text-muted-foreground">
                  Years Building
                </div>
              </div>
              <div className="h-10 sm:h-12 w-px bg-border" />
              <div>
                <div className="text-2xl sm:text-3xl font-light tracking-tight">
                  50+
                </div>
                <div className="mt-1 text-xs sm:text-sm text-muted-foreground">
                  Projects Shipped
                </div>
              </div>
              <div className="h-10 sm:h-12 w-px bg-border hidden sm:block" />
              <div className="hidden sm:block">
                <div className="text-2xl sm:text-3xl font-light tracking-tight">
                  ...
                </div>
                <div className="mt-1 text-xs sm:text-sm text-muted-foreground">
                  <Link
                    href="/about"
                    className="text-foreground hover:underline underline-offset-4 transition-colors"
                  >
                    See more
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

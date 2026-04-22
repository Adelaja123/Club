"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { RevealText } from "../reveal-text";

// const skills = [
//   {
//     category: "Frontend",
//     items: ["React", "Next.js", "TypeScript", "Framer Motion", "HTML/CSS"],
//   },
//   {
//     category: "Backend",
//     items: ["Node.js", "Python", "PostgreSQL", "Redis", "GraphQL"],
//   },
//   { category: "Tools", items: ["Git", "Docker", "AWS", "Vercel", "Figma"] },
// ];

const stats = [
  { value: "5+", label: "Years Experience" },
  { value: "50+", label: "Projects Completed" },
  { value: "30+", label: "Happy Clients" },
  { value: "99%", label: "Client Satisfaction" },
];

export function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="about"
      className="snap-section relative flex items-center py-16 md:py-24 lg:py-32"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="grid items-center gap-10 sm:gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left Column - Image/Visual */}
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
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -right-4 -top-4 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background shadow-lg"
            >
              Open to Work
            </motion.div>
          </motion.div>

          {/* Right Column - Content */}
          <div className="space-y-8">
            <div>
              <RevealText delay={0.1}>
                <span className="mb-4 block text-sm uppercase tracking-widest text-muted-foreground">
                  About Me
                </span>
              </RevealText>

              <RevealText delay={0.2}>
                <h2 className="text-balance text-3xl sm:text-4xl font-light tracking-tight md:text-5xl">
                  Building the future,
                  <br />
                  <span className="text-muted-foreground">
                    one line at a time
                  </span>
                </h2>
              </RevealText>

              <RevealText delay={0.3}>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  I&apos;m a full-stack developer with over 5 years of
                  experience creating digital solutions that combine technical
                  excellence with thoughtful design. My approach focuses on
                  writing clean, maintainable code while delivering exceptional
                  user experiences.
                </p>
              </RevealText>

              <RevealText delay={0.4}>
                <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                  When I&apos;m not coding, you&apos;ll find me exploring new
                  technologies, contributing to open-source projects, or sharing
                  knowledge through technical writing and mentorship.
                </p>
              </RevealText>
            </div>

            {/* Skills */}
            {/* <div className="space-y-6">
              <RevealText delay={0.5}>
                <h3 className="text-lg font-medium">Technical Expertise</h3>
              </RevealText>

              <div className="space-y-3 sm:space-y-4">
                {skills.map((skill, i) => (
                  <motion.div
                    key={skill.category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                    className="grid grid-cols-1 gap-3 rounded-2xl border border-border/60 bg-secondary/30 p-4 sm:p-5 lg:grid-cols-[140px_minmax(0,1fr)] lg:items-start lg:gap-6"
                  >
                    <span className="text-sm font-medium text-muted-foreground sm:text-[15px] lg:pt-1">
                      {skill.category}
                    </span>

                    <div className="flex flex-wrap gap-2">
                      {skill.items.map((item) => (
                        <span
                          key={item}
                          className="inline-flex items-center rounded-full border border-border/60 bg-background px-3 py-1.5 text-xs font-medium tracking-tight text-foreground/90 sm:px-3.5 sm:py-2 sm:text-sm"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div> */}

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="grid grid-cols-2 gap-4 border-t border-border pt-8 sm:grid-cols-4 sm:gap-6 w-full"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 1 + i * 0.1 }}
                  className="min-w-0"
                >
                  <div className="text-2xl font-light tracking-tight sm:text-3xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground sm:text-sm">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { RevealText } from "@/components/reveal-text";
import { MagneticButton } from "@/components/magnetic-button";

const skills = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Framer Motion", "Tailwind CSS"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Python", "PostgreSQL", "Redis", "GraphQL"],
  },
  {
    category: "Tools & DevOps",
    items: ["Git", "Docker", "AWS", "Vercel", "Figma"],
  },
];

const stats = [
  { value: "5+", label: "Years of Experience" },
  { value: "50+", label: "Projects Completed" },
  { value: "30+", label: "Happy Clients" },
  { value: "99%", label: "Client Satisfaction" },
];

const experience = [
  {
    period: "2022 - Present",
    role: "Senior Full-Stack Developer",
    company: "Freelance / Contract",
    description:
      "Building scalable web applications for startups and enterprises. Leading technical decisions and mentoring junior developers.",
  },
  {
    period: "2020 - 2022",
    role: "Full-Stack Developer",
    company: "Tech Startup",
    description:
      "Developed core product features, implemented CI/CD pipelines, and improved application performance by 40%.",
  },
  {
    period: "2019 - 2020",
    role: "Frontend Developer",
    company: "Digital Agency",
    description:
      "Created responsive web interfaces for clients across various industries. Specialized in React and modern CSS.",
  },
];

const values = [
  {
    title: "Clean Code",
    description:
      "Writing maintainable, well-documented code that stands the test of time.",
  },
  {
    title: "User-Centric",
    description:
      "Every decision starts with understanding the end user experience.",
  },
  {
    title: "Continuous Learning",
    description:
      "Staying current with evolving technologies and best practices.",
  },
  {
    title: "Collaboration",
    description:
      "Building great products through open communication and teamwork.",
  },
];

export function AboutPageContent() {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isContentInView = useInView(contentRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative flex min-h-[80vh] items-center justify-center overflow-hidden pt-24"
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 via-background to-background" />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                             linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />

        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/80 rounded-full text-sm text-muted-foreground hover:bg-secondary transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Home
            </Link>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight mb-6 text-balance"
          >
            Hello, I&apos;m{" "}
            <span className="text-foreground font-normal">Oluwagbotemi</span>
            <br />
            <span className="text-muted-foreground">Adelaja</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed mb-8"
          >
            A passionate full-stack developer crafting digital experiences that
            merge technical excellence with thoughtful design.
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12"
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-6 h-10 border border-border bg-secondary/30 rounded-full mx-auto flex items-start justify-center p-1.5"
            >
              <motion.div
                animate={{ opacity: [1, 0.2, 1], y: [0, 10, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-1.5 h-1.5 bg-muted-foreground rounded-full"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Main Content */}
      <section ref={contentRef} className="py-16 md:py-24 lg:py-32">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-12">
          {/* About Grid */}
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-20 mb-24 lg:mb-32">
            {/* Image Column */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isContentInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
              className="lg:sticky lg:top-24"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-secondary">
                <Image
                  src="/images/about-photo.jpg"
                  alt="Oluwagbotemi Adelaja - Full Stack Developer"
                  fill
                  className="object-cover object-top"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent" />
              </div>
            </motion.div>

            {/* Content Column */}
            <div className="space-y-10 lg:space-y-12">
              {/* Bio */}
              <div className="space-y-6">
                <RevealText delay={0.1}>
                  <span className="text-sm uppercase tracking-widest text-muted-foreground">
                    My Story
                  </span>
                </RevealText>

                <RevealText delay={0.2}>
                  <h2 className="text-3xl sm:text-4xl font-light tracking-tight">
                    Building the future,
                    <br />
                    <span className="text-muted-foreground">
                      one line at a time
                    </span>
                  </h2>
                </RevealText>

                <RevealText delay={0.3}>
                  <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
                    I&apos;m a full-stack developer with over 5 years of
                    experience creating digital solutions that combine technical
                    excellence with thoughtful design. My journey began with a
                    curiosity about how things work on the web, and has evolved
                    into a passion for building products that make a real
                    difference.
                  </p>
                </RevealText>

                <RevealText delay={0.4}>
                  <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
                    My approach focuses on writing clean, maintainable code
                    while delivering exceptional user experiences. I believe
                    that great software is born at the intersection of technical
                    excellence and human empathy.
                  </p>
                </RevealText>

                <RevealText delay={0.5}>
                  <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
                    When I&apos;m not coding, you&apos;ll find me exploring new
                    technologies, contributing to open-source projects, or
                    sharing knowledge through technical writing and mentorship.
                  </p>
                </RevealText>
              </div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isContentInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="grid grid-cols-2 gap-6 border-y border-border py-8"
              >
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isContentInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
                    className="group"
                  >
                    <div className="text-3xl sm:text-4xl font-light tracking-tight group-hover:text-foreground/80 transition-colors">
                      {stat.value}
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Values */}
              <div className="space-y-6">
                <RevealText delay={0.8}>
                  <h3 className="text-xl font-medium">What I Value</h3>
                </RevealText>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {values.map((value, i) => (
                    <motion.div
                      key={value.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isContentInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.9 + i * 0.1 }}
                      className="p-4 rounded-xl border border-border bg-secondary/20 hover:bg-secondary/40 transition-colors"
                    >
                      <h4 className="font-medium mb-1">{value.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {value.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="mb-24 lg:mb-32">
            <div className="text-center mb-12 lg:mb-16">
              <RevealText delay={0.1}>
                <span className="text-sm uppercase tracking-widest text-muted-foreground">
                  Technical Expertise
                </span>
              </RevealText>
              <RevealText delay={0.2}>
                <h2 className="mt-4 text-3xl sm:text-4xl font-light tracking-tight">
                  Skills & Technologies
                </h2>
              </RevealText>
            </div>

            <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto">
              {skills.map((skill, i) => (
                <motion.div
                  key={skill.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isContentInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="grid grid-cols-1 gap-4 rounded-2xl border border-border bg-secondary/30 p-5 sm:p-6 lg:grid-cols-[160px_minmax(0,1fr)] lg:items-center lg:gap-8"
                >
                  <span className="text-sm font-medium text-muted-foreground">
                    {skill.category}
                  </span>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {skill.items.map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-foreground/90 hover:bg-secondary transition-colors"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Experience Section */}
          <div className="mb-24 lg:mb-32">
            <div className="text-center mb-12 lg:mb-16">
              <RevealText delay={0.1}>
                <span className="text-sm uppercase tracking-widest text-muted-foreground">
                  Career Journey
                </span>
              </RevealText>
              <RevealText delay={0.2}>
                <h2 className="mt-4 text-3xl sm:text-4xl font-light tracking-tight">
                  Experience
                </h2>
              </RevealText>
            </div>

            <div className="max-w-3xl mx-auto space-y-0">
              {experience.map((exp, i) => (
                <motion.div
                  key={exp.period}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isContentInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
                  className="relative pl-8 pb-10 border-l border-border last:pb-0"
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-[5px] top-0 h-2.5 w-2.5 rounded-full bg-foreground" />

                  <span className="text-sm text-muted-foreground">
                    {exp.period}
                  </span>
                  <h3 className="mt-2 text-lg sm:text-xl font-medium">
                    {exp.role}
                  </h3>
                  <p className="text-muted-foreground">{exp.company}</p>
                  <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {exp.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isContentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center py-16 lg:py-20 border-t border-border"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight mb-6">
              Let&apos;s work together
            </h2>
            <p className="max-w-xl mx-auto text-base sm:text-lg text-muted-foreground mb-10">
              Have a project in mind or just want to chat? I&apos;m always open
              to discussing new opportunities and ideas.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticButton strength={0.15}>
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background font-medium rounded-full hover:bg-foreground/90 transition-all group"
                >
                  Get in Touch
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
                </Link>
              </MagneticButton>

              <MagneticButton strength={0.15}>
                <Link
                  href="/#projects"
                  className="inline-flex items-center gap-2 px-8 py-4 border border-border text-foreground font-medium rounded-full hover:bg-secondary transition-all"
                >
                  View Projects
                </Link>
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

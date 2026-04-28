"use client";

import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/lib/projects";
import { projects } from "@/lib/projects";
import { MagneticButton } from "@/components/magnetic-button";

interface CaseStudyContentProps {
  project: Project;
}

export function CaseStudyContent({ project }: CaseStudyContentProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const isContentInView = useInView(contentRef, { once: true, margin: "-100px" });
  const [imageError, setImageError] = useState(false);

  // Parallax for hero image
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  // Get next and previous projects
  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length];

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[70vh] lg:min-h-[80vh] flex items-end overflow-hidden">
        {/* Background Image with Parallax */}
        <motion.div style={{ y: imageY }} className="absolute inset-0 -z-10">
          {!imageError ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              priority
              onError={() => setImageError(true)}
            />
          ) : (
            <div className={`absolute inset-0 ${project.color}`}>
              <span className="absolute inset-0 flex items-center justify-center text-[20rem] font-light text-foreground/5">
                {project.title.charAt(0)}
              </span>
            </div>
          )}
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/30 to-transparent" />
        </motion.div>

        {/* Hero Content */}
        <div className="relative w-full px-4 sm:px-6 lg:px-12 pb-12 sm:pb-16 lg:pb-20 pt-32">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
                <Link href="/projects" className="hover:text-foreground transition-colors">
                  Projects
                </Link>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span className="text-foreground">{project.title}</span>
              </nav>

              {/* Category & Year badges */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="px-4 py-1.5 bg-foreground text-background text-sm font-medium rounded-full">
                  {project.category}
                </span>
                <span className="px-4 py-1.5 bg-background/80 backdrop-blur-sm text-sm font-medium rounded-full border border-border">
                  {project.year}
                </span>
                <span className="px-4 py-1.5 bg-emerald-500/90 text-white text-sm font-medium rounded-full">
                  {project.metrics.growth} Growth
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight mb-6 max-w-4xl text-balance">
                {project.title}
              </h1>

              {/* Description */}
              <p className="text-xl sm:text-2xl text-muted-foreground font-light leading-relaxed max-w-3xl">
                {project.description}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Stats Bar */}
      <section className="border-y border-border bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-border"
          >
            <div className="py-6 sm:py-8 pr-4 sm:pr-6">
              <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Duration</div>
              <div className="text-lg sm:text-xl font-light">{project.duration}</div>
            </div>
            <div className="py-6 sm:py-8 px-4 sm:px-6">
              <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Users</div>
              <div className="text-lg sm:text-xl font-light">{project.metrics.users}</div>
            </div>
            <div className="py-6 sm:py-8 px-4 sm:px-6">
              <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Growth</div>
              <div className="text-lg sm:text-xl font-light text-emerald-600">{project.metrics.growth}</div>
            </div>
            <div className="py-6 sm:py-8 pl-4 sm:pl-6">
              <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Role</div>
              <div className="text-lg sm:text-xl font-light">{project.services[0]}</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section ref={contentRef} className="px-4 sm:px-6 lg:px-12 py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Sticky Sidebar */}
            <motion.aside
              initial={{ opacity: 0, x: -30 }}
              animate={isContentInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="lg:col-span-4"
            >
              <div className="lg:sticky lg:top-28 space-y-8">
                {/* Services */}
                <div>
                  <h3 className="text-xs text-muted-foreground tracking-widest uppercase mb-4 flex items-center gap-2">
                    <span className="w-6 h-px bg-muted-foreground" />
                    Services
                  </h3>
                  <ul className="space-y-2">
                    {project.services.map((service) => (
                      <li key={service} className="text-lg font-light">
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack */}
                <div>
                  <h3 className="text-xs text-muted-foreground tracking-widest uppercase mb-4 flex items-center gap-2">
                    <span className="w-6 h-px bg-muted-foreground" />
                    Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-2 bg-secondary text-sm rounded-full font-medium hover:bg-secondary/80 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="pt-6 border-t border-border space-y-3">
                  {project.liveUrl && (
                    <MagneticButton strength={0.1}>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-foreground text-background font-medium rounded-full hover:bg-foreground/90 transition-all group"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                        Visit Live Site
                        <svg
                          className="w-4 h-4 transition-transform group-hover:translate-x-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </a>
                    </MagneticButton>
                  )}
                  {project.repoUrl && (
                    <MagneticButton strength={0.1}>
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 w-full px-6 py-4 border border-border font-medium rounded-full hover:bg-secondary transition-all"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        View Repository
                      </a>
                    </MagneticButton>
                  )}
                </div>
              </div>
            </motion.aside>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isContentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-8 space-y-16"
            >
              {/* Overview */}
              <div>
                <h2 className="text-sm text-muted-foreground tracking-widest uppercase mb-6 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-foreground text-background text-xs font-bold">
                    01
                  </span>
                  Overview
                </h2>
                <p className="text-xl sm:text-2xl text-foreground/90 font-light leading-relaxed">
                  {project.overview}
                </p>
              </div>

              {/* Challenge & Solution */}
              {(project.challenge || project.solution) && (
                <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
                  {project.challenge && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={isContentInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="p-6 sm:p-8 bg-secondary/50 rounded-2xl lg:rounded-3xl border border-border/50"
                    >
                      <h3 className="text-sm text-muted-foreground tracking-widest uppercase mb-4 flex items-center gap-3">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 text-amber-700 text-xs font-bold">
                          02
                        </span>
                        The Challenge
                      </h3>
                      <p className="text-foreground/90 leading-relaxed text-lg">
                        {project.challenge}
                      </p>
                    </motion.div>
                  )}
                  {project.solution && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={isContentInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="p-6 sm:p-8 bg-secondary/50 rounded-2xl lg:rounded-3xl border border-border/50"
                    >
                      <h3 className="text-sm text-muted-foreground tracking-widest uppercase mb-4 flex items-center gap-3">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">
                          03
                        </span>
                        The Solution
                      </h3>
                      <p className="text-foreground/90 leading-relaxed text-lg">
                        {project.solution}
                      </p>
                    </motion.div>
                  )}
                </div>
              )}

              {/* Results */}
              <div>
                <h2 className="text-sm text-muted-foreground tracking-widest uppercase mb-8 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-foreground text-background text-xs font-bold">
                    04
                  </span>
                  Results & Impact
                </h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isContentInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="relative overflow-hidden p-8 sm:p-10 bg-foreground text-background rounded-2xl lg:rounded-3xl"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-background/5 rounded-full blur-2xl" />
                    <div className="relative">
                      <div className="text-5xl sm:text-6xl font-light mb-3">
                        {project.metrics.users}
                      </div>
                      <div className="text-background/70 uppercase tracking-wider text-sm">
                        Active Users
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isContentInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="relative overflow-hidden p-8 sm:p-10 bg-emerald-500 text-white rounded-2xl lg:rounded-3xl"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                    <div className="relative">
                      <div className="text-5xl sm:text-6xl font-light mb-3">
                        {project.metrics.growth}
                      </div>
                      <div className="text-white/70 uppercase tracking-wider text-sm">
                        Year-over-Year Growth
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Project Navigation */}
      <section className="border-t border-border">
        <div className="grid sm:grid-cols-2">
          {/* Previous Project */}
          <Link
            href={`/projects/${prevProject.slug}`}
            className="group relative p-8 sm:p-12 lg:p-16 border-b sm:border-b-0 sm:border-r border-border hover:bg-secondary/30 transition-colors"
          >
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <svg
                className="w-4 h-4 transition-transform group-hover:-translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              Previous Project
            </div>
            <h3 className="text-2xl sm:text-3xl font-light tracking-tight group-hover:text-foreground/80 transition-colors">
              {prevProject.title}
            </h3>
            <span className="text-sm text-muted-foreground mt-2 block">
              {prevProject.category}
            </span>
          </Link>

          {/* Next Project */}
          <Link
            href={`/projects/${nextProject.slug}`}
            className="group relative p-8 sm:p-12 lg:p-16 hover:bg-secondary/30 transition-colors text-right"
          >
            <div className="flex items-center justify-end gap-2 text-sm text-muted-foreground mb-4">
              Next Project
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
            <h3 className="text-2xl sm:text-3xl font-light tracking-tight group-hover:text-foreground/80 transition-colors">
              {nextProject.title}
            </h3>
            <span className="text-sm text-muted-foreground mt-2 block">
              {nextProject.category}
            </span>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-12 py-16 sm:py-20 lg:py-24 bg-secondary/30">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isContentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight mb-6 text-balance">
              Interested in working together?
            </h2>
            <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
              I&apos;m always open to discussing new projects and opportunities. Let&apos;s create something amazing together.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticButton strength={0.15}>
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background font-medium rounded-full hover:bg-foreground/90 transition-all group shadow-lg"
                >
                  Start a Conversation
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </MagneticButton>
              <MagneticButton strength={0.1}>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 px-6 py-4 border border-border font-medium rounded-full hover:bg-secondary transition-all"
                >
                  View All Projects
                </Link>
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 sm:px-6 lg:px-12 py-8 border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Oluwagbotemi Adelaja. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <MagneticButton strength={0.1}>
              <Link href="/projects" className="text-sm font-medium hover:text-muted-foreground transition-colors">
                All Projects
              </Link>
            </MagneticButton>
            <MagneticButton strength={0.1}>
              <Link href="/about" className="text-sm font-medium hover:text-muted-foreground transition-colors">
                About
              </Link>
            </MagneticButton>
            <MagneticButton strength={0.1}>
              <Link href="/" className="text-sm font-medium hover:text-muted-foreground transition-colors">
                Home
              </Link>
            </MagneticButton>
          </div>
        </div>
      </footer>
    </main>
  );
}

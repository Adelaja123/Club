"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/lib/projects";
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

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-16 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {/* Category & Year */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm text-muted-foreground tracking-widest uppercase">
                {project.category}
              </span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground" />
              <span className="text-sm text-muted-foreground">{project.year}</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight mb-8 text-balance">
              {project.title}
            </h1>

            {/* Description */}
            <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed max-w-3xl">
              {project.description}
            </p>
          </motion.div>

          {/* Metadata Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 pt-8 border-t border-border"
          >
            <div>
              <div className="text-sm text-muted-foreground mb-1">Duration</div>
              <div className="font-medium">{project.duration}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Users</div>
              <div className="font-medium">{project.metrics.users}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Growth</div>
              <div className="font-medium text-emerald-600">{project.metrics.growth}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Services</div>
              <div className="font-medium">{project.services[0]}</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="px-6 lg:px-12 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-7xl mx-auto"
        >
          <div
            className={`relative aspect-[16/9] rounded-2xl overflow-hidden ${project.color}`}
          >
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
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-9xl font-light text-foreground/10">
                  {project.title.charAt(0)}
                </span>
              </div>
            )}
          </div>
        </motion.div>
      </section>

      {/* Content Section */}
      <section ref={contentRef} className="px-6 lg:px-12 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Sidebar */}
            <motion.aside
              initial={{ opacity: 0, x: -30 }}
              animate={isContentInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="lg:col-span-4 space-y-8"
            >
              {/* Services */}
              <div>
                <h3 className="text-sm text-muted-foreground tracking-widest uppercase mb-4">
                  Services
                </h3>
                <ul className="space-y-2">
                  {project.services.map((service) => (
                    <li key={service} className="font-medium">
                      {service}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack */}
              <div>
                <h3 className="text-sm text-muted-foreground tracking-widest uppercase mb-4">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 bg-secondary text-sm rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="pt-4 border-t border-border space-y-3">
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium hover:text-muted-foreground transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    View Repository
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium hover:text-muted-foreground transition-colors"
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
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    Visit Live Site
                  </a>
                )}
              </div>
            </motion.aside>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isContentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-8 space-y-12"
            >
              {/* Overview */}
              <div>
                <h2 className="text-2xl md:text-3xl font-light tracking-tight mb-6">
                  Overview
                </h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {project.overview}
                </p>
              </div>

              {/* Challenge & Solution */}
              {(project.challenge || project.solution) && (
                <div className="grid md:grid-cols-2 gap-8">
                  {project.challenge && (
                    <div className="p-6 bg-secondary/50 rounded-2xl">
                      <h3 className="text-sm text-muted-foreground tracking-widest uppercase mb-4">
                        The Challenge
                      </h3>
                      <p className="text-foreground leading-relaxed">
                        {project.challenge}
                      </p>
                    </div>
                  )}
                  {project.solution && (
                    <div className="p-6 bg-secondary/50 rounded-2xl">
                      <h3 className="text-sm text-muted-foreground tracking-widest uppercase mb-4">
                        The Solution
                      </h3>
                      <p className="text-foreground leading-relaxed">
                        {project.solution}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Results */}
              <div>
                <h2 className="text-2xl md:text-3xl font-light tracking-tight mb-6">
                  Results
                </h2>
                <div className="grid grid-cols-2 gap-8">
                  <div className="p-6 bg-secondary/50 rounded-2xl text-center">
                    <div className="text-4xl md:text-5xl font-light mb-2">
                      {project.metrics.users}
                    </div>
                    <div className="text-sm text-muted-foreground">Active Users</div>
                  </div>
                  <div className="p-6 bg-secondary/50 rounded-2xl text-center">
                    <div className="text-4xl md:text-5xl font-light text-emerald-600 mb-2">
                      {project.metrics.growth}
                    </div>
                    <div className="text-sm text-muted-foreground">Year-over-Year Growth</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 lg:px-12 py-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isContentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 md:p-12 bg-secondary/50 rounded-3xl"
          >
            <div>
              <h2 className="text-2xl md:text-3xl font-light tracking-tight mb-2">
                Interested in working together?
              </h2>
              <p className="text-muted-foreground">
                {"Let's"} discuss how I can help bring your ideas to life.
              </p>
            </div>
            <MagneticButton strength={0.15}>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background font-medium rounded-full hover:bg-foreground/90 transition-all group whitespace-nowrap"
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
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 lg:px-12 py-8 border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Oluwagbotemi Adelaja. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <MagneticButton strength={0.1}>
              <Link
                href="/projects"
                className="text-sm font-medium hover:text-muted-foreground transition-colors"
              >
                All Projects
              </Link>
            </MagneticButton>
            <MagneticButton strength={0.1}>
              <Link
                href="/"
                className="text-sm font-medium hover:text-muted-foreground transition-colors"
              >
                Home
              </Link>
            </MagneticButton>
          </div>
        </div>
      </footer>
    </main>
  );
}

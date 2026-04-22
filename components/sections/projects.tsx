"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { RevealText } from "../reveal-text";
import { MagneticButton } from "../magnetic-button";
import { getFeaturedProjects } from "@/lib/projects";

const featuredProjects = getFeaturedProjects();

export function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <section
      ref={ref}
      id="projects"
      className="snap-section relative py-16 md:py-24 lg:py-32 bg-secondary/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <RevealText delay={0.1}>
              <span className="text-sm text-muted-foreground tracking-widest uppercase mb-4 block">
                Featured Work
              </span>
            </RevealText>
            <RevealText delay={0.2}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-balance">
                Selected Projects
              </h2>
            </RevealText>
          </div>
          <RevealText delay={0.3}>
            <p className="max-w-md text-muted-foreground">
              A curated collection of projects that showcase my expertise in
              building scalable, user-centric digital solutions.
            </p>
          </RevealText>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {featuredProjects.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              className="group relative"
            >
              <Link href={`/projects/${project.slug}`}>
                <div
                  className={`relative overflow-hidden rounded-2xl ${project.color} p-6 sm:p-8 lg:p-10 min-h-[320px] sm:min-h-[380px] lg:min-h-[400px] flex flex-col justify-between transition-all duration-500 ${
                    hoveredProject && hoveredProject !== project.id
                      ? "opacity-50"
                      : ""
                  }`}
                >
                  {/* Project Content */}
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-sm text-muted-foreground">
                        {project.category}
                      </span>
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{
                          opacity: hoveredProject === project.id ? 1 : 0,
                          x: hoveredProject === project.id ? 0 : -10,
                        }}
                        className="flex items-center gap-1 text-sm"
                      >
                        View Case Study
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
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </motion.div>
                    </div>

                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-light tracking-tight mb-3 sm:mb-4 text-balance">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed max-w-md">
                      {project.description}
                    </p>
                  </div>

                  {/* Tags & Metrics */}
                  <div className="mt-8 space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1.5 bg-background/60 backdrop-blur-sm text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-foreground/10">
                      <div className="flex items-center gap-6">
                        <div>
                          <div className="text-lg font-medium">
                            {project.metrics.users}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Active Users
                          </div>
                        </div>
                        <div>
                          <div className="text-lg font-medium text-emerald-600">
                            {project.metrics.growth}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            YoY Growth
                          </div>
                        </div>
                      </div>

                      {/* Quick Links */}
                      <div className="flex items-center gap-2">
                        {project.repoUrl && (
                          <span
                            onClick={(e) => {
                              e.preventDefault();
                              window.open(project.repoUrl, "_blank");
                            }}
                            className="p-2 rounded-full bg-background/60 hover:bg-background transition-colors cursor-pointer"
                            title="View Repository"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                          </span>
                        )}
                        {project.liveUrl && (
                          <span
                            onClick={(e) => {
                              e.preventDefault();
                              window.open(project.liveUrl, "_blank");
                            }}
                            className="p-2 rounded-full bg-background/60 hover:bg-background transition-colors cursor-pointer"
                            title="View Live Site"
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
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <AnimatePresence>
                    {hoveredProject === project.id && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-foreground/5 pointer-events-none"
                      />
                    )}
                  </AnimatePresence>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex justify-center mt-12"
        >
          <MagneticButton strength={0.15}>
            <Link
              href="/projects"
              className="inline-flex items-center gap-3 px-8 py-4 border border-border text-foreground font-medium rounded-full hover:bg-secondary transition-all group"
            >
              View All Projects
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
  );
}

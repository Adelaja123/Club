"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { RevealText } from "../reveal-text";
import { MagneticButton } from "../magnetic-button";
import { getFeaturedProjects } from "@/lib/projects";

const featuredProjects = getFeaturedProjects();

export function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const handleImageError = (id: number) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section
      ref={ref}
      id="projects"
      className="snap-section relative py-20 md:py-28 lg:py-36 bg-secondary/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-12 mb-16 lg:mb-20">
          <div className="max-w-2xl">
            <RevealText delay={0.1}>
              <span className="inline-flex items-center gap-2 text-sm text-muted-foreground tracking-widest uppercase mb-4">
                <span className="w-8 h-px bg-foreground/30" />
                Featured Work
              </span>
            </RevealText>
            <RevealText delay={0.2}>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-balance">
                Projects that
                <br />
                <span className="text-muted-foreground">make an impact</span>
              </h2>
            </RevealText>
          </div>
          <RevealText delay={0.3}>
            <p className="max-w-md text-muted-foreground leading-relaxed lg:text-right">
              Each project represents a unique challenge solved with clean code,
              thoughtful design, and measurable results.
            </p>
          </RevealText>
        </div>

        {/* Featured Project - Large */}
        {featuredProjects[0] && (
          <motion.article
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            onMouseEnter={() => setHoveredProject(featuredProjects[0].id)}
            onMouseLeave={() => setHoveredProject(null)}
            className="group relative mb-8"
          >
            <Link href={`/projects/${featuredProjects[0].slug}`} className="block">
              <div className="relative overflow-hidden rounded-3xl bg-secondary/50">
                {/* Large Image Container */}
                <div className="relative aspect-[16/9] lg:aspect-[21/9] overflow-hidden">
                  {!imageErrors[featuredProjects[0].id] ? (
                    <Image
                      src={featuredProjects[0].image}
                      alt={featuredProjects[0].title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={() => handleImageError(featuredProjects[0].id)}
                      priority
                    />
                  ) : (
                    <div
                      className={`absolute inset-0 ${featuredProjects[0].color} flex items-center justify-center`}
                    >
                      <span className="text-[12rem] font-light text-foreground/10">
                        {featuredProjects[0].title.charAt(0)}
                      </span>
                    </div>
                  )}
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />

                  {/* Content overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 lg:p-12">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 bg-background/20 backdrop-blur-md text-background text-xs font-medium rounded-full">
                        {featuredProjects[0].category}
                      </span>
                      <span className="px-3 py-1 bg-emerald-500/90 text-white text-xs font-medium rounded-full">
                        {featuredProjects[0].metrics.growth} Growth
                      </span>
                    </div>

                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-background mb-3">
                      {featuredProjects[0].title}
                    </h3>

                    <p className="text-background/80 text-base sm:text-lg leading-relaxed max-w-2xl mb-6">
                      {featuredProjects[0].description}
                    </p>

                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex flex-wrap gap-2">
                        {featuredProjects[0].tags.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1.5 bg-background/10 backdrop-blur-sm text-background/90 text-xs rounded-full border border-background/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{
                          opacity: hoveredProject === featuredProjects[0].id ? 1 : 0.7,
                          x: hoveredProject === featuredProjects[0].id ? 0 : -10,
                        }}
                        className="flex items-center gap-2 text-background text-sm font-medium ml-auto"
                      >
                        View Case Study
                        <svg
                          className="w-5 h-5 transition-transform group-hover:translate-x-2"
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
                      </motion.span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.article>
        )}

        {/* Secondary Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {featuredProjects.slice(1).map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.15 }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              className="group relative"
            >
              <Link href={`/projects/${project.slug}`}>
                <div
                  className={`relative overflow-hidden rounded-2xl transition-all duration-500 ${
                    hoveredProject && hoveredProject !== project.id
                      ? "opacity-40 scale-[0.98]"
                      : ""
                  }`}
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {!imageErrors[project.id] ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={() => handleImageError(project.id)}
                      />
                    ) : (
                      <div
                        className={`absolute inset-0 ${project.color} flex items-center justify-center`}
                      >
                        <span className="text-8xl font-light text-foreground/10">
                          {project.title.charAt(0)}
                        </span>
                      </div>
                    )}
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Metrics badge */}
                    <div className="absolute top-4 right-4 flex items-center gap-2">
                      <span className="px-3 py-1.5 bg-background/90 backdrop-blur-sm text-xs font-medium rounded-full shadow-lg">
                        {project.metrics.users} Users
                      </span>
                    </div>

                    {/* Hover content */}
                    <AnimatePresence>
                      {hoveredProject === project.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          className="absolute bottom-4 left-4 right-4 flex items-center gap-2"
                        >
                          {project.repoUrl && (
                            <span
                              onClick={(e) => {
                                e.preventDefault();
                                window.open(project.repoUrl, "_blank");
                              }}
                              className="p-2.5 rounded-full bg-background/90 text-foreground hover:bg-background transition-colors cursor-pointer"
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
                              className="p-2.5 rounded-full bg-background/90 text-foreground hover:bg-background transition-colors cursor-pointer"
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
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Content */}
                  <div className={`p-6 lg:p-8 ${project.color}`}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                        {project.category}
                      </span>
                      <span className="text-xs text-emerald-600 font-semibold">
                        {project.metrics.growth}
                      </span>
                    </div>

                    <h3 className="text-xl lg:text-2xl font-light tracking-tight mb-2 group-hover:text-foreground/80 transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 bg-background/70 text-xs rounded-full font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* View link */}
                    <div className="flex items-center gap-2 text-sm font-medium pt-4 border-t border-foreground/10">
                      <span className="group-hover:underline underline-offset-4">
                        View Case Study
                      </span>
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
                    </div>
                  </div>
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
          className="flex justify-center mt-16"
        >
          <MagneticButton strength={0.15}>
            <Link
              href="/projects"
              className="group inline-flex items-center gap-4 px-10 py-5 bg-foreground text-background font-medium rounded-full hover:bg-foreground/90 transition-all shadow-lg hover:shadow-xl"
            >
              <span>Explore All Projects</span>
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-background/20 group-hover:bg-background/30 transition-colors">
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
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
              </span>
            </Link>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { projects, type Project } from "@/lib/projects";
import { MagneticButton } from "@/components/magnetic-button";

const categories = ["All", ...new Set(projects.map((p) => p.category))];

export function ProjectsPageContent() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const handleImageError = (id: number) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-28 sm:pt-32 lg:pt-40 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-12 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-secondary/50 to-transparent -z-10" />

        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <span className="inline-flex items-center gap-3 text-sm text-muted-foreground tracking-widest uppercase mb-6">
              <span className="w-12 h-px bg-foreground/30" />
              Portfolio
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight mb-8 text-balance">
              Crafting digital
              <br />
              <span className="text-muted-foreground">experiences that matter</span>
            </h1>

            <p className="max-w-2xl text-lg sm:text-xl text-muted-foreground leading-relaxed">
              A collection of projects where thoughtful design meets robust
              engineering. Each represents a unique challenge transformed into a
              solution that delivers real value.
            </p>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 mt-16 pt-10 border-t border-border"
          >
            <div className="group">
              <div className="text-4xl sm:text-5xl font-light tracking-tight group-hover:text-foreground/80 transition-colors">
                {projects.length}
              </div>
              <div className="text-sm text-muted-foreground mt-2 uppercase tracking-wider">
                Projects
              </div>
            </div>
            <div className="group">
              <div className="text-4xl sm:text-5xl font-light tracking-tight group-hover:text-foreground/80 transition-colors">
                200K+
              </div>
              <div className="text-sm text-muted-foreground mt-2 uppercase tracking-wider">
                Users Served
              </div>
            </div>
            <div className="group">
              <div className="text-4xl sm:text-5xl font-light tracking-tight text-emerald-600">
                +230%
              </div>
              <div className="text-sm text-muted-foreground mt-2 uppercase tracking-wider">
                Avg. Growth
              </div>
            </div>
            <div className="group">
              <div className="text-4xl sm:text-5xl font-light tracking-tight group-hover:text-foreground/80 transition-colors">
                99%
              </div>
              <div className="text-sm text-muted-foreground mt-2 uppercase tracking-wider">
                Client Satisfaction
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="px-4 sm:px-6 lg:px-12 pb-10 sticky top-16 z-20 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex items-center gap-2 sm:gap-3 overflow-x-auto py-4 scrollbar-hide"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 sm:px-5 py-2.5 text-sm font-medium rounded-full whitespace-nowrap transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-foreground text-background shadow-lg"
                    : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                {category}
                {activeCategory === category && (
                  <span className="ml-2 text-xs opacity-70">
                    ({filteredProjects.length})
                  </span>
                )}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section ref={ref} className="px-4 sm:px-6 lg:px-12 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid gap-8 lg:gap-10"
            >
              {filteredProjects.map((project, index) => (
                <ProjectRow
                  key={project.id}
                  project={project}
                  index={index}
                  isInView={isInView}
                  isHovered={hoveredProject === project.id}
                  hasOtherHovered={hoveredProject !== null && hoveredProject !== project.id}
                  onHover={() => setHoveredProject(project.id)}
                  onLeave={() => setHoveredProject(null)}
                  imageError={imageErrors[project.id]}
                  onImageError={() => handleImageError(project.id)}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-12 py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl bg-foreground text-background p-8 sm:p-12 lg:p-16"
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 left-0 w-96 h-96 bg-background rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-background rounded-full blur-3xl" />
            </div>

            <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight mb-4 text-balance">
                  Ready to start your project?
                </h2>
                <p className="text-background/70 max-w-lg text-lg">
                  {"Let's"} collaborate to create something extraordinary. I bring
                  technical expertise and creative problem-solving to every project.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <MagneticButton strength={0.15}>
                  <Link
                    href="/#contact"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-background text-foreground font-medium rounded-full hover:bg-background/90 transition-all group shadow-xl"
                  >
                    Start a Conversation
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

                <MagneticButton strength={0.1}>
                  <Link
                    href="/#contact"
                    className="inline-flex items-center gap-2 px-6 py-4 border border-background/30 text-background font-medium rounded-full hover:bg-background/10 transition-all"
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
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8m-16 8h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2z"
                      />
                    </svg>
                    Request Resume
                  </Link>
                </MagneticButton>
              </div>
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
              <Link
                href="/about"
                className="text-sm font-medium hover:text-muted-foreground transition-colors"
              >
                About
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

interface ProjectRowProps {
  project: Project;
  index: number;
  isInView: boolean;
  isHovered: boolean;
  hasOtherHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  imageError: boolean;
  onImageError: () => void;
}

function ProjectRow({
  project,
  index,
  isInView,
  isHovered,
  hasOtherHovered,
  onHover,
  onLeave,
  imageError,
  onImageError,
}: ProjectRowProps) {
  const isEven = index % 2 === 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={`group transition-all duration-500 ${
        hasOtherHovered ? "opacity-40 scale-[0.98]" : ""
      }`}
    >
      <Link href={`/projects/${project.slug}`} className="block">
        <div
          className={`grid lg:grid-cols-2 gap-6 lg:gap-10 items-center ${
            isEven ? "" : "lg:flex-row-reverse"
          }`}
        >
          {/* Image */}
          <div className={`relative ${isEven ? "lg:order-1" : "lg:order-2"}`}>
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl lg:rounded-3xl">
              {!imageError ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={onImageError}
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

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-500" />

              {/* Quick action buttons */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-4 right-4 flex items-center gap-2"
                  >
                    {project.repoUrl && (
                      <span
                        onClick={(e) => {
                          e.preventDefault();
                          window.open(project.repoUrl, "_blank");
                        }}
                        className="p-3 rounded-full bg-background/95 text-foreground hover:bg-background transition-colors cursor-pointer shadow-lg"
                        title="View Repository"
                      >
                        <svg
                          className="w-5 h-5"
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
                        className="p-3 rounded-full bg-background/95 text-foreground hover:bg-background transition-colors cursor-pointer shadow-lg"
                        title="View Live Site"
                      >
                        <svg
                          className="w-5 h-5"
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
          </div>

          {/* Content */}
          <div className={`${isEven ? "lg:order-2" : "lg:order-1"} py-4`}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                {project.category}
              </span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground" />
              <span className="text-xs text-muted-foreground">{project.year}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight mb-4 group-hover:text-foreground/80 transition-colors">
              {project.title}
            </h2>

            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-6 max-w-lg">
              {project.description}
            </p>

            {/* Metrics */}
            <div className="flex items-center gap-6 mb-6">
              <div>
                <div className="text-2xl font-light">{project.metrics.users}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">
                  Users
                </div>
              </div>
              <div className="w-px h-10 bg-border" />
              <div>
                <div className="text-2xl font-light text-emerald-600">
                  {project.metrics.growth}
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">
                  Growth
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 bg-secondary text-xs rounded-full font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="inline-flex items-center gap-3 text-sm font-medium group-hover:gap-4 transition-all">
              <span className="group-hover:underline underline-offset-4">
                View Case Study
              </span>
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-foreground text-background group-hover:bg-foreground/80 transition-colors">
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
            </div>
          </div>
        </div>
      </Link>

      {/* Separator */}
      {index < projects.length - 1 && (
        <div className="border-b border-border mt-8 lg:mt-10" />
      )}
    </motion.article>
  );
}

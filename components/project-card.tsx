"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/lib/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      <Link href={`/projects/${project.slug}`} className="block">
        <div
          className={`relative overflow-hidden rounded-2xl ${project.color} transition-all duration-500`}
        >
          {/* Project Image */}
          <div className="relative aspect-[4/3] overflow-hidden">
            {!imageError ? (
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl font-light text-foreground/20">
                  {project.title.charAt(0)}
                </span>
              </div>
            )}
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Quick links on hover */}
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
                      className="p-2.5 rounded-full bg-white/90 text-foreground hover:bg-white transition-colors cursor-pointer"
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
                      className="p-2.5 rounded-full bg-white/90 text-foreground hover:bg-white transition-colors cursor-pointer"
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

          {/* Project Content */}
          <div className="p-6 lg:p-8">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">
                {project.category}
              </span>
              <span className="text-sm text-muted-foreground">
                {project.year}
              </span>
            </div>

            <h3 className="text-xl lg:text-2xl font-light tracking-tight mb-3 text-balance group-hover:text-foreground/80 transition-colors">
              {project.title}
            </h3>

            <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 bg-background/60 backdrop-blur-sm text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* View Case Study link */}
            <div className="flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all">
              <span>View Case Study</span>
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
  );
}

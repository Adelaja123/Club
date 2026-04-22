"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { projects } from "@/lib/projects";
import { ProjectCard } from "@/components/project-card";
import { MagneticButton } from "@/components/magnetic-button";

export function ProjectsPageContent() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm text-muted-foreground tracking-widest uppercase mb-4 block">
              Portfolio
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight mb-6 text-balance">
              Selected Projects
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground leading-relaxed">
              A collection of projects showcasing my expertise in building
              scalable, user-centric digital solutions. Each project represents
              a unique challenge and a thoughtful approach to solving real-world
              problems.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-8 md:gap-16 mt-12 pt-8 border-t border-border"
          >
            <div>
              <div className="text-3xl md:text-4xl font-light">{projects.length}</div>
              <div className="text-sm text-muted-foreground mt-1">Projects</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-light">200K+</div>
              <div className="text-sm text-muted-foreground mt-1">Users Served</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-light text-emerald-600">+230%</div>
              <div className="text-sm text-muted-foreground mt-1">Avg. Growth</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section ref={ref} className="px-6 lg:px-12 pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 lg:px-12 pb-32">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="bg-secondary/50 rounded-3xl p-8 md:p-12 lg:p-16 text-center"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-tight mb-4 text-balance">
              Have a project in mind?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              {"I'm"} always interested in hearing about new projects and opportunities.
              {"Let's"} discuss how we can work together.
            </p>
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
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 lg:px-12 py-8 border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Oluwagbotemi Adelaja. All rights reserved.
          </p>
          <MagneticButton strength={0.1}>
            <Link
              href="/"
              className="text-sm font-medium hover:text-muted-foreground transition-colors"
            >
              Back to Home
            </Link>
          </MagneticButton>
        </div>
      </footer>
    </main>
  );
}

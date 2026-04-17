"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { RevealText } from "../reveal-text"
import { MagneticButton } from "../magnetic-button"

const projects = [
  {
    id: 1,
    title: "FinanceFlow",
    category: "Web Application",
    description: "A comprehensive financial management platform with real-time analytics, automated reporting, and AI-powered insights for modern businesses.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Stripe"],
    color: "bg-amber-50",
    metrics: { users: "50K+", growth: "+180%" },
  },
  {
    id: 2,
    title: "EcoTrack",
    category: "Mobile & Web",
    description: "Sustainability tracking application helping organizations monitor and reduce their carbon footprint through intelligent data visualization.",
    tags: ["React Native", "Node.js", "GraphQL", "AWS"],
    color: "bg-emerald-50",
    metrics: { users: "25K+", growth: "+240%" },
  },
  {
    id: 3,
    title: "MedConnect",
    category: "Healthcare Platform",
    description: "Secure telemedicine platform connecting patients with healthcare providers, featuring end-to-end encryption and HIPAA compliance.",
    tags: ["Next.js", "WebRTC", "Redis", "Docker"],
    color: "bg-sky-50",
    metrics: { users: "100K+", growth: "+320%" },
  },
  {
    id: 4,
    title: "CreativeHub",
    category: "SaaS Platform",
    description: "Collaborative design tool for creative teams with real-time editing, version control, and seamless integration with popular design software.",
    tags: ["React", "Socket.io", "MongoDB", "Figma API"],
    color: "bg-rose-50",
    metrics: { users: "35K+", growth: "+150%" },
  },
]

export function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  return (
    <section
      ref={ref}
      id="projects"
      className="snap-section relative py-32 bg-secondary/30"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <RevealText delay={0.1}>
              <span className="text-sm text-muted-foreground tracking-widest uppercase mb-4 block">
                Featured Work
              </span>
            </RevealText>
            <RevealText delay={0.2}>
              <h2 className="text-4xl md:text-5xl font-light tracking-tight text-balance">
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
          {projects.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              className="group relative"
            >
              <div className={`relative overflow-hidden rounded-2xl ${project.color} p-8 lg:p-10 min-h-[400px] flex flex-col justify-between transition-all duration-500 ${
                hoveredProject && hoveredProject !== project.id ? "opacity-50" : ""
              }`}>
                {/* Project Content */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-sm text-muted-foreground">{project.category}</span>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: hoveredProject === project.id ? 1 : 0, x: hoveredProject === project.id ? 0 : -10 }}
                      className="flex items-center gap-1 text-sm"
                    >
                      View Case Study
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </motion.div>
                  </div>

                  <h3 className="text-2xl lg:text-3xl font-light tracking-tight mb-4 text-balance">
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
                  
                  <div className="flex items-center gap-6 pt-4 border-t border-foreground/10">
                    <div>
                      <div className="text-lg font-medium">{project.metrics.users}</div>
                      <div className="text-xs text-muted-foreground">Active Users</div>
                    </div>
                    <div>
                      <div className="text-lg font-medium text-emerald-600">{project.metrics.growth}</div>
                      <div className="text-xs text-muted-foreground">YoY Growth</div>
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
            <button className="inline-flex items-center gap-3 px-8 py-4 border border-border text-foreground font-medium rounded-full hover:bg-secondary transition-all group">
              View All Projects
              <svg 
                className="w-4 h-4 transition-transform group-hover:translate-x-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  )
}

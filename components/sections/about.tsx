"use client"

import Image from "next/image"
import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { RevealText } from "../reveal-text"

const skills = [
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Framer Motion", "HTML/CSS"] },
  { category: "Backend", items: ["Node.js", "Python", "PostgreSQL", "Redis", "GraphQL"] },
  { category: "Tools", items: ["Git", "Docker", "AWS", "Vercel", "Figma"] },
]

const stats = [
  { value: "5+", label: "Years Experience" },
  { value: "50+", label: "Projects Completed" },
  { value: "30+", label: "Happy Clients" },
  { value: "99%", label: "Client Satisfaction" },
]

export function AboutSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      ref={ref}
      id="about"
      className="snap-section relative py-32 flex items-center"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Column - Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
            className="relative"
          >
            <div className="relative aspect-[4/5] bg-secondary rounded-2xl overflow-hidden">
              <Image
                src="/images/about-photo.jpg"
                alt="Profile photo"
                fill
                className="object-cover object-top"
                priority
              />

              {/* Decorative code snippet overlay */}
              {/* <div className="absolute bottom-6 left-6 right-6 bg-background/95 backdrop-blur-sm rounded-xl p-4 font-mono text-xs text-muted-foreground border border-border">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-3 h-3 rounded-full bg-red-400/60" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400/60" />
                  <span className="w-3 h-3 rounded-full bg-green-400/60" />
                </div>
                <code>
                  <span className="text-emerald-600">const</span>{" "}
                  <span className="text-foreground">developer</span> = {"{"}
                  <br />
                  {"  "}<span className="text-muted-foreground">name:</span>{" "}
                  <span className="text-amber-600">&quot;Gbotemi&quot;</span>,
                  <br />
                  {"  "}<span className="text-muted-foreground">passion:</span>{" "}
                  <span className="text-amber-600">&quot;Crafting&quot;</span>,
                  <br />
                  {"  "}<span className="text-muted-foreground">status:</span>{" "}
                  <span className="text-emerald-600">true</span>
                  <br />
                  {"}"};
                </code>
              </div> */}
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -top-4 -right-4 bg-foreground text-background px-4 py-2 rounded-full text-sm font-medium shadow-lg"
            >
              Open to Work
            </motion.div>
          </motion.div>

          {/* Right Column - Content */}
          <div className="space-y-8">
            <div>
              <RevealText delay={0.1}>
                <span className="text-sm text-muted-foreground tracking-widest uppercase mb-4 block">
                  About Me
                </span>
              </RevealText>
              <RevealText delay={0.2}>
                <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6 text-balance">
                  Building the future,<br />
                  <span className="text-muted-foreground">one line at a time</span>
                </h2>
              </RevealText>
              <RevealText delay={0.3}>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  I&apos;m a full-stack developer with over 5 years of experience creating
                  digital solutions that combine technical excellence with thoughtful design.
                  My approach focuses on writing clean, maintainable code while delivering
                  exceptional user experiences.
                </p>
              </RevealText>
              <RevealText delay={0.4}>
                <p className="text-muted-foreground leading-relaxed text-lg mt-4">
                  When I&apos;m not coding, you&apos;ll find me exploring new technologies,
                  contributing to open-source projects, or sharing knowledge through
                  technical writing and mentorship.
                </p>
              </RevealText>
            </div>

            {/* Skills */}
            <div className="space-y-6">
              <RevealText delay={0.5}>
                <h3 className="text-lg font-medium">Technical Expertise</h3>
              </RevealText>
              <div className="space-y-4">
                {skills.map((skill, i) => (
                  <motion.div
                    key={skill.category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                    className="flex flex-wrap items-center gap-3"
                  >
                    <span className="text-sm text-muted-foreground w-20">{skill.category}</span>
                    <div className="flex flex-wrap gap-2">
                      {skill.items.map((item) => (
                        <span
                          key={item}
                          className="px-3 py-1.5 bg-secondary text-sm rounded-full"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-border"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 1 + i * 0.1 }}
                >
                  <div className="text-3xl font-light tracking-tight">{stat.value}</div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

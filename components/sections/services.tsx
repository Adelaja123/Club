"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { RevealText } from "../reveal-text"

const services = [
  {
    number: "01",
    title: "Web Development",
    description: "Full-stack web applications built with modern frameworks like Next.js, React, and Node.js. Focus on performance, accessibility, and scalable architecture.",
    features: ["Custom Web Apps", "E-commerce Solutions", "API Development", "Performance Optimization"],
  },
  {
    number: "02",
    title: "UI/UX Design",
    description: "User-centered design approach that combines aesthetics with functionality. Creating intuitive interfaces that delight users and drive engagement.",
    features: ["Interface Design", "User Research", "Prototyping", "Design Systems"],
  },
  {
    number: "03",
    title: "Technical Consulting",
    description: "Strategic technology guidance to help businesses make informed decisions about their digital infrastructure and development practices.",
    features: ["Architecture Review", "Tech Stack Selection", "Code Audits", "Team Training"],
  },
  {
    number: "04",
    title: "Mobile Development",
    description: "Cross-platform mobile applications using React Native and modern development practices. Native performance with shared codebase efficiency.",
    features: ["iOS & Android Apps", "Cross-Platform", "App Store Deployment", "Push Notifications"],
  },
]

export function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      ref={ref}
      id="services"
      className="snap-section relative py-32"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <RevealText delay={0.1}>
            <span className="text-sm text-muted-foreground tracking-widest uppercase mb-4 block">
              What I Do
            </span>
          </RevealText>
          <RevealText delay={0.2}>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6 text-balance">
              Services & Expertise
            </h2>
          </RevealText>
          <RevealText delay={0.3}>
            <p className="text-muted-foreground text-lg leading-relaxed">
              I offer comprehensive digital solutions tailored to your specific needs, 
              from concept to deployment and beyond.
            </p>
          </RevealText>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-px bg-border rounded-2xl overflow-hidden">
          {services.map((service, i) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              className="bg-background p-8 lg:p-10 group hover:bg-secondary/50 transition-colors duration-500"
            >
              <div className="flex items-start justify-between mb-6">
                <span className="text-5xl font-light text-muted-foreground/30">{service.number}</span>
                <motion.svg
                  className="w-6 h-6 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M17 7H7M17 7V17" />
                </motion.svg>
              </div>

              <h3 className="text-2xl font-light tracking-tight mb-4">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">{service.description}</p>

              <ul className="flex flex-wrap gap-2">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="text-sm text-muted-foreground"
                  >
                    <span className="inline-flex items-center gap-2">
                      <span className="w-1 h-1 bg-foreground rounded-full" />
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 p-8 lg:p-12 bg-foreground text-background rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <h3 className="text-2xl font-light tracking-tight mb-2">Have a project in mind?</h3>
            <p className="text-background/70">Let&apos;s discuss how I can help bring your ideas to life.</p>
          </div>
          <a
            href="#contact"
            onClick={(e) => { 
              e.preventDefault(); 
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }) 
            }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-background text-foreground font-medium rounded-full hover:bg-background/90 transition-all shrink-0 group"
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
          </a>
        </motion.div>
      </div>
    </section>
  )
}

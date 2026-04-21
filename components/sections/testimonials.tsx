"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { RevealText } from "../reveal-text"

// Premium easing curve
const premiumEase = [0.22, 1, 0.36, 1] as const;

const testimonials = [
  {
    id: 1,
    content: "Gbotemi's technical expertise and attention to detail transformed our vision into a reality. The web application he built exceeded our expectations in every way.",
    author: "Sarah Chen",
    role: "CEO, TechVentures",
    company: "TechVentures Inc.",
  },
  {
    id: 2,
    content: "Working with Gbotemi was a game-changer for our startup. His ability to understand complex requirements and deliver elegant solutions is remarkable.",
    author: "Michael Roberts",
    role: "Founder, InnovateLab",
    company: "InnovateLab",
  },
  {
    id: 3,
    content: "The level of professionalism and technical skill Gbotemi brings is exceptional. Our platform's performance improved by 300% after his optimization work.",
    author: "Elena Martinez",
    role: "CTO, DataFlow",
    company: "DataFlow Systems",
  },
  {
    id: 4,
    content: "Gbotemi doesn't just write code – he architects solutions. His strategic thinking and execution helped us launch 3 months ahead of schedule.",
    author: "David Kim",
    role: "Product Director",
    company: "Scale Finance",
  },
]

export function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section
      ref={ref}
      id="testimonials"
      className="snap-section relative py-32"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <RevealText delay={0.1}>
            <span className="text-sm text-muted-foreground tracking-widest uppercase mb-4 block">
              Client Testimonials
            </span>
          </RevealText>
          <RevealText delay={0.2}>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-balance">
              What People Say
            </h2>
          </RevealText>
        </div>

        {/* Testimonial Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: premiumEase }}
          className="relative max-w-4xl mx-auto"
          style={{ willChange: "transform, opacity" }}
        >
          {/* Quote Icon */}
          <div className="absolute -top-8 left-0 text-8xl text-muted-foreground/10 font-serif leading-none select-none">
            &ldquo;
          </div>

          {/* Testimonial Content */}
          <div className="relative min-h-[280px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.6, ease: premiumEase }}
                className="text-center"
              >
                <p className="text-2xl md:text-3xl font-light leading-relaxed mb-8 text-balance">
                  {testimonials[current].content}
                </p>
                <div>
                  <div className="text-lg font-medium">{testimonials[current].author}</div>
                  <div className="text-muted-foreground">{testimonials[current].role}</div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === current ? "bg-foreground w-8" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </motion.div>

        {/* Logos/Brands */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4, ease: premiumEase }}
          className="mt-20 pt-16 border-t border-border"
          style={{ willChange: "transform, opacity" }}
        >
          <p className="text-center text-sm text-muted-foreground mb-8">
            Trusted by innovative companies worldwide
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
            {["TechVentures", "InnovateLab", "DataFlow", "Scale Finance", "CloudNext"].map((company) => (
              <div
                key={company}
                className="text-xl font-light text-muted-foreground/40 hover:text-muted-foreground transition-colors"
              >
                {company}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

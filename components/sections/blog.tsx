"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { RevealText } from "../reveal-text"
import { MagneticButton } from "../magnetic-button"

const posts = [
  {
    id: 1,
    title: "Building Performant Web Applications with Next.js 14",
    excerpt: "Exploring the latest features in Next.js 14 and how to leverage them for optimal performance in production applications.",
    category: "Development",
    readTime: "8 min read",
    date: "Mar 15, 2024",
  },
  {
    id: 2,
    title: "The Art of Writing Clean, Maintainable Code",
    excerpt: "Best practices and principles for writing code that your future self (and teammates) will thank you for.",
    category: "Best Practices",
    readTime: "6 min read",
    date: "Mar 08, 2024",
  },
  {
    id: 3,
    title: "Designing for Accessibility: A Practical Guide",
    excerpt: "How to create inclusive digital experiences that work for everyone, regardless of their abilities.",
    category: "Design",
    readTime: "10 min read",
    date: "Feb 28, 2024",
  },
]

export function BlogSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      ref={ref}
      id="blog"
      className="snap-section relative py-32 bg-secondary/30"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <RevealText delay={0.1}>
              <span className="text-sm text-muted-foreground tracking-widest uppercase mb-4 block">
                Latest Insights
              </span>
            </RevealText>
            <RevealText delay={0.2}>
              <h2 className="text-4xl md:text-5xl font-light tracking-tight text-balance">
                From the Blog
              </h2>
            </RevealText>
          </div>
          <RevealText delay={0.3}>
            <MagneticButton strength={0.15}>
              <button className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group">
                View All Articles
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
          </RevealText>
        </div>

        {/* Blog Posts */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {posts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="bg-background rounded-2xl p-6 lg:p-8 h-full flex flex-col hover:shadow-lg hover:shadow-foreground/5 transition-all duration-500">
                {/* Meta */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-secondary text-xs rounded-full">{post.category}</span>
                  <span className="text-xs text-muted-foreground">{post.readTime}</span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-light tracking-tight mb-3 group-hover:text-muted-foreground transition-colors text-balance">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                  {post.excerpt}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between mt-6 pt-6 border-t border-border">
                  <span className="text-sm text-muted-foreground">{post.date}</span>
                  <motion.span
                    className="inline-flex items-center gap-1 text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Read More
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </motion.span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Newsletter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground mb-6">
            Subscribe to my newsletter for weekly insights on development, design, and tech.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-5 py-3 bg-background border border-border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-foreground/10 transition-all"
            />
            <MagneticButton strength={0.15}>
              <button
                type="submit"
                className="px-6 py-3 bg-foreground text-background text-sm font-medium rounded-full hover:bg-foreground/90 transition-colors"
              >
                Subscribe
              </button>
            </MagneticButton>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface RevealTextProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  direction?: "up" | "down" | "left" | "right"
}

export function RevealText({ 
  children, 
  className = "", 
  delay = 0, 
  duration = 0.8,
  direction = "up" 
}: RevealTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const directionOffset = {
    up: { y: 60, x: 0 },
    down: { y: -60, x: 0 },
    left: { x: 60, y: 0 },
    right: { x: -60, y: 0 },
  }

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ 
          opacity: 0, 
          ...directionOffset[direction] 
        }}
        animate={isInView ? { 
          opacity: 1, 
          y: 0, 
          x: 0 
        } : {}}
        transition={{ 
          duration, 
          delay, 
          ease: [0.25, 0.4, 0.25, 1] 
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

interface StaggerTextProps {
  text: string
  className?: string
  delay?: number
  staggerDelay?: number
}

export function StaggerText({ 
  text, 
  className = "", 
  delay = 0,
  staggerDelay = 0.03 
}: StaggerTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const words = text.split(" ")

  return (
    <div ref={ref} className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: "100%" }}
            animate={isInView ? { y: 0 } : {}}
            transition={{
              duration: 0.6,
              delay: delay + i * staggerDelay,
              ease: [0.25, 0.4, 0.25, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  )
}

interface CharacterRevealProps {
  text: string
  className?: string
  delay?: number
}

export function CharacterReveal({ text, className = "", delay = 0 }: CharacterRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <div ref={ref} className={className}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.4,
            delay: delay + i * 0.02,
            ease: [0.25, 0.4, 0.25, 1],
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  )
}

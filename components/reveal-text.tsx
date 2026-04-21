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

// Premium easing curve - Dennis Snellenberg style
const premiumEase = [0.22, 1, 0.36, 1]

export function RevealText({ 
  children, 
  className = "", 
  delay = 0, 
  duration = 0.9,
  direction = "up" 
}: RevealTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  const directionOffset = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
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
          ease: premiumEase
        }}
        style={{ willChange: "transform, opacity" }}
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
  staggerDelay = 0.035 
}: StaggerTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const words = text.split(" ")

  return (
    <div ref={ref} className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: "100%", opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{
              duration: 0.7,
              delay: delay + i * staggerDelay,
              ease: premiumEase,
            }}
            style={{ willChange: "transform, opacity" }}
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
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <div ref={ref} className={className}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.018,
            ease: premiumEase,
          }}
          style={{ willChange: "transform, opacity" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  )
}

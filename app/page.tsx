"use client"

import { HeroSection } from "@/components/sections/hero"
import { AboutSection } from "@/components/sections/about"
import { ProjectsSection } from "@/components/sections/projects"
import { ServicesSection } from "@/components/sections/services"
// import { BlogSection } from "@/components/sections/blog"
import { TestimonialsSection } from "@/components/sections/testimonials"
import { ContactSection } from "@/components/sections/contact"

export default function Home() {
  return (
    <main className="snap-container">
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ServicesSection />
      {/* <BlogSection /> */}
      <TestimonialsSection />
      <ContactSection />
    </main>
  )
}

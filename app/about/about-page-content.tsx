"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { RevealText } from "@/components/reveal-text";
import { MagneticButton } from "@/components/magnetic-button";
import { CONTACT_LINKS } from "@/lib/constants";

const skills = [
  {
    category: "Frontend",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    items: ["React", "Next.js", "TypeScript", "Framer Motion", "Tailwind CSS"],
  },
  {
    category: "Backend",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
      </svg>
    ),
    items: ["Node.js", "Python", "PostgreSQL", "Redis", "GraphQL"],
  },
  {
    category: "Tools & DevOps",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
      </svg>
    ),
    items: ["Git", "Docker", "AWS", "Vercel", "Figma"],
  },
];

const stats = [
  { value: "5+", label: "Years Experience", suffix: "" },
  { value: "50+", label: "Projects Delivered", suffix: "" },
  { value: "30+", label: "Happy Clients", suffix: "" },
  { value: "99", label: "Client Satisfaction", suffix: "%" },
];

const experience = [
  {
    period: "2022 - Present",
    role: "Senior Full-Stack Developer",
    company: "Freelance / Contract",
    type: "Full-time",
    description:
      "Building scalable web applications for startups and enterprises. Leading technical decisions and mentoring junior developers.",
    highlights: ["Technical Leadership", "Architecture Design", "Team Mentoring"],
  },
  {
    period: "2020 - 2022",
    role: "Full-Stack Developer",
    company: "Tech Startup",
    type: "Full-time",
    description:
      "Developed core product features, implemented CI/CD pipelines, and improved application performance by 40%.",
    highlights: ["Performance Optimization", "CI/CD Implementation", "Feature Development"],
  },
  {
    period: "2019 - 2020",
    role: "Frontend Developer",
    company: "Digital Agency",
    type: "Full-time",
    description:
      "Created responsive web interfaces for clients across various industries. Specialized in React and modern CSS.",
    highlights: ["React Development", "Responsive Design", "Client Projects"],
  },
];

const values = [
  {
    title: "Clean Code",
    description:
      "Writing maintainable, well-documented code that stands the test of time.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  },
  {
    title: "User-Centric",
    description:
      "Every decision starts with understanding the end user experience.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
  {
    title: "Continuous Learning",
    description:
      "Staying current with evolving technologies and best practices.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
  },
  {
    title: "Collaboration",
    description:
      "Building great products through open communication and teamwork.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
];

const socialLinks = [
  {
    label: "GitHub",
    href: CONTACT_LINKS.github,
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: CONTACT_LINKS.linkedin,
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Twitter",
    href: CONTACT_LINKS.twitter,
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: CONTACT_LINKS.instagram,
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
      </svg>
    ),
  },
];

export function AboutPageContent() {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const isContentInView = useInView(contentRef, { once: true, margin: "-100px" });
  const isSkillsInView = useInView(skillsRef, { once: true, margin: "-100px" });
  const isExperienceInView = useInView(experienceRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative flex min-h-[90vh] items-center justify-center overflow-hidden"
      >
        {/* Sophisticated background */}
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-background to-background" />
        
        {/* Elegant dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />

        {/* Floating shapes for visual interest */}
        <motion.div
          animate={{ y: [-20, 20, -20], rotate: [0, 5, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-[10%] w-64 h-64 rounded-full bg-gradient-to-br from-foreground/[0.02] to-transparent blur-3xl"
        />
        <motion.div
          animate={{ y: [20, -20, 20], rotate: [0, -5, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-[10%] w-96 h-96 rounded-full bg-gradient-to-tl from-foreground/[0.02] to-transparent blur-3xl"
        />

        <motion.div
          style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
          className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-32 pb-16"
        >
          {/* Breadcrumb navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center justify-center gap-2 mb-12"
          >
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </Link>
            <span className="text-muted-foreground/50">/</span>
            <span className="text-sm text-foreground">About</span>
          </motion.div>

          {/* Main hero content */}
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-border bg-secondary/50"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-sm font-medium">Available for new projects</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tight mb-8 text-balance"
            >
              <span className="block text-muted-foreground/60 text-lg sm:text-xl md:text-2xl font-normal tracking-wide mb-4">
                Full-Stack Developer
              </span>
              <span className="text-foreground">Oluwagbotemi</span>
              <br />
              <span className="text-muted-foreground">Adelaja</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed mb-12"
            >
              Crafting exceptional digital experiences through elegant code and
              thoughtful design. Specializing in modern web technologies that
              bring ideas to life.
            </motion.p>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center justify-center gap-3"
            >
              {socialLinks.map((social, i) => (
                <MagneticButton key={social.label} strength={0.2}>
                  <motion.a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.7 + i * 0.1 }}
                    className="flex items-center justify-center w-12 h-12 rounded-full border border-border bg-background hover:bg-secondary hover:border-foreground/20 transition-all text-muted-foreground hover:text-foreground"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </motion.a>
                </MagneticButton>
              ))}
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-xs text-muted-foreground tracking-widest uppercase">Scroll</span>
              <div className="w-5 h-8 border border-border rounded-full flex items-start justify-center p-1">
                <motion.div
                  animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-1 h-1 bg-foreground rounded-full"
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Main Content */}
      <section ref={contentRef} className="py-20 md:py-28 lg:py-36">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-12">
          {/* About Grid */}
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 mb-28 lg:mb-36">
            {/* Image Column */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isContentInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
              className="lg:col-span-5 relative"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-secondary sticky top-28">
                <Image
                  src="/images/about-photo.jpg"
                  alt="Oluwagbotemi Adelaja - Full Stack Developer"
                  fill
                  className="object-cover object-top"
                  priority
                />
                {/* Elegant overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-foreground/5 to-transparent" />
                
                {/* Floating info card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isContentInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-background/90 backdrop-blur-md border border-border/50 shadow-xl"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Based in</p>
                      <p className="font-medium">Lagos, Nigeria</p>
                    </div>
                    <div className="w-px h-10 bg-border" />
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Local time</p>
                      <p className="font-medium tabular-nums">
                        {new Date().toLocaleTimeString("en-NG", {
                          hour: "2-digit",
                          minute: "2-digit",
                          timeZone: "Africa/Lagos",
                        })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Content Column */}
            <div className="lg:col-span-7 space-y-12 lg:pl-4">
              {/* Section header */}
              <div className="space-y-6">
                <RevealText delay={0.1}>
                  <div className="flex items-center gap-3">
                    <div className="h-px w-12 bg-foreground" />
                    <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                      About Me
                    </span>
                  </div>
                </RevealText>

                <RevealText delay={0.2}>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight leading-tight">
                    Building digital products that
                    <span className="block text-muted-foreground">
                      people love to use
                    </span>
                  </h2>
                </RevealText>
              </div>

              {/* Bio paragraphs with better typography */}
              <div className="space-y-5">
                <RevealText delay={0.3}>
                  <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
                    I&apos;m a full-stack developer with over 5 years of
                    experience creating digital solutions that combine technical
                    excellence with thoughtful design. My journey began with a
                    curiosity about how things work on the web, and has evolved
                    into a passion for building products that make a real
                    difference.
                  </p>
                </RevealText>

                <RevealText delay={0.4}>
                  <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
                    My approach focuses on writing clean, maintainable code
                    while delivering exceptional user experiences. I believe
                    that great software is born at the intersection of technical
                    excellence and human empathy.
                  </p>
                </RevealText>

                <RevealText delay={0.5}>
                  <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
                    When I&apos;m not coding, you&apos;ll find me exploring new
                    technologies, contributing to open-source projects, or
                    sharing knowledge through technical writing and mentorship.
                  </p>
                </RevealText>
              </div>

              {/* Stats - Redesigned as a horizontal row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isContentInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-border"
              >
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isContentInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
                    className="group text-center md:text-left"
                  >
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-foreground tabular-nums">
                      {stat.value}
                      <span className="text-muted-foreground">{stat.suffix}</span>
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Values - Better card design */}
              <div className="space-y-6">
                <RevealText delay={0.8}>
                  <h3 className="text-xl sm:text-2xl font-medium">Core Values</h3>
                </RevealText>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {values.map((value, i) => (
                    <motion.div
                      key={value.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isContentInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.9 + i * 0.1 }}
                      className="group p-5 rounded-2xl border border-border bg-secondary/30 hover:bg-secondary/50 hover:border-foreground/10 transition-all duration-300"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center text-foreground/70 group-hover:bg-foreground/10 group-hover:text-foreground transition-colors">
                          {value.icon}
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">{value.title}</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {value.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div ref={skillsRef} className="mb-28 lg:mb-36">
            <div className="text-center mb-16 lg:mb-20">
              <RevealText delay={0.1}>
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="h-px w-12 bg-foreground" />
                  <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                    Technical Stack
                  </span>
                  <div className="h-px w-12 bg-foreground" />
                </div>
              </RevealText>
              <RevealText delay={0.2}>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight">
                  Skills & Technologies
                </h2>
              </RevealText>
              <RevealText delay={0.3}>
                <p className="mt-4 max-w-xl mx-auto text-muted-foreground">
                  The tools and technologies I use to bring ideas to life
                </p>
              </RevealText>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {skills.map((skill, i) => (
                <motion.div
                  key={skill.category}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isSkillsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                  className="group relative p-6 sm:p-8 rounded-3xl border border-border bg-gradient-to-b from-secondary/50 to-secondary/20 hover:from-secondary/70 hover:to-secondary/40 transition-all duration-500"
                >
                  {/* Category header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center text-foreground/70 group-hover:bg-foreground/10 group-hover:text-foreground transition-colors">
                      {skill.icon}
                    </div>
                    <h3 className="font-medium text-lg">{skill.category}</h3>
                  </div>
                  
                  {/* Skills list */}
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item, itemIndex) => (
                      <motion.span
                        key={item}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isSkillsInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.4, delay: 0.4 + i * 0.15 + itemIndex * 0.05 }}
                        className="inline-flex items-center rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground/90 hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-300 cursor-default"
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Experience Section */}
          <div ref={experienceRef} className="mb-28 lg:mb-36">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
              {/* Section header - sticky on desktop */}
              <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-28">
                  <RevealText delay={0.1}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-px w-12 bg-foreground" />
                      <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                        Career
                      </span>
                    </div>
                  </RevealText>
                  <RevealText delay={0.2}>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight">
                      Work
                      <span className="block text-muted-foreground">Experience</span>
                    </h2>
                  </RevealText>
                  <RevealText delay={0.3}>
                    <p className="mt-4 text-muted-foreground max-w-sm">
                      A timeline of my professional journey building digital products
                    </p>
                  </RevealText>
                </div>
              </div>

              {/* Timeline */}
              <div className="lg:col-span-8">
                <div className="space-y-6">
                  {experience.map((exp, i) => (
                    <motion.div
                      key={exp.period}
                      initial={{ opacity: 0, y: 30 }}
                      animate={isExperienceInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                      className="group relative"
                    >
                      {/* Connection line */}
                      {i < experience.length - 1 && (
                        <div className="absolute left-5 top-14 bottom-0 w-px bg-gradient-to-b from-border to-transparent" />
                      )}
                      
                      <div className="relative p-6 sm:p-8 rounded-3xl border border-border bg-secondary/20 hover:bg-secondary/40 hover:border-foreground/10 transition-all duration-300">
                        {/* Timeline dot */}
                        <div className="absolute -left-px top-8 w-3 h-3 rounded-full bg-foreground ring-4 ring-background hidden lg:block" />
                        
                        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                          <div>
                            <h3 className="text-xl sm:text-2xl font-medium mb-1">
                              {exp.role}
                            </h3>
                            <p className="text-muted-foreground">{exp.company}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-muted-foreground bg-secondary/50 px-3 py-1 rounded-full">
                              {exp.type}
                            </span>
                            <span className="text-sm font-medium text-foreground/70 bg-foreground/5 px-3 py-1 rounded-full">
                              {exp.period}
                            </span>
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground leading-relaxed mb-5">
                          {exp.description}
                        </p>
                        
                        {/* Highlights */}
                        <div className="flex flex-wrap gap-2">
                          {exp.highlights.map((highlight) => (
                            <span
                              key={highlight}
                              className="inline-flex items-center text-xs font-medium px-3 py-1.5 rounded-full border border-border bg-background text-foreground/80"
                            >
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isContentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-secondary/50 via-background to-secondary/30 p-8 sm:p-12 lg:p-16"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-foreground/[0.02] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-foreground/[0.02] rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10 max-w-2xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isContentInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-border bg-background/50"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-sm font-medium">Currently accepting projects</span>
              </motion.div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-6 text-balance">
                Let&apos;s create something
                <span className="block text-muted-foreground">amazing together</span>
              </h2>
              
              <p className="max-w-lg mx-auto text-base sm:text-lg text-muted-foreground mb-10 leading-relaxed">
                Have a project in mind or just want to chat? I&apos;m always open
                to discussing new opportunities and bringing ideas to life.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <MagneticButton strength={0.15}>
                  <Link
                    href="/#contact"
                    className="group inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background font-medium rounded-full hover:bg-foreground/90 transition-all shadow-lg shadow-foreground/10"
                  >
                    Start a Conversation
                    <svg
                      className="w-5 h-5 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                </MagneticButton>

                <MagneticButton strength={0.15}>
                  <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 px-8 py-4 border border-border text-foreground font-medium rounded-full hover:bg-secondary hover:border-foreground/20 transition-all"
                  >
                    View My Work
                  </Link>
                </MagneticButton>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

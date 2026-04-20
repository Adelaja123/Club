"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MagneticButton } from "./magnetic-button";

const navItems = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  // { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { label: "Github", href: "https://github.com/Adelaja123/" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/oluwagbotemi-adelaja-230b47400",
  },
  { label: "Twitter", href: "https://x.com/gbotemi8054" },
  {
    label: "Instagram",
    href: "https://www.instagram.com/oluwagbotemi.io?igsh=bWtheXFpbWVjZd",
  },
];

const sectionIds = Array.from(
  new Set(["hero", ...navItems.map((item) => item.href.replace("#", ""))]),
);

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isCompactNav, setIsCompactNav] = useState(false);

  const scrollRafRef = useRef<number | null>(null);
  const stateCacheRef = useRef({
    activeSection: "hero",
    isCompactNav: false,
  });

  useEffect(() => {
    const scrollContainer: Window | HTMLElement =
      document.querySelector<HTMLElement>(".snap-container") ?? window;

    const updateNavState = () => {
      const aboutElement = document.getElementById("about");
      const aboutTop = aboutElement?.getBoundingClientRect().top ?? Infinity;
      const nextCompactNav = aboutTop <= 96;

      let nextActiveSection = "hero";

      for (const section of [...sectionIds].reverse()) {
        const element = document.getElementById(section);
        if (!element) continue;

        const rect = element.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom > 150) {
          nextActiveSection = section;
          break;
        }
      }

      const previous = stateCacheRef.current;

      if (previous.isCompactNav !== nextCompactNav) {
        previous.isCompactNav = nextCompactNav;
        setIsCompactNav(nextCompactNav);
      }

      if (previous.activeSection !== nextActiveSection) {
        previous.activeSection = nextActiveSection;
        setActiveSection(nextActiveSection);
      }
    };

    const scheduleUpdate = () => {
      if (scrollRafRef.current !== null) return;

      scrollRafRef.current = window.requestAnimationFrame(() => {
        scrollRafRef.current = null;
        updateNavState();
      });
    };

    scrollContainer.addEventListener("scroll", scheduleUpdate, {
      passive: true,
    });
    window.addEventListener("resize", scheduleUpdate);

    scheduleUpdate();

    return () => {
      scrollContainer.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);

      if (scrollRafRef.current !== null) {
        window.cancelAnimationFrame(scrollRafRef.current);
      }
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      window.addEventListener("keydown", onKeyDown);
    }

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMobileMenuOpen]);

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.replace("#", ""));
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsMobileMenuOpen(false);
      return;
    }

    setIsMobileMenuOpen(false);
  };

  const shouldShowCompactToggle = isCompactNav && !isMobileMenuOpen;

  return (
    <>
      {!isCompactNav ? (
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="fixed left-0 right-0 top-0 z-50"
        >
          <div
            className="bg-transparent"
            style={{
              backdropFilter: "none",
              WebkitBackdropFilter: "none",
            }}
          >
            <nav className="relative mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-12 lg:py-5">
              <motion.div
                key="hero-state"
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="flex w-full flex-col items-start justify-end gap-3 md:flex-row md:items-center md:justify-between"
              >
                <div className="flex w-full items-center justify-between md:hidden">
                  <MagneticButton strength={0.2}>
                    <a
                      href="#hero"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection("#hero");
                      }}
                      className="text-base font-medium tracking-tight sm:text-lg"
                    >
                      Oluwagbotemi
                      <span className="text-muted-foreground">.io</span>
                    </a>
                  </MagneticButton>

                  <button
                    type="button"
                    onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                    aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isMobileMenuOpen}
                    aria-controls="site-menu"
                    className="inline-flex items-center px-2 py-2 text-sm font-medium tracking-[0.18em] text-foreground transition-opacity duration-200 hover:opacity-70"
                  >
                    <li></li> NAV
                  </button>
                </div>

                <div className="hidden md:flex md:w-full md:items-center md:justify-between">
                  <MagneticButton strength={0.2}>
                    <a
                      href="#hero"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection("#hero");
                      }}
                      className="text-lg font-medium tracking-tight"
                    >
                      Oluwagbotemi
                      <span className="text-muted-foreground">.io</span>
                    </a>
                  </MagneticButton>

                  <ul className="flex flex-wrap items-center gap-x-5 gap-y-3 sm:gap-x-8">
                    {navItems.map((item) => (
                      <li key={item.href}>
                        <MagneticButton strength={0.15}>
                          <a
                            href={item.href}
                            onClick={(e) => {
                              e.preventDefault();
                              scrollToSection(item.href);
                            }}
                            className={`group relative text-sm tracking-wide transition-colors ${activeSection === item.href.replace("#", "")
                                ? "text-foreground"
                                : "text-muted-foreground hover:text-foreground"
                              }`}
                          >
                            {item.label}
                            <span
                              className={`absolute -bottom-1 left-0 h-px bg-foreground transition-all duration-300 ${activeSection === item.href.replace("#", "")
                                  ? "w-full"
                                  : "w-0 group-hover:w-full"
                                }`}
                            />
                          </a>
                        </MagneticButton>
                      </li>
                    ))}
                  </ul>

                  <MagneticButton strength={0.2}>
                    <a
                      href="#contact"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection("#contact");
                      }}
                      className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-all hover:bg-foreground/90"
                    >
                      Get in Touch
                    </a>
                  </MagneticButton>
                </div>
              </motion.div>
            </nav>
          </div>
        </motion.header>
      ) : null}

      {shouldShowCompactToggle ? (
        <motion.button
          key="compact-hamburger"
          type="button"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="site-menu"
          initial={{ opacity: 0, scale: 0.82, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.82, y: 14 }}
          transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          className="fixed right-4 top-4 z-[90] inline-flex h-16 w-16 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-[0_16px_40px_rgba(0,0,0,0.22)] sm:right-6 sm:top-6 sm:h-[4.5rem] sm:w-[4.5rem] lg:right-8 lg:top-8 lg:h-[5rem] lg:w-[5rem]"
          style={{
            isolation: "isolate",
            backgroundColor: "var(--background)",
          }}
        >
          <span className="sr-only">
            {isMobileMenuOpen ? "Close menu" : "Open menu"}
          </span>

          <div className="flex flex-col items-center justify-center gap-1.5">
            <motion.span
              animate={
                isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }
              }
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="h-0.5 w-7 origin-center bg-current sm:w-8"
            />
            <motion.span
              animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.18 }}
              className="h-0.5 w-7 bg-current sm:w-8"
            />
            <motion.span
              animate={
                isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }
              }
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="h-0.5 w-7 origin-center bg-current sm:w-8"
            />
          </div>
        </motion.button>
      ) : null}

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="site-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-md lg:bg-black/80"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.nav
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 24 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="ml-auto flex h-full w-full flex-col overflow-y-auto border-foreground/10 bg-background px-6 py-6 sm:px-8 sm:py-8 lg:w-[34vw] lg:min-w-[420px] lg:max-w-none lg:border-l lg:px-10 lg:py-10 xl:w-[32vw] 2xl:w-[30vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <MagneticButton strength={0.2}>
                  <a
                    href="#hero"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("#hero");
                    }}
                    className="text-lg font-medium tracking-tight"
                  >
                    Oluwagbotemi
                    <span className="text-muted-foreground">.io</span>
                  </a>
                </MagneticButton>

                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-background text-foreground transition-opacity hover:opacity-70"
                  aria-label="Close menu"
                >
                  <span className="sr-only">Close menu</span>
                  <div className="flex flex-col items-center justify-center gap-1.5">
                    <span className="h-0.5 w-6 origin-center rotate-45 bg-foreground" />
                    <span className="h-0.5 w-6 -translate-y-1 rotate-[-45deg] bg-foreground" />
                  </div>
                </button>
              </div>

              <div className="mt-10 flex flex-1 flex-col justify-between gap-1 lg:mt-1">
                <section className="space-y-6">
                  {/* <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                    Navigation
                  </p> */}

                  <div className="h-px w-full bg-foreground/10" />

                  <ul className="space-y-5 sm:space-y-6 lg:space-y-1">
                    {navItems.map((item, i) => {
                      const isActive =
                        activeSection === item.href.replace("#", "");

                      return (
                        <li key={item.href}>
                          <motion.a
                            href={item.href}
                            onClick={(e) => {
                              e.preventDefault();
                              scrollToSection(item.href);
                            }}
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.05 + i * 0.05 }}
                            className={`group flex items-start gap-4 break-words py-2 text-[clamp(2.5rem,3.6vw,4.75rem)] leading-[0.92] tracking-[-0.05em] transition-colors sm:gap-6 sm:py-3 ${isActive
                                ? "text-foreground"
                                : "text-muted-foreground hover:text-foreground"
                              }`}
                          >
                            <span
                              className={`mt-3 h-2.5 w-2.5 rounded-full transition-all duration-300 ${isActive
                                  ? "scale-100 bg-foreground"
                                  : "scale-75 bg-muted-foreground/40 group-hover:scale-100 group-hover:bg-foreground"
                                }`}
                            />
                            <span className="block">{item.label}</span>
                          </motion.a>
                        </li>
                      );
                    })}
                  </ul>
                </section>

                <section className="space-y-6 border-t border-foreground/10 pt-6 lg:pt-8">
                  <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                    Socials
                  </p>

                  <ul className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4 lg:flex lg:flex-wrap lg:gap-x-8 lg:gap-y-3">
                    {socialLinks.map((item) => (
                      <li key={item.label}>
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm font-medium text-foreground/90 transition-opacity hover:opacity-70"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

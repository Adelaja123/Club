"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MagneticButton } from "./magnetic-button";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  // { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isCompactNav, setIsCompactNav] = useState(false);

  useEffect(() => {
    const scrollContainer =
      document.querySelector<HTMLElement>(".snap-container") ?? window;

    const handleScroll = () => {
      const aboutElement = document.getElementById("about");

      if (aboutElement) {
        const aboutRect = aboutElement.getBoundingClientRect();
        setIsCompactNav(aboutRect.top <= 96);
      }

      const sections = ["hero", ...navItems.map((item) => item.href.slice(1))];
      let nextActiveSection = "hero";

      for (const section of [...sections].reverse()) {
        const element = document.getElementById(section);
        if (!element) continue;

        const rect = element.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom > 150) {
          nextActiveSection = section;
          break;
        }
      }

      setActiveSection(nextActiveSection);
    };

    scrollContainer.addEventListener("scroll", handleScroll as EventListener, {
      passive: true,
    });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      scrollContainer.removeEventListener(
        "scroll",
        handleScroll as EventListener,
      );
      window.removeEventListener("resize", handleScroll);
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
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
    setIsMobileMenuOpen(false);
  };

  const mobileBrand = (
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
  );

  const menuToggle = (
    <button
      type="button"
      onClick={() => setIsMobileMenuOpen((prev) => !prev)}
      aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
      aria-expanded={isMobileMenuOpen}
      aria-controls="site-menu"
      className="inline-flex items-center px-1 py-2 text-sm font-medium tracking-[0.18em] text-foreground transition-opacity duration-200 hover:opacity-70"
    >
      .Menu
    </button>
  );

  const floatingCompactToggle = (
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
      className="fixed right-4 top-4 z-[60] inline-flex h-16 w-16 items-center justify-center rounded-full border border-foreground/10 bg-foreground text-background shadow-[0_16px_40px_rgba(0,0,0,0.16)] sm:right-6 sm:top-6 sm:h-[4.5rem] sm:w-[4.5rem] lg:right-8 lg:top-8 lg:h-[5rem] lg:w-[5rem]"
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
          className="h-0.5 w-7 origin-center bg-background sm:w-8"
        />
        <motion.span
          animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.18 }}
          className="h-0.5 w-7 bg-background sm:w-8"
        />
        <motion.span
          animate={
            isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }
          }
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="h-0.5 w-7 origin-center bg-background sm:w-8"
        />
      </div>
    </motion.button>
  );

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
                  {mobileBrand}
                  {menuToggle}
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
      ) : (
        floatingCompactToggle
      )}

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="site-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-40 bg-background"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.nav
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="flex h-full flex-col px-6 py-6 sm:px-8 sm:py-8"
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
                  className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-background text-foreground"
                  aria-label="Close menu"
                >
                  <span className="sr-only">Close menu</span>
                  <div className="flex flex-col items-center justify-center gap-1.5">
                    <span className="h-0.5 w-6 origin-center rotate-45 bg-foreground" />
                    <span className="h-0.5 w-6 -translate-y-1 rotate-[-45deg] bg-foreground" />
                  </div>
                </button>
              </div>

              <div className="flex flex-1 flex-col justify-center gap-8">
                {navItems.map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.href);
                    }}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.05 }}
                    className={`text-3xl font-light tracking-tight sm:text-4xl ${activeSection === item.href.replace("#", "")
                        ? "text-foreground"
                        : "text-muted-foreground"
                      }`}
                  >
                    {item.label}
                  </motion.a>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="pt-2"
                >
                  <MagneticButton strength={0.2}>
                    <a
                      href="#contact"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection("#contact");
                      }}
                      className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-all hover:bg-foreground/90"
                    >
                      Get in Touch
                    </a>
                  </MagneticButton>
                </motion.div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

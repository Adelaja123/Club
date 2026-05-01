"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete?: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [counter, setCounter] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const handleComplete = useCallback(() => {
    onComplete?.();
  }, [onComplete]);

  useEffect(() => {
    // Prevent scrolling during preloader
    document.body.style.overflow = "hidden";

    // Simulate loading with easing - starts fast, slows near end (like real loading)
    const duration = 2200;
    const startTime = Date.now();

    const updateCounter = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function: starts fast, slows down near the end
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(eased * 100);

      setCounter(currentCount);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        // Start exit animation
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            setIsLoading(false);
            document.body.style.overflow = "";
            handleComplete();
          }, 800);
        }, 300);
      }
    };

    requestAnimationFrame(updateCounter);

    return () => {
      document.body.style.overflow = "";
    };
  }, [handleComplete]);

  // Words to reveal
  const words = ["Oluwagbotemi", "Adelaja"];

  const slideUp = {
    initial: { y: 0 },
    exit: {
      y: "-100%",
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1],
        delay: 0.2,
      },
    },
  };

  const wordReveal = {
    initial: { y: "100%" },
    animate: (i: number) => ({
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.33, 1, 0.68, 1],
        delay: 0.5 + i * 0.1,
      },
    }),
  };

  const counterVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.33, 1, 0.68, 1],
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          variants={slideUp}
          initial="initial"
          animate="animate"
          exit="exit"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-foreground"
        >
          {/* Background pattern - subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(to right, oklch(0.99 0 0) 1px, transparent 1px),
                               linear-gradient(to bottom, oklch(0.99 0 0) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />

          <div className="relative z-10 flex flex-col items-center gap-6">
            {/* Name reveal */}
            <div className="flex flex-col items-center gap-1 md:gap-2">
              {words.map((word, i) => (
                <div key={word} className="overflow-hidden">
                  <motion.span
                    custom={i}
                    variants={wordReveal}
                    initial="initial"
                    animate={!isExiting ? "animate" : "initial"}
                    className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-background"
                  >
                    {word}
                  </motion.span>
                </div>
              ))}
            </div>

            {/* Counter */}
            <motion.div
              variants={counterVariants}
              initial="initial"
              animate="animate"
              className="fixed bottom-8 right-8 md:bottom-12 md:right-12"
            >
              <span className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light text-background/20 tabular-nums">
                {counter}
              </span>
            </motion.div>

            {/* Loading bar */}
            <div className="fixed bottom-8 left-8 md:bottom-12 md:left-12 w-32 md:w-48">
              <div className="h-[1px] bg-background/10 w-full overflow-hidden">
                <motion.div
                  className="h-full bg-background/40"
                  initial={{ width: "0%" }}
                  animate={{ width: `${counter}%` }}
                  transition={{ duration: 0.1, ease: "linear" }}
                />
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-xs text-background/40 mt-2 tracking-widest uppercase"
              >
                Loading
              </motion.p>
            </div>

            {/* Decorative dot */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
              className="fixed top-8 left-8 md:top-12 md:left-12 w-2 h-2 bg-background/40 rounded-full"
            />
          </div>

          {/* Curved reveal overlay for exit */}
          {isExiting && (
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{
                duration: 0.6,
                ease: [0.76, 0, 0.24, 1],
              }}
              className="absolute inset-0 bg-background origin-bottom"
              style={{
                borderTopLeftRadius: "50% 5%",
                borderTopRightRadius: "50% 5%",
              }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

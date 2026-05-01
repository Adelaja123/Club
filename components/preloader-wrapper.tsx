"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Preloader } from "./preloader";

interface PreloaderWrapperProps {
  children: React.ReactNode;
}

export function PreloaderWrapper({ children }: PreloaderWrapperProps) {
  const [mounted, setMounted] = useState(false);
  const [isPreloaderComplete, setIsPreloaderComplete] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    setMounted(true);
    // Check if this is not the first visit in this session
    const hasVisited = sessionStorage.getItem("hasVisitedBefore");
    if (hasVisited) {
      setShowPreloader(false);
      setIsPreloaderComplete(true);
    }
  }, []);

  const handlePreloaderComplete = () => {
    setIsPreloaderComplete(true);
    // Mark that user has visited
    sessionStorage.setItem("hasVisitedBefore", "true");
  };

  // Avoid hydration mismatch by rendering children immediately on server
  // and only showing preloader after mount
  if (!mounted) {
    return <div style={{ visibility: "hidden" }}>{children}</div>;
  }

  return (
    <>
      {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isPreloaderComplete ? 1 : 0 }}
        transition={{
          duration: 0.6,
          ease: [0.33, 1, 0.68, 1],
          delay: 0.2,
        }}
      >
        {children}
      </motion.div>
    </>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Preloader } from "./preloader";

interface PreloaderWrapperProps {
  children: React.ReactNode;
}

export function PreloaderWrapper({ children }: PreloaderWrapperProps) {
  const [isPreloaderComplete, setIsPreloaderComplete] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
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

  return (
    <>
      {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}
      <motion.div
        initial={showPreloader ? { opacity: 0 } : { opacity: 1 }}
        animate={{ opacity: isPreloaderComplete ? 1 : 0 }}
        transition={{
          duration: 0.6,
          ease: [0.33, 1, 0.68, 1],
          delay: showPreloader ? 0.2 : 0,
        }}
      >
        {children}
      </motion.div>
    </>
  );
}

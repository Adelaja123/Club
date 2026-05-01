"use client";

import { useState, useEffect } from "react";
import { Preloader } from "./preloader";

interface PreloaderWrapperProps {
  children: React.ReactNode;
}

export function PreloaderWrapper({ children }: PreloaderWrapperProps) {
  const [mounted, setMounted] = useState(false);
  const [isPreloaderComplete, setIsPreloaderComplete] = useState(false);
  const [showPreloader, setShowPreloader] = useState(false);

  useEffect(() => {
    // Check if this is not the first visit in this session
    const hasVisited = sessionStorage.getItem("hasVisitedBefore");
    if (hasVisited) {
      setIsPreloaderComplete(true);
      setShowPreloader(false);
    } else {
      setShowPreloader(true);
    }
    setMounted(true);
  }, []);

  const handlePreloaderComplete = () => {
    setIsPreloaderComplete(true);
    setShowPreloader(false);
    // Mark that user has visited
    sessionStorage.setItem("hasVisitedBefore", "true");
  };

  return (
    <>
      {mounted && showPreloader && (
        <Preloader onComplete={handlePreloaderComplete} />
      )}
      <div
        style={{
          opacity: !mounted ? 1 : isPreloaderComplete ? 1 : 0,
          transition: "opacity 0.6s cubic-bezier(0.33, 1, 0.68, 1)",
          transitionDelay: isPreloaderComplete ? "0.2s" : "0s",
        }}
      >
        {children}
      </div>
    </>
  );
}

"use client";

import { useState, useEffect } from "react";
import { Preloader } from "./preloader";

interface PreloaderWrapperProps {
  children: React.ReactNode;
}

export function PreloaderWrapper({ children }: PreloaderWrapperProps) {
  const [shouldShowPreloader, setShouldShowPreloader] = useState<boolean | null>(
    null
  );
  const [isPreloaderComplete, setIsPreloaderComplete] = useState(false);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisitedBefore");

    if (hasVisited) {
      setIsPreloaderComplete(true);
      setShouldShowPreloader(false);
    } else {
      setShouldShowPreloader(true);
    }
  }, []);

  const handlePreloaderComplete = () => {
    setIsPreloaderComplete(true);
    setShouldShowPreloader(false);
    sessionStorage.setItem("hasVisitedBefore", "true");
  };

  const shouldHideChildren =
    shouldShowPreloader === null || (shouldShowPreloader && !isPreloaderComplete);

  return (
    <>
      {shouldShowPreloader && (
        <Preloader onComplete={handlePreloaderComplete} />
      )}
      <div
        style={{
          opacity: shouldHideChildren ? 0 : 1,
          pointerEvents: shouldHideChildren ? "none" : "auto",
          transition: "opacity 0.6s cubic-bezier(0.33, 1, 0.68, 1)",
          transitionDelay: isPreloaderComplete ? "0.2s" : "0s",
        }}
        aria-hidden={shouldHideChildren}
      >
        {children}
      </div>
    </>
  );
}

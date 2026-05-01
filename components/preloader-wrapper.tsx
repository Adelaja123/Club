"use client";

import { useState } from "react";
import { Preloader } from "./preloader";

interface PreloaderWrapperProps {
  children: React.ReactNode;
}

export function PreloaderWrapper({ children }: PreloaderWrapperProps) {
  const [shouldShowPreloader, setShouldShowPreloader] = useState(() => {
    if (typeof window === "undefined") {
      return null;
    }

    return sessionStorage.getItem("hasVisitedBefore") ? false : true;
  });
  const [isPreloaderComplete, setIsPreloaderComplete] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return sessionStorage.getItem("hasVisitedBefore") ? true : false;
  });

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

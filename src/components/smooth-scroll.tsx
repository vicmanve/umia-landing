"use client";

import { useEffect, type ReactNode } from "react";
import { MotionConfig } from "motion/react";
import Lenis from "lenis";

/** Scroll suave con Lenis + guardia global de prefers-reduced-motion. */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;
    let raf = 0;

    const startLenis = () => {
      if (mql.matches || lenis) return;
      lenis = new Lenis({ duration: 1.15, smoothWheel: true });
      const loop = (time: number) => {
        lenis?.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    };

    const stopLenis = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      lenis?.destroy();
      lenis = null;
    };

    const handlePreferenceChange = () => {
      if (mql.matches) {
        stopLenis();
      } else {
        startLenis();
      }
    };

    startLenis();
    mql.addEventListener("change", handlePreferenceChange);

    return () => {
      mql.removeEventListener("change", handlePreferenceChange);
      stopLenis();
    };
  }, []);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

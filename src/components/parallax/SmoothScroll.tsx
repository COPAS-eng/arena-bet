"use client";
import { useEffect } from "react";
import { useScroll, useSpring, motion } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 20, restDelta: 0.001 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#ff2d2d] to-orange-500 origin-left z-[60] pointer-events-none"
    />
  );
}

// CSS-based smooth parallax helper — lightweight, no layout shift
export function useGsapParallax() {
  useEffect(() => {
    // Respect reduced motion
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Add class for css parallax
    document.documentElement.classList.add("has-parallax");
  }, []);
  return null;
}

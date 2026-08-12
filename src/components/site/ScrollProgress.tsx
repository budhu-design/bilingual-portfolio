"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { usePrefersReducedMotion } from "@/components/anim-kit/useReducedMotion";

/**
 * Thin gold progress line hugging the bottom edge of the (sticky) nav —
 * lives inside SiteNav's own header so it scrolls as one sticky unit
 * instead of fighting the nav for its own top:0 anchor.
 */
export function ScrollProgress() {
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: reduced ? 1000 : 300, damping: 40, restDelta: 0.001 });

  return (
    <motion.div
      className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-[#c8a24e]"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}

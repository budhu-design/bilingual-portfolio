"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ScrambleText } from "./ScrambleText";
import { usePrefersReducedMotion } from "./useReducedMotion";

/**
 * Page-load hero: two curtain panels (in the EN/HI accent colours) retract
 * on load, a line-mask reveal brings in the headline word by word, and the
 * background blobs drift with the cursor. The tagline uses the same
 * scramble-decode used by the language switch, tying the hero visually to
 * the rest of the transition language.
 */
export function Hero() {
  const reduced = usePrefersReducedMotion();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduced]);

  const words = ["Design.", "Systems.", "Craft."];

  return (
    <section className="relative h-[100svh] overflow-hidden bg-[#0d0d10] text-[#f6f3ec]">
      {!reduced && (
        <>
          <motion.div
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.76, 0, 0.24, 1] }}
            style={{ originY: 0 }}
            className="absolute inset-x-0 top-0 z-20 h-1/2 bg-[#a63d40]"
          />
          <motion.div
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.76, 0, 0.24, 1] }}
            style={{ originY: 1 }}
            className="absolute inset-x-0 bottom-0 z-20 h-1/2 bg-[#2f3e63]"
          />
        </>
      )}

      <motion.div
        className="pointer-events-none absolute -left-24 -top-32 h-[420px] w-[420px] rounded-full bg-[#c8a24e]/20 blur-3xl"
        animate={{ x: mouse.x * 20, y: mouse.y * 20 }}
        transition={{ type: "spring", stiffness: 60, damping: 20 }}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-32 -right-24 h-[420px] w-[420px] rounded-full bg-[#a63d40]/20 blur-3xl"
        animate={{ x: mouse.x * -25, y: mouse.y * -25 }}
        transition={{ type: "spring", stiffness: 60, damping: 20 }}
      />

      <div className="grain-texture pointer-events-none absolute inset-0 opacity-[0.05]" />

      <div className="relative z-10 flex h-full flex-col items-start justify-center px-8 sm:px-20">
        <div className="overflow-hidden">
          <motion.p
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.6, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4 text-sm uppercase tracking-[0.3em] text-[#c8a24e]"
          >
            <ScrambleText en="Portfolio — Est. 2026" hi="पोर्टफोलियो — २०२६" />
          </motion.p>
        </div>

        <h1 className="text-[13vw] font-semibold leading-[0.95] tracking-tight sm:text-[6.5vw]">
          {words.map((w, i) => (
            <span key={w} className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: "110%", rotate: 3 }}
                animate={{ y: "0%", rotate: 0 }}
                transition={{ duration: 0.85, delay: 1.0 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                {w}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="mt-8 max-w-md text-[#f6f3ec]/70"
        >
          <ScrambleText
            as="p"
            en="A bilingual portfolio built for two scripts, one craft."
            hi="दो लिपियों, एक शिल्प के लिए बना एक द्विभाषी पोर्टफोलियो।"
          />
        </motion.div>
      </div>
    </section>
  );
}

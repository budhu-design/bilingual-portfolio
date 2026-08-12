"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "./useReducedMotion";

/** A button that leans toward the cursor within its own bounds, spring-loaded back on leave. */
export function MagneticButton({
  children,
  className,
  style,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLButtonElement>(null);
  const x = useSpring(0, { stiffness: 300, damping: 20, mass: 0.4 });
  const y = useSpring(0, { stiffness: 300, damping: 20, mass: 0.4 });

  if (reduced) {
    return (
      <button onClick={onClick} className={className} style={style}>
        {children}
      </button>
    );
  }

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      style={{ ...style, x, y }}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.35);
        y.set((e.clientY - r.top - r.height / 2) * 0.35);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className={className}
    >
      {children}
    </motion.button>
  );
}

/** A card that tilts in 3D toward the cursor with a soft light following underneath. */
export function TiltCard({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rx = useSpring(0, { stiffness: 220, damping: 20 });
  const ry = useSpring(0, { stiffness: 220, damping: 20 });
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const glowOpacity = useSpring(0, { stiffness: 200, damping: 26 });
  const glowBg = useTransform(
    [glowX, glowY],
    ([gx, gy]) => `radial-gradient(300px circle at ${gx}% ${gy}%, rgba(200,162,78,0.18), transparent 70%)`
  );

  if (reduced) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      style={{ ...style, rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        ry.set((px - 0.5) * 16);
        rx.set((0.5 - py) * 16);
        glowX.set(px * 100);
        glowY.set(py * 100);
        glowOpacity.set(1);
      }}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
        glowOpacity.set(0);
      }}
      className={`relative overflow-hidden ${className ?? ""}`}
    >
      <motion.div className="pointer-events-none absolute inset-0" style={{ background: glowBg, opacity: glowOpacity }} />
      {children}
    </motion.div>
  );
}

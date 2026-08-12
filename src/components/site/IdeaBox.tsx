"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/components/anim-kit/useReducedMotion";

/**
 * Click-to-expand detail panel — themed via the ambient --bg/--fg/--accent/
 * --border custom properties set by each page's DIRECTIONS wrapper, so it
 * matches whichever style direction it's used on without its own props.
 */
export function IdeaBox({
  open,
  onClose,
  eyebrow,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
}) {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.2 }}
        >
          <motion.button
            aria-label="Close"
            className="absolute inset-0 bg-black/55 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 8 }}
            transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 320, damping: 28 }}
            className="relative z-10 max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl border p-6 shadow-2xl sm:p-8"
            style={{ background: "var(--bg)", color: "var(--fg)", borderColor: "var(--border)" }}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-lg opacity-50 transition-opacity hover:opacity-100"
              aria-label="Close"
            >
              ✕
            </button>
            {eyebrow && (
              <p className="pr-8 text-sm uppercase tracking-[0.2em]" style={{ color: "var(--accent)" }}>
                {eyebrow}
              </p>
            )}
            <h3 className="mt-1 pr-8 text-2xl font-semibold" style={{ fontFamily: "var(--heading-font)" }}>
              {title}
            </h3>
            <div className="mt-4 space-y-3 text-base leading-relaxed opacity-90">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

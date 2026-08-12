"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { usePrefersReducedMotion } from "./useReducedMotion";

const STORAGE_KEY = "site-lang";

export type Lang = "en" | "hi";

type Ctx = {
  lang: Lang;
  toggle: () => void;
  reduced: boolean;
  transitioning: boolean;
};

const LanguageCtx = createContext<Ctx | null>(null);

export function useLanguage() {
  const ctx = useContext(LanguageCtx);
  if (!ctx) throw new Error("useLanguage must be used within <LanguageProvider>");
  return ctx;
}

// Colour identity per language — the wipe borrows these so the transition
// itself communicates "which language is arriving", not just a neutral
// fade. Both muted and warm-neutral (stone / terracotta) rather than a
// bold, clashing pair — blue+red fought with every page's own palette.
const ACCENT: Record<Lang, string> = { en: "#8a7f6a", hi: "#a56a52" };
const EASE = [0.76, 0, 0.24, 1] as const;

/**
 * Signature EN <-> HI transition: a two-layer diagonal wipe (a leading accent
 * panel + a trailing "flag" panel in the outgoing colour) sweeps across the
 * viewport, the content swaps underneath while fully covered, and a single
 * oversized glyph (A / अ) flashes at the moment of the swap as a wink to what
 * just happened. Everything collapses to an instant crossfade under
 * prefers-reduced-motion.
 */
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const [incoming, setIncoming] = useState<Lang>("hi");
  const [transitioning, setTransitioning] = useState(false);
  const reduced = usePrefersReducedMotion();
  const lead = useAnimationControls();
  const trail = useAnimationControls();
  const lockRef = useRef(false);

  // Restore a previously chosen language on mount (client-only — SSR always
  // renders "en" so hydration matches, then this corrects it once) so
  // navigating/reloading doesn't silently reset the user's choice back to
  // English.
  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "hi") setLang(stored);
  }, []);

  const toggle = useCallback(async () => {
    if (lockRef.current) return;
    lockRef.current = true;

    if (reduced) {
      const next: Lang = lang === "en" ? "hi" : "en";
      setLang(next);
      window.localStorage.setItem(STORAGE_KEY, next);
      lockRef.current = false;
      return;
    }

    const next: Lang = lang === "en" ? "hi" : "en";
    setIncoming(next);
    setTransitioning(true);

    await Promise.all([
      lead.start({ x: "0%", transition: { duration: 0.42, ease: EASE } }),
      trail.start({ x: "0%", transition: { duration: 0.42, ease: EASE, delay: 0.06 } }),
    ]);

    setLang(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    await new Promise((r) => setTimeout(r, 90));

    await Promise.all([
      lead.start({ x: "100%", transition: { duration: 0.46, ease: EASE, delay: 0.04 } }),
      trail.start({ x: "100%", transition: { duration: 0.46, ease: EASE } }),
    ]);

    lead.set({ x: "-100%" });
    trail.set({ x: "-100%" });
    setTransitioning(false);
    lockRef.current = false;
  }, [lang, lead, trail, reduced]);

  return (
    <LanguageCtx.Provider value={{ lang, toggle, reduced, transitioning }}>
      {children}
      <div className="pointer-events-none fixed inset-0 z-[999] overflow-hidden" aria-hidden="true">
        <motion.div
          initial={{ x: "-100%", skewX: -14 }}
          animate={trail}
          className="absolute -inset-y-[20%] left-[6%] w-[22%]"
          style={{ background: ACCENT[incoming === "en" ? "hi" : "en"], opacity: 0.55 }}
        />
        <motion.div
          initial={{ x: "-100%", skewX: -14 }}
          animate={lead}
          className="absolute -inset-y-[20%] w-[70%]"
          style={{ background: ACCENT[incoming] }}
        />
        {transitioning && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="select-none text-[16vw] font-semibold leading-none text-[#f6f3ec]/95">
              {incoming === "hi" ? "अ" : "A"}
            </span>
          </div>
        )}
      </div>
    </LanguageCtx.Provider>
  );
}

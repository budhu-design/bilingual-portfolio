"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ScrambleText } from "./ScrambleText";
import { usePrefersReducedMotion } from "./useReducedMotion";

const PINS = [
  { id: "delhi", x: 52, y: 26, en: "Delhi Shakha", hi: "दिल्ली शाखा", meta: "42 members · Est. 2014" },
  { id: "jaipur", x: 40, y: 34, en: "Jaipur Shakha", hi: "जयपुर शाखा", meta: "19 members · Est. 2021" },
  { id: "mumbai", x: 38, y: 60, en: "Mumbai Shakha", hi: "मुंबई शाखा", meta: "67 members · Est. 2011" },
  { id: "chennai", x: 55, y: 82, en: "Chennai Shakha", hi: "चेन्नई शाखा", meta: "31 members · Est. 2017" },
  { id: "kolkata", x: 74, y: 44, en: "Kolkata Shakha", hi: "कोलकाता शाखा", meta: "28 members · Est. 2019" },
];

/**
 * Locator console rather than a literal map tile — a dot-grid + slow radar
 * sweep read as "premium instrument", and every pin idles with its own pulse
 * so the panel never looks static even before anyone interacts with it.
 */
export function ShakhaMap() {
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState<string | null>(null);
  const activePin = PINS.find((p) => p.id === active);

  return (
    <div className="relative h-[440px] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#111116]">
      <div className="absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:22px_22px]" />

      {!reduced && (
        <motion.div
          className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 opacity-20"
          style={{ background: "conic-gradient(from 0deg, transparent 0deg, #c8a24e 18deg, transparent 40deg)" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      )}

      {PINS.map((p) => (
        <button
          key={p.id}
          onClick={() => setActive(p.id)}
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
          className="group absolute -translate-x-1/2 -translate-y-1/2"
          aria-label={p.en}
        >
          {!reduced && (
            <motion.span
              className="absolute inset-0 -m-2 rounded-full bg-[#c8a24e]/40"
              animate={{ scale: [1, 2.2], opacity: [0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            />
          )}
          <motion.span
            whileHover={{ scale: 1.4 }}
            animate={{ scale: active === p.id ? 1.5 : 1 }}
            className={`relative block h-3 w-3 rounded-full ring-2 ring-[#0d0d10] ${
              active === p.id ? "bg-[#c8a24e]" : "bg-[#f6f3ec]"
            }`}
          />
          <span className="pointer-events-none absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap text-[10px] text-[#f6f3ec]/50 opacity-0 transition-opacity group-hover:opacity-100">
            {p.en}
          </span>
        </button>
      ))}

      <AnimatePresence>
        {activePin && (
          <motion.div
            key={activePin.id}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/10 bg-[#0d0d10]/90 p-4 backdrop-blur sm:left-auto sm:right-4 sm:w-64"
          >
            <button
              onClick={() => setActive(null)}
              className="absolute right-3 top-3 text-[#f6f3ec]/40 hover:text-[#f6f3ec]"
              aria-label="Close"
            >
              ×
            </button>
            <ScrambleText as="p" en={activePin.en} hi={activePin.hi} className="text-base font-medium text-[#f6f3ec]" />
            <p className="mt-1 text-xs text-[#f6f3ec]/50">{activePin.meta}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

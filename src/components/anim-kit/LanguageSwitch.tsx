"use client";

import { motion } from "framer-motion";
import { useLanguage } from "./LanguageContext";

/**
 * The visible toggle. All the transition choreography lives in
 * LanguageProvider — this is just a pill switch with a spring-driven thumb.
 */
export function LanguageSwitch() {
  const { lang, toggle, transitioning } = useLanguage();

  return (
    <button
      onClick={toggle}
      disabled={transitioning}
      aria-label={`Switch language to ${lang === "en" ? "Hindi" : "English"}`}
      className="relative flex h-11 w-[104px] items-center rounded-full border border-white/15 bg-white/5 px-1 backdrop-blur disabled:cursor-wait"
    >
      <motion.span
        className="absolute top-1 h-9 w-[48px] rounded-full bg-[#c8a24e]"
        animate={{ left: lang === "en" ? 4 : 52 }}
        transition={{ type: "spring", stiffness: 500, damping: 34 }}
      />
      <span
        className={`relative z-10 flex-1 text-center text-sm font-medium transition-colors ${
          lang === "en" ? "text-[#0d0d10]" : "text-white/60"
        }`}
      >
        EN
      </span>
      <span
        className={`relative z-10 flex-1 text-center text-sm font-medium transition-colors ${
          lang === "hi" ? "text-[#0d0d10]" : "text-white/60"
        }`}
      >
        हि
      </span>
    </button>
  );
}

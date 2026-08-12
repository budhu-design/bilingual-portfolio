"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "./LanguageContext";
import { usePrefersReducedMotion } from "./useReducedMotion";

const LATIN = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const DEVANAGARI = "अआइईउऊएऐओऔकखगघचछजझटठडढणतथदधनपफबभमयरलवशषसह";

type Props = {
  en: string;
  hi: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
};

/**
 * Text that "decodes" into place when the language changes, instead of a
 * plain crossfade — used by the language switch, hero, timeline, and
 * org-chart nodes so the whole site shares one bilingual-transition language.
 */
export function ScrambleText({ en, hi, as: Tag = "span", className }: Props) {
  const { lang } = useLanguage();
  const reduced = usePrefersReducedMotion();
  const target = lang === "en" ? en : hi;
  const [display, setDisplay] = useState(target);
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (reduced) {
      setDisplay(target);
      return;
    }

    const pool = lang === "en" ? LATIN : DEVANAGARI + LATIN;
    const len = target.length;
    const startAt = performance.now();
    const duration = Math.min(700, 220 + len * 18);

    const tick = (now: number) => {
      const t = Math.min(1, (now - startAt) / duration);
      const revealCount = Math.floor(t * len);
      let out = "";
      for (let i = 0; i < len; i++) {
        if (target[i] === " ") {
          out += " ";
        } else if (i < revealCount) {
          out += target[i];
        } else {
          out += pool[Math.floor(Math.random() * pool.length)];
        }
      }
      setDisplay(out);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(target);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, lang, reduced]);

  return <Tag className={className}>{display}</Tag>;
}

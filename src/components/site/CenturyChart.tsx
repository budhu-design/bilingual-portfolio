"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambleText } from "@/components/anim-kit";
import { usePrefersReducedMotion } from "@/components/anim-kit/useReducedMotion";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const MILESTONES = [
  { year: "1925", en: "Founded", hi: "स्थापना" },
  { year: "1950", en: "Post-independence growth", hi: "स्वतंत्रता के बाद विस्तार" },
  { year: "1975", en: "Emergency era", hi: "आपातकाल युग" },
  { year: "2001", en: "Gujarat earthquake relief", hi: "गुजरात भूकंप राहत" },
  { year: "2025", en: "Centenary — 83,129 shakhas", hi: "शताब्दी — ८३,१२९ शाखाएँ" },
];

/** The "100 years" bar draws in as the section scrolls into view, milestone labels fading in behind it. */
export function CenturyChart() {
  const rootRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(barRef.current, { scaleX: 1 });
        gsap.set(".century-mark", { opacity: 1, y: 0 });
        return;
      }
      gsap.set(barRef.current, { scaleX: 0 });
      gsap.to(barRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { trigger: rootRef.current, start: "top 75%", end: "bottom 60%", scrub: 0.6 },
      });
      gsap.utils.toArray<HTMLElement>(".century-mark").forEach((m) => {
        gsap.fromTo(
          m,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: { trigger: m, start: "top 88%", toggleActions: "play none none reverse" },
          }
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <div ref={rootRef} className="mx-auto max-w-4xl px-6 py-14 sm:px-10">
      <p className="mb-6 text-sm uppercase tracking-[0.3em]" style={{ color: "var(--accent)" }}>
        <ScrambleText en="A century, at a glance" hi="एक सदी, एक नज़र में" />
      </p>
      <div
        className="relative h-1.5"
        style={{
          background: "rgba(43,32,25,0.12)",
          maskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        }}
      >
        <div ref={barRef} className="absolute inset-y-0 left-0 w-full origin-left" style={{ background: "var(--accent)" }} />
      </div>
      <div className="relative mt-4 grid grid-cols-2 gap-4 text-sm sm:grid-cols-5">
        {MILESTONES.map((m) => (
          <div key={m.year} className="century-mark">
            <p className="font-semibold" style={{ fontFamily: "var(--font-plex-mono)", color: "var(--accent)" }}>
              {m.year}
            </p>
            <p className="mt-1 opacity-70">
              <ScrambleText en={m.en} hi={m.hi} />
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

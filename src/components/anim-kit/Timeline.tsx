"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambleText } from "./ScrambleText";
import { usePrefersReducedMotion } from "./useReducedMotion";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const EVENTS = [
  { year: "2019", en: "Founded the studio", hi: "स्टूडियो की स्थापना" },
  { year: "2021", en: "First flagship product shipped", hi: "पहला प्रमुख उत्पाद लॉन्च" },
  { year: "2023", en: "Expanded to 12 shakha centers", hi: "१२ शाखा केंद्रों तक विस्तार" },
  { year: "2025", en: "Crossed 100 collaborators", hi: "१०० सहयोगियों का आँकड़ा पार" },
];

/**
 * The connecting line's stroke-dashoffset is scrubbed directly to scroll
 * position (not just "revealed once") so it reads as being drawn by the
 * scroll itself. Each node blurs/rises in independently as it enters view.
 */
export function Timeline() {
  const rootRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(".tl-node", { opacity: 1, y: 0, filter: "blur(0px)" });
        if (pathRef.current) gsap.set(pathRef.current, { strokeDashoffset: 0 });
        return;
      }

      if (pathRef.current) {
        const len = pathRef.current.getTotalLength();
        gsap.set(pathRef.current, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(pathRef.current, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 70%",
            end: "bottom 60%",
            scrub: 0.6,
          },
        });
      }

      gsap.utils.toArray<HTMLElement>(".tl-node").forEach((node) => {
        gsap.fromTo(
          node,
          { opacity: 0, y: 40, filter: "blur(6px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: node,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <div ref={rootRef} className="relative mx-auto max-w-2xl py-24">
      <svg
        className="absolute left-6 top-0 h-full w-4 -translate-x-1/2"
        viewBox="0 0 4 100"
        preserveAspectRatio="none"
      >
        <path
          ref={pathRef}
          d="M2 0 L2 100"
          stroke="#c8a24e"
          strokeWidth="2"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <ul className="space-y-16">
        {EVENTS.map((e) => (
          <li key={e.year} className="tl-node relative pl-16">
            <span className="absolute left-6 top-1 h-3 w-3 -translate-x-1/2 rounded-full bg-[#c8a24e] ring-4 ring-[#0d0d10]" />
            <span className="text-xs uppercase tracking-widest text-[#c8a24e]">{e.year}</span>
            <ScrambleText as="p" en={e.en} hi={e.hi} className="mt-1 text-lg text-[#f6f3ec]" />
          </li>
        ))}
      </ul>
    </div>
  );
}

"use client";

import "@/components/anim-kit/kit.css";
import {
  Hero,
  LanguageProvider,
  LanguageSwitch,
  MagneticButton,
  OrgChart,
  Reveal,
  ScrambleText,
  ShakhaMap,
  TiltCard,
  Timeline,
  usePrefersReducedMotion,
} from "@/components/anim-kit";

const CARDS = [
  { en: "Brand Identity", hi: "ब्रांड पहचान", desc: { en: "Mark, type, colour system.", hi: "चिह्न, टाइप, रंग प्रणाली।" } },
  { en: "Product Design", hi: "उत्पाद डिज़ाइन", desc: { en: "End-to-end interface work.", hi: "एंड-टू-एंड इंटरफ़ेस कार्य।" } },
  { en: "Motion Systems", hi: "मोशन सिस्टम", desc: { en: "This kit, essentially.", hi: "यह किट, अनिवार्यतः।" } },
];

function SectionLabel({ eyebrow, en, hi, note }: { eyebrow: string; en: string; hi: string; note: string }) {
  return (
    <div className="mb-10">
      <p className="text-xs uppercase tracking-[0.3em] text-[#c8a24e]">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-semibold text-[#f6f3ec] sm:text-4xl">
        <ScrambleText en={en} hi={hi} />
      </h2>
      <p className="mt-2 max-w-lg text-sm text-[#f6f3ec]/50">{note}</p>
    </div>
  );
}

function DemoBody() {
  const reduced = usePrefersReducedMotion();

  return (
    <div className="anim-kit min-h-screen bg-[#0d0d10]">
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-4 sm:px-10">
        <span className="text-sm font-medium tracking-wide text-[#f6f3ec]/80">anim-kit</span>
        <div className="flex items-center gap-3">
          {reduced && (
            <span className="rounded-full border border-white/15 px-3 py-1 text-[10px] uppercase tracking-widest text-[#f6f3ec]/50">
              Reduced motion on
            </span>
          )}
          <LanguageSwitch />
        </div>
      </header>

      <Hero />

      <main className="mx-auto max-w-5xl px-6 py-28 sm:px-10">
        <Reveal>
          <SectionLabel
            eyebrow="01 · Micro-interactions"
            en="Cards & buttons"
            hi="कार्ड और बटन"
            note="Replaces a static hover:shadow-lg. Cards tilt in 3D toward the cursor with a soft light following underneath; the CTA leans magnetically toward the pointer."
          />
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-3">
          {CARDS.map((c, i) => (
            <Reveal key={c.en} delay={i * 0.08}>
              <TiltCard className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <ScrambleText as="h3" en={c.en} hi={c.hi} className="text-lg font-medium text-[#f6f3ec]" />
                <ScrambleText as="p" en={c.desc.en} hi={c.desc.hi} className="mt-2 text-sm text-[#f6f3ec]/50" />
              </TiltCard>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-8" delay={0.1}>
          <MagneticButton className="rounded-full bg-[#c8a24e] px-8 py-3 text-sm font-medium text-[#0d0d10]">
            <ScrambleText en="Start a project" hi="प्रोजेक्ट शुरू करें" />
          </MagneticButton>
        </Reveal>

        <div className="mt-28">
          <Reveal>
            <SectionLabel
              eyebrow="02 · Scroll-triggered reveal"
              en="Timeline"
              hi="समयरेखा"
              note="Replaces a generic fade-in-on-scroll. The connecting line is scrubbed to scroll position — it's drawn by scrolling, not just revealed once — while each node blurs into focus independently."
            />
          </Reveal>
          <Timeline />
        </div>

        <div className="mt-16">
          <Reveal>
            <SectionLabel
              eyebrow="03 · Explorable hierarchy"
              en="Organisation chart"
              hi="संगठन चार्ट"
              note="Replaces a flat, non-interactive org image. Drag to pan, scroll or the +/- controls to zoom, click any node to fly the camera to it and expand or collapse its branch."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <OrgChart />
          </Reveal>
        </div>

        <div className="mt-28">
          <Reveal>
            <SectionLabel
              eyebrow="04 · Locator micro-interactions"
              en="Shakha locator"
              hi="शाखा लोकेटर"
              note="Replaces a plain pin-drop map embed. Every pin idles with its own pulse; hovering surfaces a label, clicking flies in a spring-driven detail card."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <ShakhaMap />
          </Reveal>
        </div>

        <footer className="mt-28 border-t border-white/10 pt-8 text-xs text-[#f6f3ec]/40">
          All motion in this kit is gated behind prefers-reduced-motion — try enabling it in your OS accessibility
          settings and revisit this page; wipes, tilts, parallax and scramble-decode all collapse to instant or
          simple opacity changes. See{" "}
          <code className="rounded bg-white/5 px-1 py-0.5">src/components/anim-kit/README.md</code> for integration
          notes.
        </footer>
      </main>
    </div>
  );
}

export default function AnimationsDemoPage() {
  return (
    <LanguageProvider>
      <DemoBody />
    </LanguageProvider>
  );
}

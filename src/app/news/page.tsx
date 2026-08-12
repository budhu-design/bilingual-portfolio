"use client";

import { Reveal, ScrambleText } from "@/components/anim-kit";
import { DIRECTIONS } from "@/lib/directions";

const MAGAZINES = [
  {
    name: "Organiser",
    hi: "ऑर्गनाइज़र",
    lang: "English",
    desc: "Weekly English-language magazine, described by Wikipedia as a mouthpiece of the RSS, in publication since 1947.",
    url: "https://organiser.org/",
  },
  {
    name: "Panchjanya",
    hi: "पांचजन्य",
    lang: "Hindi",
    desc: "Weekly Hindi-language sister publication to Organiser, both published by Bharat Prakashan (Delhi) Limited.",
    url: "https://panchjanya.com/",
  },
];

export default function NewsPage() {
  return (
    <div style={DIRECTIONS.editorial as React.CSSProperties} className="min-h-screen">
      <section className="px-6 py-20 sm:px-10">
        <div className="mx-auto max-w-2xl">
          <p
            className="text-xs uppercase tracking-[0.1em]"
            style={{ color: "var(--accent)", fontFamily: "var(--mono-font)" }}
          >
            News & Events
          </p>
          <h1 className="mt-3 text-5xl font-semibold" style={{ fontFamily: "var(--heading-font)" }}>
            <ScrambleText en="Affiliated publications" hi="संबद्ध प्रकाशन" />
          </h1>
          <p className="mt-4 text-lg italic leading-relaxed opacity-80">
            <ScrambleText
              en="Two RSS-affiliated magazines are well-documented enough to link directly. A shakha event calendar and press-mention roundup would need a live data feed this build doesn't have a source for yet, so they're left out rather than invented."
              hi="दो RSS-संबद्ध पत्रिकाएँ इतनी अच्छी तरह से प्रलेखित हैं कि सीधे लिंक की जा सकें।"
            />
          </p>

          <div className="mt-10 space-y-4">
            {MAGAZINES.map((m) => (
              <Reveal key={m.name}>
                <a
                  href={m.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-lg border-l-4 p-5 transition-colors hover:bg-black/[0.02]"
                  style={{ borderColor: "var(--accent)" }}
                >
                  <div className="flex items-baseline justify-between">
                    <p className="text-2xl font-semibold" style={{ fontFamily: "var(--heading-font)" }}>
                      {m.name} <span className="text-base opacity-50">{m.hi}</span>
                    </p>
                    <span className="text-xs uppercase tracking-widest opacity-50">{m.lang}</span>
                  </div>
                  <p className="mt-2 opacity-70">{m.desc}</p>
                  <p className="mt-2 text-sm underline" style={{ color: "var(--accent)" }}>
                    {m.url} →
                  </p>
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="mt-8 border-l-2 pl-4 text-sm opacity-70" style={{ borderColor: "var(--accent)" }}>
              A publication called &quot;Shashwat Rashtrabodh&quot; was mentioned as a reference point, but this
              research pass couldn&apos;t independently verify it as a distinct RSS-affiliated magazine with its own
              website — rather than guess at a URL, it&apos;s left out. If you have a direct link, it can be added
              alongside these.
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

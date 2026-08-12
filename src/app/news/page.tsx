"use client";

import { Reveal, ScrambleText } from "@/components/anim-kit";
import { DIRECTIONS } from "@/lib/directions";

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
            <ScrambleText en="Not yet in print" hi="अभी प्रकाशित नहीं" />
          </h1>
          <Reveal>
            <p className="mt-6 text-lg italic leading-relaxed opacity-80">
              <ScrambleText
                en="A shakha event calendar and press-mention roundup belong here — both need a live feed (real event data, real news coverage) that this build doesn't have a source for yet, rather than invented articles standing in for real reporting."
                hi="एक शाखा कार्यक्रम कैलेंडर और प्रेस-उल्लेख राउंडअप यहाँ होना चाहिए — दोनों को एक लाइव फ़ीड (वास्तविक कार्यक्रम डेटा, वास्तविक समाचार कवरेज) की आवश्यकता है जिसके लिए इस निर्माण के पास अभी स्रोत नहीं है।"
              />
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8 border-l-2 pl-4 text-sm opacity-70" style={{ borderColor: "var(--accent)" }}>
              Once there&apos;s a real events data source, this page is ready to receive it — the layout is the editorial
              magazine treatment from the style directions, not placeholder content standing in for actual journalism.
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

"use client";

import { Reveal, ScrambleText, MagneticButton, TiltCard } from "@/components/anim-kit";

const FACTS = [
  { en: "Founded", hi: "स्थापना", value: "1925", detail: { en: "27 September, Nagpur", hi: "२७ सितंबर, नागपुर" } },
  { en: "Shakhas nationwide", hi: "शाखाएँ", value: "83,129", detail: { en: "as of March 2025", hi: "मार्च २०२५ तक" } },
  { en: "Prants (provinces)", hi: "प्रांत", value: "46", detail: { en: "across India", hi: "पूरे भारत में" } },
  { en: "Centenary", hi: "शताब्दी", value: "2025", detail: { en: "100 years", hi: "१०० वर्ष" } },
];

const HIGHLIGHTS = [
  {
    year: "2001",
    en: "Gujarat earthquake relief",
    hi: "गुजरात भूकंप राहत",
    desc: {
      en: "~35,000 uniformed volunteers took part in rescue, cremation, free kitchens, and village reconstruction.",
      hi: "लगभग ३५,००० वर्दीधारी स्वयंसेवकों ने बचाव, दाह संस्कार, निःशुल्क रसोई और गाँव के पुनर्निर्माण में भाग लिया।",
    },
  },
  {
    year: "2020",
    en: "COVID-19 relief",
    hi: "कोविड-१९ राहत",
    desc: {
      en: "Seva Bharati ran large-scale relief distribution nationwide during the lockdown.",
      hi: "लॉकडाउन के दौरान सेवा भारती ने देशभर में बड़े पैमाने पर राहत वितरण चलाया।",
    },
  },
  {
    year: "2018",
    en: "Kerala floods",
    hi: "केरल बाढ़",
    desc: {
      en: "Seva Bharati supplied relief material — rice, milk, oil, medicine — reported at roughly ₹1 crore in one instance.",
      hi: "सेवा भारती ने राहत सामग्री — चावल, दूध, तेल, दवा — की आपूर्ति की, एक उदाहरण में लगभग १ करोड़ रुपये की सूचना है।",
    },
  },
];

export default function HomePage() {
  return (
    <div style={{ background: "#F2E8D5", color: "#2B2019" }}>
      {/* Direction 1A — Sangh Smriti */}
      <section className="px-6 py-20 sm:px-10 sm:py-28" style={{ fontFamily: "var(--font-spectral)" }}>
        <div className="mx-auto max-w-4xl">
          <p
            className="text-xs uppercase tracking-[0.3em]"
            style={{ color: "#6B1F1F", fontFamily: "var(--font-plex-mono)" }}
          >
            <ScrambleText en="Est. 1925 · Nagpur" hi="स्थापना १९२५ · नागपुर" />
          </p>
          <h1
            className="mt-4 text-5xl leading-[1.08] sm:text-6xl"
            style={{ fontFamily: "var(--font-rozha), var(--font-noto-devanagari)" }}
          >
            <ScrambleText en="A hundred years of Seva" hi="सेवा के सौ वर्ष" />
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed" style={{ color: "#4A3B2C" }}>
            <ScrambleText
              en="A living record of the organisation's founding, growth, and documented service — the history, the structure, and the people who carry it forward."
              hi="संगठन की स्थापना, विकास और दर्ज सेवा का एक जीवंत अभिलेख — इतिहास, संरचना और इसे आगे ले जाने वाले लोग।"
            />
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <MagneticButton
              onClick={() => (window.location.href = "/portal/signup")}
              className="rounded-full px-8 py-3 text-sm font-medium text-[#F2E8D5]"
              style={{ background: "#6B1F1F" } as React.CSSProperties}
            >
              <ScrambleText en="Join the Members Portal" hi="सदस्य पोर्टल में शामिल हों" />
            </MagneticButton>
            <a
              href="/about"
              className="rounded-full border px-8 py-3 text-sm font-medium"
              style={{ borderColor: "#2B2019" }}
            >
              <ScrambleText en="Read the history" hi="इतिहास पढ़ें" />
            </a>
          </div>
        </div>
      </section>

      {/* Quick facts strip */}
      <Reveal>
        <section className="border-y px-6 py-10 sm:px-10" style={{ borderColor: "rgba(43,32,25,0.15)" }}>
          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-6 sm:grid-cols-4">
            {FACTS.map((f) => (
              <div key={f.en}>
                <p className="text-3xl font-semibold" style={{ fontFamily: "var(--font-plex-mono)", color: "#6B1F1F" }}>
                  {f.value}
                </p>
                <p className="mt-1 text-sm">
                  <ScrambleText en={f.en} hi={f.hi} />
                </p>
                <p className="text-xs opacity-60">
                  <ScrambleText en={f.detail.en} hi={f.detail.hi} />
                </p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* Achievements teaser */}
      <section className="px-6 py-20 sm:px-10">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em]" style={{ color: "#6B1F1F" }}>
              <ScrambleText en="Documented service" hi="दर्ज सेवा" />
            </p>
            <h2 className="mt-2 text-3xl" style={{ fontFamily: "var(--font-rozha), var(--font-noto-devanagari)" }}>
              <ScrambleText en="Selected relief work" hi="चयनित राहत कार्य" />
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {HIGHLIGHTS.map((h, i) => (
              <Reveal key={h.year} delay={i * 0.08}>
                <TiltCard
                  className="h-full rounded-xl border p-5"
                  style={{ borderColor: "rgba(43,32,25,0.2)", background: "rgba(255,255,255,0.35)" } as React.CSSProperties}
                >
                  <p className="text-xs" style={{ fontFamily: "var(--font-plex-mono)", color: "#B8912F" }}>
                    {h.year}
                  </p>
                  <p className="mt-1 font-medium">
                    <ScrambleText en={h.en} hi={h.hi} />
                  </p>
                  <p className="mt-2 text-sm opacity-70">
                    <ScrambleText en={h.desc.en} hi={h.desc.hi} />
                  </p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2} className="mt-6">
            <a href="/achievements" className="text-sm underline" style={{ color: "#6B1F1F" }}>
              <ScrambleText en="See the full record →" hi="पूरा विवरण देखें →" />
            </a>
          </Reveal>
        </div>
      </section>

      <footer className="border-t px-6 py-10 text-xs opacity-60 sm:px-10" style={{ borderColor: "rgba(43,32,25,0.15)" }}>
        <div className="mx-auto max-w-4xl">
          Sources cited on each page. Figures marked &quot;organisation-reported&quot; are self-reported by
          RSS-affiliated bodies, distinct from independently verified figures.
        </div>
      </footer>
    </div>
  );
}

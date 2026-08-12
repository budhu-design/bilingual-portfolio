"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Reveal, ScrambleText, MagneticButton, TiltCard } from "@/components/anim-kit";
import { FoundingHero } from "@/components/site/FoundingHero";
import { CenturyChart } from "@/components/site/CenturyChart";
import { DIRECTIONS } from "@/lib/directions";

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
  const router = useRouter();
  return (
    <div style={DIRECTIONS.sanghSmriti as React.CSSProperties}>
      <FoundingHero />

      <section className="px-6 py-16 sm:px-10" style={{ fontFamily: "var(--body-font)" }}>
        <div className="mx-auto max-w-4xl">
          <p className="max-w-xl text-lg leading-relaxed opacity-80">
            <ScrambleText
              en="A living record of the organisation's founding, growth, and documented service — the history, the structure, and the people who carry it forward."
              hi="संगठन की स्थापना, विकास और दर्ज सेवा का एक जीवंत अभिलेख — इतिहास, संरचना और इसे आगे ले जाने वाले लोग।"
            />
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <MagneticButton
              onClick={() => router.push("/portal/signup")}
              className="rounded-full px-8 py-3 text-sm font-medium text-[#F2E8D5]"
              style={{ background: "var(--accent)" } as React.CSSProperties}
            >
              <ScrambleText en="Join the Members Portal" hi="सदस्य पोर्टल में शामिल हों" />
            </MagneticButton>
            <Link href="/about" className="rounded-full border px-8 py-3 text-sm font-medium" style={{ borderColor: "var(--fg)" }}>
              <ScrambleText en="Read the history" hi="इतिहास पढ़ें" />
            </Link>
          </div>
        </div>
      </section>

      <Reveal>
        <CenturyChart />
      </Reveal>

      {/* Quick facts strip — edges fade rather than a hard-cut border line */}
      <Reveal>
        <section
          className="relative px-6 py-10 sm:px-10"
          style={{
            backgroundImage:
              "linear-gradient(to right, transparent, var(--border) 15%, var(--border) 85%, transparent), linear-gradient(to right, transparent, var(--border) 15%, var(--border) 85%, transparent)",
            backgroundSize: "100% 1px, 100% 1px",
            backgroundPosition: "top, bottom",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-6 sm:grid-cols-4">
            {FACTS.map((f) => (
              <div key={f.en}>
                <p className="text-3xl font-semibold" style={{ fontFamily: "var(--mono-font)", color: "var(--accent)" }}>
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
            <p className="text-sm uppercase tracking-[0.3em]" style={{ color: "var(--accent)" }}>
              <ScrambleText en="Documented service" hi="दर्ज सेवा" />
            </p>
            <h2 className="mt-2 text-3xl" style={{ fontFamily: "var(--heading-font)" }}>
              <ScrambleText en="Selected relief work" hi="चयनित राहत कार्य" />
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {HIGHLIGHTS.map((h, i) => (
              <Reveal key={h.year} delay={i * 0.08}>
                <TiltCard
                  className="h-full rounded-xl border p-5"
                  style={{ borderColor: "var(--border)", background: "rgba(255,255,255,0.35)" } as React.CSSProperties}
                >
                  <p className="text-xs" style={{ fontFamily: "var(--mono-font)", color: "var(--accent2)" }}>
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
            <Link href="/achievements" className="text-sm underline" style={{ color: "var(--accent)" }}>
              <ScrambleText en="See the full record →" hi="पूरा विवरण देखें →" />
            </Link>
          </Reveal>
        </div>
      </section>

      <footer
        className="px-6 py-10 text-xs opacity-60 sm:px-10"
        style={{
          backgroundImage: "linear-gradient(to right, transparent, var(--border) 15%, var(--border) 85%, transparent)",
          backgroundSize: "100% 1px",
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="mx-auto max-w-4xl">
          Sources cited on each page. Figures marked &quot;organisation-reported&quot; are self-reported by
          RSS-affiliated bodies, distinct from independently verified figures.
        </div>
      </footer>
    </div>
  );
}

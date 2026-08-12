"use client";

import { Reveal, ScrambleText, Timeline } from "@/components/anim-kit";
import { DIRECTIONS } from "@/lib/directions";
import type { TimelineEvent } from "@/components/anim-kit/Timeline";

const EVENTS: TimelineEvent[] = [
  { year: "1925", en: "Founded in Nagpur by Dr. K. B. Hedgewar", hi: "डॉ. के. बी. हेडगेवार द्वारा नागपुर में स्थापना" },
  { year: "1940", en: "Hedgewar dies; M. S. Golwalkar becomes 2nd Sarsanghchalak", hi: "हेडगेवार का निधन; एम.एस. गोलवलकर दूसरे सरसंघचालक बने" },
  {
    year: "1948",
    en: "Banned after Gandhi's assassination by a former member; lifted 12 July 1949 after 16 months — no organisational culpability was formally established",
    hi: "एक पूर्व सदस्य द्वारा गांधी की हत्या के बाद प्रतिबंधित; १६ महीनों बाद १२ जुलाई १९४९ को हटाया गया — संगठनात्मक दोष औपचारिक रूप से स्थापित नहीं हुआ",
  },
  {
    year: "1975–77",
    en: "Banned/curtailed during the Emergency under PM Indira Gandhi; lifted when the Emergency ended",
    hi: "प्रधानमंत्री इंदिरा गांधी के आपातकाल के दौरान प्रतिबंधित/सीमित; आपातकाल समाप्त होने पर हटाया गया",
  },
  {
    year: "1992",
    en: "Banned a third time after the Babri Masjid demolition; withdrawn within about 6 months",
    hi: "बाबरी मस्जिद विध्वंस के बाद तीसरी बार प्रतिबंधित; लगभग ६ महीनों में वापस लिया गया",
  },
  { year: "2025", en: "Marks its centenary", hi: "अपनी शताब्दी मनाता है" },
];

export default function AboutPage() {
  return (
    <div
      style={
        {
          ...DIRECTIONS.classicalLibrary,
          "--timeline-accent": "#A8863C",
          "--timeline-text": "#1E1B16",
          "--timeline-ring": "#EFE6D8",
        } as React.CSSProperties
      }
      className="min-h-screen"
    >
      <section className="px-6 py-16 sm:px-10">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs uppercase tracking-[0.3em]" style={{ color: "var(--accent2)" }}>
            <ScrambleText en="About · History" hi="परिचय · इतिहास" />
          </p>
          <h1 className="mt-2 text-4xl font-semibold italic" style={{ fontFamily: "var(--heading-font)" }}>
            <ScrambleText en="A hundred years, one founding story" hi="सौ वर्ष, एक स्थापना कथा" />
          </h1>
          <p className="mt-4 leading-relaxed opacity-80">
            <ScrambleText
              en="The Rashtriya Swayamsevak Sangh was founded on 27 September 1925 in Nagpur by Dr. Keshav Baliram Hedgewar (1889–1940), a physician. Hedgewar envisioned a volunteer-based body to build character, discipline, and unity, partly inspired by V. D. Savarkar's Hindutva (1923) and a meeting with Savarkar in 1925."
              hi="राष्ट्रीय स्वयंसेवक संघ की स्थापना २७ सितंबर १९२५ को नागपुर में डॉ. केशव बलिराम हेडगेवार (१८८९–१९४०), एक चिकित्सक, द्वारा की गई थी। हेडगेवार ने चरित्र, अनुशासन और एकता के निर्माण के लिए एक स्वयंसेवक-आधारित निकाय की परिकल्पना की, जो आंशिक रूप से वी.डी. सावरकर के हिंदुत्व (१९२३) और १९२५ में सावरकर से मुलाकात से प्रेरित था।"
            />
          </p>
          <p className="mt-4 text-xs opacity-50">
            Sources: Britannica — K. B. Hedgewar; Wikipedia — Rashtriya Swayamsevak Sangh, K. B. Hedgewar.
          </p>
        </div>
      </section>

      <Reveal>
        <section className="px-6 py-8 sm:px-10">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-2 text-lg font-semibold" style={{ fontFamily: "var(--heading-font)" }}>
              Timeline
            </h2>
            <p className="mb-4 text-xs opacity-60">
              The exact scope of what each ban &quot;cleared&quot; the organisation of is itself disputed between
              sympathetic and critical sources — presented here as &quot;ban lifted, no organisational culpability
              formally established&quot; rather than an unqualified acquittal, the most defensible framing across
              sources.
            </p>
            <Timeline events={EVENTS} />
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="px-6 pb-24 sm:px-10">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-3 text-lg font-semibold" style={{ fontFamily: "var(--heading-font)" }}>
              Stated philosophy
            </h2>
            <p className="leading-relaxed opacity-80">
              <ScrambleText
                en="The organisation describes its mission as character-building among volunteers (swayamsevaks) through daily shakha meetings — physical exercise, discussion of national issues, and group activities — toward the stated goal of a unified, disciplined society."
                hi="संगठन अपने मिशन को दैनिक शाखा बैठकों — शारीरिक व्यायाम, राष्ट्रीय मुद्दों पर चर्चा, और सामूहिक गतिविधियों — के माध्यम से स्वयंसेवकों के बीच चरित्र-निर्माण के रूप में वर्णित करता है, जिसका उद्देश्य एक एकीकृत, अनुशासित समाज है।"
              />
            </p>
            <p className="mt-4 text-xs opacity-50">
              Presented factually per the organisation&apos;s own self-description — see /organisation for structure and
              /achievements for documented activity, both independently sourced.
            </p>
          </div>
        </section>
      </Reveal>
    </div>
  );
}

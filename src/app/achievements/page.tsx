"use client";

import { Reveal, ScrambleText, Timeline } from "@/components/anim-kit";
import { DIRECTIONS } from "@/lib/directions";
import type { TimelineEvent } from "@/components/anim-kit/Timeline";

const RELIEF: TimelineEvent[] = [
  {
    year: "1971–84",
    en: "Odisha cyclone (1971), Andhra Pradesh cyclone (1977), Bhopal gas disaster (1984)",
    hi: "ओडिशा चक्रवात (१९७१), आंध्र प्रदेश चक्रवात (१९७७), भोपाल गैस त्रासदी (१९८४)",
  },
  {
    year: "2001",
    en: "Gujarat earthquake — ~35,000 uniformed volunteers in rescue, cremation, free kitchens, and reconstruction",
    hi: "गुजरात भूकंप — बचाव, दाह संस्कार, निःशुल्क रसोई और पुनर्निर्माण में लगभग ३५,००० वर्दीधारी स्वयंसेवक",
  },
  { year: "2013", en: "Uttarakhand floods — relief offices set up in affected areas", hi: "उत्तराखंड बाढ़ — प्रभावित क्षेत्रों में राहत कार्यालय स्थापित" },
  {
    year: "2018",
    en: "Kerala floods — Seva Bharati supplied relief material (rice, milk, oil, medicine), ~₹1 crore in one reported instance",
    hi: "केरल बाढ़ — सेवा भारती ने राहत सामग्री (चावल, दूध, तेल, दवा) की आपूर्ति की, एक उदाहरण में लगभग १ करोड़ रुपये",
  },
  {
    year: "2020",
    en: "COVID-19 lockdown — large-scale relief distribution nationwide; independent reporting also examined how this work intersected with local administrations",
    hi: "कोविड-१९ लॉकडाउन — देशभर में बड़े पैमाने पर राहत वितरण; स्वतंत्र रिपोर्टिंग ने यह भी जांचा कि यह कार्य स्थानीय प्रशासन से कैसे जुड़ा",
  },
];

export default function AchievementsPage() {
  return (
    <div
      style={
        {
          ...DIRECTIONS.letterpress,
          "--timeline-accent": "#A63A2C",
          "--timeline-text": "#1B1F2A",
          "--timeline-ring": "#EDE3D0",
        } as React.CSSProperties
      }
      className="min-h-screen"
    >
      <section className="px-6 py-16 sm:px-10">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs uppercase tracking-[0.3em]" style={{ color: "var(--accent2)" }}>
            <ScrambleText en="Achievements & Social Work" hi="उपलब्धियाँ और सामाजिक कार्य" />
          </p>
          <h1 className="mt-2 text-4xl font-semibold" style={{ fontFamily: "var(--heading-font)" }}>
            <ScrambleText en="Documented service" hi="दर्ज सेवा" />
          </h1>
          <p className="mt-4 leading-relaxed opacity-80">
            <ScrambleText
              en="Disaster relief and welfare activity attributed to the organisation and its affiliates, spanning five decades. Figures from RSS-affiliated sources are labelled organisation-reported, distinct from independently verified figures — standard practice for NGO statistics of any political stripe."
              hi="संगठन और इसकी सहयोगी संस्थाओं से जुड़ी आपदा राहत और कल्याण गतिविधि, पाँच दशकों में फैली हुई। RSS-संबद्ध स्रोतों के आंकड़ों को संगठन-रिपोर्टेड लेबल किया गया है, स्वतंत्र रूप से सत्यापित आंकड़ों से अलग।"
            />
          </p>
        </div>
      </section>

      <Reveal>
        <section className="px-6 py-8 sm:px-10">
          <div className="mx-auto max-w-3xl">
            <Timeline events={RELIEF} />
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="px-6 pb-24 sm:px-10">
          <div className="mx-auto max-w-3xl rounded-xl border p-6" style={{ borderColor: "var(--border)" }}>
            <p className="text-xs uppercase tracking-widest" style={{ color: "var(--accent2)" }}>
              Organisation-reported, current
            </p>
            <p className="mt-2 leading-relaxed opacity-80">
              Rashtriya Sewa Bharati reports running roughly <strong>12,000 education programmes</strong>,{" "}
              <strong>12,000 health programmes</strong>, <strong>11,221 social-work projects</strong>, and{" "}
              <strong>6,763 skill-development programmes</strong> nationally, with over{" "}
              <strong>2 lakh volunteers</strong> involved.
            </p>
            <p className="mt-4 text-xs opacity-50">
              Sources: Wikipedia — Rashtriya Swayamsevak Sangh; Deccan Herald; Caravan Magazine (independent
              examination of COVID-era relief work); Rashtriya Sewa Bharati; RSS Facts.
            </p>
          </div>
        </section>
      </Reveal>
    </div>
  );
}

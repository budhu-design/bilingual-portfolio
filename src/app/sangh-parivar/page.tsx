"use client";

import { Reveal, ScrambleText, TiltCard } from "@/components/anim-kit";
import { DIRECTIONS } from "@/lib/directions";

const AFFILIATES = [
  { en: "Bharatiya Janata Party (BJP)", hi: "भारतीय जनता पार्टी", focus: { en: "Political wing", hi: "राजनीतिक शाखा" }, flag: null },
  { en: "Vishva Hindu Parishad (VHP)", hi: "विश्व हिन्दू परिषद", focus: { en: "Religious / cultural organisation", hi: "धार्मिक / सांस्कृतिक संगठन" }, flag: null },
  { en: "Akhil Bharatiya Vidyarthi Parishad (ABVP)", hi: "अखिल भारतीय विद्यार्थी परिषद", focus: { en: "Student union", hi: "छात्र संघ" }, flag: null },
  { en: "Bharatiya Mazdoor Sangh (BMS)", hi: "भारतीय मजदूर संघ", focus: { en: "Trade union / labour", hi: "श्रमिक संघ" }, flag: null },
  {
    en: "Akhil Bharatiya Vanvasi Kalyan Ashram",
    hi: "अखिल भारतीय वनवासी कल्याण आश्रम",
    focus: { en: "Tribal welfare — schools and health services in tribal areas", hi: "जनजातीय कल्याण — विद्यालय और स्वास्थ्य सेवाएँ" },
    flag: null,
  },
  {
    en: "Seva Bharati / Rashtriya Sewa Bharati",
    hi: "सेवा भारती / राष्ट्रीय सेवा भारती",
    focus: { en: "Healthcare, education, and social-welfare projects among the poor", hi: "गरीबों के बीच स्वास्थ्य, शिक्षा और सामाजिक-कल्याण परियोजनाएँ" },
    flag: null,
  },
  { en: "Vidya Bharati", hi: "विद्या भारती", focus: { en: "Network of schools", hi: "विद्यालयों का नेटवर्क" }, flag: null },
  {
    en: "Bajrang Dal",
    hi: "बजरंग दल",
    focus: { en: "Youth wing", hi: "युवा शाखा" },
    flag: {
      en: "Regularly linked in mainstream reporting to hardline/militant activism — noted here rather than presenting only its stated mission.",
      hi: "मुख्यधारा की रिपोर्टिंग में अक्सर कट्टरपंथी/उग्रवादी गतिविधि से जुड़ा — केवल इसके बताए गए मिशन के बजाय यहाँ उल्लेखित।",
    },
  },
  { en: "Swadeshi Jagran Manch", hi: "स्वदेशी जागरण मंच", focus: { en: "Economic self-reliance advocacy", hi: "आर्थिक आत्मनिर्भरता की वकालत" }, flag: null },
  { en: "Ekal Vidyalaya", hi: "एकल विद्यालय", focus: { en: "Single-teacher rural schools", hi: "एकल-शिक्षक ग्रामीण विद्यालय" }, flag: null },
  { en: "Hindu Swayamsevak Sangh", hi: "हिन्दू स्वयंसेवक संघ", focus: { en: "Overseas diaspora chapter", hi: "प्रवासी शाखा" }, flag: null },
];

export default function SanghParivarPage() {
  return (
    <div style={DIRECTIONS.civicTech as React.CSSProperties} className="min-h-screen">
      <section className="px-6 py-16 sm:px-10">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs uppercase tracking-[0.3em]" style={{ color: "var(--accent)" }}>
            <ScrambleText en="Sangh Parivar" hi="संघ परिवार" />
          </p>
          <h1 className="mt-2 text-4xl font-bold" style={{ fontFamily: "var(--heading-font)" }}>
            <ScrambleText en="Affiliated organisations" hi="संबद्ध संगठन" />
          </h1>
          <p className="mt-4 max-w-2xl text-sm opacity-70">
            <ScrambleText
              en="The wider family of organisations is reportedly 2,500+ strong. Listed here are the major ones. Source: Wikipedia — Sangh Parivar; Seva Bharati."
              hi="व्यापक परिवार में कथित रूप से २,५००+ संगठन हैं। यहाँ प्रमुख संगठन सूचीबद्ध हैं। स्रोत: विकिपीडिया — संघ परिवार; सेवा भारती।"
            />
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {AFFILIATES.map((a, i) => (
              <Reveal key={a.en} delay={(i % 3) * 0.06}>
                <TiltCard
                  className="h-full rounded-xl border p-5"
                  style={{ borderColor: "var(--border)", background: "#fff" } as React.CSSProperties}
                >
                  <p className="font-medium">
                    <ScrambleText en={a.en} hi={a.hi} />
                  </p>
                  <p className="mt-2 text-sm opacity-70">
                    <ScrambleText en={a.focus.en} hi={a.focus.hi} />
                  </p>
                  {a.flag && (
                    <p className="mt-3 rounded-lg px-3 py-2 text-xs" style={{ background: "rgba(232,121,44,0.1)", color: "var(--accent)" }}>
                      <ScrambleText en={a.flag.en} hi={a.flag.hi} />
                    </p>
                  )}
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

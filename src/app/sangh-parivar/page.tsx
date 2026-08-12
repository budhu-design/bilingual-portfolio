"use client";

import { useState } from "react";
import { Reveal, ScrambleText, TiltCard } from "@/components/anim-kit";
import { IdeaBox } from "@/components/site/IdeaBox";
import { DIRECTIONS } from "@/lib/directions";

type Affiliate = {
  id: string;
  en: string;
  hi: string;
  focus: { en: string; hi: string };
  flag?: { en: string; hi: string };
  detail: string;
};

const AFFILIATES: Affiliate[] = [
  {
    id: "bjp",
    en: "Bharatiya Janata Party (BJP)",
    hi: "भारतीय जनता पार्टी",
    focus: { en: "Political wing", hi: "राजनीतिक शाखा" },
    detail:
      "India's ruling national party as of this writing, founded in 1980 as a successor to the earlier Bharatiya Jana Sangh. Many senior BJP leaders, including sitting and former Prime Ministers, have backgrounds as RSS pracharaks (full-time volunteers) — the clearest and most consequential organisational link in the Sangh Parivar.",
  },
  {
    id: "vhp",
    en: "Vishva Hindu Parishad (VHP)",
    hi: "विश्व हिन्दू परिषद",
    focus: { en: "Religious / cultural organisation", hi: "धार्मिक / सांस्कृतिक संगठन" },
    detail:
      "Founded 1964, VHP focuses on Hindu religious and cultural consolidation. It organised the rally that preceded the 1992 Babri Masjid demolition — the event that triggered RSS's third ban — and remains one of the more politically prominent affiliates.",
  },
  {
    id: "abvp",
    en: "Akhil Bharatiya Vidyarthi Parishad (ABVP)",
    hi: "अखिल भारतीय विद्यार्थी परिषद",
    focus: { en: "Student union", hi: "छात्र संघ" },
    detail:
      "Founded 1949, ABVP is one of India's largest student organisations, active in college and university politics nationwide, contesting student union elections and campus advocacy.",
  },
  {
    id: "bms",
    en: "Bharatiya Mazdoor Sangh (BMS)",
    hi: "भारतीय मजदूर संघ",
    focus: { en: "Trade union / labour", hi: "श्रमिक संघ" },
    detail:
      "Founded 1955, BMS describes itself as India's largest trade union by membership claims, representing workers' interests with a stated nationalist (rather than Marxist-internationalist) labour framing, distinguishing it from older Left-aligned unions.",
  },
  {
    id: "vkka",
    en: "Akhil Bharatiya Vanvasi Kalyan Ashram",
    hi: "अखिल भारतीय वनवासी कल्याण आश्रम",
    focus: { en: "Tribal welfare — schools and health services in tribal areas", hi: "जनजातीय कल्याण — विद्यालय और स्वास्थ्य सेवाएँ" },
    detail:
      "Founded 1952, this affiliate runs schools, hostels, and health services specifically in tribal (Adivasi) regions of India, framed as welfare and cultural-integration work among some of the country's most under-served populations.",
  },
  {
    id: "seva-bharati",
    en: "Seva Bharati / Rashtriya Sewa Bharati",
    hi: "सेवा भारती / राष्ट्रीय सेवा भारती",
    focus: { en: "Healthcare, education, and social-welfare projects among the poor", hi: "गरीबों के बीच स्वास्थ्य, शिक्षा और सामाजिक-कल्याण परियोजनाएँ" },
    detail:
      "Founded 1979 by then-Sarsanghchalak Madhukar Deoras, this is the organisation's primary disaster-relief and welfare arm — the entity behind the Gujarat 2001, Kerala 2018, and COVID-19 2020 relief work documented on the Achievements page. It reports roughly 2 lakh volunteers and over 40,000 combined programmes/projects nationally.",
  },
  {
    id: "vidya-bharati",
    en: "Vidya Bharati",
    hi: "विद्या भारती",
    focus: { en: "Network of schools", hi: "विद्यालयों का नेटवर्क" },
    detail:
      "Founded 1977, Vidya Bharati operates one of India's largest private school networks — reportedly tens of thousands of schools — teaching a curriculum that blends standard subjects with what the organisation describes as Indian cultural and value education.",
  },
  {
    id: "bajrang-dal",
    en: "Bajrang Dal",
    hi: "बजरंग दल",
    focus: { en: "Youth wing", hi: "युवा शाखा" },
    flag: {
      en: "Regularly linked in mainstream reporting to hardline/militant activism — noted here rather than presenting only its stated mission.",
      hi: "मुख्यधारा की रिपोर्टिंग में अक्सर कट्टरपंथी/उग्रवादी गतिविधि से जुड़ा।",
    },
    detail:
      "Founded 1984 as VHP's youth wing, Bajrang Dal describes its mission as Hindu youth mobilisation and cow protection. It's the Sangh Parivar affiliate most frequently covered in mainstream and international reporting for involvement in communal violence, vigilante 'anti-conversion' and 'anti-romeo' actions, and hardline street activism — presented here alongside its stated mission rather than in place of it, per the source material's own guidance.",
  },
  {
    id: "swadeshi-jagran-manch",
    en: "Swadeshi Jagran Manch",
    hi: "स्वदेशी जागरण मंच",
    focus: { en: "Economic self-reliance advocacy", hi: "आर्थिक आत्मनिर्भरता की वकालत" },
    detail:
      "Founded 1991, in direct response to India's economic liberalisation that year, this affiliate advocates economic self-reliance (swadeshi) and has at times publicly opposed specific foreign-investment and trade-liberalisation policies, including under BJP governments.",
  },
  {
    id: "ekal-vidyalaya",
    en: "Ekal Vidyalaya",
    hi: "एकल विद्यालय",
    focus: { en: "Single-teacher rural schools", hi: "एकल-शिक्षक ग्रामीण विद्यालय" },
    detail:
      "A network of single-teacher one-room schools in rural and tribal villages lacking formal school access, reportedly numbering in the tens of thousands nationally, run through a mix of RSS-affiliated and independent NGO structures internationally.",
  },
  {
    id: "hss",
    en: "Hindu Swayamsevak Sangh",
    hi: "हिन्दू स्वयंसेवक संघ",
    focus: { en: "Overseas diaspora chapter", hi: "प्रवासी शाखा" },
    detail:
      "HSS is RSS's overseas diaspora chapter, running its own shakha-style local meetings for the Indian diaspora in the US, UK, and other countries with significant Hindu-Indian populations.",
  },
];

export default function SanghParivarPage() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = AFFILIATES.find((a) => a.id === activeId);

  return (
    <div
      style={
        {
          ...DIRECTIONS.civicTech,
          backgroundImage: "radial-gradient(rgba(18,41,74,0.08) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        } as React.CSSProperties
      }
      className="min-h-screen"
    >
      <section className="px-6 py-16 sm:px-10">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs uppercase tracking-[0.3em]" style={{ color: "var(--accent)" }}>
            <ScrambleText en="Sangh Parivar" hi="संघ परिवार" />
          </p>
          <h1 className="mt-2 text-4xl font-bold" style={{ fontFamily: "var(--heading-font)" }}>
            <ScrambleText en="Affiliated organisations" hi="संबद्ध संगठन" />
          </h1>
          <p className="mt-4 max-w-2xl text-base opacity-70">
            <ScrambleText
              en="The wider family of organisations is reportedly 2,500+ strong. Listed here are the major ones — click any card for more. Source: Wikipedia — Sangh Parivar; Seva Bharati."
              hi="व्यापक परिवार में कथित रूप से २,५००+ संगठन हैं। यहाँ प्रमुख संगठन सूचीबद्ध हैं। स्रोत: विकिपीडिया — संघ परिवार; सेवा भारती।"
            />
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {AFFILIATES.map((a, i) => (
              <Reveal key={a.id} delay={(i % 3) * 0.06}>
                <TiltCard
                  className="h-full rounded-xl border p-5"
                  style={{ borderColor: "var(--border)", background: "#fff" } as React.CSSProperties}
                >
                  <button onClick={() => setActiveId(a.id)} className="block w-full text-left">
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
                    <p className="mt-3 text-xs opacity-50" style={{ color: "var(--accent)" }}>
                      Tap for more →
                    </p>
                  </button>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <IdeaBox open={!!active} onClose={() => setActiveId(null)} eyebrow={active ? active.focus.en : undefined} title={active?.en ?? ""}>
        <p>{active?.detail}</p>
      </IdeaBox>
    </div>
  );
}

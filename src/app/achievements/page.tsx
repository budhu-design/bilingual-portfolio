"use client";

import { useState } from "react";
import { Reveal, ScrambleText, Timeline } from "@/components/anim-kit";
import { IdeaBox } from "@/components/site/IdeaBox";
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

const DETAILS: Record<string, { paragraphs: string[]; sources: string }> = {
  "1971–84": {
    paragraphs: [
      "Three separate disasters, each with RSS volunteer participation documented in general histories of the organisation rather than detailed independently: the 1971 Odisha cyclone, the 1977 Andhra Pradesh cyclone, and the 1984 Bhopal gas leak — one of the worst industrial disasters in history, where thousands died from methyl isocyanate gas exposure at the Union Carbide plant.",
      "Public reporting from this era is thinner than for later disasters (Gujarat 2001 onward), largely because organised, well-documented NGO disaster response as a distinct beat of Indian journalism matured significantly after 2001.",
    ],
    sources: "Wikipedia — Rashtriya Swayamsevak Sangh (general summary; no granular independent sourcing available for this period).",
  },
  "2001": {
    paragraphs: [
      "The 26 January 2001 Gujarat earthquake (magnitude 7.7, epicentre near Bhuj) killed an estimated 20,000+ people. RSS mobilised what's reported as its largest disaster-relief effort to that point: approximately 35,000 uniformed volunteers involved in search and rescue, mass cremation of the dead, running free community kitchens, and — in the following months — village reconstruction work.",
      "This response is frequently cited by the organisation and sympathetic sources as a turning point that established Seva Bharati's disaster-relief credibility at national scale.",
    ],
    sources: "Wikipedia — Rashtriya Swayamsevak Sangh.",
  },
  "2013": {
    paragraphs: [
      "The June 2013 Uttarakhand floods (triggered by a cloudburst near Kedarnath) killed over 5,000 people by some estimates and stranded tens of thousands of pilgrims. RSS volunteers set up relief offices in affected areas to coordinate aid and, per organisation-affiliated accounts, assisted with search operations in the difficult mountain terrain.",
      "Independent, granular verification of the specific scale of this particular response is limited in general-audience sourcing.",
    ],
    sources: "Wikipedia — Rashtriya Swayamsevak Sangh.",
  },
  "2018": {
    paragraphs: [
      "The August 2018 Kerala floods were the state's worst in nearly a century. Seva Bharati is reported to have supplied relief material — rice, milk, cooking oil, medicine — with one specific instance valued at roughly ₹1 crore, per Deccan Herald's reporting on a Seva Bharati Karnataka relief consignment.",
      "Kerala is also one of the states with the highest current shakha density nationally (~5,142 as of March 2025), which the organisation's own materials frame as relevant context for its relief capacity there.",
    ],
    sources: "Deccan Herald — Seva Bharati relief materials to flood victims.",
  },
  "2020": {
    paragraphs: [
      "During the 2020 COVID-19 lockdown, Seva Bharati ran what's described as large-scale relief distribution nationwide — food, and in some regions medical support. One widely reported instance involved a Muslim woman in Jammu & Kashmir donating her Hajj pilgrimage savings to Seva Bharati's relief effort, cited by sympathetic sources as evidence of cross-community goodwill during the crisis.",
      "Independent reporting took a more mixed view: Caravan Magazine's investigation examined how RSS-affiliated relief work intersected with local government administration during this period, raising questions about the boundary between voluntary civil-society response and state coordination that are worth reading alongside the organisation's own framing.",
    ],
    sources: "Caravan Magazine — independent examination of COVID-era relief work; organisation-affiliated sources for the Hajj-savings account.",
  },
};

export default function AchievementsPage() {
  const [active, setActive] = useState<string | null>(null);
  const activeEvent = RELIEF.find((r) => r.year === active);
  const activeDetail = active ? DETAILS[active] : null;

  return (
    <div
      style={
        {
          ...DIRECTIONS.letterpress,
          "--timeline-accent": "#A8695C",
          "--timeline-text": "#1B1F2A",
          "--timeline-ring": "#EDE3D0",
        } as React.CSSProperties
      }
      className="min-h-screen"
    >
      <section className="px-6 py-16 sm:px-10">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm uppercase tracking-[0.3em]" style={{ color: "var(--accent2)" }}>
            <ScrambleText en="Achievements & Social Work" hi="उपलब्धियाँ और सामाजिक कार्य" />
          </p>
          <h1 className="mt-2 text-4xl font-semibold" style={{ fontFamily: "var(--heading-font)" }}>
            <ScrambleText en="Documented service" hi="दर्ज सेवा" />
          </h1>
          <p className="mt-4 leading-relaxed opacity-80">
            <ScrambleText
              en="Disaster relief and welfare activity attributed to the organisation and its affiliates, spanning five decades. Click any entry for the fuller account. Figures from RSS-affiliated sources are labelled organisation-reported, distinct from independently verified figures — standard practice for NGO statistics of any political stripe."
              hi="संगठन और इसकी सहयोगी संस्थाओं से जुड़ी आपदा राहत और कल्याण गतिविधि, पाँच दशकों में फैली हुई। पूरा विवरण देखने के लिए किसी भी प्रविष्टि पर क्लिक करें।"
            />
          </p>
        </div>
      </section>

      <Reveal>
        <section className="px-6 py-8 sm:px-10">
          <div className="mx-auto max-w-3xl">
            <Timeline events={RELIEF} onEventClick={(e) => setActive(e.year)} />
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="px-6 pb-24 sm:px-10">
          <div className="mx-auto max-w-3xl rounded-xl border p-6" style={{ borderColor: "var(--border)" }}>
            <p className="text-sm uppercase tracking-widest" style={{ color: "var(--accent2)" }}>
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

      <IdeaBox
        open={!!activeEvent && !!activeDetail}
        onClose={() => setActive(null)}
        eyebrow={activeEvent?.year}
        title={activeEvent?.en ?? ""}
      >
        {activeDetail?.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
        {activeDetail && <p className="pt-2 text-xs opacity-50">Sources: {activeDetail.sources}</p>}
      </IdeaBox>
    </div>
  );
}

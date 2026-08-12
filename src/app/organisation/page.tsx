"use client";

import { useState } from "react";
import { Reveal, ScrambleText, OrgChart } from "@/components/anim-kit";
import { IdeaBox } from "@/components/site/IdeaBox";
import { DIRECTIONS } from "@/lib/directions";

// Biggest to smallest — Prant (national/province level) down to Shakha
// (the base daily meeting), matching how authority actually flows down.
const TIERS = [
  { level: "Prant", hi: "प्रांत", note: "Multiple Sambhaags — province level; 46 nationally" },
  { level: "Sambhaag", hi: "संभाग", note: "5–15 Vibhaags — roughly a division" },
  { level: "Vibhaag", hi: "विभाग", note: "Multiple Zilas" },
  { level: "Zila", hi: "ज़िला", note: "Multiple Nagars — roughly a district" },
  { level: "Nagar", hi: "नगर", note: "5–10 Mandals" },
  { level: "Mandal", hi: "मंडल", note: "3–10 Shakhas" },
  { level: "Shakha", hi: "शाखा", note: "Smallest unit; a local daily branch meeting" },
];

type Leader = { id: string; name: string; role: string; years: string; bio: string };

const LEADERS: Leader[] = [
  {
    id: "hedgewar",
    name: "K. B. Hedgewar",
    role: "1st Sarsanghchalak",
    years: "1925–1940",
    bio: "Keshav Baliram Hedgewar (1889–1940) founded the organisation on 27 September 1925 in Nagpur. A physician by training, he envisioned a volunteer-based body built around daily local meetings (shakhas) rather than a conventional membership structure.",
  },
  {
    id: "golwalkar",
    name: "M. S. Golwalkar",
    role: "2nd Sarsanghchalak",
    years: "1940–1973",
    bio: "Madhav Sadashiv Golwalkar (1906–1973) is the organisation's longest-serving chief at 33 years. He wrote several of its foundational ideological texts and led it through the three periods it was banned (1948, and the run-up to 1975).",
  },
  {
    id: "deoras",
    name: "Madhukar Dattatraya “Balasaheb” Deoras",
    role: "3rd Sarsanghchalak",
    years: "1973–1994",
    bio: "Madhukar Dattatraya Deoras (1915–1996) pushed the organisation toward more visible social-service work during his tenure, including founding Seva Bharati in 1979 — the welfare-and-relief arm still active today.",
  },
  {
    id: "rajju-bhaiya",
    name: "Rajendra Singh “Rajju Bhaiya”",
    role: "4th Sarsanghchalak",
    years: "1994–2000",
    bio: "Rajendra Singh (1922–2003), known as Rajju Bhaiya, was a former physics professor before becoming the 4th Sarsanghchalak — a comparatively short six-year tenure between Deoras and Sudarshan.",
  },
  {
    id: "sudarshan",
    name: "K. S. Sudarshan",
    role: "5th Sarsanghchalak",
    years: "2000–2009",
    bio: "Kupahalli Sitaramayya Sudarshan (1931–2012) led the organisation through the 2000s, including the period around the 2001 Gujarat earthquake relief effort.",
  },
  {
    id: "bhagwat",
    name: "Mohan Bhagwat",
    role: "6th Sarsanghchalak (current)",
    years: "2009–present",
    bio: "Mohan Bhagwat (b. 1950) has served as Sarsanghchalak since 21 March 2009, the longest current continuous tenure since Golwalkar. He leads the organisation through its 2025 centenary.",
  },
  {
    id: "hosabale",
    name: "Dattatreya Hosabale",
    role: "Sarkaryavah (General Secretary)",
    years: "Current",
    bio: "Dattatreya Hosabale is the current Sarkaryavah — the administrative counterpart to the Sarsanghchalak, handling day-to-day organisation alongside the Kendriya Karyakari Mandal (central working committee). The role is distinct from the chief: Sarsanghchalak is the ideological/ceremonial head, Sarkaryavah runs operations.",
  },
];

export default function OrganisationPage() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = LEADERS.find((l) => l.id === activeId);

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
        <div className="mx-auto max-w-4xl">
          <p className="text-sm uppercase tracking-[0.3em]" style={{ color: "var(--accent)" }}>
            <ScrambleText en="Organisational structure" hi="संगठनात्मक संरचना" />
          </p>
          <h1 className="mt-2 text-4xl font-bold" style={{ fontFamily: "var(--heading-font)" }}>
            <ScrambleText en="How it's organised" hi="यह कैसे संगठित है" />
          </h1>
          <p className="mt-4 max-w-2xl text-base opacity-70">
            <ScrambleText
              en="Seven tiers connect a local daily meeting to national leadership. Sources: HW News structural explainer; Business Standard centenary data."
              hi="सात स्तर एक स्थानीय दैनिक बैठक को राष्ट्रीय नेतृत्व से जोड़ते हैं। स्रोत: HW News संरचनात्मक व्याख्याता; Business Standard शताब्दी डेटा।"
            />
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <button
              onClick={() => setActiveId("bhagwat")}
              className="rounded-xl border p-5 text-left transition-shadow hover:shadow-lg"
              style={{ borderColor: "var(--border)", background: "#fff" }}
            >
              <p className="text-sm uppercase tracking-widest" style={{ color: "var(--accent)" }}>
                Sarsanghchalak (chief)
              </p>
              <p className="mt-1 text-lg font-medium">Mohan Bhagwat</p>
              <p className="text-xs opacity-60">Since 21 March 2009 · 6th chief</p>
            </button>
            <button
              onClick={() => setActiveId("hosabale")}
              className="rounded-xl border p-5 text-left transition-shadow hover:shadow-lg"
              style={{ borderColor: "var(--border)", background: "#fff" }}
            >
              <p className="text-sm uppercase tracking-widest" style={{ color: "var(--accent2)" }}>
                Sarkaryavah (general secretary)
              </p>
              <p className="mt-1 text-lg font-medium">Dattatreya Hosabale</p>
              <p className="text-xs opacity-60">Handles administration with the Kendriya Karyakari Mandal</p>
            </button>
          </div>
        </div>
      </section>

      <Reveal>
        <section className="px-6 py-8 sm:px-10">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-4 text-lg font-semibold" style={{ fontFamily: "var(--heading-font)" }}>
              Explore the hierarchy
            </h2>
            <p className="mb-4 text-sm opacity-60">
              A representative slice, compressed to 4 levels for a usable chart — Prant and Zila names are real
              administrative units, but leaf &quot;Shakha&quot; nodes are illustrative placeholders, not a claim about
              specific real local branches. See the full tier table below for the actual structure.
            </p>
            <OrgChart />
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="px-6 py-16 sm:px-10">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-4 text-lg font-semibold" style={{ fontFamily: "var(--heading-font)" }}>
              Full tier structure
            </h2>
            <div className="overflow-x-auto rounded-xl border" style={{ borderColor: "var(--border)" }}>
              <table className="w-full text-left text-sm">
                <thead>
                  <tr style={{ background: "rgba(18,41,74,0.05)" }}>
                    <th className="px-4 py-2 font-medium">Level</th>
                    <th className="px-4 py-2 font-medium">Composition</th>
                  </tr>
                </thead>
                <tbody>
                  {TIERS.map((t) => (
                    <tr
                      key={t.level}
                      className="border-t transition-colors hover:bg-[rgba(18,41,74,0.05)]"
                      style={{ borderColor: "var(--border)" }}
                    >
                      <td className="px-4 py-2 font-medium">
                        {t.level} <span className="opacity-50">{t.hi}</span>
                      </td>
                      <td className="px-4 py-2 opacity-70">{t.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm opacity-60">
              The head/chief instructor of a Shakha is the <strong>Mukhya Shikshak</strong>. As of March 2025, RSS
              reported <strong>83,129 shakhas</strong> nationwide (up from 73,117 in March 2024), with Uttar Pradesh
              (~8,000), Kerala (~5,142), and Maharashtra (~4,000) leading in count. Figures are organisation-reported.
            </p>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="px-6 pb-24 sm:px-10">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-2 text-lg font-semibold" style={{ fontFamily: "var(--heading-font)" }}>
              Sarsanghchalaks to date
            </h2>
            <p className="mb-4 text-sm opacity-60">Click any name for a fuller biographical note.</p>
            <ol className="space-y-2 text-sm">
              {LEADERS.filter((l) => l.id !== "hosabale").map((l, i) => (
                <li key={l.id}>
                  <button
                    onClick={() => setActiveId(l.id)}
                    className="flex w-full items-center justify-between rounded-lg border px-4 py-3 text-left transition-shadow hover:shadow-md"
                    style={{ borderColor: "var(--border)", background: "#fff" }}
                  >
                    <span>
                      {i + 1}. {l.name}
                    </span>
                    <span className="opacity-60">{l.years}</span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </Reveal>

      <IdeaBox open={!!active} onClose={() => setActiveId(null)} eyebrow={active?.role} title={active?.name ?? ""}>
        <p>{active?.bio}</p>
        <p className="pt-2 text-xs opacity-50">Source: Wikipedia — List of leaders of the Rashtriya Swayamsevak Sangh; individual leader pages.</p>
      </IdeaBox>
    </div>
  );
}

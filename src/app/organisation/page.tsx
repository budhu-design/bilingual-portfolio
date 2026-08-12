"use client";

import { Reveal, ScrambleText, OrgChart } from "@/components/anim-kit";
import { DIRECTIONS } from "@/lib/directions";

const TIERS = [
  { level: "Shakha", hi: "शाखा", note: "Smallest unit; a local daily branch meeting" },
  { level: "Mandal", hi: "मंडल", note: "3–10 Shakhas" },
  { level: "Nagar", hi: "नगर", note: "5–10 Mandals" },
  { level: "Zila", hi: "ज़िला", note: "Multiple Nagars — roughly a district" },
  { level: "Vibhaag", hi: "विभाग", note: "Multiple Zilas" },
  { level: "Sambhaag", hi: "संभाग", note: "5–15 Vibhaags — roughly a division" },
  { level: "Prant", hi: "प्रांत", note: "Multiple Sambhaags — province level; 46 nationally" },
];

const CHIEFS = [
  { name: "K. B. Hedgewar", years: "1925–1940" },
  { name: "M. S. Golwalkar", years: "1940–1973" },
  { name: "Madhukar Dattatraya “Balasaheb” Deoras", years: "1973–1994" },
  { name: "Rajendra Singh “Rajju Bhaiya”", years: "1994–2000" },
  { name: "K. S. Sudarshan", years: "2000–2009" },
  { name: "Mohan Bhagwat", years: "2009–present" },
];

export default function OrganisationPage() {
  return (
    <div style={DIRECTIONS.civicTech as React.CSSProperties} className="min-h-screen">
      <section className="px-6 py-16 sm:px-10">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs uppercase tracking-[0.3em]" style={{ color: "var(--accent)" }}>
            <ScrambleText en="Organisational structure" hi="संगठनात्मक संरचना" />
          </p>
          <h1 className="mt-2 text-4xl font-bold" style={{ fontFamily: "var(--heading-font)" }}>
            <ScrambleText en="How it's organised" hi="यह कैसे संगठित है" />
          </h1>
          <p className="mt-4 max-w-2xl text-sm opacity-70">
            <ScrambleText
              en="Seven tiers connect a local daily meeting to national leadership. Sources: HW News structural explainer; Business Standard centenary data."
              hi="सात स्तर एक स्थानीय दैनिक बैठक को राष्ट्रीय नेतृत्व से जोड़ते हैं। स्रोत: HW News संरचनात्मक व्याख्याता; Business Standard शताब्दी डेटा।"
            />
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border p-5" style={{ borderColor: "var(--border)", background: "#fff" }}>
              <p className="text-xs uppercase tracking-widest" style={{ color: "var(--accent)" }}>
                Sarsanghchalak (chief)
              </p>
              <p className="mt-1 text-lg font-medium">Mohan Bhagwat</p>
              <p className="text-xs opacity-60">Since 21 March 2009 · 6th chief</p>
            </div>
            <div className="rounded-xl border p-5" style={{ borderColor: "var(--border)", background: "#fff" }}>
              <p className="text-xs uppercase tracking-widest" style={{ color: "var(--accent2)" }}>
                Sarkaryavah (general secretary)
              </p>
              <p className="mt-1 text-lg font-medium">Dattatreya Hosabale</p>
              <p className="text-xs opacity-60">Handles administration with the Kendriya Karyakari Mandal</p>
            </div>
          </div>
        </div>
      </section>

      <Reveal>
        <section className="px-6 py-8 sm:px-10">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-4 text-lg font-semibold" style={{ fontFamily: "var(--heading-font)" }}>
              Explore the hierarchy
            </h2>
            <p className="mb-4 text-xs opacity-60">
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
                    <tr key={t.level} className="border-t" style={{ borderColor: "var(--border)" }}>
                      <td className="px-4 py-2 font-medium">
                        {t.level} <span className="opacity-50">{t.hi}</span>
                      </td>
                      <td className="px-4 py-2 opacity-70">{t.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs opacity-60">
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
            <h2 className="mb-4 text-lg font-semibold" style={{ fontFamily: "var(--heading-font)" }}>
              Sarsanghchalaks to date
            </h2>
            <ol className="space-y-2 text-sm">
              {CHIEFS.map((c, i) => (
                <li
                  key={c.name}
                  className="flex items-center justify-between rounded-lg border px-4 py-2"
                  style={{ borderColor: "var(--border)", background: "#fff" }}
                >
                  <span>
                    {i + 1}. {c.name}
                  </span>
                  <span className="opacity-60">{c.years}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </Reveal>
    </div>
  );
}

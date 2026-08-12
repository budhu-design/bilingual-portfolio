import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getSessionProfile } from "@/lib/members/session";
import { DIRECTIONS } from "@/lib/directions";
import type { Profile, Subgroup } from "@/lib/members/types";

export default async function MembersDirectory({ searchParams }: { searchParams: { subgroup?: string } }) {
  const { user, profile } = await getSessionProfile();
  if (!user) redirect("/portal/login");
  if (!profile || profile.status !== "approved") redirect("/portal");

  const supabase = createClient();
  const subgroupId = searchParams.subgroup || profile.subgroup_current_id || "";

  const [{ data: subgroups }, { data: members }] = await Promise.all([
    supabase.from("subgroups").select("*").returns<Subgroup[]>(),
    supabase
      .from("profiles")
      .select("id, official_name, photo_url, work_type, subgroup_current_id, status")
      .eq("status", "approved")
      .returns<Pick<Profile, "id" | "official_name" | "photo_url" | "work_type" | "subgroup_current_id" | "status">[]>(),
  ]);

  const filtered = subgroupId ? (members ?? []).filter((m) => m.subgroup_current_id === subgroupId) : members ?? [];

  return (
    <div style={DIRECTIONS.civicTech as React.CSSProperties} className="min-h-screen">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:px-10">
        <p className="text-xs uppercase tracking-[0.3em]" style={{ color: "var(--accent)" }}>
          Members Portal
        </p>
        <h1 className="mt-2 text-2xl font-semibold" style={{ fontFamily: "var(--heading-font)" }}>
          Members directory
        </h1>
        <p className="mt-2 text-sm opacity-60">
          Public profile info only — sensitive fields (religion, gender, DOB) are never shown here.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          <a
            href="/portal/members"
            className="rounded-full border px-3 py-1 text-xs"
            style={
              !subgroupId
                ? { borderColor: "var(--accent)", color: "var(--accent)" }
                : { borderColor: "var(--border)", opacity: 0.6 }
            }
          >
            All
          </a>
          {subgroups?.map((s) => (
            <a
              key={s.id}
              href={`/portal/members?subgroup=${s.id}`}
              className="rounded-full border px-3 py-1 text-xs"
              style={
                subgroupId === s.id
                  ? { borderColor: "var(--accent)", color: "var(--accent)" }
                  : { borderColor: "var(--border)", opacity: 0.6 }
              }
            >
              {s.name}
            </a>
          ))}
        </div>

        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {filtered.map((m) => (
            <li key={m.id}>
              <a
                href={`/portal/members/${m.id}`}
                className="flex items-center gap-3 rounded-xl border p-3 transition-colors hover:border-[color:var(--accent)]"
                style={{ borderColor: "var(--border)", background: "#fff" }}
              >
                {m.photo_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={m.photo_url} alt="" className="h-10 w-10 rounded-full object-cover" />
                ) : (
                  <div className="h-10 w-10 rounded-full" style={{ background: "rgba(232,121,44,0.15)" }} />
                )}
                <div>
                  <p className="text-sm font-medium">{m.official_name}</p>
                  {m.work_type && <p className="text-xs opacity-60">{m.work_type}</p>}
                </div>
              </a>
            </li>
          ))}
          {filtered.length === 0 && <p className="text-sm opacity-60">No members in this subgroup yet.</p>}
        </ul>
      </div>
    </div>
  );
}

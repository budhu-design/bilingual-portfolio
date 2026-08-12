import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getSessionProfile } from "@/lib/members/session";
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
    <div className="mx-auto max-w-3xl px-6 py-16 sm:px-10">
      <p className="text-xs uppercase tracking-[0.3em] text-[#c8a24e]">Members Portal</p>
      <h1 className="mt-2 text-2xl font-semibold text-[#f6f3ec]">Members directory</h1>
      <p className="mt-2 text-sm text-[#f6f3ec]/50">
        Public profile info only — sensitive fields (religion, gender, DOB) are never shown here.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        <a
          href="/portal/members"
          className={`rounded-full border px-3 py-1 text-xs ${!subgroupId ? "border-[#c8a24e] text-[#c8a24e]" : "border-white/15 text-[#f6f3ec]/60"}`}
        >
          All
        </a>
        {subgroups?.map((s) => (
          <a
            key={s.id}
            href={`/portal/members?subgroup=${s.id}`}
            className={`rounded-full border px-3 py-1 text-xs ${subgroupId === s.id ? "border-[#c8a24e] text-[#c8a24e]" : "border-white/15 text-[#f6f3ec]/60"}`}
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
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3 transition-colors hover:border-white/25"
            >
              {m.photo_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={m.photo_url} alt="" className="h-10 w-10 rounded-full object-cover" />
              ) : (
                <div className="h-10 w-10 rounded-full bg-[#c8a24e]/20" />
              )}
              <div>
                <p className="text-sm font-medium text-[#f6f3ec]">{m.official_name}</p>
                {m.work_type && <p className="text-xs text-[#f6f3ec]/50">{m.work_type}</p>}
              </div>
            </a>
          </li>
        ))}
        {filtered.length === 0 && <p className="text-sm text-[#f6f3ec]/50">No members in this subgroup yet.</p>}
      </ul>
    </div>
  );
}

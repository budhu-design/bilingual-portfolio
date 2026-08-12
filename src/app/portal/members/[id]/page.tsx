import { redirect, notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getSessionProfile } from "@/lib/members/session";
import { tierForPoints, totalPoints } from "@/lib/members/ranking";
import type { MemberProject, Profile, Subgroup } from "@/lib/members/types";

export default async function MemberProfilePage({ params }: { params: { id: string } }) {
  const { user, profile: viewer } = await getSessionProfile();
  if (!user) redirect("/portal/login");
  if (!viewer || viewer.status !== "approved") redirect("/portal");

  const supabase = createClient();
  const { data: member } = await supabase
    .from("profiles")
    .select("id, official_name, photo_url, work_type, education, role_contribution, subgroup_current_id, status")
    .eq("id", params.id)
    .eq("status", "approved")
    .maybeSingle<Pick<Profile, "id" | "official_name" | "photo_url" | "work_type" | "education" | "role_contribution" | "subgroup_current_id" | "status">>();

  if (!member) notFound();

  const [{ data: subgroup }, { data: participations }] = await Promise.all([
    member.subgroup_current_id
      ? supabase.from("subgroups").select("*").eq("id", member.subgroup_current_id).maybeSingle<Subgroup>()
      : Promise.resolve({ data: null }),
    supabase
      .from("member_project_participants")
      .select("project:member_projects(*)")
      .eq("profile_id", member.id)
      .returns<{ project: MemberProject }[]>(),
  ]);

  const projects = (participations ?? []).map((p) => p.project).filter(Boolean);
  const points = totalPoints(projects.map((p) => p.points));
  const tier = tierForPoints(points);

  return (
    <div className="mx-auto max-w-2xl px-6 py-16 sm:px-10">
      <a href="/portal/members" className="text-sm text-[#c8a24e] underline">
        ← Back to directory
      </a>
      <div className="mt-4 flex items-center gap-4">
        {member.photo_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={member.photo_url} alt="" className="h-16 w-16 rounded-full object-cover" />
        ) : (
          <div className="h-16 w-16 rounded-full bg-[#c8a24e]/20" />
        )}
        <div>
          <h1 className="text-2xl font-semibold text-[#f6f3ec]">{member.official_name}</h1>
          <p className="text-sm text-[#f6f3ec]/50">
            {subgroup?.name ?? "No subgroup"} · {tier.name} ({points} pts)
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm text-[#f6f3ec]/70">
        <p>Work type: {member.work_type || "—"}</p>
        <p className="mt-1">Education: {member.education || "—"}</p>
        <p className="mt-1">Role / contribution: {member.role_contribution || "—"}</p>
      </div>

      <div className="mt-8">
        <h2 className="mb-3 text-lg font-semibold text-[#f6f3ec]">Projects & activities</h2>
        {projects.length === 0 ? (
          <p className="text-sm text-[#f6f3ec]/50">No projects yet.</p>
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2">
            {projects.map((p) => (
              <li key={p.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-widest text-[#c8a24e]">
                  {new Date(p.activity_date).toLocaleDateString()}
                </p>
                <p className="mt-1 font-medium text-[#f6f3ec]">{p.title}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

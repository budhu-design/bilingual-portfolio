import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getSessionProfile } from "@/lib/members/session";
import { tierForPoints, totalPoints } from "@/lib/members/ranking";
import { DIRECTIONS } from "@/lib/directions";
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
    <div style={DIRECTIONS.civicTech as React.CSSProperties} className="min-h-screen">
      <div className="mx-auto max-w-2xl px-6 py-16 sm:px-10">
        <Link href="/portal/members" className="text-sm underline" style={{ color: "var(--accent)" }}>
          ← Back to directory
        </Link>
        <div className="mt-4 flex items-center gap-4">
          {member.photo_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={member.photo_url} alt="" className="h-16 w-16 rounded-full object-cover" />
          ) : (
            <div className="h-16 w-16 rounded-full" style={{ background: "rgba(232,121,44,0.15)" }} />
          )}
          <div>
            <h1 className="text-2xl font-semibold" style={{ fontFamily: "var(--heading-font)" }}>
              {member.official_name}
            </h1>
            <p className="text-sm opacity-60">
              {subgroup?.name ?? "No subgroup"} · {tier.name} ({points} pts)
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border p-5 text-sm opacity-80" style={{ borderColor: "var(--border)", background: "#fff" }}>
          <p>Work type: {member.work_type || "—"}</p>
          <p className="mt-1">Education: {member.education || "—"}</p>
          <p className="mt-1">Role / contribution: {member.role_contribution || "—"}</p>
        </div>

        <div className="mt-8">
          <h2 className="mb-3 text-lg font-semibold" style={{ fontFamily: "var(--heading-font)" }}>
            Projects &amp; activities
          </h2>
          {projects.length === 0 ? (
            <p className="text-sm opacity-60">No projects yet.</p>
          ) : (
            <ul className="grid gap-3 sm:grid-cols-2">
              {projects.map((p) => (
                <li key={p.id} className="rounded-xl border p-4" style={{ borderColor: "var(--border)", background: "#fff" }}>
                  <p className="text-sm uppercase tracking-widest" style={{ color: "var(--accent)" }}>
                    {new Date(p.activity_date).toLocaleDateString()}
                  </p>
                  <p className="mt-1 font-medium">{p.title}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

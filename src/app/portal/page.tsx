import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getSessionProfile } from "@/lib/members/session";
import { tierForPoints, nextTier, totalPoints } from "@/lib/members/ranking";
import { logOutAction } from "./actions";
import { DIRECTIONS } from "@/lib/directions";
import type { MemberProject, Subgroup } from "@/lib/members/types";

export default async function PortalDashboard() {
  const { user, profile } = await getSessionProfile();
  if (!user) redirect("/portal/login");

  if (!profile || profile.status !== "approved") {
    return (
      <div style={DIRECTIONS.civicTech as React.CSSProperties} className="min-h-screen">
        <div className="mx-auto max-w-md px-6 py-24 text-center sm:px-10">
          <p className="text-xs uppercase tracking-[0.3em]" style={{ color: "var(--accent)" }}>
            Members Portal
          </p>
          <h1 className="mt-2 text-2xl font-semibold" style={{ fontFamily: "var(--heading-font)" }}>
            {profile?.status === "rejected" ? "Application not approved" : "Application pending review"}
          </h1>
          <p className="mt-3 text-sm opacity-70">
            {profile?.status === "rejected"
              ? "An administrator has reviewed your application and it was not approved. Contact an admin for details."
              : "An administrator needs to review your application before you can access the members portal. This usually doesn't take long."}
          </p>
          <form action={logOutAction} className="mt-6">
            <button className="text-sm underline" style={{ color: "var(--accent)" }}>
              Log out
            </button>
          </form>
        </div>
      </div>
    );
  }

  const supabase = createClient();

  const [{ data: subgroups }, { data: participations }] = await Promise.all([
    supabase.from("subgroups").select("*").returns<Subgroup[]>(),
    supabase
      .from("member_project_participants")
      .select("project:member_projects(*)")
      .eq("profile_id", user.id)
      .returns<{ project: MemberProject }[]>(),
  ]);

  const subgroupMap = new Map((subgroups ?? []).map((s) => [s.id, s]));
  const currentSubgroup = profile.subgroup_current_id ? subgroupMap.get(profile.subgroup_current_id) : null;
  const wishSubgroup = subgroupMap.get(profile.subgroup_wish_id ?? "");

  const projects = (participations ?? []).map((p) => p.project).filter(Boolean);
  const points = totalPoints(projects.map((p) => p.points));
  const tier = tierForPoints(points);
  const next = nextTier(points);

  return (
    <div style={DIRECTIONS.civicTech as React.CSSProperties} className="min-h-screen">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:px-10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em]" style={{ color: "var(--accent)" }}>
              Members Portal
            </p>
            <h1 className="mt-2 text-3xl font-semibold" style={{ fontFamily: "var(--heading-font)" }}>
              {profile.official_name}
            </h1>
          </div>
          <form action={logOutAction}>
            <button className="text-sm underline opacity-60 hover:opacity-100">Log out</button>
          </form>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border p-5" style={{ borderColor: "var(--border)", background: "#fff" }}>
            <p className="text-xs uppercase tracking-widest" style={{ color: "var(--accent)" }}>
              Affiliation
            </p>
            <p className="mt-2 text-sm opacity-80">
              Current subgroup: <span className="font-medium">{currentSubgroup?.name ?? "None yet"}</span>
            </p>
            <p className="mt-1 text-sm opacity-80">
              Wishes to join: <span className="font-medium">{wishSubgroup?.name ?? "—"}</span>
            </p>
          </div>

          <div className="rounded-2xl border p-5" style={{ borderColor: "var(--accent2)", background: "rgba(29,158,117,0.08)" }}>
            <p className="text-xs uppercase tracking-widest" style={{ color: "var(--accent2)" }}>
              Recognition
            </p>
            <p className="mt-2 text-2xl font-semibold">
              {tier.name} <span className="text-sm font-normal opacity-50">{tier.name_hi}</span>
            </p>
            <p className="mt-1 text-sm opacity-70">
              {points} points from {projects.length} project{projects.length === 1 ? "" : "s"}
              {next && ` · ${next.pointsToGo} to ${next.tier.name}`}
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border p-5 text-sm opacity-80" style={{ borderColor: "var(--border)", background: "#fff" }}>
          <p className="mb-2 font-medium opacity-100">Your record</p>
          <p>Education: {profile.education || "—"}</p>
          <p>Work type: {profile.work_type || "—"}</p>
          <p>Role / contribution: {profile.role_contribution || "—"}</p>
          <p className="mt-3 border-t pt-3 text-xs opacity-60" style={{ borderColor: "var(--border)" }}>
            Religion, gender, and date of birth are on file but only visible to you and administrators — see{" "}
            <a href="/portal/settings" className="underline">
              account settings
            </a>{" "}
            to review them.
          </p>
        </div>

        <div className="mt-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold" style={{ fontFamily: "var(--heading-font)" }}>
              My projects &amp; activities
            </h2>
            <a
              href={`/portal/members?subgroup=${profile.subgroup_current_id ?? ""}`}
              className="text-sm underline"
              style={{ color: "var(--accent)" }}
            >
              View subgroup members →
            </a>
          </div>
          {projects.length === 0 ? (
            <p className="text-sm opacity-60">
              No projects yet — an administrator assigns members to activities as they happen.
            </p>
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2">
              {projects
                .sort((a, b) => (a.activity_date < b.activity_date ? 1 : -1))
                .map((p) => (
                  <li key={p.id} className="overflow-hidden rounded-2xl border" style={{ borderColor: "var(--border)", background: "#fff" }}>
                    {p.photos?.[0] && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.photos[0]} alt="" className="h-36 w-full object-cover" />
                    )}
                    <div className="p-4">
                      <p className="text-xs uppercase tracking-widest" style={{ color: "var(--accent)" }}>
                        {new Date(p.activity_date).toLocaleDateString()} · +{p.points} pts
                      </p>
                      <p className="mt-1 font-medium">{p.title}</p>
                      {p.description && <p className="mt-1 text-sm opacity-70">{p.description}</p>}
                    </div>
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

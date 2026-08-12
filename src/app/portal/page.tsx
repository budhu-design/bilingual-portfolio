import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getSessionProfile } from "@/lib/members/session";
import { tierForPoints, nextTier, totalPoints } from "@/lib/members/ranking";
import { logOutAction } from "./actions";
import type { MemberProject, Subgroup } from "@/lib/members/types";

export default async function PortalDashboard() {
  const { user, profile } = await getSessionProfile();
  if (!user) redirect("/portal/login");

  if (!profile || profile.status !== "approved") {
    return (
      <div className="mx-auto max-w-md px-6 py-24 text-center sm:px-10">
        <p className="text-xs uppercase tracking-[0.3em] text-[#c8a24e]">Members Portal</p>
        <h1 className="mt-2 text-2xl font-semibold text-[#f6f3ec]">
          {profile?.status === "rejected" ? "Application not approved" : "Application pending review"}
        </h1>
        <p className="mt-3 text-sm text-[#f6f3ec]/60">
          {profile?.status === "rejected"
            ? "An administrator has reviewed your application and it was not approved. Contact an admin for details."
            : "An administrator needs to review your application before you can access the members portal. This usually doesn't take long."}
        </p>
        <form action={logOutAction} className="mt-6">
          <button className="text-sm text-[#c8a24e] underline">Log out</button>
        </form>
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
    <div className="mx-auto max-w-3xl px-6 py-16 sm:px-10">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[#c8a24e]">Members Portal</p>
          <h1 className="mt-2 text-3xl font-semibold text-[#f6f3ec]">{profile.official_name}</h1>
        </div>
        <form action={logOutAction}>
          <button className="text-sm text-[#f6f3ec]/50 underline hover:text-[#f6f3ec]">Log out</button>
        </form>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <p className="text-xs uppercase tracking-widest text-[#c8a24e]">Affiliation</p>
          <p className="mt-2 text-sm text-[#f6f3ec]/80">
            Current subgroup: <span className="text-[#f6f3ec]">{currentSubgroup?.name ?? "None yet"}</span>
          </p>
          <p className="mt-1 text-sm text-[#f6f3ec]/80">
            Wishes to join: <span className="text-[#f6f3ec]">{wishSubgroup?.name ?? "—"}</span>
          </p>
        </div>

        <div className="rounded-2xl border border-[#c8a24e]/30 bg-[#c8a24e]/10 p-5">
          <p className="text-xs uppercase tracking-widest text-[#c8a24e]">Recognition</p>
          <p className="mt-2 text-2xl font-semibold text-[#f6f3ec]">
            {tier.name} <span className="text-sm font-normal text-[#f6f3ec]/50">{tier.name_hi}</span>
          </p>
          <p className="mt-1 text-sm text-[#f6f3ec]/70">
            {points} points from {projects.length} project{projects.length === 1 ? "" : "s"}
            {next && ` · ${next.pointsToGo} to ${next.tier.name}`}
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm text-[#f6f3ec]/60">
        <p className="mb-2 font-medium text-[#f6f3ec]">Your record</p>
        <p>Education: {profile.education || "—"}</p>
        <p>Work type: {profile.work_type || "—"}</p>
        <p>Role / contribution: {profile.role_contribution || "—"}</p>
        <p className="mt-3 border-t border-white/10 pt-3 text-xs text-[#f6f3ec]/40">
          Religion, gender, and date of birth are on file but only visible to you and administrators — see{" "}
          <a href="/portal/settings" className="underline">
            account settings
          </a>{" "}
          to review them.
        </p>
      </div>

      <div className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#f6f3ec]">My projects & activities</h2>
          <a href={`/portal/members?subgroup=${profile.subgroup_current_id ?? ""}`} className="text-sm text-[#c8a24e] underline">
            View subgroup members →
          </a>
        </div>
        {projects.length === 0 ? (
          <p className="text-sm text-[#f6f3ec]/50">
            No projects yet — an administrator assigns members to activities as they happen.
          </p>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2">
            {projects
              .sort((a, b) => (a.activity_date < b.activity_date ? 1 : -1))
              .map((p) => (
                <li key={p.id} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
                  {p.photos?.[0] && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.photos[0]} alt="" className="h-36 w-full object-cover" />
                  )}
                  <div className="p-4">
                    <p className="text-xs uppercase tracking-widest text-[#c8a24e]">
                      {new Date(p.activity_date).toLocaleDateString()} · +{p.points} pts
                    </p>
                    <p className="mt-1 font-medium text-[#f6f3ec]">{p.title}</p>
                    {p.description && <p className="mt-1 text-sm text-[#f6f3ec]/60">{p.description}</p>}
                  </div>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}

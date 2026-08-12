import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/members/admin";
import { assignMemberAction, removeMemberAction } from "../../actions";
import type { MemberProject, Profile } from "@/lib/members/types";

export default async function ManageProjectPage({ params }: { params: { id: string } }) {
  await requireAdmin();
  const supabase = createClient();

  const [{ data: project }, { data: allMembers }, { data: participants }] = await Promise.all([
    supabase.from("member_projects").select("*").eq("id", params.id).maybeSingle<MemberProject>(),
    supabase
      .from("profiles")
      .select("id, official_name")
      .eq("status", "approved")
      .order("official_name")
      .returns<Pick<Profile, "id" | "official_name">[]>(),
    supabase
      .from("member_project_participants")
      .select("profile_id, profile:profiles(id, official_name)")
      .eq("project_id", params.id)
      .returns<{ profile_id: string; profile: Pick<Profile, "id" | "official_name"> }[]>(),
  ]);

  if (!project) notFound();

  const participantIds = new Set((participants ?? []).map((p) => p.profile_id));
  const available = (allMembers ?? []).filter((m) => !participantIds.has(m.id));

  return (
    <div className="mx-auto max-w-2xl px-6 py-16 sm:px-10">
      <a href="/admin/projects" className="text-sm text-[#c8a24e] underline">
        ← All projects
      </a>
      <h1 className="mt-2 text-2xl font-semibold text-[#f6f3ec]">{project.title}</h1>
      <p className="text-sm text-[#f6f3ec]/50">{project.points} points per participant</p>

      <h2 className="mb-3 mt-8 text-sm font-semibold uppercase tracking-wide text-[#f6f3ec]/70">
        Participants ({participants?.length ?? 0})
      </h2>
      <ul className="space-y-2">
        {participants?.map((p) => (
          <li
            key={p.profile_id}
            className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2"
          >
            <span className="text-sm text-[#f6f3ec]">{p.profile?.official_name}</span>
            <form action={removeMemberAction}>
              <input type="hidden" name="project_id" value={project.id} />
              <input type="hidden" name="profile_id" value={p.profile_id} />
              <button className="text-xs text-[#a63d40] underline">Remove</button>
            </form>
          </li>
        ))}
        {(participants?.length ?? 0) === 0 && <p className="text-sm text-[#f6f3ec]/50">No one assigned yet.</p>}
      </ul>

      <h2 className="mb-3 mt-8 text-sm font-semibold uppercase tracking-wide text-[#f6f3ec]/70">Add a member</h2>
      <form action={assignMemberAction} className="flex gap-2">
        <input type="hidden" name="project_id" value={project.id} />
        <select
          name="profile_id"
          required
          className="flex-1 rounded-lg border border-white/15 bg-white/[0.04] px-3 py-2 text-[#f6f3ec]"
        >
          <option value="" disabled selected>
            Select a member
          </option>
          {available.map((m) => (
            <option key={m.id} value={m.id}>
              {m.official_name}
            </option>
          ))}
        </select>
        <button className="rounded-full bg-[#c8a24e] px-5 py-2 text-sm font-medium text-[#0d0d10]">Add</button>
      </form>
    </div>
  );
}

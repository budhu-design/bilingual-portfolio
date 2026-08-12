import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/members/admin";
import { approveMemberAction, rejectMemberAction } from "../actions";
import type { Profile, ProfileSensitive, Subgroup } from "@/lib/members/types";

export default async function AdminMembersPage() {
  await requireAdmin();
  const supabase = createClient();

  const [{ data: profiles }, { data: sensitive }, { data: subgroups }] = await Promise.all([
    supabase.from("profiles").select("*").order("created_at", { ascending: false }).returns<Profile[]>(),
    supabase.from("profile_sensitive").select("*").returns<ProfileSensitive[]>(),
    supabase.from("subgroups").select("*").returns<Subgroup[]>(),
  ]);

  const sensitiveMap = new Map((sensitive ?? []).map((s) => [s.profile_id, s]));
  const subgroupMap = new Map((subgroups ?? []).map((s) => [s.id, s.name]));
  const pending = (profiles ?? []).filter((p) => p.status === "pending");
  const rest = (profiles ?? []).filter((p) => p.status !== "pending");

  const Row = ({ p }: { p: Profile }) => {
    const s = sensitiveMap.get(p.id);
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-medium text-[#f6f3ec]">{p.official_name}</p>
            <p className="text-xs text-[#f6f3ec]/50">{p.contact_email}</p>
          </div>
          <span
            className={`rounded-full px-3 py-1 text-xs ${
              p.status === "approved"
                ? "bg-[#c8a24e]/15 text-[#c8a24e]"
                : p.status === "rejected"
                  ? "bg-[#a63d40]/15 text-[#a63d40]"
                  : "bg-white/10 text-[#f6f3ec]/60"
            }`}
          >
            {p.status}
          </span>
        </div>

        <div className="mt-3 grid gap-1 text-xs text-[#f6f3ec]/60 sm:grid-cols-2">
          <p>Wishes to join: {subgroupMap.get(p.subgroup_wish_id ?? "") ?? "—"}</p>
          <p>Currently in: {subgroupMap.get(p.subgroup_current_id ?? "") ?? "None"}</p>
          <p>Education: {p.education || "—"}</p>
          <p>Work type: {p.work_type || "—"}</p>
          <p>Religion: {s?.religion || "—"}</p>
          <p>Gender: {s?.gender || "—"}</p>
          <p>DOB: {s?.date_of_birth ? new Date(s.date_of_birth).toLocaleDateString() : "—"}</p>
        </div>
        {p.role_contribution && (
          <p className="mt-2 text-xs text-[#f6f3ec]/50">&quot;{p.role_contribution}&quot;</p>
        )}

        {p.status === "pending" && (
          <div className="mt-4 flex gap-2">
            <form action={approveMemberAction}>
              <input type="hidden" name="id" value={p.id} />
              <button className="rounded-full bg-[#c8a24e] px-4 py-1.5 text-xs font-medium text-[#0d0d10]">
                Approve
              </button>
            </form>
            <form action={rejectMemberAction}>
              <input type="hidden" name="id" value={p.id} />
              <button className="rounded-full border border-[#a63d40]/40 px-4 py-1.5 text-xs text-[#a63d40]">
                Reject
              </button>
            </form>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:px-10">
      <p className="text-sm uppercase tracking-[0.3em] text-[#c8a24e]">Admin</p>
      <h1 className="mt-2 text-2xl font-semibold text-[#f6f3ec]">Member applications</h1>

      <h2 className="mb-3 mt-8 text-sm font-semibold uppercase tracking-wide text-[#f6f3ec]/70">
        Pending ({pending.length})
      </h2>
      <div className="space-y-3">
        {pending.map((p) => (
          <Row key={p.id} p={p} />
        ))}
        {pending.length === 0 && <p className="text-sm text-[#f6f3ec]/50">Nothing pending.</p>}
      </div>

      <h2 className="mb-3 mt-10 text-sm font-semibold uppercase tracking-wide text-[#f6f3ec]/70">All members</h2>
      <div className="space-y-3">
        {rest.map((p) => (
          <Row key={p.id} p={p} />
        ))}
      </div>
    </div>
  );
}

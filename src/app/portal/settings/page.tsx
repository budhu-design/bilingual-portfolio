import { redirect } from "next/navigation";
import { getSessionProfile } from "@/lib/members/session";

export default async function SettingsPage() {
  const { user, profile, sensitive } = await getSessionProfile();
  if (!user) redirect("/portal/login");
  if (!profile) redirect("/portal");

  return (
    <div className="mx-auto max-w-lg px-6 py-16 sm:px-10">
      <p className="text-xs uppercase tracking-[0.3em] text-[#c8a24e]">Members Portal</p>
      <h1 className="mt-2 text-2xl font-semibold text-[#f6f3ec]">Account settings</h1>
      <p className="mt-2 text-sm text-[#f6f3ec]/50">
        This page is visible only to you. These fields are never shown to other members.
      </p>

      <div className="mt-8 space-y-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm">
        <p className="flex justify-between border-b border-white/10 pb-2">
          <span className="text-[#f6f3ec]/50">Email</span>
          <span className="text-[#f6f3ec]">{user.email}</span>
        </p>
        <p className="flex justify-between border-b border-white/10 pb-2">
          <span className="text-[#f6f3ec]/50">Contact phone</span>
          <span className="text-[#f6f3ec]">{profile.contact_phone || "—"}</span>
        </p>
        <p className="flex justify-between border-b border-white/10 pb-2">
          <span className="text-[#f6f3ec]/50">Religion</span>
          <span className="text-[#f6f3ec]">{sensitive?.religion || "—"}</span>
        </p>
        <p className="flex justify-between border-b border-white/10 pb-2">
          <span className="text-[#f6f3ec]/50">Gender</span>
          <span className="text-[#f6f3ec]">{sensitive?.gender || "—"}</span>
        </p>
        <p className="flex justify-between">
          <span className="text-[#f6f3ec]/50">Date of birth</span>
          <span className="text-[#f6f3ec]">
            {sensitive?.date_of_birth ? new Date(sensitive.date_of_birth).toLocaleDateString() : "—"}
          </span>
        </p>
      </div>

      <p className="mt-6 text-xs text-[#f6f3ec]/40">
        To correct any of this data, contact an administrator — edits to sensitive fields aren&apos;t self-service in
        this version.
      </p>
    </div>
  );
}

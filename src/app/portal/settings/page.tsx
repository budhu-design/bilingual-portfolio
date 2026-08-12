import { redirect } from "next/navigation";
import { getSessionProfile } from "@/lib/members/session";
import { DIRECTIONS } from "@/lib/directions";

export default async function SettingsPage() {
  const { user, profile, sensitive } = await getSessionProfile();
  if (!user) redirect("/portal/login");
  if (!profile) redirect("/portal");

  return (
    <div style={DIRECTIONS.civicTech as React.CSSProperties} className="min-h-screen">
      <div className="mx-auto max-w-lg px-6 py-16 sm:px-10">
        <p className="text-sm uppercase tracking-[0.3em]" style={{ color: "var(--accent)" }}>
          Members Portal
        </p>
        <h1 className="mt-2 text-2xl font-semibold" style={{ fontFamily: "var(--heading-font)" }}>
          Account settings
        </h1>
        <p className="mt-2 text-sm opacity-60">
          This page is visible only to you. These fields are never shown to other members.
        </p>

        <div className="mt-8 space-y-3 rounded-2xl border p-5 text-sm" style={{ borderColor: "var(--border)", background: "#fff" }}>
          <p className="flex justify-between border-b pb-2" style={{ borderColor: "var(--border)" }}>
            <span className="opacity-50">Email</span>
            <span>{user.email}</span>
          </p>
          <p className="flex justify-between border-b pb-2" style={{ borderColor: "var(--border)" }}>
            <span className="opacity-50">Contact phone</span>
            <span>{profile.contact_phone || "—"}</span>
          </p>
          <p className="flex justify-between border-b pb-2" style={{ borderColor: "var(--border)" }}>
            <span className="opacity-50">Religion</span>
            <span>{sensitive?.religion || "—"}</span>
          </p>
          <p className="flex justify-between border-b pb-2" style={{ borderColor: "var(--border)" }}>
            <span className="opacity-50">Gender</span>
            <span>{sensitive?.gender || "—"}</span>
          </p>
          <p className="flex justify-between">
            <span className="opacity-50">Date of birth</span>
            <span>{sensitive?.date_of_birth ? new Date(sensitive.date_of_birth).toLocaleDateString() : "—"}</span>
          </p>
        </div>

        <p className="mt-6 text-xs opacity-50">
          To correct any of this data, contact an administrator — edits to sensitive fields aren&apos;t self-service in
          this version.
        </p>
      </div>
    </div>
  );
}

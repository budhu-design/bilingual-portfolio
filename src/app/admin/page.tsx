import Link from "next/link";
import { requireAdmin } from "@/lib/members/admin";

export default async function AdminHome() {
  await requireAdmin();
  return (
    <div className="mx-auto max-w-lg px-6 py-16 sm:px-10">
      <p className="text-sm uppercase tracking-[0.3em] text-[#c8a24e]">Admin</p>
      <h1 className="mt-2 text-2xl font-semibold text-[#f6f3ec]">Administration</h1>
      <ul className="mt-8 space-y-3">
        {[
          ["/admin/members", "Member applications"],
          ["/admin/projects", "Projects & activities"],
          ["/admin/shakhas", "Shakha locations"],
        ].map(([href, label]) => (
          <li key={href}>
            <Link
              href={href}
              className="block rounded-xl border border-white/10 bg-white/[0.03] p-4 text-[#f6f3ec] transition-colors hover:border-[#c8a24e]/50"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

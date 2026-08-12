import { redirect } from "next/navigation";
import { getSessionProfile } from "./session";

/** Server-only guard for admin routes/actions. Redirects non-admins away. */
export async function requireAdmin() {
  const { user, profile } = await getSessionProfile();
  if (!user) redirect("/portal/login");
  if (!profile || profile.role !== "admin") redirect("/portal");
  return { user, profile };
}

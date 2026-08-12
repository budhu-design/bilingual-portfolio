export function PrivacyNotice() {
  return (
    <details className="group rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-[#f6f3ec]/70 open:bg-white/[0.05]">
      <summary className="cursor-pointer list-none font-medium text-[#f6f3ec] marker:content-none">
        <span className="mr-2 inline-block transition-transform group-open:rotate-90">›</span>
        Privacy notice — what we collect and why
      </summary>
      <div className="mt-3 space-y-3 border-t border-white/10 pt-3">
        <p>
          <strong className="text-[#f6f3ec]">Account data</strong> (email, password) is handled by Supabase Auth —
          your password is hashed and never stored or visible to us in plain text. Email confirmation is required
          before your account is active.
        </p>
        <p>
          <strong className="text-[#f6f3ec]">Profile data</strong> (name, photo, contact info, subgroup, volunteer
          history, education, work type, your role/contribution) is used to review your application and, once
          approved, is visible to other signed-in members of your subgroup so you can coordinate activities.
        </p>
        <p>
          <strong className="text-[#f6f3ec]">Sensitive data</strong> (religion, gender, date of birth) is stored in a
          separate, more restricted table. It is <strong className="text-[#f6f3ec]">never shown to other members</strong>{" "}
          — only you and signed-in administrators reviewing applications can access it, enforced at the database
          level (row-level security), not just hidden in the interface.
        </p>
        <p>
          Your first submission is reviewed by an administrator before your account is marked &quot;approved&quot; and becomes
          visible to others. You can request correction or deletion of your data at any time by contacting an
          administrator.
        </p>
      </div>
    </details>
  );
}

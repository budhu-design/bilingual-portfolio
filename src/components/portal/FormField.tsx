// Reads from CSS custom properties so the same form components work across
// every style "direction" — a page just sets --field-* on a wrapping div
// (see src/app/portal/signup/page.tsx for an example). Defaults match the
// dark ink/gold theme used by admin pages, which never override them.

export function Field({
  label,
  hi,
  children,
  required,
}: {
  label: string;
  hi?: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-[color:var(--field-label,#f6f3ec)] opacity-90">
        {label}
        {hi && <span className="ml-2 opacity-50">{hi}</span>}
        {required && <span className="ml-1 text-[color:var(--field-required,#a63d40)]">*</span>}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-lg border border-[color:var(--field-border,rgba(255,255,255,0.15))] bg-[color:var(--field-bg,rgba(255,255,255,0.04))] px-3 py-2.5 text-[color:var(--field-text,#f6f3ec)] placeholder:text-[color:var(--field-placeholder,rgba(246,243,236,0.3))] outline-none transition-colors focus:border-[color:var(--field-focus,#c8a24e)]";

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${inputClass} ${props.className ?? ""}`} />;
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${inputClass} ${props.className ?? ""}`} />;
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select {...props} className={`${inputClass} ${props.className ?? ""}`}>
      {props.children}
    </select>
  );
}

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
      <span className="mb-1.5 block text-sm font-medium text-[#f6f3ec]/90">
        {label}
        {hi && <span className="ml-2 text-[#f6f3ec]/40">{hi}</span>}
        {required && <span className="ml-1 text-[#a63d40]">*</span>}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-lg border border-white/15 bg-white/[0.04] px-3 py-2.5 text-[#f6f3ec] placeholder:text-[#f6f3ec]/30 outline-none transition-colors focus:border-[#c8a24e]";

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

export default function CheckEmailPage() {
  return (
    <div className="mx-auto max-w-md px-6 py-24 text-center sm:px-10">
      <p className="text-xs uppercase tracking-[0.3em] text-[#c8a24e]">Almost there</p>
      <h1 className="mt-2 text-2xl font-semibold text-[#f6f3ec]">Check your email</h1>
      <p className="mt-3 text-sm text-[#f6f3ec]/60">
        We&apos;ve sent a confirmation link to the email address you signed up with. Click it to activate your account,
        then <a href="/portal/login" className="text-[#c8a24e] underline">log in</a>. An administrator will review
        your application after that.
      </p>
    </div>
  );
}

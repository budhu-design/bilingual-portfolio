# Deploying this

I can't stand up a live 24/7 URL or buy a domain myself — both need an
account (and for a domain, a payment method) that only you have access to.
Here's the fastest real path, and what's already done for you.

## Already done

- Code is on GitHub: https://github.com/budhu-design/bilingual-portfolio
  (public, `.env` never committed — confirmed via `git check-ignore`)
- The real Supabase project (`frwvwapdmjtveaxuvvsn`) already has the full
  schema, RLS policies, and seed data applied — see `MEMBER_PORTAL.md`
- Locally: `Open Animations Demo.bat` in this folder still works for a quick
  local look (starts `npm run dev`, opens the animations showcase)

## Get a real public URL (Vercel, free tier, ~2 minutes)

Vercel is the natural fit — it's built by the Next.js team, and its free
tier gives you a permanent `*.vercel.app` URL with no domain purchase
needed. I can't do this step for you (it requires your own account login),
but it's short:

1. Go to https://vercel.com/new and sign in (GitHub login is easiest)
2. Import `budhu-design/bilingual-portfolio`
3. Before deploying, add these two environment variables (from `.env` in
   this folder — do not paste the ImageKit private key, it's not needed for
   this to run):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
4. Click Deploy. You'll get a URL like `bilingual-portfolio.vercel.app`
   that's live permanently, redeploying automatically on every push to
   `master`.

## Optional: a real custom domain

Once the Vercel deploy exists, Vercel's dashboard has a "Domains" tab where
you can attach one you've bought elsewhere (Namecheap, GoDaddy, etc.) — that
part genuinely does need you to purchase a domain, which I won't do without
you explicitly asking and handling the payment yourself.

## After deploying: bootstrap your first admin

Nobody is an admin by default. Sign up for real through the live site's
`/portal/signup`, confirm your email, then in the Supabase SQL editor:

```sql
update public.profiles set role = 'admin' where id = '<your auth user id>';
```

Find your user id under Supabase dashboard → Authentication → Users.

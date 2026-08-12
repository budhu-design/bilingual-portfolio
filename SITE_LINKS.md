# Site links

- **Local dev site:** http://localhost:3000 (run `npm run dev` or double-click
  `Open Site.bat` in this folder if it's not already running)
- **GitHub repo (public):** https://github.com/budhu-design/bilingual-portfolio
- **Live public URL:** not set up yet — needs your own Vercel login, see
  `DEPLOY.md` for the 2-minute steps

## Status as of 2026-08-12 (finalised)

- All commits pushed, working tree clean, `master` in sync with GitHub.
- `npx tsc --noEmit` and `npx next lint` both clean.
- All 12 routes verified 200 (home, about, organisation, sangh-parivar,
  achievements, gallery, news, contact, animations-demo, portal login/signup,
  admin — admin correctly redirects to login when signed out).
- Supabase: 10 verified shakha locations, 7 subgroups, 1 admin account
  (`weebyboi56@gmail.com`), schema + RLS policies live on the real project.
- `.env` confirmed never committed (gitignored throughout).

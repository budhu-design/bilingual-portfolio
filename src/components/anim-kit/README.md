# anim-kit

A self-contained set of premium interactive animations for the bilingual
(EN/HI) portfolio, built with **Framer Motion** (micro-interactions, page
transitions, drag/zoom) and **GSAP + ScrollTrigger** (scroll-scrubbed
reveals). Live demo at `/animations-demo`.

Every effect is unique to this brief — not a generic fade-in library — and
every effect degrades gracefully under `prefers-reduced-motion: reduce`.

## What's in here

| File | What it does | Replaces |
|---|---|---|
| `LanguageContext.tsx` | Global `lang` state + the signature EN⇄HI wipe transition (two-layer diagonal panel sweep in each language's accent colour, oversized glyph flash at the swap) | A plain crossfade or instant text swap |
| `LanguageSwitch.tsx` | The EN / हि pill toggle with a spring-driven thumb | A basic `<select>` or text link |
| `ScrambleText.tsx` | Text that "decodes" character-by-character when the language changes (Latin↔Devanagari glyph noise settling into the real word) | An instant text swap |
| `Hero.tsx` | Page-load hero: curtain-panel retract, line-masked staggered headline, cursor-parallax blobs, film-grain overlay | A generic fade/slide-up hero |
| `Timeline.tsx` | Scroll-scrubbed SVG line draw + independent per-node blur-in | `fade-in-on-scroll` classes |
| `OrgChart.tsx` | Pan (drag), zoom (wheel / buttons), click-to-focus camera fly-to, expand/collapse hierarchy | A static PNG/PDF org chart |
| `ShakhaMap.tsx` | Locator console: idle pin pulses, radar sweep, spring detail-card on click | An embedded Google Maps iframe with default pins |
| `MicroInteractions.tsx` | `MagneticButton` (cursor-attracted CTA), `TiltCard` (3D tilt + cursor-follow glow) | `hover:scale-105` |
| `Reveal.tsx` | Generic GSAP ScrollTrigger blur/rise wrapper for any section | ad-hoc `IntersectionObserver` fade-ins |
| `useReducedMotion.ts` | Live `prefers-reduced-motion` hook used by every component above | — |
| `kit.css` | Film-grain texture utility + a reduced-motion CSS safety net | — |

## Integrating into the real site

1. **Copy the folder.** `src/components/anim-kit/` is dependency-isolated —
   copy the whole directory into the target project's `src/components/`.
2. **Install dependencies:**
   ```
   npm install framer-motion gsap
   ```
3. **Import the stylesheet once**, in your root layout:
   ```tsx
   import "@/components/anim-kit/kit.css";
   ```
4. **Wrap your app (or just the pages that need it) in `LanguageProvider`**
   and swap any hard-coded bilingual strings from `t('key')`-style i18n
   calls to `<ScrambleText en="..." hi="..." />`. If you're using a proper
   i18n library (next-intl, etc.), `ScrambleText` can pull from your message
   catalogue instead of literal props — the component only needs the two
   resolved strings for the current key.
5. **Drop `LanguageSwitch`** into your header/nav.
6. **Replace your real hero/timeline/org-chart/map markup** with
   `<Hero />`, `<Timeline />`, `<OrgChart />`, `<ShakhaMap />` — each accepts
   no required props; swap the hardcoded `EVENTS` / `ORG` / `PINS` arrays at
   the top of `Timeline.tsx`, `OrgChart.tsx`, and `ShakhaMap.tsx` for your
   real data (or lift them to props if you want the components reusable
   across pages — kept as local consts here for drop-in simplicity).
7. **Wrap any other section** you want to animate on scroll in `<Reveal>`.
8. **Use `MagneticButton` / `TiltCard`** anywhere you currently have a plain
   `<button>` / card `<div>`.

## Design rationale — the language switch

The EN⇄HI toggle is the signature move because it's the one interaction
unique to a bilingual site — everything else (hero, scroll reveals,
micro-interactions) is "make a good portfolio distinctive"; this one is
"make bilingual *itself* feel intentional." Three choices support that:

- **Colour identity per language** (indigo for EN, crimson for HI) — the
  wipe's colour tells you which language is arriving before you can read
  anything, so the transition carries information, not just decoration.
- **The scramble-decode (`ScrambleText`)** reuses the same glyph-settling
  motion in the hero tagline, timeline entries, and org-chart nodes, so the
  language switch doesn't feel like a one-off gimmick — it's the site's
  visual grammar for "text is becoming text in another script."
- **A single glyph flash** (A / अ) at the moment of the swap, rather than
  full-screen chrome, keeps it fast (~1s round trip) so switching languages
  never feels like a punishment for the user.

## Accessibility & performance

- Every component calls `usePrefersReducedMotion()` and either skips the
  effect entirely (parallax, tilt, magnetic pull, radar sweep, idle pin
  pulse) or collapses transitions to an instant/opacity-only change (wipe,
  scramble, curtain, scroll reveals). `kit.css` adds a CSS-level fallback in
  case a future component forgets to gate itself.
- GSAP `ScrollTrigger` instances are created inside `gsap.context()` and
  reverted on unmount — no leaked triggers on route change.
- Scroll-scrubbed animations (`Timeline`) use `scrub` instead of a scroll
  listener + rAF loop, so they're driven by GSAP's own ticker rather than a
  hand-rolled one.
- `OrgChart` panning/zooming reads from `MotionValue`s directly (no React
  re-render per drag/wheel frame).
- All interactive elements remain real `<button>`s with `aria-label`s where
  the visible content isn't descriptive enough (map pins, zoom controls,
  language switch).

## Troubleshooting

If the demo page loads as plain unstyled text with a stray full-height SVG
line and no animations run, check the dev server's terminal output for the
static assets (`/_next/static/css/...`, `/_next/static/chunks/...`) 404ing.
That means the local `.next` build cache got corrupted, usually from
restarting the dev server mid-compile or having two `next dev` processes
racing on the same directory. Fix: stop every `node`/`next dev` process for
this project, delete the `.next` folder, and run `npm run dev` again — it's
a local cache issue, not an app bug, and never touches the repo (`.next` is
gitignored).

## Known gaps to close before shipping

- `ScrambleText`'s Devanagari fallback relies on the browser/OS default font
  — add a Devanagari-supporting webfont (e.g. Noto Sans Devanagari) via
  `next/font` for consistent rendering across platforms.
- `OrgChart`, `Timeline`, and `ShakhaMap` currently hold their sample data as
  local constants for drop-in simplicity — lift to props/CMS data once wired
  to the real org structure and shakha list.
- `ShakhaMap` is an abstract "locator console," not a georeferenced map —
  if you need real coordinates, keep the same interaction layer (idle pulse,
  hover label, click-to-detail-card) on top of an actual map/SVG basemap.

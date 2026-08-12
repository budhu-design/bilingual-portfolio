/**
 * Style-direction tokens from RSS_Style_Directions_Mockup.html, as CSS
 * custom properties. Apply with `style={DIRECTIONS.x as React.CSSProperties}`
 * on a page's outer wrapper — background/text colour and fonts are wired to
 * reference the same custom properties, and FormField.tsx reads the
 * --field-* ones, so a page only has to set this once at the root.
 */

type Direction = Record<string, string>;

export const DIRECTIONS: Record<string, Direction> = {
  // 1A — Sangh Smriti (Home, Contact/locator)
  sanghSmriti: {
    "--bg": "#F2E8D5",
    "--fg": "#2B2019",
    "--fg-soft": "#4A3B2C",
    "--accent": "#7D4038",
    "--accent2": "#B29B5F",
    "--border": "rgba(43,32,25,0.18)",
    "--heading-font": "var(--font-rozha), var(--font-noto-devanagari), serif",
    "--body-font": "var(--font-spectral), serif",
    "--mono-font": "var(--font-plex-mono), monospace",
    "--field-border": "rgba(43,32,25,0.3)",
    "--field-bg": "rgba(255,255,255,0.45)",
    "--field-text": "#2B2019",
    "--field-placeholder": "rgba(43,32,25,0.4)",
    "--field-focus": "#7D4038",
    "--field-label": "#2B2019",
    "--field-required": "#7D4038",
    background: "var(--bg)",
    color: "var(--fg)",
    fontFamily: "var(--body-font)",
  },
  // 1B — Classical Library (About/History)
  classicalLibrary: {
    "--bg": "#EFE6D8",
    "--fg": "#1E1B16",
    "--fg-soft": "#4A4133",
    "--accent": "#3F5548",
    "--accent2": "#AB9569",
    "--border": "rgba(30,27,22,0.18)",
    "--heading-font": "var(--font-garamond), var(--font-tiro), serif",
    "--body-font": "var(--font-garamond), serif",
    "--mono-font": "var(--font-plex-mono), monospace",
    "--field-border": "rgba(30,27,22,0.3)",
    "--field-bg": "rgba(255,255,255,0.5)",
    "--field-text": "#1E1B16",
    "--field-placeholder": "rgba(30,27,22,0.4)",
    "--field-focus": "#3F5548",
    "--field-label": "#1E1B16",
    "--field-required": "#AB9569",
    background: "var(--bg)",
    color: "var(--fg)",
    fontFamily: "var(--body-font)",
  },
  // 2 — Modern Civic-Tech (Members Portal, Organisational Structure, Sangh Parivar)
  civicTech: {
    "--bg": "#F7F8F6",
    "--fg": "#12294A",
    "--fg-soft": "#3D5372",
    "--accent": "#C08355",
    "--accent2": "#5A9C85",
    "--border": "rgba(18,41,74,0.15)",
    "--heading-font": "var(--font-space-grotesk), var(--font-noto-devanagari), sans-serif",
    "--body-font": "var(--font-geist-sans), system-ui, sans-serif",
    "--mono-font": "var(--font-plex-mono), monospace",
    "--field-border": "rgba(18,41,74,0.2)",
    "--field-bg": "#ffffff",
    "--field-text": "#12294A",
    "--field-placeholder": "rgba(18,41,74,0.35)",
    "--field-focus": "#C08355",
    "--field-label": "#12294A",
    "--field-required": "#C08355",
    background: "var(--bg)",
    color: "var(--fg)",
    fontFamily: "var(--body-font)",
  },
  // 1C — Letterpress Elegance (Achievements & Social Work)
  letterpress: {
    "--bg": "#EDE3D0",
    "--fg": "#1B1F2A",
    "--fg-soft": "#454B5C",
    "--accent": "#A8695C",
    "--accent2": "#BFA768",
    "--border": "rgba(27,31,42,0.18)",
    "--heading-font": "var(--font-cormorant), var(--font-vesper), serif",
    "--body-font": "var(--font-cormorant), serif",
    "--mono-font": "var(--font-plex-mono), monospace",
    background: "var(--bg)",
    color: "var(--fg)",
    fontFamily: "var(--body-font)",
  },
  // 1D — Field Ledger (Gallery)
  fieldLedger: {
    "--bg": "#F5EFE0",
    "--fg": "#2B3A4A",
    "--fg-soft": "#495A6C",
    "--accent": "#A8695C",
    "--accent2": "#7A5C45",
    "--border": "rgba(43,58,74,0.2)",
    "--heading-font": "var(--font-caveat), cursive",
    "--body-font": "var(--font-kalam), cursive",
    "--mono-font": "var(--font-plex-mono), monospace",
    background: "var(--bg)",
    color: "var(--fg)",
    fontFamily: "var(--body-font)",
  },
  // 3 — Editorial Magazine (News & Events)
  editorial: {
    "--bg": "#FAFAF7",
    "--fg": "#1A1A1A",
    "--fg-soft": "#4A4A4A",
    "--accent": "#A8695C",
    "--accent2": "#C98A5C",
    "--border": "rgba(26,26,26,0.15)",
    "--heading-font": "var(--font-fraunces), serif",
    "--body-font": "var(--font-newsreader), serif",
    "--mono-font": "var(--font-plex-mono), monospace",
    background: "var(--bg)",
    color: "var(--fg)",
    fontFamily: "var(--body-font)",
  },
};

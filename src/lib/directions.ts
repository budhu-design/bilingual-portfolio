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
    "--accent": "#6B1F1F",
    "--accent2": "#B8912F",
    "--border": "rgba(43,32,25,0.18)",
    "--heading-font": "var(--font-rozha), var(--font-noto-devanagari), serif",
    "--body-font": "var(--font-spectral), serif",
    "--mono-font": "var(--font-plex-mono), monospace",
    "--field-border": "rgba(43,32,25,0.3)",
    "--field-bg": "rgba(255,255,255,0.45)",
    "--field-text": "#2B2019",
    "--field-placeholder": "rgba(43,32,25,0.4)",
    "--field-focus": "#6B1F1F",
    "--field-label": "#2B2019",
    "--field-required": "#6B1F1F",
    background: "var(--bg)",
    color: "var(--fg)",
    fontFamily: "var(--body-font)",
  },
  // 1B — Classical Library (About/History)
  classicalLibrary: {
    "--bg": "#EFE6D8",
    "--fg": "#1E1B16",
    "--fg-soft": "#4A4133",
    "--accent": "#1F3B2C",
    "--accent2": "#A8863C",
    "--border": "rgba(30,27,22,0.18)",
    "--heading-font": "var(--font-garamond), var(--font-tiro), serif",
    "--body-font": "var(--font-garamond), serif",
    "--mono-font": "var(--font-plex-mono), monospace",
    "--field-border": "rgba(30,27,22,0.3)",
    "--field-bg": "rgba(255,255,255,0.5)",
    "--field-text": "#1E1B16",
    "--field-placeholder": "rgba(30,27,22,0.4)",
    "--field-focus": "#1F3B2C",
    "--field-label": "#1E1B16",
    "--field-required": "#A8863C",
    background: "var(--bg)",
    color: "var(--fg)",
    fontFamily: "var(--body-font)",
  },
  // 2 — Modern Civic-Tech (Members Portal, Organisational Structure, Sangh Parivar)
  civicTech: {
    "--bg": "#F7F8F6",
    "--fg": "#12294A",
    "--fg-soft": "#3D5372",
    "--accent": "#E8792C",
    "--accent2": "#1D9E75",
    "--border": "rgba(18,41,74,0.15)",
    "--heading-font": "var(--font-space-grotesk), var(--font-noto-devanagari), sans-serif",
    "--body-font": "var(--font-geist-sans), system-ui, sans-serif",
    "--mono-font": "var(--font-plex-mono), monospace",
    "--field-border": "rgba(18,41,74,0.2)",
    "--field-bg": "#ffffff",
    "--field-text": "#12294A",
    "--field-placeholder": "rgba(18,41,74,0.35)",
    "--field-focus": "#E8792C",
    "--field-label": "#12294A",
    "--field-required": "#E8792C",
    background: "var(--bg)",
    color: "var(--fg)",
    fontFamily: "var(--body-font)",
  },
  // 1C — Letterpress Elegance (Achievements & Social Work)
  letterpress: {
    "--bg": "#EDE3D0",
    "--fg": "#1B1F2A",
    "--fg-soft": "#454B5C",
    "--accent": "#A63A2C",
    "--accent2": "#C9A227",
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
    "--accent": "#B23A2E",
    "--accent2": "#6B4226",
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
    "--accent": "#B5533C",
    "--accent2": "#E86A17",
    "--border": "rgba(26,26,26,0.15)",
    "--heading-font": "var(--font-fraunces), serif",
    "--body-font": "var(--font-newsreader), serif",
    "--mono-font": "var(--font-plex-mono), monospace",
    background: "var(--bg)",
    color: "var(--fg)",
    fontFamily: "var(--body-font)",
  },
};

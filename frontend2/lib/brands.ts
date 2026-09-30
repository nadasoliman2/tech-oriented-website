import type { CSSProperties } from "react";

/**
 * Live website + brand colours for each product / case study, keyed by slug.
 * Colours were taken from each product's own website. Anything listed here
 * gets its card and page themed in its colour and a "Visit website" link.
 * Slugs that are not listed keep the tech-oriented teal.
 */
export type Brand = {
  url?: string;
  /** style the fallback text wordmark in italics (logos live in lib/media.ts → productLogos) */
  italic?: boolean;
  /** main brand colour — replaces the teal accent */
  color: string;
  /** text colour on top of `color` (buttons, solid tags) */
  ink: string;
  /** optional second colour for gradients */
  color2?: string;
};

const baytLink: Brand = {
  url: "https://apps.apple.com/eg/app/bayt-link-%D8%A8%D9%8A%D8%AA-%D9%84%D9%8A%D9%86%D9%83/id6780191889",
  color: "#4a9d4f", ink: "#ffffff", color2: "#86c98a",
};

export const brands: Record<string, Brand> = {
  "every-second-ai": {
    url: "https://everysecond.ai/",
    color: "#f97316", ink: "#080808", color2: "#fdba74",
  },
  coachizer: {
    url: "https://coachizer.app/",
    italic: true,
    color: "#6366f1", ink: "#ffffff", color2: "#d9f99d",
  },
  nazel: {
    url: "https://nazel.app/",
    color: "#2181c4", ink: "#ffffff", color2: "#83cff2",
  },
  "calorie-7": {
    url: "https://calorie7.app/",
    color: "#d4a762", ink: "#080808", color2: "#e1ccae",
  },
  "bayt-link": baytLink,
  "ready-car": {
    url: "https://readycar.store/",
    color: "#dc2626", ink: "#ffffff", color2: "#f87171",
  },
  // the Our Work case study uses the older slug
  baytlink: baytLink,
  taxera: { url: "https://taxera-eg.com/", color: "#be70ac", ink: "#080808", color2: "#924a97" },
};

/** Inline CSS vars that re-theme everything inside an element to the brand colour. */
export function brandStyle(slug: string): CSSProperties | undefined {
  const b = brands[slug];
  if (!b) return undefined;
  return {
    "--accent": b.color,
    "--accent-ink": b.ink,
    "--brand-2": b.color2 ?? b.color,
  } as CSSProperties;
}

/** "https://www.everysecond.ai/" → "everysecond.ai" */
export function brandDomain(slug: string) {
  const b = brands[slug];
  if (!b?.url) return "";
  if (b.url.includes("apps.apple.com")) return "App Store";
  if (b.url.includes("play.google.com")) return "Google Play";
  return b.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}

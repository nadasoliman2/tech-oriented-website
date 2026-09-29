// Free-license stock footage and stills from Mixkit (mixkit.co/license), stored in /public/media.
// v = has a video (/media/v/{id}.mp4); every id has a still (/media/p/{id}.jpg).

export type MediaRef = { id: string; video?: boolean; alt: string };

const v = (id: string, alt: string): MediaRef => ({ id, video: true, alt });
const p = (id: string, alt: string): MediaRef => ({ id, alt });

export const heroMedia = v("31510", "Network of luminous points and lines");
export const showreelMedia = v("46635", "Developer reflected in code on screen");
export const featuredMedia = v("51123", "Customer messaging a business on WhatsApp");
export const aboutMedia = v("918", "Busy open office");
export const regionalMedia = v("13218", "Team silhouetted against a high-rise window");
export const technologyMedia = v("23282", "Data center hallway");
export const technologyStill = p("50748", "Screens with scrolling data");
export const processMedia = v("46750", "Team reviewing work together");
export const problemMedia = v("4835", "Team working across devices");

export const serviceMedia: Record<string, MediaRef> = {
  "ai-solutions": v("31771", "Sphere of connected data points"),
  "automation-solutions": v("4835", "Team working across devices"),
  "crm-business-systems": v("46680", "Team planning around a table"),
  "custom-software-development": v("46635", "Code reflected in glasses"),
  "web-mobile-applications": v("42136", "Browsing an online store on a phone"),
  "business-dashboards": v("42648", "Presenting charts on a screen"),
  "strategic-marketing": p("4809", "Team meeting from above"),
  "performance-marketing": p("50748", "Screens with scrolling data"),
  branding: p("231", "Man in a tailored jacket on a rooftop at dusk"),
  "visual-content": p("43270", "Using a phone app"),
  "digital-marketing": p("4915", "Hands typing on a phone"),
  "media-production": v("46750", "Team reviewing work together"),
  "public-relations": v("13218", "Team silhouetted against a high-rise window"),
  "events-management": v("918", "Busy open office"),
};

export const caseMedia: Record<string, MediaRef> = {
  "every-second-ai": v("41165", "Answering customer messages"),
  "akoun": v("41180", "Learner looking at a tablet"),
  taxera: v("241", "Reviewing and signing documents"),
  "motori": v("30", "Car lights at night"),
  baytlink: v("41541", "Residential towers from above"),
};

// tall = near-square marks that need more height to match the wide wordmarks
export const caseLogos: Record<string, { src: string; tall?: boolean }> = {
  "every-second-ai": { src: "/logos/every-second-ai.png" },
  akoun: { src: "/logos/akoun.png" },
  taxera: { src: "/logos/taxera.png" },
  motori: { src: "/logos/motori.png", tall: true },
  baytlink: { src: "/logos/baytlink.png" },
};

export const industryMedia: Record<string, MediaRef> = {
  ecommerce: p("42133", "Shopping on a phone"),
  "real-estate": p("41541", "Aerial view of city towers"),
  healthcare: p("41180", "Close-up of an eye looking at a screen"),
  education: p("4938", "Working on a laptop"),
  logistics: p("4067", "Traffic light trails"),
  "marketing-sales": p("4809", "Team meeting from above"),
  "accounting-finance": p("47005", "Stacks of cash"),
  "sports-lifestyle": p("231", "Man on a rooftop at dusk"),
  "service-companies": p("4872", "Colleagues talking at a laptop"),
};

export const productMedia: Record<string, MediaRef> = {
  "every-second-ai": v("51123", "Messaging on a phone"),
  "calorie-7": p("43270", "Using a phone app"),
  coachizer: p("46750", "Coach giving feedback to a team"),
  nazel: p("13168", "Scrolling a phone app"),
  "bayt-link": p("41541", "Residential towers from above"),
  "ready-mobile": p("4915", "Hands holding a phone"),
  "ready-marine": p("51500", "Turquoise sea from above"),
  "ready-car": p("30", "Car lights at night"),
};

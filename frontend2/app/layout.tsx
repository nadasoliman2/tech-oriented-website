import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Cairo, Inter, Source_Code_Pro } from "next/font/google";
import Animations from "@/components/Animations";
import Cursor from "@/components/Cursor";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Menu from "@/components/Menu";
import Preloader from "@/components/Preloader";
import Providers from "@/components/Providers";
import { getLang } from "@/lib/i18n";
import "./globals.css";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const cond = Barlow_Condensed({ subsets: ["latin"], weight: ["700"], variable: "--font-cond", display: "swap" });
const mono = Source_Code_Pro({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });
const ar = Cairo({ subsets: ["arabic"], weight: ["400", "500", "600", "700"], variable: "--font-ar", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://tech-oriented.digital"),
  title: {
    default: "tech-oriented | igital Transformation Tech House",
    template: "%s | tech-oriented",
  },
  description:
    "tech-oriented helps SMEs, startups, and growing businesses move from manual, fragmented operations to smarter, automated, and scalable digital systems.",
};

export const viewport: Viewport = { themeColor: "#080808" };

// Applied before hydration so the stored theme paints on the very first frame (no flash).
// Also flips the theme-color meta so mobile browser chrome matches immediately.
const THEME_INIT = `try{var t=localStorage.getItem("theme");if(t==="light"){document.documentElement.setAttribute("data-theme","light");var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content","#ffffff");}}catch(e){}`;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const lang = await getLang();
  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <html lang={lang} dir={dir} className={`${sans.variable} ${cond.variable} ${mono.variable} ${ar.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
      </head>
      <body>
        <Providers lang={lang}>
          <Preloader />
          <Header />
          <Menu />
          <main>{children}</main>
          <Footer lang={lang} />
          <FloatingWhatsApp />
          <Animations />
          <Cursor />
        </Providers>
      </body>
    </html>
  );
}

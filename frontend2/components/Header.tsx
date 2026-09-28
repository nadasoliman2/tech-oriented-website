"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getData } from "@/lib/i18n-data";
import Button from "./Button";
import { useSite } from "./Providers";
import TLink from "./TLink";

const strings = {
  en: { startProject: "Start Project", menu: "Menu", close: "Close", theme: "Toggle theme" },
  ar: { startProject: "ابدأ مشروعك", menu: "القائمة", close: "إغلاق", theme: "تبديل المظهر" },
};

export function Brand() {
  return (
    <span className="brand" aria-label="tech-oriented">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="brand__word" src="/logo-wordmark.png" alt="tech-oriented" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="brand__mark" src="/logo-mark.png" alt="" aria-hidden="true" />
    </span>
  );
}

export default function Header() {
  const pathname = usePathname();
  const { menuOpen, setMenuOpen, theme, toggleTheme, lang, toggleLang } = useSite();
  const [condensed, setCondensed] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { nav } = getData(lang);
  const t = strings[lang];

  useEffect(() => {
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setCondensed(y > 60);
      setHidden(y > 400 && y > last);
      last = y;
    };
    // Lenis drives native scroll, so a window listener covers both
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", menuOpen);
  }, [menuOpen]);

  const cls = ["header", condensed && "is-condensed is-solid", hidden && !menuOpen && "is-hidden"]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={cls}>
      <div className="site-max header__inner">
        <TLink href="/" aria-label="tech-oriented home">
          <Brand />
        </TLink>

        <nav className="header__nav" aria-label="Primary">
          {nav.map((item) => (
            <TLink
              key={item.href}
              href={item.href}
              className={pathname.startsWith(item.href) ? "is-active" : undefined}
            >
              <span className="roll">
                <span>{item.label}</span>
                <span aria-hidden="true">{item.label}</span>
              </span>
            </TLink>
          ))}
        </nav>

        <div className="header__right">
          <button className="util-btn" onClick={toggleLang} aria-label="Switch language">
            {lang === "ar" ? "EN" : "AR"}
          </button>
          <button className="util-btn" onClick={toggleTheme} aria-label={t.theme}>
            {theme === "dark" ? (
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="12" r="4.5" />
                <path d="M12 2.5v2.2M12 19.3v2.2M4.2 4.2l1.6 1.6M18.2 18.2l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.2 19.8l1.6-1.6M18.2 5.8l1.6-1.6" strokeLinecap="round" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M20.4 14.7A8.5 8.5 0 1 1 9.3 3.6a7 7 0 0 0 11.1 11.1Z" />
              </svg>
            )}
          </button>
          <Button href="/contact" size="sm" className="header__cta">
            {t.startProject}
          </Button>
          <button
            className="menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="site-menu"
          >
            <span>{menuOpen ? t.close : t.menu}</span>
            <span className="menu-btn__lines" aria-hidden="true">
              <i />
              <i />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

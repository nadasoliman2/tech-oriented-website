"use client";

import { useEffect, useRef } from "react";
import { getData } from "@/lib/i18n-data";
import { EASE_IN_OUT, gsap } from "@/lib/gsap";
import { useSite } from "./Providers";
import TLink from "./TLink";

const strings = {
  en: { home: "Home" },
  ar: { home: "الرئيسية" },
};

/** Fantasy-style fullscreen menu: clip-path wipe, condensed links rise in. */
export default function Menu() {
  const { menuOpen, setMenuOpen, lang } = useSite();
  const { nav } = getData(lang);
  const t = strings[lang];
  const items = [{ label: t.home, href: "/" }, ...nav];
  const root = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (first.current) {
      first.current = false;
      return;
    }
    const links = el.querySelectorAll(".menu__inner-anim");
    gsap.killTweensOf([el, links]);

    if (menuOpen) {
      gsap
        .timeline()
        .set(el, { visibility: "visible" })
        .fromTo(el, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: EASE_IN_OUT })
        .fromTo(links, { yPercent: 110 }, { yPercent: 0, duration: 1.1, stagger: 0.045 }, 0.35);
    } else {
      gsap
        .timeline()
        .to(links, { yPercent: -110, duration: 0.5, stagger: 0.02, ease: "expo.in" })
        .to(el, { clipPath: "inset(0% 0% 0% 100%)", duration: 0.9, ease: EASE_IN_OUT }, 0.2)
        .set(el, { visibility: "hidden", clipPath: "inset(0% 0% 100% 0%)" });
    }
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setMenuOpen]);

  return (
    <div className="menu" id="site-menu" ref={root} aria-hidden={!menuOpen}>
      <div className="site-max">
        <ul className="menu__list">
          {items.map((item) => (
            <li className="menu__item" key={item.href}>
              <TLink href={item.href} className="menu__link" tabIndex={menuOpen ? 0 : -1}>
                <span className="menu__inner-anim c1">{item.label}</span>
              </TLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

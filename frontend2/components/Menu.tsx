"use client";

import { useEffect, useRef } from "react";
import { getData } from "@/lib/i18n-data";
import { EASE_IN_OUT, gsap } from "@/lib/gsap";
import { useSite } from "./Providers";
import TLink from "./TLink";

const strings = {
  en: { home: "Home", contact: "Contact", contactLabel: "Contact", officeLabel: "Office" },
  ar: { home: "الرئيسية", contact: "تواصل", contactLabel: "تواصل", officeLabel: "المكتب" },
};

/** Fantasy-style fullscreen menu: clip-path wipe, condensed links rise in. */
export default function Menu() {
  const { menuOpen, setMenuOpen, lang } = useSite();
  const { company, nav } = getData(lang);
  const t = strings[lang];
  const items = [{ label: t.home, href: "/" }, ...nav, { label: t.contact, href: "/contact" }];
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
    const foot = el.querySelectorAll(".menu__foot > *");
    gsap.killTweensOf([el, links, foot]);

    if (menuOpen) {
      gsap
        .timeline()
        .set(el, { visibility: "visible" })
        .fromTo(el, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: EASE_IN_OUT })
        .fromTo(links, { yPercent: 110 }, { yPercent: 0, duration: 1.1, stagger: 0.045 }, 0.35)
        .fromTo(foot, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, stagger: 0.06 }, 0.6);
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
          {items.map((item, i) => (
            <li className="menu__item" key={item.href}>
              <TLink href={item.href} className="menu__link" tabIndex={menuOpen ? 0 : -1}>
                <span className="menu__inner-anim c1">{item.label}</span>
                <span className="menu__inner-anim label">{String(i + 1).padStart(2, "0")}</span>
              </TLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="site-max menu__foot">
        <div className="col gap-1">
          <span className="label">{t.contactLabel}</span>
          <a href={`mailto:${company.email}`} className="u-link">{company.email}</a>
          <a href={company.phoneHref} className="u-link">{company.phone}</a>
        </div>
        <div className="col gap-1">
          <span className="label">{t.officeLabel}</span>
          <span style={{ fontSize: "1.6rem" }}>{company.address}</span>
        </div>
        <div className="flex gap-2">
          {company.socials.map((s) => (
            <a key={s.href} href={s.href} target="_blank" rel="noreferrer" className="u-link">
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

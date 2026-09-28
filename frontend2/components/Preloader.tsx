"use client";

import { useEffect, useRef, useState } from "react";
import { EASE_IN_OUT, gsap, prefersReducedMotion } from "@/lib/gsap";
import { useSite } from "./Providers";

const COLS = 5;
const MIN_TIME = 2.1; // seconds the intro is allowed to play before exiting

const strings = {
  en: { tag: "tech solutions for every day problems", foot: "AI & Digital Transformation Tech House" },
  ar: { tag: "حلول تقنية لمشاكل كل يوم", foot: "بيت تقني للذكاء الاصطناعي والتحول الرقمي" },
};

/**
 * Centered logo loader. The intro runs in CSS so it is alive before hydration;
 * JS drives the counter/progress and the column exit (same language as page transitions).
 */
export default function Preloader() {
  const { setReady, lang } = useSite();
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);
  const t = strings[lang];

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    document.body.classList.add("is-loading");

    const finish = () => {
      document.body.classList.remove("is-loading");
      setReady(true);
      setDone(true);
    };

    if (prefersReducedMotion()) {
      document.documentElement.classList.add("reduce-motion");
      finish();
      return;
    }

    const count = el.querySelector(".loader__count");
    const bar = el.querySelector(".loader__progress i");
    const content = el.querySelectorAll(".loader__center > *, .loader__foot");
    const cols = el.querySelectorAll(".loader__col");
    const elapsed = performance.now() / 1000;
    const remaining = Math.max(0.6, MIN_TIME - elapsed);
    const counter = { v: 0 };

    // hand the bar over from its CSS intro to GSAP without a jump
    const barScale = bar ? new DOMMatrix(getComputedStyle(bar).transform).a || 0 : 0;
    if (bar instanceof HTMLElement) bar.style.animation = "none";
    const releaseCss = () =>
      content.forEach((n) => {
        if (n instanceof HTMLElement) n.style.animation = "none";
      });

    const tl = gsap.timeline();
    tl.to(counter, {
      v: 100,
      duration: remaining,
      ease: "power2.inOut",
      onUpdate: () => {
        if (count) count.textContent = String(Math.round(counter.v)).padStart(3, "0");
      },
    })
      .fromTo(bar, { scaleX: barScale }, { scaleX: 1, duration: remaining, ease: "power2.inOut" }, 0)
      .add(releaseCss, "+=0.15")
      .to(content, { y: -30, opacity: 0, duration: 0.6, stagger: 0.05, ease: "power3.in" })
      .to(cols, {
        yPercent: -100,
        duration: 1,
        stagger: 0.06,
        ease: EASE_IN_OUT,
        onStart: () => setReady(true),
      }, "-=0.15")
      .add(finish);

    return () => {
      tl.kill();
    };
  }, [setReady]);

  if (done) return null;

  return (
    <div className="loader" ref={root} aria-hidden="true">
      <div className="loader__cols">
        {Array.from({ length: COLS }).map((_, i) => (
          <span className="loader__col" key={i} />
        ))}
      </div>

      <div className="loader__center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="loader__mark" src="/logo-mark.png" alt="" />
        <div className="loader__word">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-text.png" alt="" />
        </div>
        <span className="loader__tag label">{t.tag}</span>
      </div>

      <div className="loader__foot">
        <span className="label">{t.foot}</span>
        <span className="loader__progress">
          <i />
        </span>
        <span className="label loader__count">000</span>
      </div>
    </div>
  );
}

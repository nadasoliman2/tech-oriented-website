"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

function Star() {
  return (
    <svg className="marquee__star" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z" fill="currentColor" />
    </svg>
  );
}

/** Infinite marquee whose speed and direction follow scroll velocity. */
export default function Marquee({ items, speed = 60 }: { items: string[]; speed?: number }) {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const reduced = prefersReducedMotion();
    if (reduced) return;

    let x = 0;
    let dir = -1;
    let boost = 0;
    let lastY = window.scrollY;
    const group = el.firstElementChild as HTMLElement;

    const tick = (_t: number, dt: number) => {
      const y = window.scrollY;
      const v = y - lastY;
      lastY = y;
      if (v !== 0) dir = v > 0 ? -1 : 1;
      boost += (Math.min(Math.abs(v), 60) * 0.15 - boost) * 0.1;
      const width = group.offsetWidth;
      x += dir * (speed + boost * speed) * (dt / 1000);
      if (x <= -width) x += width;
      if (x > 0) x -= width;
      gsap.set(el, { x });
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, [speed]);

  const group = (
    <div className="marquee__group">
      {items.map((t, i) => (
        <span className="marquee__item" key={i}>
          <span className="c2">{t}</span>
          <Star />
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquee" aria-label={items.join(", ")}>
      <div className="marquee__track" ref={track} aria-hidden="true">
        {group}
        {group}
        {group}
      </div>
    </div>
  );
}

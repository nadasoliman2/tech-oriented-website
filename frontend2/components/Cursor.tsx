"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

/** Dot cursor that grows into a labelled disc over [data-cursor] targets. */
export default function Cursor() {
  const el = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = el.current;
    if (!node || window.matchMedia("(hover: none), (pointer: coarse)").matches) return;
    const xTo = gsap.quickTo(node, "x", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(node, "y", { duration: 0.5, ease: "power3" });

    // magnetic pull on [data-magnetic] elements
    let magnet: HTMLElement | null = null;
    const release = () => {
      if (magnet) gsap.to(magnet, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.4)" });
      magnet = null;
    };

    const move = (e: MouseEvent) => {
      setShown(true);
      xTo(e.clientX);
      yTo(e.clientY);
      const t = e.target as HTMLElement | null;
      const target = t?.closest<HTMLElement>("[data-cursor]");
      setLabel(target?.dataset.cursor ?? "");

      const m = t?.closest<HTMLElement>("[data-magnetic]") ?? null;
      if (m !== magnet) release();
      if (m) {
        magnet = m;
        const r = m.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        gsap.to(m, { x: dx * 0.3, y: dy * 0.4, duration: 0.5, ease: "power3.out" });
      }
    };
    const leave = () => setShown(false);
    const enter = () => setShown(true);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
    };
  }, []);

  return (
    <div ref={el} className={`cursor${shown ? "" : " is-hidden"}${label ? " is-label" : ""}`} aria-hidden="true">
      <span className="cursor__label">{label}</span>
    </div>
  );
}

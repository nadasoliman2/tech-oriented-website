"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import type { MediaRef } from "@/lib/media";

type Row = { title: string; body: string; media: MediaRef; tone: string };

/** Numbered rows with a colour wipe and a photo preview that trails the cursor. */
export default function HoverRows({ rows }: { rows: Row[] }) {
  const wrap = useRef<HTMLDivElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const el = wrap.current;
    const pv = preview.current;
    if (!el || !pv || window.matchMedia("(hover: none)").matches) return;
    const xTo = gsap.quickTo(pv, "x", { duration: 0.7, ease: "power3" });
    const yTo = gsap.quickTo(pv, "y", { duration: 0.7, ease: "power3" });
    const rTo = gsap.quickTo(pv, "rotation", { duration: 0.9, ease: "power3" });
    let lastX = 0;
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      xTo(e.clientX - r.left);
      yTo(e.clientY - r.top);
      rTo(gsap.utils.clamp(-10, 10, (e.clientX - lastX) * 0.6));
      lastX = e.clientX;
    };
    el.addEventListener("mousemove", move);
    return () => el.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    const pv = preview.current;
    if (!pv) return;
    gsap.to(pv, { scale: active >= 0 ? 1 : 0, opacity: active >= 0 ? 1 : 0, duration: 0.6, ease: "expo.out" });
  }, [active]);

  return (
    <div className="rows hover-rows" ref={wrap} onMouseLeave={() => setActive(-1)}>
      {rows.map((row, i) => (
        <div className="row" key={row.title} data-fade onMouseEnter={() => setActive(i)}>
          <span className="row__fill" style={{ background: row.tone }} />
          <span className="label">{String(i + 1).padStart(2, "0")}</span>
          <h2 className="c2">{row.title}</h2>
          <p className="row__body muted body-l">{row.body}</p>
        </div>
      ))}
      <div className="hover-rows__preview" ref={preview} aria-hidden="true">
        {rows.map((row, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={row.title}
            src={`/media/p/${row.media.id}.jpg`}
            alt=""
            loading="lazy"
            style={{ opacity: i === active ? 1 : 0 }}
          />
        ))}
      </div>
    </div>
  );
}

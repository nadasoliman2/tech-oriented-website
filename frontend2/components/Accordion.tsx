"use client";

import { useRef, useState, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export type AccItem = { title: string; sub?: string; content: ReactNode };

/** Parallel-style expanding service rows. */
export default function Accordion({ items, initial = 0 }: { items: AccItem[]; initial?: number }) {
  const [open, setOpen] = useState<number>(initial);
  const bodies = useRef<(HTMLDivElement | null)[]>([]);

  const toggle = (i: number) => {
    const next = open === i ? -1 : i;
    bodies.current.forEach((b, j) => {
      if (!b) return;
      gsap.to(b, {
        height: j === next ? "auto" : 0,
        duration: 0.9,
        ease: "expo.inOut",
        onComplete: () => ScrollTrigger.refresh(),
      });
    });
    setOpen(next);
  };

  return (
    <div className="acc">
      {items.map((item, i) => (
        <div className={`acc__item${open === i ? " is-open" : ""}`} key={item.title}>
          <button className="acc__head" onClick={() => toggle(i)} aria-expanded={open === i}>
            <span className="label">{String(i + 1).padStart(2, "0")}</span>
            <span className="acc__title h4">{item.title}</span>
            {item.sub && <span className="acc__sub label">{item.sub}</span>}
            <span className="acc__icon" aria-hidden="true" />
          </button>
          <div
            className="acc__body"
            ref={(el) => void (bodies.current[i] = el)}
            style={{ height: i === initial ? "auto" : 0 }}
          >
            <div className="acc__body-inner">{item.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

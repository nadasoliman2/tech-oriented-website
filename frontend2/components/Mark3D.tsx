"use client";

import { forwardRef, useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

type Props = {
  className?: string;
  /** tilt toward the pointer (hero) */
  interactive?: boolean;
};

const DEPTH = 16; // extrusion layers

/**
 * The tech-oriented mark as a solid 3D object: stacked copies of the logo, each pushed back
 * in Z and shaded darker, give it real thickness when it rotates. Outer element is free for
 * callers to animate (scroll); the inner one idles/tilts on its own.
 */
const Mark3D = forwardRef<HTMLDivElement, Props>(function Mark3D({ className = "", interactive = false }, ref) {
  const spin = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = spin.current;
    if (!el) return;
    // slow idle drift so the mark is never frozen
    gsap.set(el, { rotationY: -22, rotationX: 14 });
    const idle = gsap.to(el, { rotationY: 18, y: -14, duration: 3.2, ease: "sine.inOut", yoyo: true, repeat: -1 });
    if (!interactive || window.matchMedia("(hover: none)").matches) return () => void idle.kill();

    const rx = gsap.quickTo(el, "rotationX", { duration: 1.2, ease: "power3" });
    const ry = gsap.quickTo(el, "rotationZ", { duration: 1.2, ease: "power3" });
    const move = (e: PointerEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      rx(-ny * 30);
      ry(nx * 12);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      idle.kill();
      window.removeEventListener("pointermove", move);
    };
  }, [interactive]);

  return (
    <div ref={ref} className={`mark3d ${className}`} aria-hidden="true">
      <div ref={spin} className="mark3d__spin">
        {Array.from({ length: DEPTH }, (_, i) => (
          <span
            key={i}
            className={`mark3d__layer${i === 0 ? " is-front" : ""}${i === DEPTH - 1 ? " is-back" : ""}`}
            style={{ transform: `translateZ(${-i * 2.2}px)`, filter: i ? `brightness(${0.62 - i * 0.012})` : undefined }}
          />
        ))}
      </div>
    </div>
  );
});

export default Mark3D;

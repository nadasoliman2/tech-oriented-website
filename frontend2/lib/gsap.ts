"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
  gsap.defaults({ ease: "expo.out", duration: 1.2 });
}

export const EASE_IN_OUT = "expo.inOut";

/**
 * The reference sites animate regardless of the OS "reduce motion" setting, so this is off by default.
 * Set to true to honour prefers-reduced-motion (static reveals, no parallax/pinning/canvas motion).
 */
export const RESPECT_REDUCED_MOTION = false;

export function prefersReducedMotion() {
  return (
    RESPECT_REDUCED_MOTION &&
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export { gsap, ScrollTrigger, SplitText };

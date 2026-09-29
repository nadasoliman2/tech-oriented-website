"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/gsap";

/** Waving dot field that brightens around the pointer — stands in for Parallel's WebGL hero. */
export default function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduced = prefersReducedMotion();

    let w = 0, h = 0, dpr = 1, raf = 0, visible = true;
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
    const GAP = 26;

    // dots start from the theme foreground colour and tint toward brand teal near the pointer
    let base = { r: 255, g: 255, b: 255 };
    const readBase = () => {
      const m = getComputedStyle(canvas).color.match(/\d+/g);
      if (m && m.length >= 3) base = { r: +m[0], g: +m[1], b: +m[2] };
    };
    readBase();
    const themeObserver = new MutationObserver(readBase);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (t: number) => {
      const time = t * 0.00035;
      mouse.x += (mouse.tx - mouse.x) * 0.08;
      mouse.y += (mouse.ty - mouse.y) * 0.08;
      ctx.clearRect(0, 0, w, h);
      for (let x = GAP / 2; x < w; x += GAP) {
        for (let y = GAP / 2; y < h; y += GAP) {
          const wave = Math.sin(x * 0.006 + time * 2) * Math.cos(y * 0.008 - time * 1.4) + Math.sin((x + y) * 0.003 + time);
          const n = (wave + 2) / 4; // 0..1
          const dx = x - mouse.x, dy = y - mouse.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          const m = Math.max(0, 1 - d / 220);
          const push = m * 14;
          const px = x + (d ? (dx / d) * push : 0);
          const py = y + (d ? (dy / d) * push : 0) - n * 8;
          const a = 0.06 + n * 0.32 + m * 0.6;
          const radius = 0.6 + n * 1.3 + m * 1.6;
          // theme-coloured dots, shifting to brand teal (#66C1C0) around the pointer
          const tint = Math.min(1, m * 1.4 + n * 0.15);
          const cr = Math.round(base.r - (base.r - 102) * tint);
          const cg = Math.round(base.g - (base.g - 193) * tint);
          const cb = Math.round(base.b - (base.b - 192) * tint);
          ctx.fillStyle = `rgba(${cr},${cg},${cb},${a.toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(px, py, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      if (!reduced && visible) raf = requestAnimationFrame(draw);
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.tx = e.clientX - rect.left;
      mouse.ty = e.clientY - rect.top;
    };

    const io = new IntersectionObserver(([entry]) => {
      const was = visible;
      visible = entry.isIntersecting;
      if (visible && !was && !reduced) raf = requestAnimationFrame(draw);
    });

    resize();
    io.observe(canvas);
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return <canvas ref={ref} className="hero__canvas" aria-hidden="true" />;
}

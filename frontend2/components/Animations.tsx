"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { gsap, prefersReducedMotion, ScrollTrigger, SplitText } from "@/lib/gsap";
import { useSite } from "./Providers";

/**
 * Declarative scroll animations, re-bound on every route once the page is revealed.
 *
 *  data-split="lines|words|chars"   masked text rise (Parallel _splitLines)
 *  data-delay="0.2"                 extra delay for split / fade
 *  data-fade                        fade + rise block;  data-stagger on a parent staggers its children
 *  data-line                        rule draws in from the left
 *  data-parallax="0.12"             inner media drift (Fantasy media-fill)
 *  data-scrub-words                 word opacity scrubbed by scroll
 *  .odo__col[data-digit]            odometer digit roll
 *  .stack__card                     sticky stacked cards scale back
 *  [data-hslider]                   pinned horizontal scroll on desktop
 *  [data-timeline]                  progress rail + active steps
 *  [data-scramble]                  text decodes from random glyphs on enter
 *  [data-skew]                      skews with scroll velocity
 *  [data-reel]                      inset video frame grows to full-bleed while pinned
 */

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/#<>_";

function scramble(el: HTMLElement, delay = 0) {
  const final = el.dataset.text ?? el.textContent ?? "";
  el.dataset.text = final;
  const state = { p: 0 };
  return gsap.to(state, {
    p: 1,
    duration: 1.1,
    delay,
    ease: "power2.out",
    onUpdate: () => {
      const shown = Math.floor(state.p * final.length);
      let out = final.slice(0, shown);
      for (let i = shown; i < final.length; i++) {
        out += final[i] === " " ? " " : GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      el.textContent = out;
    },
    onComplete: () => void (el.textContent = final),
  });
}
export default function Animations() {
  const pathname = usePathname();
  const { ready } = useSite();

  useEffect(() => {
    if (!ready) return;
    const reduced = prefersReducedMotion();
    const splits: SplitText[] = [];
    let ctx: gsap.Context | null = null;
    let mm: gsap.MatchMedia | null = null;
    let cancelled = false;

    const run = () => {
      if (cancelled) return;
      ctx = gsap.context(() => {
        const inView = (el: Element) => el.getBoundingClientRect().top < window.innerHeight;

        // Masked text rise
        gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
          const type = (el.dataset.split || "lines") as "lines" | "words" | "chars";
          const delay = parseFloat(el.dataset.delay || "0") + (inView(el) ? 0.1 : 0);
          el.classList.add("is-split");
          if (reduced) return;
          const split = SplitText.create(el, {
            type: type === "chars" ? "lines,chars" : type,
            mask: type === "chars" ? "lines" : type,
            linesClass: "line",
            wordsClass: "word",
            autoSplit: true,
            onSplit(self) {
              const targets = type === "chars" ? self.chars : type === "words" ? self.words : self.lines;
              return gsap.from(targets, {
                yPercent: 140,
                duration: type === "chars" ? 1.4 : 1.3,
                stagger: type === "chars" ? 0.025 : type === "words" ? 0.03 : 0.09,
                delay,
                ease: "expo.out",
                scrollTrigger: { trigger: el, start: "top 90%", once: true },
              });
            },
          });
          splits.push(split);
        });

        // Fades
        gsap.utils.toArray<HTMLElement>("[data-fade]").forEach((el) => {
          if (reduced) return void gsap.set(el, { opacity: 1 });
          gsap.fromTo(
            el,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 1.4,
              delay: parseFloat(el.dataset.delay || "0") + (inView(el) ? 0.25 : 0),
              scrollTrigger: { trigger: el, start: "top 92%", once: true },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((el) => {
          if (reduced) return;
          gsap.from(el.children, {
            opacity: 0,
            y: 40,
            duration: 1.2,
            stagger: 0.08,
            delay: inView(el) ? 0.3 : 0,
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          });
        });

        // Rules
        gsap.utils.toArray<HTMLElement>("[data-line]").forEach((el) => {
          if (reduced) return;
          gsap.from(el, {
            scaleX: 0,
            transformOrigin: "left",
            duration: 1.6,
            ease: "expo.inOut",
            scrollTrigger: { trigger: el, start: "top 95%", once: true },
          });
        });

        // Media parallax
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          if (reduced) return;
          const amt = parseFloat(el.dataset.parallax || "0.1") * 100;
          gsap.fromTo(
            el,
            { yPercent: -amt / 2 },
            {
              yPercent: amt / 2,
              ease: "none",
              scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });

        // Clip reveal for media blocks
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          if (reduced) return;
          gsap.fromTo(
            el,
            { clipPath: "inset(12% 8% 12% 8% round 2rem)" },
            {
              clipPath: "inset(0% 0% 0% 0% round 0rem)",
              duration: 1.8,
              ease: "expo.out",
              scrollTrigger: { trigger: el, start: "top 85%", once: true },
            },
          );
        });

        // Word scrub (statement paragraphs)
        gsap.utils.toArray<HTMLElement>("[data-scrub-words]").forEach((el) => {
          const split = SplitText.create(el, { type: "words", wordsClass: "w" });
          splits.push(split);
          if (reduced) return void gsap.set(split.words, { opacity: 1 });
          gsap.to(split.words, {
            opacity: 1,
            stagger: 0.1,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: true },
          });
        });

        // Odometer digits
        gsap.utils.toArray<HTMLElement>(".odo").forEach((odo) => {
          const cols = odo.querySelectorAll<HTMLElement>(".odo__col");
          cols.forEach((col, i) => {
            const digit = parseInt(col.dataset.digit || "0", 10);
            // each column holds 0-9 twice + target, so it rolls a full turn before landing
            const target = 10 + digit;
            const rows = col.children.length;
            if (reduced) return void gsap.set(col, { yPercent: (-100 * target) / rows });
            gsap.fromTo(
              col,
              { yPercent: 0 },
              {
                yPercent: (-100 * target) / rows,
                duration: 2.2,
                delay: i * 0.12 + (inView(odo) ? 0.4 : 0),
                ease: "expo.inOut",
                scrollTrigger: { trigger: odo, start: "top 92%", once: true },
              },
            );
          });
        });

        // Stacked cards
        const cards = gsap.utils.toArray<HTMLElement>(".stack__card");
        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (!next || reduced) return;
          gsap.to(card, {
            scale: 0.9,
            ease: "none",
            scrollTrigger: { trigger: next, start: "top bottom", end: "top top+=80", scrub: true },
          });
        });

        // Scramble labels
        gsap.utils.toArray<HTMLElement>("[data-scramble], .label--dot").forEach((el) => {
          if (reduced) return;
          ScrollTrigger.create({
            trigger: el,
            start: "top 92%",
            once: true,
            onEnter: () => scramble(el, parseFloat(el.dataset.delay || "0") + (inView(el) ? 0.3 : 0)),
          });
        });

        // Velocity skew
        const skewTargets = gsap.utils.toArray<HTMLElement>("[data-skew]");
        if (skewTargets.length && !reduced) {
          const setters = skewTargets.map((t) => gsap.quickTo(t, "skewY", { duration: 0.6, ease: "power3" }));
          ScrollTrigger.create({
            onUpdate: (self) => {
              const v = gsap.utils.clamp(-5, 5, self.getVelocity() / -350);
              setters.forEach((set) => set(v));
            },
          });
        }

        // Showreel grow
        gsap.utils.toArray<HTMLElement>("[data-reel]").forEach((reel) => {
          const frame = reel.querySelector(".reel__frame");
          const title = reel.querySelector(".reel__title");
          if (!frame || reduced) return;
          gsap
            .timeline({
              scrollTrigger: { trigger: reel, start: "top top", end: "+=120%", pin: true, scrub: 1 },
            })
            .fromTo(
              frame,
              { clipPath: "inset(18% 22% 18% 22% round 2.4rem)" },
              { clipPath: "inset(0% 0% 0% 0% round 0rem)", ease: "none" },
            )
            .fromTo(title, { yPercent: 40, opacity: 0.2 }, { yPercent: 0, opacity: 1, ease: "none" }, 0);
        });

        // Timeline rail
        gsap.utils.toArray<HTMLElement>("[data-timeline]").forEach((tl) => {
          const bar = tl.querySelector(".timeline__rail i");
          if (bar)
            gsap.to(bar, {
              scaleY: 1,
              ease: "none",
              scrollTrigger: { trigger: tl, start: "top 60%", end: "bottom 60%", scrub: true },
            });
          tl.querySelectorAll(".step").forEach((step) =>
            ScrollTrigger.create({ trigger: step, start: "top 60%", toggleClass: "is-active" }),
          );
        });
      });

      // Pinned horizontal slider (desktop only)
      mm = gsap.matchMedia();
      mm.add("(min-width: 900px)", () => {
        gsap.utils.toArray<HTMLElement>("[data-hslider]").forEach((section) => {
          const track = section.querySelector<HTMLElement>(".hslider__track");
          const bar = section.querySelector<HTMLElement>(".hslider__progress i");
          if (!track) return;
          const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
          gsap.to(track, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => "+=" + distance(),
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => bar && gsap.set(bar, { scaleX: self.progress }),
            },
          });
        });
      });

      ScrollTrigger.refresh();
    };

    // wait for fonts so line splits are measured correctly
    const fontsReady = document.fonts?.ready ?? Promise.resolve();
    fontsReady.then(() => requestAnimationFrame(run));

    return () => {
      cancelled = true;
      mm?.revert();
      ctx?.revert();
      splits.forEach((s) => s.revert());
      document.querySelectorAll(".is-split").forEach((el) => el.classList.remove("is-split"));
      document.querySelectorAll<HTMLElement>("[data-text]").forEach((el) => {
        el.textContent = el.dataset.text ?? el.textContent;
      });
    };
  }, [pathname, ready]);

  return null;
}

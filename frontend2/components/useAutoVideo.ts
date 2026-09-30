"use client";

import { useEffect, type RefObject } from "react";

/*
 * Shared autoplay for every site video (cards, banners, showreel).
 *
 * Videos are rendered with `src` + `autoPlay`, so the browser starts them natively
 * the moment the HTML arrives — no waiting for JavaScript. This hook then keeps them
 * playing while on screen (never on hover) and pauses them off screen.
 *
 * Streaming many <video>s at once can exhaust the browser's per-host connections and
 * leave some frozen on a frame. A watchdog catches that: a visible video that isn't
 * advancing is swapped to a fully downloaded copy (a few at a time, cached per URL)
 * that plays from memory.
 */

const MAX_PARALLEL = 3;
let running = 0;
const queue: Array<() => void> = [];
const cache = new Map<string, Promise<string>>();

function pump() {
  while (running < MAX_PARALLEL && queue.length) {
    running++;
    queue.shift()!();
  }
}

function load(src: string): Promise<string> {
  let p = cache.get(src);
  if (!p) {
    p = new Promise<string>((resolve) => {
      queue.push(() => {
        fetch(src)
          .then((r) => (r.ok ? r.blob() : Promise.reject()))
          .then((b) => resolve(URL.createObjectURL(b)))
          .catch(() => resolve(src))
          .finally(() => {
            running--;
            pump();
          });
      });
      pump();
    });
    cache.set(src, p);
  }
  return p;
}

/** Plays the video whenever it is on screen (no hover needed), pauses it off screen. */
export function useAutoVideo(ref: RefObject<HTMLVideoElement | null>, src: string, speed = 1) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // React doesn't always write the `muted` attribute — set it directly so the browser allows autoplay
    el.muted = true;
    el.defaultPlaybackRate = speed;
    el.playbackRate = speed;

    let cancelled = false;
    let swapped = false;
    let visible = false;
    let lastTime = -1;
    let stuckTicks = 0;

    // keep retrying: a play() before data has loaded, or before the first user gesture
    // on strict autoplay settings, is rejected and would otherwise leave a frozen frame
    const tryPlay = () => {
      if (visible && el.paused) el.play().catch(() => {});
    };

    const swapToMemory = () => {
      if (swapped) return;
      swapped = true;
      load(src).then((url) => {
        if (cancelled || url === src) return;
        el.src = url;
        el.playbackRate = speed;
        tryPlay();
      });
    };

    const onScreen = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) tryPlay();
      else el.pause();
    });
    onScreen.observe(el);

    // watchdog: on screen but not moving for ~2s → play from a downloaded copy
    const watchdog = window.setInterval(() => {
      if (!visible) return;
      tryPlay();
      const t = el.currentTime;
      stuckTicks = t === lastTime ? stuckTicks + 1 : 0;
      lastTime = t;
      if (stuckTicks >= 4) swapToMemory();
    }, 500);

    const onRate = () => el.playbackRate !== speed && (el.playbackRate = speed);
    el.addEventListener("canplay", tryPlay);
    el.addEventListener("loadedmetadata", onRate);
    window.addEventListener("pointerdown", tryPlay, { passive: true });
    window.addEventListener("scroll", tryPlay, { passive: true });
    tryPlay();
    return () => {
      cancelled = true;
      onScreen.disconnect();
      window.clearInterval(watchdog);
      el.removeEventListener("canplay", tryPlay);
      el.removeEventListener("loadedmetadata", onRate);
      window.removeEventListener("pointerdown", tryPlay);
      window.removeEventListener("scroll", tryPlay);
    };
  }, [ref, src, speed]);
}

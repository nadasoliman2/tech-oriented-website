"use client";

import Lenis from "lenis";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Lang } from "@/lib/i18n";
import { EASE_IN_OUT, gsap, ScrollTrigger } from "@/lib/gsap";

type Theme = "dark" | "light";

type SiteContext = {
  ready: boolean;
  setReady: (v: boolean) => void;
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
  navigate: (href: string) => void;
  lenis: React.RefObject<Lenis | null>;
  theme: Theme;
  toggleTheme: () => void;
  lang: Lang;
  toggleLang: () => void;
};

const Ctx = createContext<SiteContext | null>(null);

export function useSite() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useSite must be used inside <Providers>");
  return ctx;
}

export default function Providers({ children, lang }: { children: ReactNode; lang: Lang }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("dark");
  const lenis = useRef<Lenis | null>(null);
  const curtain = useRef<HTMLDivElement>(null);
  const pending = useRef(false);
  const busy = useRef(false);

  // Theme: read the persisted choice (the inline head script already applied it to <html>)
  useEffect(() => {
    const stored = window.localStorage.getItem("theme");
    setTheme(stored === "light" ? "light" : "dark");
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      window.localStorage.setItem("theme", next);
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute("content", next === "light" ? "#ffffff" : "#080808");
      return next;
    });
  }, []);

  const toggleLang = useCallback(() => {
    const next = lang === "ar" ? "en" : "ar";
    document.cookie = `lang=${next}; path=/; max-age=31536000`;
    window.location.reload();
  }, [lang]);

  // Smooth scroll (Lenis) driven by the GSAP ticker so ScrollTrigger stays in sync
  useEffect(() => {
    const instance = new Lenis({ lerp: 0.09, wheelMultiplier: 1 });
    lenis.current = instance;
    instance.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      lenis.current = null;
    };
  }, []);

  // Lock scroll while loading or while the menu is open
  useEffect(() => {
    const l = lenis.current;
    if (!l) return;
    if (!ready || menuOpen) l.stop();
    else l.start();
  }, [ready, menuOpen]);

  const navigate = useCallback(
    (href: string) => {
      if (busy.current) return;
      const target = href.split("#")[0] || "/";
      if (target === pathname) {
        setMenuOpen(false);
        lenis.current?.scrollTo(0, { duration: 1.4 });
        return;
      }
      busy.current = true;
      pending.current = true;
      gsap.to(curtain.current, {
        opacity: 1,
        duration: 0.25,
        ease: "power1.out",
        onComplete: () => {
          setMenuOpen(false);
          setReady(false);
          router.push(href);
        },
      });
    },
    [pathname, router],
  );

  // Reveal the new page after the route has committed
  useEffect(() => {
    if (!pending.current) return;
    pending.current = false;
    lenis.current?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      setReady(true);
      gsap.to(curtain.current, {
        opacity: 0,
        duration: 0.35,
        ease: "power1.inOut",
        onComplete: () => void (busy.current = false),
      });
    });
  }, [pathname]);

  return (
    <Ctx.Provider
      value={{ ready, setReady, menuOpen, setMenuOpen, navigate, lenis, theme, toggleTheme, lang, toggleLang }}
    >
      {children}
      <div className="page-transition" ref={curtain} aria-hidden="true" />
    </Ctx.Provider>
  );
}

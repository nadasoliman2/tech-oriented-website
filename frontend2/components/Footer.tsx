import type { Lang } from "@/lib/i18n";
import { getData } from "@/lib/i18n-data";
import Button from "./Button";
import HideOn from "./HideOn";

const strings = {
  en: {
    getInTouch: "Get In Touch",
    letsTalk: "Let's talk.",
    ready: "Ready to build smarter digital operations?",
    requestConsultation: "Request a Consultation",
    company: "Company",
    contact: "Contact",
    services: "Services",
    rights: "All rights reserved.",
  },
  ar: {
    getInTouch: "تواصل معنا",
    letsTalk: "لنتحدث.",
    ready: "جاهز لبناء عمليات رقمية أذكى؟",
    requestConsultation: "اطلب استشارة",
    company: "الشركة",
    contact: "تواصل",
    services: "خدماتنا",
    rights: "جميع الحقوق محفوظة.",
  },
};

function SocialIcon({ label }: { label: string }) {
  const name = label.toLowerCase();
  if (name.includes("facebook")) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    );
  }
  if (name.includes("linkedin")) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z"/>
      </svg>
    );
  }
  if (name.includes("instagram")) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    );
  }
  return <span>{label}</span>;
}

export default function Footer({ lang }: { lang: Lang }) {
  const year = new Date().getFullYear();
  const { company } = getData(lang);
  const t = strings[lang];

  return (
    <footer className="footer">
      <div className="site-max">
        <HideOn path="/contact">
        <div className="footer__cta">
          <div>
            <h2 className="h1" data-split="lines">
              {t.letsTalk}
            </h2>
            <p className="lead muted mt-3 max-80" data-fade>
              {t.ready}
            </p>
          </div>
          <div className="flex wrap gap-1" data-fade>
            <Button href="/contact">{t.requestConsultation}</Button>
            {/* <Button href={`mailto:${company.email}`} variant="outline">
              {company.email}
            </Button> */}
          </div>
        </div>
        </HideOn>

        <div className="footer__cols">
          <div className="footer__col">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="logo-on-dark"
              src="/logo-full.png"
              alt="tech-oriented — tech solutions for every day problems"
              style={{ width: "min(36rem, 85%)", height: "auto" }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="logo-on-light"
              src="/logo-full-dark.png"
              alt="tech-oriented — tech solutions for every day problems"
              style={{ width: "min(36rem, 85%)", height: "auto" }}
            />
            <p className="muted max-60" style={{ fontSize: "1.4rem" }}>
              {company.summary}
            </p>
          </div>
          <div className="footer__col footer__contact">
            <ul>
              <li><a className="u-link" href={company.phoneHref} dir="ltr">{company.phone}</a></li>
              <li><a className="u-link" href={`mailto:${company.email}`}>{company.email}</a></li>
              <li className="muted">{company.address}</li>
            </ul>
          </div>
          {/* <div className="footer__col">
            <span className="label">{t.services}</span>
            <ul>
              {services.map((s) => (
                <li key={s.slug}><TLink className="u-link" href={`/services/${s.slug}`}>{s.name}</TLink></li>
              ))}
            </ul>
          </div> */}
        </div>
      </div>

      <div className="site-max footer__bottom">
        <span className="label">© {year} tech-oriented. {t.rights}</span>
        <div className="flex gap-1 items-center">
          {company.socials.map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="social-pill social-pill--icon"
              title={s.label}
              aria-label={s.label}
            >
              <SocialIcon label={s.label} />
            </a>
          ))}
        </div>
        <span className="label">{company.website}</span>
      </div>
    </footer>
  );
}

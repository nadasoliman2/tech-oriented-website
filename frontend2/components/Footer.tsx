import type { Lang } from "@/lib/i18n";
import { getData } from "@/lib/i18n-data";
import Button from "./Button";
import HideOn from "./HideOn";
import TLink from "./TLink";

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

export default function Footer({ lang }: { lang: Lang }) {
  const year = new Date().getFullYear();
  const { company, nav, services } = getData(lang);
  const t = strings[lang];

  return (
    <footer className="footer">
      <div className="site-max">
        <HideOn path="/contact">
        <div className="footer__cta">
          <div>
            <p className="label label--dot mb-3">{t.getInTouch}</p>
            <h2 className="h1" data-split="lines">
              {t.letsTalk}
            </h2>
            <p className="lead muted mt-3 max-80" data-fade>
              {t.ready}
            </p>
          </div>
          <div className="flex wrap gap-1" data-fade>
            <Button href="/contact">{t.requestConsultation}</Button>
            <Button href={`mailto:${company.email}`} variant="outline">
              {company.email}
            </Button>
          </div>
        </div>
        </HideOn>

        <div className="footer__cols">
          <div className="footer__col">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="logo-invert"
              src="/logo-full.png"
              alt="tech-oriented — tech solutions for every day problems"
              style={{ width: "min(32rem, 80%)", height: "auto" }}
            />
            <p className="muted max-60" style={{ fontSize: "1.4rem" }}>
              {company.summary}
            </p>
            <ul>
              <li><a className="u-link" href={company.phoneHref}>{company.phone}</a></li>
              <li><a className="u-link" href={`mailto:${company.email}`}>{company.email}</a></li>
              <li className="muted">{company.address}</li>
            </ul>
          </div>
          <div className="footer__col">
            <span className="label">{t.company}</span>
            <ul>
              {[...nav, { label: t.contact, href: "/contact" }].map((n) => (
                <li key={n.href}><TLink className="u-link" href={n.href}>{n.label}</TLink></li>
              ))}
            </ul>
          </div>
          <div className="footer__col">
            <span className="label">{t.services}</span>
            <ul>
              {services.map((s) => (
                <li key={s.slug}><TLink className="u-link" href={`/services/${s.slug}`}>{s.name}</TLink></li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="site-max footer__bottom">
        <span className="label">© {year} tech-oriented. {t.rights}</span>
        <div className="flex gap-2">
          {company.socials.map((s) => (
            <a key={s.href} href={s.href} target="_blank" rel="noreferrer" className="label u-link">
              {s.label}
            </a>
          ))}
        </div>
        <span className="label">{company.website}</span>
      </div>
    </footer>
  );
}

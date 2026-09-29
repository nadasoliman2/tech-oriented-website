import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Media from "@/components/Media";
import Button from "@/components/Button";
import PageHero from "@/components/PageHero";
import TLink from "@/components/TLink";
import { services } from "@/lib/data";
import { getLang } from "@/lib/i18n";
import { getData } from "@/lib/i18n-data";
import { serviceMedia } from "@/lib/media";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  return { title: s?.name ?? "Service", description: s?.summary };
}

const strings = {
  en: {
    services: "Services",
    capabilities: "Capabilities",
    whatWeDeliver: "What we deliver",
    bestFor: "Best For",
    whoFor: "Who it's for",
    contactCta: "Contact us to get started.",
    nextService: "Next service",
    arrow: "→",
  },
  ar: {
    services: "خدماتنا",
    capabilities: "قدراتنا",
    whatWeDeliver: "ماذا نقدّم",
    bestFor: "الأنسب لـ",
    whoFor: "لمن هذه الخدمة",
    contactCta: "تواصل معنا للبدء.",
    nextService: "الخدمة التالية",
    arrow: "←",
  },
};

export default async function ServicePage({ params }: Params) {
  const { slug } = await params;
  const lang = await getLang();
  const { services } = getData(lang);
  const t = strings[lang];
  const index = services.findIndex((s) => s.slug === slug);
  if (index < 0) notFound();
  const s = services[index];
  const next = services[(index + 1) % services.length];

  return (
    <>
      <PageHero
        label={`${t.services} / ${s.name}`}
        title={s.headline}
        wide
        body={s.body}
        meta={<span className="label">{s.subtitle}</span>}
        ambient
      />

      <section className="site-max">
        <div data-reveal>
          <Media media={serviceMedia[s.slug]} className="banner" parallax={0.18} eager />
        </div>
      </section>

      <section className="section site-max">
        <div className="detail-grid">
          <div className="detail-grid__aside detail-grid__aside--sticky">
            <h2 className="c2" data-split="lines">
              {t.whatWeDeliver}
            </h2>
          </div>
          <div className="detail-grid__main">
            <ul className="index-list">
              {s.capabilities.map((c, i) => (
                <li key={c} data-fade>
                  <span className="h5">{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section section--light">
        <div className="site-max detail-grid">
          <div className="detail-grid__aside">
            <h2 className="c2" data-split="lines">
              {t.whoFor}
            </h2>
          </div>
          <div className="detail-grid__main">
            <ul className="index-list">
              {s.bestFor.map((b, i) => (
                <li key={b} data-fade>
                  <span className="h5">{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex wrap gap-2 items-center" data-fade>
              <Button href="/contact" variant="dark">
                {s.cta}
              </Button>
              <span className="muted">{t.contactCta}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="site-max">
        <TLink href={`/services/${next.slug}`} className="next-link" data-cursor={t.nextService}>
          <p className="label mb-3">{t.nextService}</p>
          <span className="c1">{next.name} {t.arrow}</span>
        </TLink>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Media from "@/components/Media";
import Button from "@/components/Button";
import PageHero from "@/components/PageHero";
import TLink from "@/components/TLink";
import { getLang } from "@/lib/i18n";
import { getData } from "@/lib/i18n-data";
import { industryMedia, serviceMedia } from "@/lib/media";

export const metadata: Metadata = { title: "Services" };

const strings = {
  en: {
    services: "Services",
    open: "Open",
    learnMore: "Get a quote",
    drag: "Drag",
    sectors: "sectors",
    quoteBy: "— tech-oriented, AI & Digital Transformation Tech House",
  },
  ar: {
    services: "خدماتنا",
    open: "فتح",
    learnMore: "اعرف أكثر",
    drag: "اسحب",
    sectors: "قطاعات",
    quoteBy: "— tech-oriented، بيت تقني للذكاء الاصطناعي والتحول الرقمي",
  },
};

export default async function ServicesPage() {
  const lang = await getLang();
  const { about, industries, serviceGroups, services, servicesIntro } = getData(lang);
  const t = strings[lang];
  const groups = serviceGroups.map((g) => ({
    ...g,
    items: g.slugs.map((slug) => services.find((s) => s.slug === slug)!),
  }));

  return (
    <>
      <PageHero  title={t.services} condensed lang={lang} ambient />

      <section className="site-max">
        <h2 className="h3 max-120 mb-6" data-split="lines">
          {servicesIntro.title}
        </h2>
        {groups.map((g, gi) => (
          <div className="svc-group" key={g.key}>
            <header className="svc-group__head">
              <h2 className="h2" data-split="lines">
                {g.name}
              </h2>
              <p className="body-l muted" data-fade>
                {g.tagline}
              </p>
            </header>
            {g.items.map((s, i) => (
              <article className="svc" key={s.slug}>
                <div className="svc__head">
                  <div className="svc__num">
                    <span className="label">{s.subtitle}</span>
                  </div>
                  <TLink href={`/services/${s.slug}`} data-cursor={t.open}>
                    <h3 className="c1 svc__title" data-split="lines">
                      {s.name}
                    </h3>
                  </TLink>
                  <p className="body-l muted max-60" data-fade>
                    {s.summary}
                  </p>
                  <ul className="svc__caps" data-stagger>
                    {s.capabilities.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                  <div data-fade>
                    <Button href={`/contact?service=${s.slug}`} variant="outline">
                      {t.learnMore}
                    </Button>
                  </div>
                </div>
                <div className="svc__media" data-reveal>
                  <Media media={serviceMedia[s.slug]} />
                </div>
              </article>
            ))}
          </div>
        ))}
      </section>

      {/* Industries — pinned horizontal slider (Fantasy "industries") */}
      {/* <section className="hslider section" data-hslider>
        <div className="site-max hslider__head">
          <div>
            <h2 className="c1" data-split={lang === "ar" ? "words" : "chars"}>
              {industries.label}
            </h2>
          </div>
          <p className="body-l muted max-60">{industries.title} {industries.body}</p>
        </div>
        <div className="hslider__track" data-cursor={t.drag}>
          {industries.items.map((ind, i) => (
            <div className="hslider__slide" key={ind.key} data-skew>
              <Media media={industryMedia[ind.key]} parallax={0} />
              <div className="flex between gap-2">
                <h3 className="c3">{ind.name}</h3>
              </div>
              <p className="muted" style={{ fontSize: "1.6rem" }}>{ind.body}</p>
            </div>
          ))}
        </div>
        <div className="site-max">
          <div className="hslider__progress">
            <i />
          </div>
        </div>
      </section> */}

      {/* Statement (in place of Fantasy's client quote) */}
      <section className="section site-max">
        <blockquote className="h3 max-120" data-split="lines">
          &ldquo;{about.who.body[2]}&rdquo;
        </blockquote>
        <p className="label mt-4" data-fade>
          {t.quoteBy}
        </p>
      </section>
    </>
  );
}

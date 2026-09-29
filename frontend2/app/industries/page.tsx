import type { Metadata } from "next";
import Button from "@/components/Button";
import Media from "@/components/Media";
import PageHero from "@/components/PageHero";
import { getLang } from "@/lib/i18n";
import { getData } from "@/lib/i18n-data";
import { industryMedia } from "@/lib/media";

export const metadata: Metadata = { title: "Industries" };

const strings = {
  en: { discuss: "Discuss Your Industry Needs", cta: "Request a Consultation" },
  ar: { discuss: "ناقش احتياجات قطاعك", cta: "اطلب استشارة" },
};

export default async function IndustriesPage() {
  const lang = await getLang();
  const { industries } = getData(lang);
  const t = strings[lang];

  return (
    <>
      <PageHero label={industries.label} title={industries.title} wide body={industries.body} ambient />

      <section className="site-max section" style={{ paddingTop: 0 }}>
        <div className="products-grid">
          {industries.items.map((ind) => (
            <div className="pcard" key={ind.key} data-fade>
              <div className="relative">
                <Media media={industryMedia[ind.key]} className="media--ratio" parallax={0} play={false} />
              </div>
              <div className="pcard__meta">
                <h2 className="c3">{ind.name}</h2>
              </div>
              <p className="muted" style={{ fontSize: "1.6rem" }}>{ind.body}</p>
            </div>
          ))}
        </div>

        {/* <div className="ind-cta has-glow" data-fade>
          <h2 className="h3">{t.discuss}</h2>
          <Button href="/contact">{t.cta}</Button>
        </div> */}
      </section>
    </>
  );
}

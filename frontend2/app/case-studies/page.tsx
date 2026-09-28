import type { Metadata } from "next";
import Media from "@/components/Media";
import Button from "@/components/Button";
import PageHero from "@/components/PageHero";
import { getLang } from "@/lib/i18n";
import { getData } from "@/lib/i18n-data";
import { caseMedia } from "@/lib/media";

export const metadata: Metadata = { title: "Case Studies" };

const strings = {
  en: {
    challenge: "Challenge",
    solution: "Solution",
    delivered: "Delivered",
    impact: "Business Impact",
    nextTitle: "Ready to be the next success story?",
    cta: "Request a Consultation",
  },
  ar: {
    challenge: "التحدي",
    solution: "الحل",
    delivered: "ما تم تسليمه",
    impact: "الأثر على العمل",
    nextTitle: "جاهز لتكون قصة النجاح القادمة؟",
    cta: "اطلب استشارة",
  },
};

export default async function CaseStudiesPage() {
  const lang = await getLang();
  const { caseStudies, caseStudiesIntro } = getData(lang);
  const t = strings[lang];

  return (
    <>
      <PageHero label={caseStudiesIntro.label} title={caseStudiesIntro.title} body={caseStudiesIntro.body} />

      <section className="site-max">
        {caseStudies.map((c, i) => (
          <article className="case" key={c.slug} id={c.slug}>
            <div className="case__head">
              <div>
                <div className="flex gap-2 mb-3">
                  <span className="label">{String(i + 1).padStart(2, "0")}</span>
                  <span className="label label--dot">{c.sector}</span>
                </div>
                <h2 className="h3" data-split="lines">
                  {c.name}
                </h2>
              </div>
              <div className="acc__tags" data-stagger>
                {c.stack.map((s) => (
                  <span className="tag" key={s}>{s}</span>
                ))}
              </div>
            </div>

            <div className="mb-6" data-reveal>
              <Media media={caseMedia[c.slug]} className="banner" parallax={0.16} />
            </div>

            <div className="case__cols">
              <div className="case__col" data-fade>
                <h3 className="label mb-2">{t.challenge}</h3>
                <p>{c.challenge}</p>
              </div>
              <div className="case__col" data-fade data-delay="0.1">
                <h3 className="label mb-2">{t.solution}</h3>
                <p>{c.solution}</p>
              </div>
              <div className="case__col" data-fade data-delay="0.2">
                <h3 className="label mb-2">{t.delivered}</h3>
                <ul>
                  {c.delivered.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
              <div className="case__col" data-fade data-delay="0.3">
                <h3 className="label mb-2">{t.impact}</h3>
                <ul>
                  {c.impact.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="section site-max">
        <div className="rule mb-6" data-line />
        <div className="flex between items-end wrap gap-3">
          <h2 className="h2 max-120" data-split="lines">
            {t.nextTitle}
          </h2>
          <Button href="/contact">{t.cta}</Button>
        </div>
      </section>
    </>
  );
}

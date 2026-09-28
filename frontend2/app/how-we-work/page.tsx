import type { Metadata } from "next";
import Button from "@/components/Button";
import Media from "@/components/Media";
import PageHero from "@/components/PageHero";
import { getLang } from "@/lib/i18n";
import { getData } from "@/lib/i18n-data";
import { processMedia } from "@/lib/media";

export const metadata: Metadata = { title: "How We Work" };

const strings = {
  en: { theProcess: "The process", steps: "10 steps", cta: "Start With a Consultation" },
  ar: { theProcess: "المسار", steps: "10 خطوات", cta: "ابدأ باستشارة" },
};

export default async function HowWeWorkPage() {
  const lang = await getLang();
  const { process } = getData(lang);
  const t = strings[lang];

  return (
    <>
      <PageHero label={process.label} title={process.title} wide body={process.body} />

      <section className="site-max">
        <div data-reveal>
          <Media media={processMedia} className="banner" parallax={0.18} eager />
        </div>
      </section>

      <section className="section site-max">
        <div className="timeline" data-timeline>
          <div className="timeline__aside">
            <p className="label label--dot mb-3">{t.theProcess}</p>
            <h2 className="c1">
              {t.steps}
            </h2>
            <div className="mt-4">
              <Button href="/contact">{t.cta}</Button>
            </div>
          </div>
          <div className="timeline__steps">
            <div className="timeline__rail">
              <i />
            </div>
            {process.steps.map((s, i) => (
              <div className="step" key={s.title}>
                <p className="label step__num">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="h4" data-split="lines">
                  {s.title}
                </h3>
                <p className="body-l muted" data-fade>
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

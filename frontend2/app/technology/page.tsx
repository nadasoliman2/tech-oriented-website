import type { Metadata } from "next";
import Button from "@/components/Button";
import Marquee from "@/components/Marquee";
import Media from "@/components/Media";
import PageHero from "@/components/PageHero";
import { getLang } from "@/lib/i18n";
import { getData } from "@/lib/i18n-data";
import { technologyMedia, technologyStill } from "@/lib/media";

export const metadata: Metadata = { title: "Technology" };

const strings = {
  en: {
    stackLabel: "Technology Stack",
    stackTitle: "Project-first stack",
    matrixLabel: "Technology Decision Matrix",
    matrixTitle: "The right technology for the right business need.",
    requirement: "Business Requirement",
    direction: "Recommended Direction",
    deliveryLabel: "Delivery Capabilities",
    talkToTeam: "Talk to our technical team",
  },
  ar: {
    stackLabel: "حزمة التقنيات",
    stackTitle: "حزمة تضع المشروع أولًا",
    matrixLabel: "مصفوفة القرار التقني",
    matrixTitle: "التقنية الصحيحة لاحتياج العمل الصحيح.",
    requirement: "احتياج العمل",
    direction: "التوجه الموصى به",
    deliveryLabel: "قدرات التسليم",
    talkToTeam: "تحدث مع فريقنا التقني",
  },
};

export default async function TechnologyPage() {
  const lang = await getLang();
  const { technology } = getData(lang);
  const t = strings[lang];

  return (
    <>
      <PageHero label={technology.label} title={technology.title} wide body={technology.body} />

      <section className="site-max mb-6">
        <div data-reveal>
          <Media media={technologyMedia} className="banner" parallax={0.18} eager />
        </div>
      </section>

      <Marquee items={technology.stack.flatMap((g) => g.items).slice(0, 14)} speed={50} />

      <section className="section site-max">
        <div className="flex between items-end wrap gap-3 mb-6">
          <div>
            <p className="label label--dot mb-3" data-fade>
              {t.stackLabel}
            </p>
            <h2 className="h2" data-split="lines">
              {t.stackTitle}
            </h2>
          </div>
        </div>
        <div className="stack-groups" data-stagger>
          {technology.stack.map((g, i) => (
            <div className="stack-group" key={g.group}>
              <div className="flex between">
                <h3 className="c3">{g.group}</h3>
                <span className="label">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <ul>
                {g.items.map((it) => (
                  <li key={it} className="muted">{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="section site-max" style={{ paddingTop: 0 }}>
        <div className="grid-12 mb-6">
          <div className="span-left">
            <p className="label label--dot" data-fade>
              {t.matrixLabel}
            </p>
          </div>
          <div className="span-right-wide">
            <h2 className="h3" data-split="lines">
              {t.matrixTitle}
            </h2>
          </div>
        </div>
        <div className="matrix">
          <div className="matrix__row" style={{ paddingBlock: "1.6rem" }}>
            <span className="label">{t.requirement}</span>
            <span className="label">{t.direction}</span>
          </div>
          {technology.matrix.map((m) => (
            <div className="matrix__row" key={m.need} data-fade>
              <span className="h5">{m.need}</span>
              <span className="label" style={{ fontSize: "1.5rem" }}>{m.direction}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section section--light">
        <div className="site-max grid-12">
          <div className="span-left mb-4">
            <p className="label label--dot mb-3" data-fade>
              {t.deliveryLabel}
            </p>
            <div className="mb-3" data-reveal>
              <Media media={technologyStill} className="media--wide" parallax={0.1} />
            </div>
            <div data-fade>
              <Button href="/contact" variant="dark">
                {t.talkToTeam}
              </Button>
            </div>
          </div>
          <div className="span-right-wide">
            <div className="acc__tags" data-stagger>
              {technology.capabilities.map((c) => (
                <span className="tag" key={c} style={{ height: "4.4rem", fontSize: "1.3rem" }}>
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

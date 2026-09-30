import type { Metadata } from "next";
import Media from "@/components/Media";
import Button from "@/components/Button";
import PageHero from "@/components/PageHero";
import { getLang } from "@/lib/i18n";
import { getData } from "@/lib/i18n-data";
import { aboutMedia, regionalMedia } from "@/lib/media";

export const metadata: Metadata = { title: "About" };

const strings = {
  en: {
    positioning: "Positioning",
    different: "What Makes Us Different",
    differentTitle: "We build around each company's workflow instead of forcing generic systems.",
    getInTouch: "Get In Touch",
  },
  ar: {
    positioning: "موقعنا",
    different: "ما الذي يميزنا",
    differentTitle: "نبني حول مسار عمل كل شركة بدلًا من فرض أنظمة عامة.",
    getInTouch: "تواصل معنا",
  },
};

export default async function AboutPage() {
  const lang = await getLang();
  const { about } = getData(lang);
  const t = strings[lang];

  return (
    <>
      <PageHero label={about.label} title={about.title} wide body={about.intro.join(" ")} ambient model="blob" />

      <section className="site-max">
        <div data-reveal>
          <Media media={aboutMedia} className="banner" parallax={0.2} eager />
        </div>
      </section>

      <section className="section site-max about-who">
        <p className="statement max-120" data-scrub-words>
          {about.who.body[0]}
        </p>
        <div className="tile-grid about-who__tiles" data-stagger>
          {about.who.body.slice(1).map((p) => (
            <div className="tile tile--text" key={p}>
              <p className="tile__title">{p}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section section--light has-glow about-house">
        <div className="site-max grid-12">
          <div className="span-left mb-4">
            <h2 className="c2 accent" data-split="lines">
              {about.house.title}
            </h2>
          </div>
          <div className="span-right col gap-3">
            {about.house.body.map((p) => (
              <p className="lead" key={p} data-fade>
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="section site-max">
        <h2 className="h3 max-120 mb-4" data-split="lines">
          {t.differentTitle}
        </h2>
        <div className="tile-grid about-diff" data-stagger>
          {about.different.map((d) => (
            <div className="tile tile--text" key={d.title}>
              <h3 className="tile__title">{d.title}</h3>
              <p className="tile__body">{d.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section site-max" style={{ paddingTop: 0 }}>
        <div className="feature">
          <div className="feature__media" data-reveal>
            <Media media={regionalMedia} className="media--square" />
          </div>
          <div className="feature__text">
            <h2 className="h4" data-split="lines">
              {about.regional.body[0]}
            </h2>
            <p className="body-l muted" data-fade>
              {about.regional.body[1]}
            </p>
            <div data-fade>
              <Button href="/contact">{t.getInTouch}</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

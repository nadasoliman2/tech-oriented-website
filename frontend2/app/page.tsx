import Accordion from "@/components/Accordion";
import Button from "@/components/Button";
import HeroCanvas from "@/components/HeroCanvas";
import Marquee from "@/components/Marquee";
import Media from "@/components/Media";
import Odometer from "@/components/Odometer";
import TLink from "@/components/TLink";
import { getLang } from "@/lib/i18n";
import { getData } from "@/lib/i18n-data";
import { aboutMedia, caseLogos, caseMedia, featuredMedia, heroMedia, problemMedia, productMedia, showreelMedia } from "@/lib/media";

const strings = {
  en: {
    scroll: "Scroll",
    heroTitlePrefix: "AI & Digital ",
    heroTitleAccent: "Transformation",
    heroTitleSuffix: " Tech House",
    requestConsultation: "Request a Consultation",
    exploreSolutions: "Explore Our Solutions",
    techBuiltAround: "Technology built around your business needs",
    // theProblem: "The problem",
    latestProjects: "Latest projects",
    successStories: "Selected Success Stories",
    allCaseStudies: "All case studies",
    view: "View",
    learnMore: "Learn more",
    capabilities: "Capabilities",
    customerLabel: "Customer",
    exploreEverySecondAi: "Explore Every Second AI",
    chatQuestion: "Do you have appointments available tomorrow?",
    chatAnswer: "Yes. I can book you at 11:00 or 15:30. Which works best?",
    products: "Products",
    ourProducts: "Our Products",
    allProducts: "All products",
    ourStory: "Our Story",
    reelTitlePrefix: "Technology built around your ",
    reelTitleAccent: "business needs.",
    // reelBrand: "tech-oriented.digital",
  },
  ar: {
    scroll: "مرر لأسفل",
    heroTitlePrefix: "بيت تقني للذكاء الاصطناعي و",
    heroTitleAccent: "التحول الرقمي",
    heroTitleSuffix: "",
    requestConsultation: "اطلب استشارة",
    exploreSolutions: "استكشف حلولنا",
    techBuiltAround: "تقنية مصممة حول احتياجات عملك",
    // theProblem: "المشكلة",
    latestProjects: "أحدث المشاريع",
    successStories: "قصص نجاح مختارة",
    allCaseStudies: "كل قصص النجاح",
    view: "عرض",
    learnMore: "اعرف أكثر",
    capabilities: "القدرات",
    customerLabel: "العميل",
    exploreEverySecondAi: "استكشف Every Second AI",
    chatQuestion: "هل لديكم مواعيد متاحة غدًا؟",
    chatAnswer: "نعم، يمكنني حجز موعد الساعة 11:00 أو 15:30. أيهما يناسبك؟",
    products: "منتجاتنا",
    ourProducts: "منتجاتنا",
    allProducts: "كل المنتجات",
    ourStory: "قصتنا",
    reelTitlePrefix: "تقنية مصممة حول ",
    reelTitleAccent: "احتياجات عملك.",
    // reelBrand: "tech-oriented.digital",
  },
};

export default async function HomePage() {
  const lang = await getLang();
  const { about, caseStudies, home, products, serviceGroups, services } = getData(lang);
  // marketing first, then software — in the order each group lists them
  const serviceOrder = [...serviceGroups].sort((a, b) => (a.key === "marketing" ? -1 : b.key === "marketing" ? 1 : 0));
  const t = strings[lang];
  const featured = products[0];
  const others = products.slice(1);

  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="hero">
        <div className="hero__video" aria-hidden="true">
          {/* <video src={`/media/v/${heroMedia.id}.mp4`} poster={`/media/p/${heroMedia.id}.jpg`} autoPlay muted loop playsInline /> */}
        </div>
        <HeroCanvas />
        <div className="hero__vignette" />
        {/* <div className="hero__scroll label">
          <span>{t.scroll}</span>
          <i />
        </div> */}
        <div className="site-max hero__content">
          <h1 className="hero-title hero__title" data-split={lang === "ar" ? "words" : "chars"}>
            {t.heroTitlePrefix}<span className="accent">{t.heroTitleAccent}</span>{t.heroTitleSuffix}
          </h1>
          <div className="hero__foot">
            <p className="lead hero__lead muted" data-fade data-delay="0.5">
              {home.lead}
            </p>
            <div className="hero__ctas" data-fade data-delay="0.65">
              <Button href="/contact">{t.requestConsultation}</Button>
              <Button href="/services" variant="outline">
                {t.exploreSolutions}
              </Button>
            </div>
          </div>
          {/* <div className="stats mt-6">
            {home.stats.map((s) => (
              <div className="stat" key={s.label} data-fade data-delay="0.7">
                <span className="stat__value">
                  {/\d/.test(s.value) ? <Odometer value={s.value} /> : <span>{s.value}</span>}
                  {s.suffix && <span className="stat__suffix">{s.suffix}</span>}
                </span>
                <span className="label">{s.label}</span>
              </div>
            ))}
          </div> */}
        </div>
      </section>

      <Marquee items={home.paradigms.items.map((p) => p.title)} />

      {/* ---------------- Showreel (grows to full-bleed) ---------------- */}
      <section className="reel" data-reel>
        <div className="reel__frame">
          <video src={`/media/v/${showreelMedia.id}.mp4`} poster={`/media/p/${showreelMedia.id}.jpg`} autoPlay muted loop playsInline preload="none" />
        </div>
        <div className="reel__text">
          <h2 className="h2 reel__title">
            {t.reelTitlePrefix}<span className="accent">{t.reelTitleAccent}</span>
          </h2>
        </div>
      </section>

      {/* ---------------- Intro statement ---------------- */}
      {/* <section className="section site-max">
        <div className="grid-12">
          <div className="span-left mb-4">
          </div>
          <div className="span-right-wide">
            <p className="statement" data-scrub-words>
              {home.body}
            </p>
          </div>
        </div>
      </section> */}

      {/* ---------------- Problem ---------------- */}
      {/* <section className="section section--light problem">
        <div className="site-max problem__grid">
          <div className="problem__intro">
            <h2 className="h3" data-split="lines">
              {home.problem.title}
            </h2>
            <p className="body-l muted" data-fade>
              {home.problem.body}
            </p>
            <div className="problem__media" data-reveal>
              <Media media={problemMedia} className="media--wide" parallax={0.1} />
            </div>
          </div>
          <ul className="tile-grid" data-stagger>
            {home.problem.points.map((p) => (
              <li className="tile" key={p}>
                <span className="tile__title">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </section> */}

      {/* ---------------- Latest projects (stacked) ---------------- */}
      <section className="section section--stories site-max">
        <div className="flex between items-end wrap gap-3 mb-4">
          <div>
            <h2 className="h2" data-split="lines">
              {t.successStories}
            </h2>
          </div>
          <Button href="/our-work" variant="outline">
            {t.allCaseStudies}
          </Button>
        </div>
        <div className="stack">
          {caseStudies.map((c, i) => (
            <TLink href="/our-work" className="stack__card" key={c.slug} data-cursor={t.view}>
              <div className="stack__info">
                {caseLogos[c.slug] ? (
                  <div className={`stack__logo${caseLogos[c.slug].tall ? " stack__logo--tall" : ""}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="logo-on-dark" src={caseLogos[c.slug].src.replace(".png", "-dark.png")} alt="" aria-hidden="true" loading="lazy" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="logo-on-light" src={caseLogos[c.slug].src} alt="" aria-hidden="true" loading="lazy" />
                  </div>
                ) : null}
                <h3 className={caseLogos[c.slug] ? "sr-only" : "h3"}>{c.name}</h3>
                <span className="label">{c.sector}</span>
                <p className="body-l muted max-60">{c.solution}</p>
              </div>
              <div className="stack__media">
                <Media media={caseMedia[c.slug]} parallax={0} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="stack__wm" src="/logo-wordmark.png" alt="" aria-hidden="true" />
              </div>
            </TLink>
          ))}
        </div>
      </section>

      {/* ---------------- Services ---------------- */}
      <section className="section site-max">
        <h2 className="h3 max-120 mb-4" data-split="lines">
          {home.paradigms.title}
        </h2>
        {serviceOrder.map((g, gi) => (
          <div className="svc-block" key={g.key}>
            <div className="svc-block__head">
              <h3 className="h4">{g.name}</h3>
              <p className="body-l muted">{g.tagline}</p>
            </div>
            <Accordion
              initial={gi === 0 ? 0 : -1}
              items={g.slugs
                .map((slug) => services.find((s) => s.slug === slug)!)
                .map((s) => ({
            title: s.name,
            sub: s.subtitle,
            content: (
              <>
                <div className="col gap-3">
                  <p className="body-l muted">{s.summary}</p>
                  <div>
                    <Button href={`/services/${s.slug}`} size="sm">
                      {t.learnMore}
                    </Button>
                  </div>
                </div>
                <div className="col gap-2">
                  <span className="label">{t.capabilities}</span>
                  <div className="acc__tags">
                    {s.capabilities.slice(0, 6).map((c) => (
                      <span className="tag" key={c}>{c}</span>
                    ))}
                  </div>
                </div>
              </>
            ),
          }))}
            />
          </div>
        ))}
      </section>

      {/* ---------------- Featured product ---------------- */}
      {/* <section className="section section--tight site-max">
        <div className="feature">
          <div className="feature__media" data-reveal>
            <Media media={featuredMedia} className="media--square" />
            <div className="chat" aria-hidden="true">
              <div className="chat__msg chat__msg--in" data-fade>
                <span className="chat__meta">{t.customerLabel} · 09:41</span>
                {t.chatQuestion}
              </div>
              <div className="chat__msg chat__msg--out" data-fade data-delay="0.2">
                <span className="chat__meta">Every Second AI · 09:41</span>
                {t.chatAnswer}
              </div>
            </div>
          </div>
          <div className="feature__text">
            <h2 className="h3" data-split="lines">
              {home.featured.title}
            </h2>
            {home.featured.body.map((p) => (
              <p className="body-l muted" key={p} data-fade>
                {p}
              </p>
            ))}
            <div className="acc__tags" data-stagger>
              {home.featured.features.map((f) => (
                <span className="tag" key={f}>{f}</span>
              ))}
            </div>
            <div data-fade>
              <Button href={`/products/${featured.slug}`}>{t.exploreEverySecondAi}</Button>
            </div>
          </div>
        </div>
      </section> */}

      {/* ---------------- Products ---------------- */}
      {/* <section className="section site-max">
        <div className="flex between items-end wrap gap-3 mb-6">
          <div>
            <h2 className="h2" data-split="lines">
              {t.ourProducts}
            </h2>
          </div>
          <Button href="/products" variant="outline">
            {t.allProducts}
          </Button>
        </div>
        <div className="products-grid">
          {others.slice(0, 6).map((p) => (
            <TLink href={`/products/${p.slug}`} className="pcard" key={p.slug} data-cursor={t.view} data-fade>
              <div className="relative">
                <span className="tag tag--solid pcard__status">{p.status}</span>
                <Media media={productMedia[p.slug]} className="media--ratio" parallax={0} play={false} />
              </div>
              <div className="pcard__meta">
                <h3 className="c3">{p.name}</h3>
                <span className="label">{p.category}</span>
              </div>
              <p className="muted" style={{ fontSize: "1.6rem" }}>{p.headline}</p>
            </TLink>
          ))}
        </div>
      </section> */}

      {/* ---------------- Mission ---------------- */}
      <section className="section section--light has-glow">
        <div className="site-max mission">
          <div className="mission__media" data-reveal>
            <Media media={aboutMedia} className="media--ratio" parallax={0.12} />
          </div>
          <div className="col gap-4">
            <p className="statement" data-scrub-words>
              {about.who.body[2]}
            </p>
            <p className="body-l muted max-80" data-fade>
              {about.intro[0]} {about.intro[1]}
            </p>
            <div data-fade>
              <Button href="/about" variant="outline">
                {t.ourStory}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Media from "@/components/Media";
import Button from "@/components/Button";
import PageHero from "@/components/PageHero";
import TLink from "@/components/TLink";
import { products } from "@/lib/data";
import { getLang } from "@/lib/i18n";
import { getData } from "@/lib/i18n-data";
import { productMedia } from "@/lib/media";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = products.find((x) => x.slug === slug);
  return { title: p?.name ?? "Product", description: p?.headline };
}

const strings = {
  en: {
    products: "Products",
    keyFeatures: "Key Features",
    inside: "Inside",
    bestFor: "Best For",
    category: "Category",
    getInTouch: "Get In Touch",
    nextProduct: "Next product",
    arrow: "→",
  },
  ar: {
    products: "منتجاتنا",
    keyFeatures: "أبرز المزايا",
    inside: "داخل",
    bestFor: "الأنسب لـ",
    category: "التصنيف",
    getInTouch: "تواصل معنا",
    nextProduct: "المنتج التالي",
    arrow: "←",
  },
};

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const lang = await getLang();
  const { products } = getData(lang);
  const t = strings[lang];
  const index = products.findIndex((p) => p.slug === slug);
  if (index < 0) notFound();
  const p = products[index];
  const next = products[(index + 1) % products.length];

  return (
    <>
      <PageHero
        label={`${t.products} / ${p.category}`}
        title={p.name}
        condensed
        lang={lang}
        body={
          <>
            {p.headline} {p.body}
          </>
        }
        meta={<span className="tag tag--solid">{p.status}</span>}
      />

      <section className="site-max">
        <div data-reveal>
          <Media media={productMedia[p.slug]} className="banner" parallax={0.18} eager />
        </div>
      </section>

      <section className="section site-max">
        <div className="detail-grid">
          <div className="detail-grid__aside detail-grid__aside--sticky">
            <p className="label label--dot mb-3">{t.keyFeatures}</p>
            <h2 className="c2" data-split="lines">
              {t.inside} {p.name}
            </h2>
          </div>
          <div className="detail-grid__main">
            <ul className="index-list">
              {p.features.map((f, i) => (
                <li key={f} data-fade>
                  <span className="label">{String(i + 1).padStart(2, "0")}</span>
                  <span className="h5">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section section--light">
        <div className="site-max detail-grid">
          <div className="detail-grid__aside">
            <p className="label label--dot mb-3">{t.bestFor}</p>
            <p className="label">{t.category}: {p.category}</p>
          </div>
          <div className="detail-grid__main">
            <p className="h4" data-split="lines">
              {p.bestFor}
            </p>
            <div className="mt-4 flex wrap gap-1" data-fade>
              <Button href="/contact" variant="dark">
                {p.cta}
              </Button>
              <Button href="/contact" variant="outline">
                {t.getInTouch}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="site-max">
        <TLink href={`/products/${next.slug}`} className="next-link" data-cursor={t.nextProduct}>
          <p className="label mb-3">{t.nextProduct}</p>
          <span className="c1">{next.name} {t.arrow}</span>
        </TLink>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Media from "@/components/Media";
import PageHero from "@/components/PageHero";
import TLink from "@/components/TLink";
import { getLang } from "@/lib/i18n";
import { getData } from "@/lib/i18n-data";
import { productMedia } from "@/lib/media";

export const metadata: Metadata = { title: "Products" };

const strings = {
  en: { products: "Products", view: "View" },
  ar: { products: "منتجاتنا", view: "عرض" },
};

export default async function ProductsPage() {
  const lang = await getLang();
  const { products } = getData(lang);
  const t = strings[lang];

  return (
    <>
      <PageHero
       
        title={t.products}
        condensed
        lang={lang}
        ambient
      />
      <section className="site-max section" style={{ paddingTop: 0 }}>
        <div className="products-grid">
          {products.map((p, i) => (
            <TLink href={`/products/${p.slug}`} className="pcard" key={p.slug} data-cursor={t.view} data-fade>
              <div className="relative">
                <span className="tag tag--solid pcard__status">{p.status}</span>
                <Media media={productMedia[p.slug]} className="media--ratio" parallax={0} play={false} />
              </div>
              <div className="pcard__meta">
                <h2 className="c3">{p.name}</h2>
              </div>
              <span className="label">{p.category}</span>
              <p className="muted" style={{ fontSize: "1.6rem" }}>{p.headline}</p>
            </TLink>
          ))}
        </div>
      </section>
    </>
  );
}

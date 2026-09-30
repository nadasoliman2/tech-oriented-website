import type { Metadata } from "next";
import Media from "@/components/Media";
import PageHero from "@/components/PageHero";
import ProductLogo from "@/components/ProductLogo";
import TLink from "@/components/TLink";
import { getLang } from "@/lib/i18n";
import { getData } from "@/lib/i18n-data";
import { brandDomain, brandStyle } from "@/lib/brands";
import { productMedia } from "@/lib/media";

export const metadata: Metadata = { title: "Products" };

const strings = {
  en: { products: "Products" },
  ar: { products: "منتجاتنا" },
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
            <TLink
              href={`/products/${p.slug}`}
              className={`pcard${brandStyle(p.slug) ? " brand-scope" : ""}`}
              style={brandStyle(p.slug)}
              key={p.slug}
              data-fade
            >
              <div className="pcard__media">
                <span className="tag tag--solid pcard__status">{p.status}</span>
                <Media media={productMedia[p.slug]} className="media--ratio" parallax={0} />
              </div>
              {/* <div className="pcard__meta">
                <h2 className="pcard__title">
                  <ProductLogo slug={p.slug} name={p.name} />
                </h2>
              </div> */}
              <span className="label">{p.category}</span>
              <p className="muted" style={{ fontSize: "1.6rem" }}>{p.headline}</p>
              {/* {brandDomain(p.slug) && <span className="pcard__domain">{brandDomain(p.slug)}</span>} */}
            </TLink>
          ))}
        </div>
      </section>
    </>
  );
}

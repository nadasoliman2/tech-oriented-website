import type { Metadata } from "next";
import Button from "@/components/Button";
import HoverRows from "@/components/HoverRows";
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
      <PageHero label={industries.label} title={industries.title} wide body={industries.body} />

      <section className="site-max section" style={{ paddingTop: 0 }}>
        <HoverRows
          rows={industries.items.map((ind) => ({
            title: ind.name,
            body: ind.body,
            media: industryMedia[ind.key],
            tone: "var(--accent)",
          }))}
        />
        <div className="flex between items-end wrap gap-3 mt-6">
          <h2 className="h3 max-120" data-split="lines">
            {t.discuss}
          </h2>
          <Button href="/contact">{t.cta}</Button>
        </div>
      </section>
    </>
  );
}

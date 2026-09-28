import Button from "@/components/Button";
import { getLang } from "@/lib/i18n";

const strings = {
  en: { title: "Page not found", back: "Back to home" },
  ar: { title: "الصفحة غير موجودة", back: "العودة للرئيسية" },
};

export default async function NotFound() {
  const lang = await getLang();
  const t = strings[lang];

  return (
    <section className="page-hero site-max">
      <p className="label label--dot mb-3">404</p>
      <h1 className="c1">{t.title}</h1>
      <div className="mt-4">
        <Button href="/">{t.back}</Button>
      </div>
    </section>
  );
}

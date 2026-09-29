import type { Metadata } from "next";
import AmbientBg from "@/components/AmbientBg";
import ContactForm from "@/components/ContactForm";
import { getLang } from "@/lib/i18n";

export const metadata: Metadata = { title: "Contact" };

const strings = {
  en: { title: "Send Us a Message" },
  ar: { title: "أرسل لنا رسالة" },
};

export default async function ContactPage() {
  const lang = await getLang();
  const t = strings[lang];

  return (
    <section className="contact">
      <AmbientBg />
      <div className="site-max contact__inner">
        <h1 className="contact__title" data-fade>
          {t.title}
        </h1>
        <div className="contact__card" data-fade data-delay="0.15">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

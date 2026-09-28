import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { getLang } from "@/lib/i18n";
import { getData } from "@/lib/i18n-data";

export const metadata: Metadata = { title: "Contact" };

function Icon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

const ICONS = {
  phone: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2",
  mail: "M4 6h16v12H4zM4 7l8 6 8-6",
  pin: "M12 21s-7-6.5-7-12a7 7 0 0 1 14 0c0 5.5-7 12-7 12zM12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5",
};

const strings = {
  en: {
    title: (
      <>
        Let&apos;s build <span className="accent">smarter</span> digital operations.
      </>
    ),
    phone: "Phone",
    email: "Email",
    office: "Office",
    followUs: "Follow Us",
    sendMessage: "Send Us a Message",
  },
  ar: {
    title: (
      <>
        لنبنِ عمليات رقمية <span className="accent">أذكى</span>.
      </>
    ),
    phone: "الهاتف",
    email: "البريد الإلكتروني",
    office: "المكتب",
    followUs: "تابعنا",
    sendMessage: "أرسل لنا رسالة",
  },
};

/** Contact sits entirely above the fold: intro + details on the left, form card on the right. */
export default async function ContactPage() {
  const lang = await getLang();
  const { company, contact } = getData(lang);
  const t = strings[lang];

  return (
    <section className="contact">
      <div className="contact__bg" aria-hidden="true">
        <span className="contact__orb contact__orb--a" />
        <span className="contact__orb contact__orb--b" />
        <span className="contact__grid" />
      </div>

      <div className="site-max contact__inner">
        <div className="contact__intro">
          <p className="label label--dot" data-fade>
            {contact.label}
          </p>
          <h1 className="contact__title" data-split="lines">
            {t.title}
          </h1>
          <p className="contact__body" data-fade data-delay="0.2">
            {contact.body}
          </p>
        </div>

        <div className="contact__details">
          <div className="contact__cards" data-stagger>
            <a className="ccard" href={company.phoneHref}>
              <span className="ccard__icon"><Icon d={ICONS.phone} /></span>
              <span className="ccard__text">
                <span className="label">{t.phone}</span>
                <span>{company.phone}</span>
              </span>
            </a>
            <a className="ccard" href={`mailto:${company.email}`}>
              <span className="ccard__icon"><Icon d={ICONS.mail} /></span>
              <span className="ccard__text">
                <span className="label">{t.email}</span>
                <span>{company.email}</span>
              </span>
            </a>
            <div className="ccard ccard--wide">
              <span className="ccard__icon"><Icon d={ICONS.pin} /></span>
              <span className="ccard__text">
                <span className="label">{t.office}</span>
                <span>{company.address}</span>
              </span>
            </div>
          </div>

          <div className="contact__socials" data-fade data-delay="0.3">
            <span className="label">{t.followUs}</span>
            {company.socials.map((s) => (
              <a key={s.href} href={s.href} target="_blank" rel="noreferrer" className="social-pill">
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div className="contact__card" data-fade data-delay="0.15">
          <div className="contact__card-head">
            <span className="label">{t.sendMessage}</span>
            <span className="contact__status">
              <i /> {company.website}
            </span>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

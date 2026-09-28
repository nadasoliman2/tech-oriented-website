"use client";

import { useState, type FormEvent } from "react";
import { getData } from "@/lib/i18n-data";
import { useSite } from "./Providers";
import Button from "./Button";
import { sendInquiry, type InitiativeScope } from "@/api";

const strings = {
  en: {
    name: "Name *",
    email: "Email *",
    phone: "Phone",
    company: "Company",
    interested: "Service Interested In",
    message: "Message",
    send: "Send Request",
    sending: "Sending...",
    success: "Request sent successfully!",
    error: "Failed to send request. Please try again.",
  },
  ar: {
    name: "الاسم *",
    email: "البريد الإلكتروني *",
    phone: "الهاتف",
    company: "الشركة",
    interested: "الخدمة التي تهمك",
    message: "الرسالة",
    send: "إرسال الطلب",
    sending: "جاري الإرسال...",
    success: "تم إرسال الطلب بنجاح!",
    error: "حدث خطأ أثناء الإرسال. الرجاء المحاولة لاحقاً.",
  },
};

// Map UI interest titles to backend InitiativeScope enum values
const SCOPE_MAP: Record<string, InitiativeScope> = {
  "AI Solutions": "AI & Automation",
  "Every Second AI": "Every Second AI",
  "Automation Solutions": "AI & Automation",
  "CRM & Business Systems": "Custom CRM / ERP",
  "Custom Software Development": "Custom CRM / ERP",
  "Web & Mobile Applications": "Web & Mobile Apps",
  "Business Dashboards": "Executive Dashboards",
  "Product Partnership": "Product Partnership",
  "General Inquiry": "General Advisory",

  // Arabic
  "حلول الذكاء الاصطناعي": "AI & Automation",
  "حلول الأتمتة": "AI & Automation",
  "أنظمة CRM والأعمال": "Custom CRM / ERP",
  "تطوير برمجيات مخصصة": "Custom CRM / ERP",
  "تطبيقات الويب والموبايل": "Web & Mobile Apps",
  "لوحات تحكم الأعمال": "Executive Dashboards",
  "شراكة منتج": "Product Partnership",
  "استفسار عام": "General Advisory",
};

export default function ContactForm() {
  const { lang } = useSite();
  const { contact } = getData(lang);
  const t = strings[lang];

  const [interests, setInterests] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const toggle = (v: string) =>
    setInterests((cur) => (cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v]));

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(null);

    const form = e.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const companyName = String(data.get("company") || "").trim();
    const message = String(data.get("message") || "").trim();

    // Front-end Validation
    if (!name || !email) {
      setStatus({
        type: "error",
        text: lang === "ar" ? "الرجاء إدخال الاسم والبريد الإلكتروني" : "Please fill in all required fields (*).",
      });
      return;
    }

    // Map selected interests to backend InitiativeScope Enum
    const mappedScopes = interests
      .map((i) => SCOPE_MAP[i])
      .filter((v): v is InitiativeScope => Boolean(v));
    const uniqueScopes = Array.from(new Set(mappedScopes));

    setLoading(true);

    const res = await sendInquiry({
      fullName: name,
      workEmail: email,
      phone: phone || "N/A",
      company: companyName || name,
      initiativeScope: uniqueScopes.length > 0 ? uniqueScopes : ["General Advisory"],
      technicalSpecifications: message.slice(0, 600) || "General contact inquiry.",
      type: "CONSULTATION", // Default as requested
    });

    setLoading(false);

    if (res.success) {
      setStatus({ type: "success", text: t.success });
      form.reset();
      setInterests([]);
    } else {
      setStatus({ type: "error", text: res.error || t.error });
    }
  };

  return (
    <form className="form" onSubmit={submit}>
      <label className="field">
        <span className="label">{t.name}</span>
        <input name="name" required autoComplete="name" />
      </label>

      <label className="field">
        <span className="label">{t.email}</span>
        <input name="email" type="email" required autoComplete="email" />
      </label>

      <label className="field">
        <span className="label">{t.phone}</span>
        <input name="phone" type="tel" autoComplete="tel" />
      </label>

      <label className="field">
        <span className="label">{t.company}</span>
        <input name="company" autoComplete="organization" />
      </label>

      <fieldset className="field full" style={{ border: 0, padding: 0, margin: 0 }}>
        <legend className="label" style={{ marginBottom: "1.2rem" }}>{t.interested}</legend>
        <div className="chips">
          {contact.interests.map((i) => (
            <label className="chip" key={i}>
              <input type="checkbox" checked={interests.includes(i)} onChange={() => toggle(i)} />
              <span>{i}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="field full">
        <span className="label">{t.message}</span>
        <textarea name="message" />
      </label>

      {status && (
        <div
          className="full"
          style={{
            color: status.type === "success" ? "#2dd4bf" : "#f87171",
            fontSize: "1.4rem",
            marginTop: "0.4rem",
          }}
        >
          {status.text}
        </div>
      )}

      <div className="full">
        <Button type="submit" disabled={loading}>
          {loading ? t.sending : t.send}
        </Button>
      </div>
    </form>
  );
}

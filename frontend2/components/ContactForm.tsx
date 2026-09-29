"use client";

import { useState, type FormEvent } from "react";
import { useSite } from "./Providers";
import Button from "./Button";
import { sendInquiry, type InitiativeScope } from "@/api";

const strings = {
  en: {
    name: "Name *",
    phone: "Phone Number *",
    email: "Email (Optional)",
    company: "Company",
    service: "Service Interested In *",
    selectService: "Select a Service...",
    message: "Message",
    send: "Send Request",
    sending: "Sending...",
    success: "Request sent successfully!",
    error: "Failed to send request. Please check required fields.",
  },
  ar: {
    name: "الاسم *",
    phone: "رقم الهاتف *",
    email: "البريد الإلكتروني (اختياري)",
    company: "الشركة",
    service: "الخدمة التي تهمك *",
    selectService: "اختر الخدمة...",
    message: "الرسالة",
    send: "إرسال الطلب",
    sending: "جاري الإرسال...",
    success: "تم إرسال الطلب بنجاح!",
    error: "حدث خطأ أثناء الإرسال. الرجاء التأكد من الحقول المطلوبة.",
  },
};

const SERVICES_OPTIONS: { value: InitiativeScope; label: { en: string; ar: string } }[] = [
  { value: "AI & Automation", label: { en: "AI & Automation", ar: "الذكاء الاصطناعي والأتمتة" } },
  { value: "Custom CRM / ERP", label: { en: "Custom CRM / ERP", ar: "أنظمة CRM و ERP المخصصة" } },
  { value: "Web & Mobile Apps", label: { en: "Web & Mobile Apps", ar: "تطبيقات الويب والموبايل" } },
  { value: "Executive Dashboards", label: { en: "Executive Dashboards", ar: "لوحات التحكم والبيانات" } },
  { value: "Marketing", label: { en: "Marketing", ar: "التسويق" } },
  { value: "General Advisory", label: { en: "General Advisory", ar: "استشارات عامة" } },
  { value: "Product Partnership", label: { en: "Product Partnership", ar: "شراكة منتج" } },
];

export default function ContactForm() {
  const { lang } = useSite();
  const t = strings[lang];

  const [selectedService, setSelectedService] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(null);

    const form = e.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const email = String(data.get("email") || "").trim();
    const companyName = String(data.get("company") || "").trim();
    const message = String(data.get("message") || "").trim();

    // Mandatory fields: Name, Phone, and Service selection
    if (!name || !phone || !selectedService) {
      setStatus({
        type: "error",
        text:
          lang === "ar"
            ? "الرجاء إدخال الحقول الإجبارية (*): الاسم، رقم الهاتف، والخدمة"
            : "Please fill in all required fields (*): Name, Phone, and Service.",
      });
      return;
    }

    setLoading(true);

    const res = await sendInquiry({
      fullName: name,
      phone: phone,
      workEmail: email || "optional@tech-oriented.digital",
      company: companyName || name,
      initiativeScope: [selectedService as InitiativeScope],
      technicalSpecifications: message.slice(0, 600) || "General contact inquiry.",
      type: "CONSULTATION",
    });

    setLoading(false);

    if (res.success) {
      setStatus({ type: "success", text: t.success });
      form.reset();
      setSelectedService("");
    } else {
      setStatus({ type: "error", text: res.error || t.error });
    }
  };

  return (
    <form className="form" onSubmit={submit}>
      {/* Name */}
      <label className="field">
        <span className="label">{t.name}</span>
        <input name="name" required autoComplete="name" />
      </label>

      {/* Phone - Mandatory */}
      <label className="field">
        <span className="label">{t.phone}</span>
        <input name="phone" type="tel" required autoComplete="tel" />
      </label>

      {/* Email - Optional */}
      <label className="field">
        <span className="label">{t.email}</span>
        <input name="email" type="email" autoComplete="email" />
      </label>

      {/* Company */}
      <label className="field">
        <span className="label">{t.company}</span>
        <input name="company" autoComplete="organization" />
      </label>

      {/* Service Interested In - Dropdown Select Menu */}
      <label className="field full">
        <span className="label">{t.service}</span>
        <select
          name="service"
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
          required
        >
          <option value="">{t.selectService}</option>
          {SERVICES_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label[lang]}
            </option>
          ))}
        </select>
      </label>

      {/* Message */}
      <label className="field full">
        <span className="label">{t.message}</span>
        <textarea name="message" />
      </label>

      {status && (
        <div
          className="full"
          style={{
            color: status.type === "success" ? "#66C1C0" : "#f87171",
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

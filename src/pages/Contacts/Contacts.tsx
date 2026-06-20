import { useState } from "react";
import Hero from "../../components/Hero/Hero";
import "./Contacts.scss";

const INFO_ITEMS = [
  {
    icon: "ti-phone",
    label: "Телефон",
    value: "+998 90 007 00 09",
    href: "tel:+998900070009",
  },
  {
    icon: "ti-mail",
    label: "Email",
    value: "www.tintera.uz@gmail.com",
    href: "mailto:www.tintera.uz@gmail.com",
  },
  {
    icon: "ti-map-pin",
    label: "Адрес",
    value: "г.Ташкент, Шайхонтохурский район, офис Хадра, Хадра кучаси, 25",
    href: "https://maps.google.com/?q=Khadra,Tashkent",
    external: true,
  },
  {
    icon: "ti-clock",
    label: "Режим работы",
    value: "Пн–Сб: 9:00 – 19:00",
    href: null,
  },
];

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/tinterauz/", icon: "ti-brand-instagram", color: "#E1306C" },
  { label: "Telegram",  href: "https://t.me/tinterauz",               icon: "ti-brand-telegram",  color: "#29B6F6" },
  { label: "Facebook",  href: "https://www.facebook.com/tinterauz",   icon: "ti-brand-facebook",  color: "#1877F2" },
  { label: "Threads",   href: "https://www.threads.net/@tinterauz",   icon: "ti-brand-threads",   color: "#111"   },
];

// ── Forma ──────────────────────────────────────────────────

function ContactForm() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const change = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1400);
  };

  if (sent) return (
    <div className="cform-success">
      <span className="cform-success__icon"><i className="ti ti-circle-check" /></span>
      <h4>Заявка отправлена!</h4>
      <p>Мы свяжемся с вами в ближайшее время.</p>
      <button onClick={() => setSent(false)}>Отправить ещё раз</button>
    </div>
  );

  return (
    <form className="cform" onSubmit={submit} noValidate>
      <div className="cform-row">
        <div className="cform-field">
          <label htmlFor="cf-name">Имя</label>
          <div className="cform-field__in">
            <i className="ti ti-user" />
            <input id="cf-name" name="name" type="text"
              placeholder="Ваше имя"
              value={form.name} onChange={change} required />
          </div>
        </div>
        <div className="cform-field">
          <label htmlFor="cf-phone">Телефон</label>
          <div className="cform-field__in">
            <i className="ti ti-phone" />
            <input id="cf-phone" name="phone" type="tel"
              placeholder="+998 __ ___ __ __"
              value={form.phone} onChange={change} required />
          </div>
        </div>
      </div>
      <div className="cform-field">
        <label htmlFor="cf-msg">Сообщение</label>
        <div className="cform-field__in">
          <i className="ti ti-message cform-field__icon-top" />
          <textarea id="cf-msg" name="message" rows={4}
            placeholder="Ваш вопрос или пожелание..."
            value={form.message} onChange={change} />
        </div>
      </div>
      <button
        type="submit"
        className={`cform-submit${loading ? " cform-submit--loading" : ""}`}
        disabled={loading}
      >
        {loading
          ? <><i className="ti ti-loader-2 cform-spin" /> Отправка...</>
          : <><span>Отправить заявку</span><i className="ti ti-send" /></>
        }
      </button>
      <p className="cform-note"><i className="ti ti-lock" /> Ваши данные надёжно защищены</p>
    </form>
  );
}

// ── Asosiy sahifa ──────────────────────────────────────────

function Contacts() {
  return (
    <>
      {/* Mavjud Hero komponentidan foydalanamiz */}
      <Hero
        title="Контакты"
        subtitle="Свяжитесь с нами — ответим в течение нескольких минут"
      />

      <section className="contacts">

        {/* Dekorativ fon */}
        <div className="contacts-deco" aria-hidden="true">
          <span className="contacts-deco__blob contacts-deco__blob--1" />
          <span className="contacts-deco__blob contacts-deco__blob--2" />
          <span className="contacts-deco__ring contacts-deco__ring--1" />
          <span className="contacts-deco__ring contacts-deco__ring--2" />
          <span className="contacts-deco__cross contacts-deco__cross--1">
            <i className="ti ti-plus" />
          </span>
          <span className="contacts-deco__cross contacts-deco__cross--2">
            <i className="ti ti-plus" />
          </span>
        </div>

        <div className="container contacts-grid">

          {/* ── CHAP: Info + Xarita ── */}
          <div className="contacts-left">

            {/* Info kartochkalar */}
            <div className="contacts-cards">
              {INFO_ITEMS.map((item, i) => {
                const inner = (
                  <>
                    <span className="contacts-card__icon">
                      <i className={`ti ${item.icon}`} />
                    </span>
                    <div className="contacts-card__body">
                      <span className="contacts-card__label">{item.label}</span>
                      <span className="contacts-card__value">{item.value}</span>
                    </div>
                    {item.href && (
                      <i className="ti ti-arrow-up-right contacts-card__arr" />
                    )}
                  </>
                );
                return item.href ? (
                  <a
                    key={i}
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="contacts-card contacts-card--link"
                    style={{ "--idx": i } as React.CSSProperties}
                  >
                    {inner}
                  </a>
                ) : (
                  <div
                    key={i}
                    className="contacts-card"
                    style={{ "--idx": i } as React.CSSProperties}
                  >
                    {inner}
                  </div>
                );
              })}
            </div>

            {/* Ijtimoiy tarmoqlar */}
            <div className="contacts-socials">
              <span className="contacts-socials__label">Мы в соцсетях</span>
              <div className="contacts-socials__row">
                {SOCIALS.map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contacts-socials__item"
                    aria-label={s.label}
                    style={{ "--sc": s.color } as React.CSSProperties}
                  >
                    <i className={`ti ${s.icon}`} />
                    <span>{s.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Xarita */}
            <div className="contacts-map">
              <div className="contacts-map__top">
                <span className="contacts-map__badge">
                  <i className="ti ti-map-pin" />
                  Шайхонтохур, Ташкент
                </span>
              </div>
              <div className="contacts-map__frame">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.5!2d69.2401!3d41.2995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b3a9c5c1f4f%3A0x6b5e4e7b8a3d2c1e!2sKhadra%2C%20Tashkent!5e0!3m2!1sen!2suz!4v1700000000000"
                  width="100%" height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Tintera joylashuvi"
                />
                <div className="contacts-map__overlay">
                  <a
                    href="https://maps.google.com/?q=Khadra,Tashkent"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contacts-map__open"
                  >
                    <i className="ti ti-external-link" />
                    Открыть в Google Maps
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* ── O'NG: Forma ── */}
          <div className="contacts-right">
            <div className="contacts-form-card">
              <div className="contacts-form-card__head">
                <span className="contacts-form-card__badge">
                  <i className="ti ti-send" />
                  Обратная связь
                </span>
                <h2 className="contacts-form-card__title">Оставьте заявку</h2>
                <p className="contacts-form-card__sub">
                  Заполните форму — мы перезвоним в ближайшее время
                </p>
              </div>
              <ContactForm />
            </div>
          </div>

        </div>
      </section>
    </>
  );
}

export default Contacts;
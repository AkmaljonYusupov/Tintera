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
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const validateName = (value: string) => {
    if (!value.trim()) {
      setNameError("Пожалуйста, введите ваше имя");
      return false;
    }
    setNameError("");
    return true;
  };

  const validatePhone = (value: string) => {
    const phoneRegex = /^[\+\d\s\-\(\)]{7,20}$/;
    if (!value.trim()) {
      setPhoneError("Пожалуйста, введите номер телефона");
      return false;
    }
    if (!phoneRegex.test(value.trim())) {
      setPhoneError("Введите корректный номер телефона");
      return false;
    }
    setPhoneError("");
    return true;
  };

  const sendToTelegram = async (name: string, phone: string) => {
    const BOT_TOKEN = "8703348503:AAEvLayIrZ5oMVAvKirEHdMBwlS5M56zMp0";
    const CHAT_ID = "630353326";
    
    const message = `
📞 <b>Новое сообщение с сайта Tintera</b>
━━━━━━━━━━━━━━━━━━━━━━

👤 <b>Имя:</b> ${name}
📱 <b>Телефон:</b> ${phone}
📅 <b>Время:</b> ${new Date().toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })}
━━━━━━━━━━━━━━━━━━━━━━
💡 <i>Скоро свяжемся с вами!</i>
    `;
    
    try {
      const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: "HTML"
        })
      });
      return response.ok;
    } catch (error) {
      console.error("Telegram send error:", error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const isNameValid = validateName(name);
    const isPhoneValid = validatePhone(phone);
    
    if (!isNameValid || !isPhoneValid) {
      return;
    }
    
    setLoading(true);
    
    try {
      const sent = await sendToTelegram(name, phone);
      if (sent) {
        setSent(true);
        setName("");
        setPhone("");
        setNameError("");
        setPhoneError("");
        setTimeout(() => setSent(false), 5000);
      } else {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'cform-error-global';
        errorDiv.textContent = 'Ошибка отправки. Пожалуйста, попробуйте позже.';
        const form = document.querySelector('.cform');
        if (form) form.prepend(errorDiv);
        setTimeout(() => errorDiv.remove(), 5000);
      }
    } catch (error) {
      const errorDiv = document.createElement('div');
      errorDiv.className = 'cform-error-global';
      errorDiv.textContent = 'Ошибка отправки. Пожалуйста, попробуйте позже.';
      const form = document.querySelector('.cform');
      if (form) form.prepend(errorDiv);
      setTimeout(() => errorDiv.remove(), 5000);
    } finally {
      setLoading(false);
    }
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
    <form className="cform" onSubmit={handleSubmit} noValidate>
      <div className={`cform-field ${nameError ? "cform-field--error" : ""}`}>
        <label htmlFor="cf-name">Ваше имя</label>
        <div className="cform-field__in">
          <i className="ti ti-user" />
          <input 
            id="cf-name" 
            name="name" 
            type="text"
            placeholder="Иван Иванов"
            value={name} 
            onChange={(e) => {
              setName(e.target.value);
              if (e.target.value.trim()) setNameError("");
            }}
            onBlur={() => validateName(name)}
            required 
          />
        </div>
        {nameError && <span className="cform-error">{nameError}</span>}
      </div>

      <div className={`cform-field ${phoneError ? "cform-field--error" : ""}`}>
        <label htmlFor="cf-phone">Номер телефона</label>
        <div className="cform-field__in">
          <i className="ti ti-phone" />
          <input 
            id="cf-phone" 
            name="phone" 
            type="tel"
            placeholder="+998 90 123 45 67"
            value={phone} 
            onChange={(e) => {
              setPhone(e.target.value);
              if (e.target.value.trim()) setPhoneError("");
            }}
            onBlur={() => validatePhone(phone)}
            required 
          />
        </div>
        {phoneError && <span className="cform-error">{phoneError}</span>}
      </div>

      <button
        type="submit"
        className={`cform-submit${loading ? " cform-submit--loading" : ""}`}
        disabled={loading}
      >
        {loading ? (
          <>
            <span className="cform-spinner">
              <span className="cform-spinner__dot" />
              <span className="cform-spinner__dot" />
              <span className="cform-spinner__dot" />
            </span>
            <span>Отправка...</span>
          </>
        ) : (
          <>
            <span>Отправить заявку</span>
            <i className="ti ti-send" />
          </>
        )}
      </button>

      <p className="cform-note">
        <i className="ti ti-lock" /> 
        Ваши данные надёжно защищены
      </p>
    </form>
  );
}

// ── Asosiy sahifa ──────────────────────────────────────────

function Contacts() {
  return (
    <>
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
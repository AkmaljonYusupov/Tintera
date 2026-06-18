import { useState, useEffect } from "react";
import "./Footer.scss";
import tinteraLogo from "../../assets/logo.png";


const NAV_LINKS = [
  { label: "Главная",  href: "/" },
  { label: "Продукты", href: "/products" },
  { label: "О Нас",    href: "/about" },
  { label: "Партнёры", href: "/partners" },
  { label: "Контакты", href: "/contacts" },
];

// Tabler icon class lari — to'g'ri va chiroyli
const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/tinterauz/", icon: "ti-brand-instagram" },
  { label: "Facebook",  href: "https://www.facebook.com/tinterauz",   icon: "ti-brand-facebook" },
  { label: "Telegram",  href: "https://t.me/tinterauz",               icon: "ti-brand-telegram" },
  { label: "Threads",   href: "https://www.threads.net/@tinterauz",   icon: "ti-brand-threads"  },
];

const CONTACTS = [
  {
    label: "+998 90 007 00 09",
    href: "tel:+998900070009",
    iconClass: "ti-phone",
  },
  {
    label: "www.tintera.uz@gmail.com",
    href: "mailto:www.tintera.uz@gmail.com",
    iconClass: "ti-mail",
  },
  {
    label: "г.Ташкент, Шайхонтохурский район, офис Хадра, Хадра кучаси, 25",
    href: "#map",
    iconClass: "ti-map-pin",
  },
];

// ── Mini Kalendar ──
const MONTHS = [
  "Январь","Февраль","Март","Апрель","Май","Июнь",
  "Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь",
];
const DAYS_SHORT = ["Пн","Вт","Ср","Чт","Пт","Сб","Вс"];

function MiniCalendar() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const firstDay = new Date(year, month, 1).getDay();
  const startOffset = firstDay === 0 ? 6 : firstDay - 1;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array(startOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  const prev = () => { if (month === 0) { setMonth(11); setYear(y => y - 1); } else setMonth(m => m - 1); };
  const next = () => { if (month === 11) { setMonth(0); setYear(y => y + 1); } else setMonth(m => m + 1); };
  const isToday = (d: number) =>
    d === today.getDate() && month === today.getMonth() && year === today.getFullYear();

  return (
    <div className="fc">
      <div className="fc-head">
        <button className="fc-nav" onClick={prev} aria-label="Oldingi oy">
          <i className="ti ti-chevron-left" />
        </button>
        <span className="fc-month">{MONTHS[month]} {year}</span>
        <button className="fc-nav" onClick={next} aria-label="Keyingi oy">
          <i className="ti ti-chevron-right" />
        </button>
      </div>
      <div className="fc-days">
        {DAYS_SHORT.map(d => <span key={d} className="fc-day-label">{d}</span>)}
      </div>
      <div className="fc-grid">
        {cells.map((d, i) =>
          d === null ? <span key={`e-${i}`} /> : (
            <button key={d} className={`fc-cell${isToday(d) ? " fc-cell--today" : ""}`}>{d}</button>
          )
        )}
      </div>
    </div>
  );
}

// ── Google Map Modal ──
function MapModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <div className="map-modal" onClick={onClose}>
      <div className="map-modal__box" onClick={e => e.stopPropagation()}>
        <div className="map-modal__header">
          <div className="map-modal__title">
            <i className="ti ti-map-pin" style={{ color: "#EA4335", fontSize: 22 }} />
            <span>Наш адрес</span>
          </div>
          <button className="map-modal__close" onClick={onClose} aria-label="Yopish">
            <i className="ti ti-x" />
          </button>
        </div>
        <p className="map-modal__addr">
          г.Ташкент, Шайхонтохурский район, офис Хадра, Хадра кучаси, 25
        </p>
        <div className="map-modal__frame">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.5!2d69.2401!3d41.2995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b3a9c5c1f4f%3A0x6b5e4e7b8a3d2c1e!2sKhadra%2C%20Tashkent!5e0!3m2!1sen!2suz!4v1700000000000"
            width="100%" height="100%"
            style={{ border: 0 }}
            allowFullScreen loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Tintera joylashuvi"
          />
        </div>
        <a
          href="https://maps.google.com/?q=Khadra,Tashkent"
          target="_blank" rel="noopener noreferrer"
          className="map-modal__btn"
        >
          <i className="ti ti-external-link" />
          Открыть в Google Maps
        </a>
      </div>
    </div>
  );
}

// ── Floating contact items ──
const FLOAT_ITEMS = [
  {
    label: "Google Map",
    id: "map",
    bg: "#fff",
    labelColor: "#333",
    iconClass: "ti-map-2",
    iconColor: "#EA4335",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/tinterauz/",
    bg: "#E1306C",
    labelColor: "#333",
    iconClass: "ti-brand-instagram",
    iconColor: "#fff",
  },
  {
    label: "Telegram",
    href: "https://t.me/tinterauz",
    bg: "#29B6F6",
    labelColor: "#333",
    iconClass: "ti-brand-telegram",
    iconColor: "#fff",
  },
  {
    label: "Телефон",
    href: "tel:+998900070009",
    bg: "#2196F3",
    labelColor: "#333",
    iconClass: "ti-phone",
    iconColor: "#fff",
  },
];

function FloatingWidgets() {
  const [open, setOpen] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      {showMap && <MapModal onClose={() => setShowMap(false)} />}

      {/* ── Chap pastki: Aloqa tugmasi ── */}
      <div className={`fcontact${visible ? " fcontact--visible" : ""}`}>
        <div className={`fcontact-items${open ? " fcontact-items--open" : ""}`}>
          {FLOAT_ITEMS.map((item, i) => {
            const isMap = item.id === "map";
            if (isMap) {
              return (
                <button
                  key={item.label}
                  className="fcontact-item"
                  style={{ "--delay": `${i * 0.07}s` } as React.CSSProperties}
                  onClick={() => { setShowMap(true); setOpen(false); }}
                >
                  <span className="fcontact-item__icon" style={{ background: item.bg }}>
                    <i className={`ti ${item.iconClass}`} style={{ color: item.iconColor, fontSize: 22 }} />
                  </span>
                  <span className="fcontact-item__label" style={{ color: item.labelColor }}>
                    {item.label}
                  </span>
                </button>
              );
            }
            return (
              <a
                key={item.label}
                href={item.href}
                target="_blank" rel="noopener noreferrer"
                className="fcontact-item"
                style={{ "--delay": `${i * 0.07}s` } as React.CSSProperties}
                onClick={() => setOpen(false)}
              >
                <span className="fcontact-item__icon" style={{ background: item.bg }}>
                  <i className={`ti ${item.iconClass}`} style={{ color: item.iconColor, fontSize: 22 }} />
                </span>
                <span className="fcontact-item__label" style={{ color: item.labelColor }}>
                  {item.label}
                </span>
              </a>
            );
          })}
        </div>

        <button
          className={`fcontact-btn${open ? " fcontact-btn--open" : ""}`}
          onClick={() => setOpen(o => !o)}
          aria-label="Bog'lanish"
          aria-expanded={open}
        >
          <span className="fcontact-btn__pulse fcontact-btn__pulse--1" />
          <span className="fcontact-btn__pulse fcontact-btn__pulse--2" />
          <i className={`ti ${open ? "ti-x" : "ti-phone"}`} style={{ fontSize: 24, color: "#fff", position: "relative", zIndex: 1 }} />
        </button>
      </div>

      {/* ── O'ng pastki: Yuqoriga tugma ── */}
      <button
        className={`scroll-top${visible ? " scroll-top--visible" : ""}`}
        onClick={scrollTop}
        aria-label="Yuqoriga"
      >
        <span className="scroll-top__ring" />
        <i className="ti ti-arrow-up" style={{ fontSize: 20, position: "relative", zIndex: 1 }} />
      </button>
    </>
  );
}

function Footer() {
  return (
    <>
      <FloatingWidgets />

      <footer className="footer">

        {/* ── Animatsion fon ── */}
        <div className="footer-deco" aria-hidden="true">
          {/* SVG inline shakllar */}
          <svg className="footer-deco__svg" viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice">
            <defs>
              <radialGradient id="fg1" cx="10%" cy="80%" r="40%">
                <stop offset="0%" stopColor="#C1633A" stopOpacity=".08"/>
                <stop offset="100%" stopColor="#C1633A" stopOpacity="0"/>
              </radialGradient>
              <radialGradient id="fg2" cx="90%" cy="20%" r="35%">
                <stop offset="0%" stopColor="#C1633A" stopOpacity=".06"/>
                <stop offset="100%" stopColor="#C1633A" stopOpacity="0"/>
              </radialGradient>
            </defs>
            <rect width="1440" height="600" fill="url(#fg1)"/>
            <rect width="1440" height="600" fill="url(#fg2)"/>

            {/* Animatsion halqalar */}
            <circle className="fd-ring fd-ring--1" cx="120"  cy="480" r="160" fill="none" stroke="#C1633A" strokeWidth="1" strokeOpacity=".1"/>
            <circle className="fd-ring fd-ring--2" cx="120"  cy="480" r="240" fill="none" stroke="#C1633A" strokeWidth="1" strokeOpacity=".06"/>
            <circle className="fd-ring fd-ring--3" cx="1320" cy="120" r="200" fill="none" stroke="#C1633A" strokeWidth="1" strokeOpacity=".08"/>
            <circle className="fd-ring fd-ring--4" cx="1320" cy="120" r="290" fill="none" stroke="#C1633A" strokeWidth="1" strokeOpacity=".04"/>

            {/* Kichik dekorativ elementlar */}
            <circle className="fd-dot fd-dot--1" cx="200"  cy="60"  r="5"  fill="#C1633A" fillOpacity=".3"/>
            <circle className="fd-dot fd-dot--2" cx="400"  cy="520" r="4"  fill="#C1633A" fillOpacity=".25"/>
            <circle className="fd-dot fd-dot--3" cx="1100" cy="40"  r="6"  fill="#C1633A" fillOpacity=".2"/>
            <circle className="fd-dot fd-dot--4" cx="1380" cy="520" r="4"  fill="#C1633A" fillOpacity=".28"/>
            <circle className="fd-dot fd-dot--5" cx="700"  cy="20"  r="3"  fill="#C1633A" fillOpacity=".35"/>

            {/* To'rtburchak kontur */}
            <rect className="fd-rect fd-rect--1" x="50" y="200" width="40" height="40" rx="8" fill="none" stroke="#C1633A" strokeWidth="1.5" strokeOpacity=".15"/>
            <rect className="fd-rect fd-rect--2" x="1360" y="300" width="28" height="28" rx="6" fill="none" stroke="#C1633A" strokeWidth="1.5" strokeOpacity=".12"/>
          </svg>
        </div>

        {/* ── CTA Banner ── */}
        <div className="footer-hero">
          <div className="container footer-hero__inner">
            <div className="footer-hero__left">
              <span className="footer-hero__eyebrow">Свяжитесь с нами</span>
              <h2 className="footer-hero__title">
                Давайте создадим<br />
                <span>красивый интерьер</span>
              </h2>
            </div>
            <a href="mailto:www.tintera.uz@gmail.com" className="footer-hero__cta">
              Написать нам
              <i className="ti ti-arrow-right" />
            </a>
          </div>
        </div>

        {/* ── Asosiy Grid ── */}
        <div className="footer-main">
          <div className="container footer-grid">

            {/* Brand */}
            <div className="footer-brand">
              <a href="/" className="footer-logo">
                <img src={tinteraLogo} alt="Tintera Decor Center" />
              </a>
              <p className="footer-brand__desc">
                Центр декоративных красок и штукатурок в Ташкенте. Более 120 оттенков для вашего интерьера.
              </p>
              {/* Social icons — Tabler icon classlar */}
              <div className="footer-socials">
                {SOCIALS.map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank" rel="noopener noreferrer"
                    className="footer-socials__item"
                    aria-label={s.label}
                    title={s.label}
                  >
                    <i className={`ti ${s.icon}`} />
                  </a>
                ))}
              </div>
            </div>

            {/* Nav */}
            <div className="footer-col">
              <h4 className="footer-col__title">Навигация</h4>
              <ul className="footer-nav">
                {NAV_LINKS.map(l => (
                  <li key={l.href}>
                    <a href={l.href} className="footer-nav__link">
                      <i className="ti ti-chevron-right footer-nav__arrow" />
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Kontaktlar */}
            <div className="footer-col">
              <h4 className="footer-col__title">Контакты</h4>
              <ul className="footer-contacts">
                {CONTACTS.map((c, i) => (
                  <li key={i}>
                    <a href={c.href} className="footer-contacts__item">
                      <span className="footer-contacts__icon">
                        <i className={`ti ${c.iconClass}`} />
                      </span>
                      <span>{c.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Kalendar */}
            <div className="footer-col">
              <h4 className="footer-col__title">Расписание</h4>
              <MiniCalendar />
            </div>

          </div>
        </div>

        {/* ── Pastki chiziq ── */}
        <div className="footer-bottom">
          <div className="container footer-bottom__inner">
            <span>© 2024 Tintera Decor Center. Все права защищены.</span>
            <a href="/" className="footer-bottom__logo">tintera</a>
          </div>
        </div>

      </footer>
    </>
  );
}

export default Footer;
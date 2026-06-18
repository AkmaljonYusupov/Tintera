import { useState, useEffect } from "react";
import "./Footer.scss";
import tinteraLogo from "@assets/logo.png";

const NAV_LINKS = [
  { label: "Главная",  href: "/" },
  { label: "Продукты", href: "/products" },
  { label: "О Нас",    href: "/about" },
  { label: "Партнёры", href: "/partners" },
  { label: "Контакты", href: "/contacts" },
];

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/tinterauz/",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
        <rect x="2" y="2" width="20" height="20" rx="6" stroke="currentColor" strokeWidth="1.8"/>
        <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.8"/>
        <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/>
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/tinterauz",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
        <rect x="2" y="2" width="20" height="20" rx="6" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M13.5 8H11.5C11.2 8 11 8.2 11 8.5V10.5H13.5L13 13H11V21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: "Threads",
    href: "https://www.threads.net/@tinterauz",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
        <rect x="2" y="2" width="20" height="20" rx="6" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M16 11.5C15.5 9 13.5 8 12 8C9.8 8 8.5 9.8 8.5 12C8.5 14.2 9.8 16 12 16C13.5 16 14.8 15.2 15.3 13.8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
        <path d="M13 10C14.2 10.6 15 11.8 15 13C15 14.6 13.7 16 12 16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: "Telegram",
    href: "https://t.me/tinterauz",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
        <rect x="2" y="2" width="20" height="20" rx="6" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M17.5 7L7 11.8L10.8 13L12.5 18L14.2 14.5L17.5 17L17.5 7Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

const CONTACTS = [
  {
    label: "+998 90 007 00 09",
    href: "tel:+998900070009",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="17" height="17">
        <path d="M6.6 10.8C7.4 12.4 8.6 13.6 10.2 14.4L11.7 12.9C11.9 12.7 12.2 12.6 12.5 12.7C13.5 13.1 14.6 13.3 15.8 13.3C16.2 13.3 16.5 13.6 16.5 14V16.5C16.5 16.9 16.2 17.2 15.8 17.2C9.6 17.2 4.5 12.1 4.5 5.9C4.5 5.5 4.8 5.2 5.2 5.2H7.7C8.1 5.2 8.4 5.5 8.4 5.9C8.4 7.1 8.6 8.2 9 9.2C9.1 9.5 9 9.8 8.8 10L6.6 10.8Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: "www.tintera.uz@gmail.com",
    href: "mailto:www.tintera.uz@gmail.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="17" height="17">
        <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M2 8L12 14L22 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: "г.Ташкент, Шайхонтохурский район, офис Хадра, Хадра кучаси, 25",
    href: "https://maps.google.com/?q=Tashkent",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="17" height="17">
        <path d="M12 2C8.1 2 5 5.1 5 9C5 14.2 12 22 12 22C12 22 19 14.2 19 9C19 5.1 15.9 2 12 2Z" stroke="currentColor" strokeWidth="1.6"/>
        <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.6"/>
      </svg>
    ),
  },
];

// ── Fixed aloqa tugmasi uchun elementlar ──
const CONTACT_ITEMS = [
  {
    label: "Телефон",
    href: "tel:+998900070009",
    color: "#2196F3",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
        <path d="M6.6 10.8C7.4 12.4 8.6 13.6 10.2 14.4L11.7 12.9C11.9 12.7 12.2 12.6 12.5 12.7C13.5 13.1 14.6 13.3 15.8 13.3C16.2 13.3 16.5 13.6 16.5 14V16.5C16.5 16.9 16.2 17.2 15.8 17.2C9.6 17.2 4.5 12.1 4.5 5.9C4.5 5.5 4.8 5.2 5.2 5.2H7.7C8.1 5.2 8.4 5.5 8.4 5.9C8.4 7.1 8.6 8.2 9 9.2C9.1 9.5 9 9.8 8.8 10L6.6 10.8Z" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/tinterauz/",
    color: "#E1306C",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
        <rect x="2" y="2" width="20" height="20" rx="6" stroke="#fff" strokeWidth="1.8"/>
        <circle cx="12" cy="12" r="4.5" stroke="#fff" strokeWidth="1.8"/>
        <circle cx="17.5" cy="6.5" r="1.2" fill="#fff"/>
      </svg>
    ),
  },
  {
    label: "Telegram",
    href: "https://t.me/tinterauz",
    color: "#29B6F6",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
        <path d="M21 5L2 12.5L9 13.5M21 5L18.5 20L9 13.5M21 5L9 13.5M9 13.5V20L12.5 16.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: "Google Map",
    href: "https://maps.google.com/?q=Tashkent",
    color: "#fff",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
        <path d="M12 2C8.1 2 5 5.1 5 9C5 14.2 12 22 12 22C12 22 19 14.2 19 9C19 5.1 15.9 2 12 2Z" stroke="#EA4335" strokeWidth="1.8"/>
        <circle cx="12" cy="9" r="2.5" stroke="#EA4335" strokeWidth="1.8"/>
      </svg>
    ),
    textColor: "#333",
  },
];

// ── Mini Kalendar ──
const MONTHS = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
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
  const isToday = (d: number) => d === today.getDate() && month === today.getMonth() && year === today.getFullYear();

  return (
    <div className="fc">
      <div className="fc-head">
        <button className="fc-nav" onClick={prev} aria-label="Oldingi oy">
          <svg viewBox="0 0 24 24" fill="none" width="14" height="14">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <span className="fc-month">{MONTHS[month]} {year}</span>
        <button className="fc-nav" onClick={next} aria-label="Keyingi oy">
          <svg viewBox="0 0 24 24" fill="none" width="14" height="14">
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      <div className="fc-days">
        {DAYS_SHORT.map(d => <span key={d} className="fc-day-label">{d}</span>)}
      </div>
      <div className="fc-grid">
        {cells.map((d, i) =>
          d === null
            ? <span key={`e-${i}`} />
            : (
              <button key={d} className={`fc-cell${isToday(d) ? " fc-cell--today" : ""}`}>
                {d}
              </button>
            )
        )}
      </div>
    </div>
  );
}

// ── Fixed aloqa tugmasi ──
function FloatingContact() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`fcontact${visible ? " fcontact--visible" : ""}`}>
      {/* Qalqib chiquvchi elementlar */}
      <div className={`fcontact-items${open ? " fcontact-items--open" : ""}`}>
        {CONTACT_ITEMS.map((item, i) => (
          <a
            key={item.label}
            href={item.href}
            target={item.href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="fcontact-item"
            style={{
              "--delay": `${i * 0.06}s`,
              "--item-color": item.color,
            } as React.CSSProperties}
            onClick={() => setOpen(false)}
          >
            <span
              className="fcontact-item__icon"
              style={{ background: item.color }}
            >
              {item.icon}
            </span>
            <span
              className="fcontact-item__label"
              style={{ color: item.textColor || "#fff" }}
            >
              {item.label}
            </span>
          </a>
        ))}
      </div>

      {/* Asosiy tugma */}
      <button
        className={`fcontact-btn${open ? " fcontact-btn--open" : ""}`}
        onClick={() => setOpen(o => !o)}
        aria-label="Bog'lanish"
        aria-expanded={open}
      >
        {/* Pulse halqalari */}
        <span className="fcontact-btn__pulse fcontact-btn__pulse--1" />
        <span className="fcontact-btn__pulse fcontact-btn__pulse--2" />

        {/* Telefon ikonasi */}
        <span className={`fcontact-btn__icon fcontact-btn__icon--phone${open ? " hidden" : ""}`}>
          <svg viewBox="0 0 24 24" fill="none" width="24" height="24">
            <path d="M6.6 10.8C7.4 12.4 8.6 13.6 10.2 14.4L11.7 12.9C11.9 12.7 12.2 12.6 12.5 12.7C13.5 13.1 14.6 13.3 15.8 13.3C16.2 13.3 16.5 13.6 16.5 14V16.5C16.5 16.9 16.2 17.2 15.8 17.2C9.6 17.2 4.5 12.1 4.5 5.9C4.5 5.5 4.8 5.2 5.2 5.2H7.7C8.1 5.2 8.4 5.5 8.4 5.9C8.4 7.1 8.6 8.2 9 9.2C9.1 9.5 9 9.8 8.8 10L6.6 10.8Z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>

        {/* X ikonasi */}
        <span className={`fcontact-btn__icon fcontact-btn__icon--close${!open ? " hidden" : ""}`}>
          <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
            <path d="M18 6L6 18M6 6l12 12" stroke="#fff" strokeWidth="2.2" strokeLinecap="round"/>
          </svg>
        </span>
      </button>
    </div>
  );
}

function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      {/* Fixed aloqa tugmasi */}
      <FloatingContact />

      <footer className="footer">

        {/* ── Animatsion fon shakllari ── */}
        <div className="footer-shapes" aria-hidden="true">
          <span className="footer-shape footer-shape--1" />
          <span className="footer-shape footer-shape--2" />
          <span className="footer-shape footer-shape--3" />
          <span className="footer-shape footer-shape--4" />
          <span className="footer-shape footer-shape--5" />
          <span className="footer-shape footer-shape--6" />
          <span className="footer-shape footer-shape--7" />
        </div>

        {/* ── Yuqori CTA ── */}
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
              <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>

        {/* ── Asosiy grid ── */}
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
              <div className="footer-socials">
                {SOCIALS.map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    className="footer-socials__item" aria-label={s.label} title={s.label}>
                    {s.icon}
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
                      <svg viewBox="0 0 24 24" fill="none" width="12" height="12" className="footer-nav__arrow">
                        <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Kontakt */}
            <div className="footer-col">
              <h4 className="footer-col__title">Контакты</h4>
              <ul className="footer-contacts">
                {CONTACTS.map((c, i) => (
                  <li key={i}>
                    <a href={c.href} className="footer-contacts__item">
                      <span className="footer-contacts__icon">{c.icon}</span>
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

            {/* Yuqoriga qaytish — animatsion */}
            <button className="footer-top-btn" onClick={scrollTop} aria-label="Yuqoriga">
              <span className="footer-top-btn__ring" />
              <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
                <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

      </footer>
    </>
  );
}

export default Footer;
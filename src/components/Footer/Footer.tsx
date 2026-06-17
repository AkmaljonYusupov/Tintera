import "./Footer.scss";

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
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/tinterauz",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
        <rect x="2" y="2" width="20" height="20" rx="6" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M13 21v-6h2l.5-3H13v-1.5c0-.8.4-1.5 1.5-1.5H16V6s-1-.2-2-.2c-2.1 0-3.5 1.3-3.5 3.7V12H8v3h2.5v6H13Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: "Threads",
    href: "https://www.threads.net/@tinterauz",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
        <rect x="2" y="2" width="20" height="20" rx="6" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M15.5 11c-.4-2-1.8-3-3.5-3C9.8 8 8.5 9.8 8.5 12s1.3 4 3.5 4c1.4 0 2.5-.7 3-1.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M13 10c1 .5 2 1.5 2 2.5 0 1.4-1 2.5-3 2.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: "Telegram",
    href: "https://t.me/tinterauz",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
        <rect x="2" y="2" width="20" height="20" rx="6" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M17 7 7 11.5l3.5 1L12 17l1.5-3 3.5 2L17 7Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

const CONTACTS = [
  {
    label: "+998 90 007 00 09",
    href: "tel:+998900070009",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
        <path d="M6.6 10.8a15.2 15.2 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: "www.tintera.uz@gmail.com",
    href: "mailto:www.tintera.uz@gmail.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
        <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.7"/>
        <path d="M2 7l10 7 10-7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: "г.Ташкент, Шайхонтохурский район, офис Хадра, Хадра кучаси, 25",
    href: "https://maps.google.com/?q=Tashkent+Shayxontohur",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
        <path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7Z" stroke="currentColor" strokeWidth="1.7"/>
        <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.7"/>
      </svg>
    ),
  },
];

function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="footer">

      {/* ── Yuqori qism: katta sarlavha + email ── */}
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
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>

      {/* ── Asosiy grid ── */}
      <div className="footer-main">
        <div className="container footer-grid">

          {/* Brand */}
          <div className="footer-brand">
            <a href="/" className="footer-logo">tintera</a>
            <p className="footer-brand__desc">
              Центр декоративных красок и штукатурок в Ташкенте. Более 120 оттенков для вашего интерьера.
            </p>
            <div className="footer-socials">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-socials__item"
                  aria-label={s.label}
                  title={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div className="footer-col">
            <h4 className="footer-col__title">Навигация</h4>
            <ul className="footer-nav">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="footer-nav__link">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M4 8h8M9 5l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
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

        </div>
      </div>

      {/* ── Pastki chiziq ── */}
      <div className="footer-bottom">
        <div className="container footer-bottom__inner">
          <span>© 2024 Tintera Decor Center. Все права защищены.</span>
          <button className="footer-top-btn" onClick={scrollTop} aria-label="Yuqoriga qaytish">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 12V4M4 8l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

    </footer>
  );
}

export default Footer;
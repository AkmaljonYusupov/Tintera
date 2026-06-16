import "./Footer.scss";

const NAV_LINKS = [
  { label: "Главная",   href: "/" },
  { label: "Продукты",  href: "/products" },
  { label: "О Нас",     href: "/about" },
  { label: "Партнёры",  href: "/partners" },
  { label: "Контакты",  href: "/contacts" },
];

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/tinterauz/",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
        <rect x="2" y="2" width="20" height="20" rx="6"
          stroke="currentColor" strokeWidth="1.7"/>
        <circle cx="12" cy="12" r="4.5"
          stroke="currentColor" strokeWidth="1.7"/>
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/tinterauz",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
        <rect x="2" y="2" width="20" height="20" rx="6"
          stroke="currentColor" strokeWidth="1.7"/>
        <path d="M15 8h-1.5A1.5 1.5 0 0 0 12 9.5V11h3l-.5 3H12v7"
          stroke="currentColor" strokeWidth="1.7"
          strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
 
  {
    label: "Telegram",
    href: "https://t.me/tinterauz",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
        <rect x="2" y="2" width="20" height="20" rx="6"
          stroke="currentColor" strokeWidth="1.7"/>
        <path d="M17 7 7 11.5l3.5 1L12 17l1.5-3 3.5 2-2-9Z"
          stroke="currentColor" strokeWidth="1.6"
          strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

const CONTACTS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
        <rect x="3" y="5" width="18" height="14" rx="2"
          stroke="currentColor" strokeWidth="1.7"/>
        <path d="M3 7l9 6 9-6"
          stroke="currentColor" strokeWidth="1.7"
          strokeLinecap="round"/>
      </svg>
    ),
    text: "+998 90 007 00 09",
    href: "tel:+998900070009",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
        <path d="M21 5H3a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1Z"
          stroke="currentColor" strokeWidth="1.7"/>
        <path d="M3 7l9 6 9-6"
          stroke="currentColor" strokeWidth="1.7"
          strokeLinecap="round"/>
      </svg>
    ),
    text: "www.tintera.uz@gmail.com",
    href: "mailto:www.tintera.uz@gmail.com",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Z"
          stroke="currentColor" strokeWidth="1.7"/>
        <circle cx="12" cy="9" r="2.5"
          stroke="currentColor" strokeWidth="1.7"/>
      </svg>
    ),
    text: "г.Ташкент, Шайхонтохурский район, офис Хадра, Хадра кучаси, 25",
    href: "https://maps.google.com/?q=Toshkent,Shayxontohur",
  },
];

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">

        {/* ── 1-ustun: Logo + copyright ── */}
        <div className="footer-brand">
          <a href="/" className="footer-logo">tintera</a>
          <p className="footer-copy">
            © 2024 Tintera Decor Center.<br />
            Все права защищены.
          </p>
        </div>

        {/* ── 2-ustun: Navigatsiya ── */}
        <div className="footer-nav">
          <h4 className="footer-col-title">Полезные Ссылки</h4>
          <ul className="footer-nav__list">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="footer-nav__link">{l.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* ── 3-ustun: Ijtimoiy tarmoqlar ── */}
        <div className="footer-social">
          <h4 className="footer-col-title">Социальные Сети</h4>
          <ul className="footer-social__list">
            {SOCIAL_LINKS.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social__link"
                >
                  <span className="footer-social__icon">{s.icon}</span>
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* ── 4-ustun: Kontaktlar ── */}
        <div className="footer-contact">
          <h4 className="footer-col-title">Contact Us</h4>
          <ul className="footer-contact__list">
            {CONTACTS.map((c, i) => (
              <li key={i} className="footer-contact__item">
                <a href={c.href} className="footer-contact__link">
                  <span className="footer-contact__icon">{c.icon}</span>
                  <span>{c.text}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* ── Pastki chiziq ── */}
      <div className="footer-bottom">
        <div className="container footer-bottom__inner">
          <span>© 2024 Tintera Decor Center</span>
          <span>Разработано с ❤️ для интерьера</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
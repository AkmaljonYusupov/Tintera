import { useState } from "react";
import { NavLink } from "react-router-dom";

import { HiOutlineBars3 } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";

import LogoImage from "../../assets/images/logo.png";
import "./Header.scss";

const NAV_LINKS = [
  { to: "/", label: "Главная" },
  { to: "/products", label: "Продукты" },
  { to: "/about", label: "О Нас" },
  { to: "/stories", label: "Фотоистории" },
  { to: "/contacts", label: "Контакты" },
];

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="header">
        <div className="container header-container">
          <NavLink to="/" className="logo">
            <img src={LogoImage} alt="Tintera" className="logo__image" />
          </NavLink>

          <nav className="desktop-nav">
            {NAV_LINKS.map(link => (
              <NavLink key={link.to} to={link.to}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="header-actions">
            <NavLink to="/contacts" className="header-cta">
              <span>Связаться</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M3 7h8M8 4l3 3-3 3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </NavLink>

            <button
              className="menu-btn"
              onClick={() => setOpen(true)}
              aria-label="Открыть меню"
            >
              <HiOutlineBars3 />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`overlay ${open ? "show" : ""}`}
        onClick={() => setOpen(false)}
      />

      <aside className={`offcanvas ${open ? "active" : ""}`}>
        <div className="offcanvas-top">
          <NavLink to="/" className="logo" onClick={() => setOpen(false)}>
            <img src={LogoImage} alt="Tintera" className="logo__image" />
          </NavLink>

          <button
            className="offcanvas-close"
            onClick={() => setOpen(false)}
            aria-label="Закрыть меню"
          >
            <IoClose />
          </button>
        </div>

        <nav>
          {NAV_LINKS.map((link, i) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              style={{ "--i": i } as React.CSSProperties}
            >
              <span className="nav-num">0{i + 1}</span>
              <span className="nav-label">{link.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="offcanvas-bottom">
          <NavLink to="/contacts" className="offcanvas-cta" onClick={() => setOpen(false)}>
            <span>Связаться с нами</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </NavLink>
        </div>
      </aside>
    </>
  );
}

export default Header;
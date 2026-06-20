import { useLocation } from "react-router-dom";
import "./Hero.scss";

interface Props {
  title: string;
  subtitle: string;
}

// Fon rasmi — heroning orqasida pastki qatlam sifatida
const BG_IMG =
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=80";

// Sahifa nomlari - chiroyli ko'rinish uchun
const PAGE_NAMES: Record<string, string> = {
  "/": "Главная",
  "/products": "Продукты",
  "/about": "О Нас",
  "/gallery": "Фотоистории",
  "/contacts": "Контакты",
  "/services": "Услуги",
  "/blog": "Блог",
  "/faq": "Вопросы",
};

function Hero({ title, subtitle }: Props) {
  const location = useLocation();
  const words = title.split(" ");
  const currentPage = PAGE_NAMES[location.pathname] || "Страница";

  return (
    <section
      className="hero"
      style={{ "--hero-bg": `url(${BG_IMG})` } as React.CSSProperties}
    >
      <div className="container hero-inner">
        {/* ── Matn ── */}
        <div className="hero-content">
          {/* Brand nomi - oddiy va chiroyli */}
          <div className="hero-brand">
            <span className="hero-brand__name">Tintera Decor Center</span>
          </div>

          <h1 className="hero-title">
            {words.map((word, i) => (
              <span
                className="hero-title__row"
                key={i}
                style={{ "--i": i } as React.CSSProperties}
              >
                <span className="hero-title__word">{word}</span>
              </span>
            ))}
          </h1>

          <p className="hero-sub">{subtitle}</p>

          {/* Breadcrumb - sahifa yo'li */}
          <nav className="hero-breadcrumb" aria-label="Breadcrumb">
            <a href="/" className="hero-breadcrumb__link">
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Главная</span>
            </a>
            <span className="hero-breadcrumb__separator">
              <svg 
                width="14" 
                height="14" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </span>
            <span className="hero-breadcrumb__current">{currentPage}</span>
          </nav>

          {/* ── Stats ── */}
          <div className="hero-stats">
            <div className="hero-stats__item">
              <strong>120+</strong>
              <span>Оттенков</span>
            </div>
            <div className="hero-stats__item">
              <strong>5000+</strong>
              <span>Клиентов</span>
            </div>
            <div className="hero-stats__item">
              <strong>4.9</strong>
              <span>Рейтинг</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
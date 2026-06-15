import "./Hero.scss";

interface Props {
  title: string;
  subtitle: string;
}

// Fon rasmi — heroning orqasida pastki qatlam sifatida,
// fonga mos ravishda yumshoq tarzda ko'rinadi (CSS orqali).
const BG_IMG =
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=80";

function Hero({ title, subtitle }: Props) {
  const words = title.split(" ");

  return (
    <section
      className="hero"
      style={{ "--hero-bg": `url(${BG_IMG})` } as React.CSSProperties}
    >
      <div className="container hero-inner">
        {/* ── Matn ── */}
        <div className="hero-content">
          <span className="hero-eyebrow">Tintera Decor Center</span>

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

          <div className="hero-actions">
            <a href="#products" className="hero-btn">
              <span>Каталог</span>
              <span className="hero-btn__icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </a>
            <a href="#about" className="hero-link">
              <span>О нас</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
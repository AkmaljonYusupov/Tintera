import { useState, useEffect } from "react";
import "./Hero.scss";

interface Props {
  title: string;
  subtitle: string;
}

// Kichik galereya — bo'yoq/material namunalari
const SWATCHES = [
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80",
  "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600&q=80",
  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
];

// Avtomatik almashish oralig'i (millisekund)
const AUTO_INTERVAL = 4000;

// Yuqoridagi tasma uchun takrorlanuvchi so'zlar
const MARQUEE_WORDS = ["Tintera", "Краски", "Декор", "Штукатурка", "Дизайн", "Интерьер"];

function Hero({ title, subtitle }: Props) {
  const words = title.split(" ");

  // ── Faol rasm holati ──
  // Bosilmasa — avtomatik almashadi, bosilsa — o'shani ko'rsatadi
  // va keyingi avtomatik almashish vaqtini qaytadan boshlaydi.
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setActive((prev) => (prev + 1) % SWATCHES.length);
    }, AUTO_INTERVAL);

    return () => clearTimeout(timer);
  }, [active]);

  return (
    <section className="hero">

      {/* ── Yuqori tasma — uzluksiz aylanuvchi matn ── */}
      <div className="hero-marquee" aria-hidden="true">
        <div className="hero-marquee__track">
          {[...MARQUEE_WORDS, ...MARQUEE_WORDS, ...MARQUEE_WORDS].map((w, i) => (
            <span className="hero-marquee__item" key={i}>
              {w}
              <span className="hero-marquee__dot" />
            </span>
          ))}
        </div>
      </div>

      <div className="container hero-inner">

        {/* ── Markaziy sarlavha + bo'yoq namunalari ── */}
        <div className="hero-main">

          {/* Dekorativ bo'yoq doiralari */}
          <span className="hero-swatch hero-swatch--1" aria-hidden="true" />
          <span className="hero-swatch hero-swatch--3" aria-hidden="true" />
          <span className="hero-swatch hero-swatch--4" aria-hidden="true" />

          {/* ── Faol rasm ko'rinishi (preview) ── */}
          <div className="hero-preview" aria-hidden="true">
            {SWATCHES.map((src, i) => (
              <img
                key={src}
                src={src}
                alt=""
                className={`hero-preview__img ${i === active ? "is-active" : ""}`}
              />
            ))}
            <span className="hero-preview__ring" />
          </div>

          <div className="hero-badge">
            <span className="hero-badge__dot" />
            Tintera Decor Center
          </div>

          <h1 className="hero-title">
            {words.map((word, i) => (
              <span
                className="hero-title__row"
                key={i}
                style={{ "--i": i } as React.CSSProperties}
              >
                <span
                  className={[
                    "hero-title__word",
                    i === words.length - 1 ? "hero-title__word--accent" : "",
                  ].join(" ")}
                >
                  {word}
                </span>
              </span>
            ))}
          </h1>

          <div className="hero-bottom">
            <p className="hero-sub">{subtitle}</p>

            <div className="hero-actions">
              <a href="#products" className="hero-btn">
                <span>Начать</span>
                <span className="hero-btn__icon">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor" strokeWidth="1.5"
                      strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </a>
              <a href="#about" className="hero-link">
                <span>Подробнее</span>
              </a>
            </div>
          </div>

        </div>

        {/* ── Pastki mini-galereya ── */}
        <div className="hero-gallery">
          {SWATCHES.map((src, i) => (
            <button
              type="button"
              className={`hero-gallery__item ${i === active ? "is-active" : ""}`}
              key={i}
              style={{ "--i": i } as React.CSSProperties}
              onClick={() => setActive(i)}
              aria-label={`${i + 1}-rasmni ko'rsatish`}
              aria-pressed={i === active}
            >
              <img src={src} alt="" />
            </button>
          ))}

          <div className="hero-gallery__more">
            <span>100+</span>
            <small>Решений</small>
          </div>
        </div>

      </div>

    </section>
  );
}

export default Hero;
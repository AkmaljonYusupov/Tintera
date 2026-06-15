import { useState } from "react";
import "./Hero.scss";

interface Props {
  title: string;
  subtitle: string;
}

// Tanlash mumkin bo'lgan bo'yoq palitrasi.
// Har bir chip bosilganda --accent CSS o'zgaruvchisi yangilanadi
// va o'ng tomondagi rasm tint rangi, brush chizig'i, badge nuqtasi
// shu rangga moslashadi.
const PALETTE = [
  { name: "Терракота", hex: "#C1633A" },
  { name: "Шалфей", hex: "#8AA399" },
  { name: "Слоновая кость", hex: "#EDE6D6" },
  { name: "Глубокий синий", hex: "#2F4156" },
  { name: "Горчичный", hex: "#D8A24A" },
];

// Chap qirradagi vertikal marquee uchun so'zlar
const SIDE_WORDS = ["Tintera", "Студия цвета", "Краски", "Интерьер"];

function Hero({ title, subtitle }: Props) {
  const words = title.split(" ");

  // ── Faol rang holati ──
  // Bosilgan chip butun heroning aksent rangini (--accent) belgilaydi:
  // rasm tinti, brush chizig'i, badge va karta nuqtalari shu rangda.
  const [activeColor, setActiveColor] = useState(0);
  const current = PALETTE[activeColor];

  return (
    <section
      className="hero"
      style={{ "--accent": current.hex } as React.CSSProperties}
    >
      {/* ── Chap qirra — vertikal uzluksiz tasma ── */}
      <div className="hero-sidebar" aria-hidden="true">
        <div className="hero-sidebar__track">
          {[...SIDE_WORDS, ...SIDE_WORDS, ...SIDE_WORDS].map((w, i) => (
            <span className="hero-sidebar__item" key={i}>
              {w}
              <span className="hero-sidebar__dot" />
            </span>
          ))}
        </div>
      </div>

      <div className="container hero-inner">
        {/* ── Chap ustun: matn + palitra ── */}
        <div className="hero-content">
          <div className="hero-eyebrow">
            <span className="hero-eyebrow__dot" />
            Tintera Decor Center
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

            {/* Bo'yoq cho'tkasi chizig'i — chap tomondan o'ngga "chiziladi" */}
            <svg
              className="hero-title__brush"
              viewBox="0 0 320 24"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path d="M2 16 C 60 4, 120 24, 180 10 S 280 20, 318 8" />
            </svg>
          </h1>

          <p className="hero-sub">{subtitle}</p>

          {/* ── Interaktiv rang palitrasi ── */}
          <div className="hero-palette">
            <span className="hero-palette__label">Выберите оттенок</span>

            <div className="hero-palette__chips">
              {PALETTE.map((c, i) => (
                <button
                  type="button"
                  key={c.hex}
                  className={`hero-palette__chip ${
                    i === activeColor ? "is-active" : ""
                  }`}
                  style={
                    {
                      "--chip": c.hex,
                      "--i": i,
                    } as React.CSSProperties
                  }
                  onClick={() => setActiveColor(i)}
                  aria-label={c.name}
                  aria-pressed={i === activeColor}
                />
              ))}
            </div>

            <span className="hero-palette__name">
              {current.name} · {current.hex}
            </span>
          </div>

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

        {/* ── O'ng ustun: rasm + tint + statistik karta ── */}
        <div className="hero-visual">
          <div className="hero-visual__frame">
            <img
              className="hero-visual__img"
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80"
              alt=""
            />
            <span className="hero-visual__tint" aria-hidden="true" />
          </div>

          <div className="hero-visual__card">
            <span className="hero-visual__card-dot" />
            <div>
              <strong>120+</strong>
              <small>оттенков краски</small>
            </div>
          </div>

          <span className="hero-visual__scroll" aria-hidden="true">
            <span className="hero-visual__scroll-line" />
            Скролл
          </span>
        </div>
      </div>
    </section>
  );
}

export default Hero;
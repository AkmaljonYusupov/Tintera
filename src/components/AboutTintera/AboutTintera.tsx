import tintteraImg from "../../assets/about-tintera.png";
import "./AboutTintera.scss";

// Tinteraga ishonchni oshiruvchi qisqa belgilar —
// rasm ostida kichik pill-badge sifatida chiqadi.
const BADGES = [
  { value: "2023", label: "С этого года" },
  { value: "Ташкент", label: "Шайхонтохур" },
  { value: "EU", label: "Стандарт качества" },
];

function AboutTintera() {
  const titleWords = "О Тинтере".split(" ");

  return (
    <section className="about">
      {/* Dekorativ fon shakllari — heroning bo'yoq doiralari bilan uyg'un */}
      <span className="about-shape about-shape--1" aria-hidden="true" />
      <span className="about-shape about-shape--2" aria-hidden="true" />

      <div className="container about-inner">
        {/* ── Chap ustun: matn ── */}
        <div className="about-content">
          <span className="about-eyebrow">Tintera Decor Center</span>

          <h2 className="about-title">
            {titleWords.map((word, i) => (
              <span
                className="about-title__row"
                key={i}
                style={{ "--i": i } as React.CSSProperties}
              >
                <span
                  className={[
                    "about-title__word",
                    i === titleWords.length - 1
                      ? "about-title__word--accent"
                      : "",
                  ].join(" ")}
                >
                  {word}
                </span>
              </span>
            ))}
          </h2>

          <div className="about-text">
            <p>
              Центр Tintera Decor создан 1 мая 2023 года в Шайхонтохурском
              районе города Ташкента. В нашем центре декора для вас, дорогие
              клиенты, представлен широкий ассортимент качественных
              декоративных красок и штукатурок.
            </p>

            <p>
              Мы надеемся, что Tintera станет не только магазином красок, но и
              творческим домом для начинающих мастеров и профессионалов.
              Продукция соответствует европейским стандартам качества и
              сохраняет насыщенность цвета на долгие годы.
            </p>

            <p>
              Добро пожаловать в мир дизайна, вдохновения и современных
              декоративных решений вместе с Tintera Decor.
            </p>
          </div>

          <a href="#about-full" className="about-link">
            <span>Подробнее о нас</span>
            <span className="about-link__icon">
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
        </div>

        {/* ── O'ng ustun: rasm + badge ── */}
        <div className="about-media">
          <div className="about-media__frame">
            <img src={tintteraImg} alt="Tintera Decor" />
          </div>

          <div className="about-media__badges">
            {BADGES.map((b) => (
              <div className="about-media__badge" key={b.label}>
                <strong>{b.value}</strong>
                <span>{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutTintera;
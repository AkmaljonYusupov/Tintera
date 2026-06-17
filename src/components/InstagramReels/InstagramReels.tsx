import "./InstagramReels.scss";
import tinteraLogo from "../../assets/logo.png";

// Reel URL lari — thumb yo'q, to'g'ridan iframe embed
const REELS = [
  "https://www.instagram.com/reel/REEL_ID_1/embed/",
  "https://www.instagram.com/reel/REEL_ID_2/embed/",
  "https://www.instagram.com/reel/REEL_ID_3/embed/",
  "https://www.instagram.com/reel/REEL_ID_4/embed/",
  "https://www.instagram.com/reel/REEL_ID_5/embed/",
  "https://www.instagram.com/reel/REEL_ID_6/embed/",
  "https://www.instagram.com/reel/REEL_ID_7/embed/",
  "https://www.instagram.com/reel/REEL_ID_8/embed/",
];

const INSTAGRAM_URL = "https://www.instagram.com/tinterauz/";

function InstagramReels() {
  return (
    <section className="insta">
      <div className="container insta-inner">

        {/* Sarlavha */}
        <div className="insta-head">
          <span className="insta-eyebrow">
            <svg viewBox="0 0 24 24" fill="none" width="14" height="14">
              <rect x="2" y="2" width="20" height="20" rx="6" stroke="currentColor" strokeWidth="2"/>
              <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="2"/>
              <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/>
            </svg>
            @tinterauz
          </span>
          <h2 className="insta-title">Наши работы в Instagram</h2>
          <p className="insta-sub">Живые проекты — декоративные краски и штукатурки</p>
        </div>

        {/* 4+4 grid */}
        <div className="insta-grid">
          {REELS.map((url, i) => (
            <div
              key={i}
              className="insta-card"
              style={{ "--i": i } as React.CSSProperties}
            >
              {/* Iframe embed */}
              <div className="insta-card__frame">
                <iframe
                  src={url}
                  title={`Tintera Reel ${i + 1}`}
                  className="insta-card__iframe"
                  allowFullScreen
                  loading="lazy"
                  scrolling="no"
                  frameBorder="0"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Tugma */}
        <div className="insta-footer">
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="insta-btn">
            <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
              <rect x="2" y="2" width="20" height="20" rx="6" stroke="currentColor" strokeWidth="2"/>
              <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="2"/>
              <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/>
            </svg>
            Смотреть все в Instagram
          </a>
        </div>

      </div>
    </section>
  );
}

export default InstagramReels;
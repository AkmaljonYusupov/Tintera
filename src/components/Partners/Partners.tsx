import "./Partners.scss";

// ── Rasmlarni import qilish ──
import CoMe from "../../assets/partners/come.png";
import ElfDecor from "../../assets/partners/elfdecor.png";
import DecorPaint from "../../assets/partners/decorpaint.png";
import Isaval from "../../assets/partners/isaval.png";
import Boldrini from "../../assets/partners/boldrini.png";

interface Partner {
  src: string;
  alt: string;
  url: string;
}

const PARTNERS: Partner[] = [
  { src: CoMe,   alt: "CoMe",    url: "https://www.come.it/en/decoration/" },
  { src: ElfDecor, alt: "Elf Decor",  url: "https://elf-decor.com/" },
  { src: DecorPaint,     alt: "DecorPaint",      url: "https://decorpaint.uz/" },
  { src: Isaval,     alt: "Isaval",      url: "https://www.isaval.es/en/" },
  { src: Boldrini,   alt: "Boldrini",    url: "https://www.pennelliboldrini.it/en/" }
];

const TRACK = [...PARTNERS, ...PARTNERS, ...PARTNERS];

function Partners() {
  return (
    <section className="partners">
      <div className="container partners-inner">
        <div className="partners-head">
          <span className="partners-eyebrow">Партнёры</span>
          <h2 className="partners-title">
            Работаем с лучшими
            <span className="partners-title--accent"> брендами</span>
          </h2>
        </div>
      </div>

      <div className="partners-marquee">
        <span className="partners-fade partners-fade--l" aria-hidden="true" />
        <span className="partners-fade partners-fade--r" aria-hidden="true" />

        <div className="partners-track">
          {TRACK.map((p, i) => (
            <a
              key={i}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="partners-logo"
              aria-label={p.alt}
              aria-hidden={i >= PARTNERS.length ? true : undefined}
              tabIndex={i >= PARTNERS.length ? -1 : undefined}
            >
              <img src={p.src} alt={p.alt} loading="lazy" draggable={false} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Partners;
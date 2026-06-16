import "./Partners.scss";

interface Partner {
  src: string;
  alt: string;
  url: string;
}

const PARTNERS: Partner[] = [
  { src: "/assets/partners/caparol.svg",   alt: "Caparol",    url: "https://www.caparol.com" },
  { src: "/assets/partners/betek.svg",     alt: "Betek",      url: "https://www.betek.com.tr" },
  { src: "/assets/partners/dulux.svg",     alt: "Dulux",      url: "https://www.dulux.com" },
  { src: "/assets/partners/marshall.svg",  alt: "Marshall",   url: "https://www.marshall.com.tr" },
  { src: "/assets/partners/tikkurila.svg", alt: "Tikkurila",  url: "https://www.tikkurila.com" },
  { src: "/assets/partners/alpina.svg",    alt: "Alpina",     url: "https://www.alpina.de" },
  { src: "/assets/partners/partner-7.svg", alt: "Partner 7",  url: "#" },
  { src: "/assets/partners/partner-8.svg", alt: "Partner 8",  url: "#" },
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
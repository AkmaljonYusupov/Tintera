import { useEffect, useRef, useState } from "react";
import "./StatsVideo.scss";
import TinteraVideo from "../../assets/videos/Tintera_video.mp4";

// ── Statistika ma'lumotlari ──
const STATS = [
  { value: 2023, label: "Год основания", suffix: "" },
  { value: 50,   label: "Продуктов",     suffix: "+" },
  { value: 2000, label: "Довольных клиентов", suffix: "+" },
  { value: 300,  label: "Оттенков и цветов",  suffix: "+" },
];

// ── Yagona raqam animatsiyasi ──
function Counter({
  target,
  suffix,
  duration = 1800,
  started,
}: {
  target: number;
  suffix: string;
  duration?: number;
  started: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;

    let start: number | null = null;
    const from = 0;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(from + (target - from) * eased));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };

    requestAnimationFrame(step);
  }, [started, target, duration]);

  return (
    <span>
      {count.toLocaleString("ru-RU")}
      {suffix}
    </span>
  );
}

function StatsVideo() {
  // IntersectionObserver — bo'lim ekranga kirganida animatsiyani boshlaydi
  const sectionRef = useRef<HTMLElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ── Statistika bo'limi — rasmli fon ── */}
      <section className="stats" ref={sectionRef}>
        <div className="stats-grid">
          {STATS.map((s) => (
            <div className="stats-item" key={s.label}>
              <strong className="stats-item__value">
                <Counter
                  target={s.value}
                  suffix={s.suffix}
                  started={started}
                />
              </strong>
              <span className="stats-item__label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Video bo'limi ── */}
      <section className="vsection">
        <div className="container vsection-inner">
          <span className="vsection-eyebrow">Tintera Decor Center</span>
          <h2 className="vsection-title">Как мы работаем</h2>

          <div className="vsection-frame">
            {/*
              src va poster maydonlarini o'z faylingizga moslashtiring.
              Misol: src="../../assets/tintera.mp4"
            */}
            <video
              className="vsection-frame__el"
              src={TinteraVideo}
              muted
              autoPlay              
              controls
              playsInline
              preload="metadata"
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default StatsVideo;
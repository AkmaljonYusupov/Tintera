import { useState, useEffect, useRef, useCallback } from "react";
import { NavLink } from "react-router-dom";
import { slides } from "../../data/slides";
import "./HeroSlider.scss";

const DURATION = 5500;

export default function HeroSlider() {
  const [cur, setCur]         = useState(0);
  const [prev, setPrev]       = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [progress, setProgress]   = useState(0);
  const [paused, setPaused]   = useState(false);

  const progRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const autoRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const imgRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const swipeX  = useRef<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const clearAll = useCallback(() => {
    clearInterval(progRef.current!);
    clearTimeout(autoRef.current!);
  }, []);

  const startProgress = useCallback(() => {
    setProgress(0);
    clearInterval(progRef.current!);
    const step = 100 / (DURATION / 50);
    progRef.current = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(progRef.current!); return 100; }
        return p + step;
      });
    }, 50);
  }, []);

  const goTo = useCallback((next: number) => {
    if (animating || next === cur) return;
    clearAll();
    setProgress(0);
    setVisible(false);
    setAnimating(true);
    setPrev(cur);
    setTimeout(() => {
      setCur(next);
      setAnimating(false);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setVisible(true))
      );
    }, 400);
  }, [animating, cur, clearAll]);

  const next   = useCallback(() => goTo((cur + 1) % slides.length), [cur, goTo]);
  const goPrev = useCallback(() => goTo((cur - 1 + slides.length) % slides.length), [cur, goTo]);

  /* avtoplay + progress */
  useEffect(() => {
    if (animating) return;
    setVisible(true);
    startProgress();
    if (!paused) autoRef.current = setTimeout(next, DURATION);
    return clearAll;
  }, [cur, animating, paused, next, startProgress, clearAll]);

  /* klaviatura orqali navigatsiya */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft")  goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, goPrev]);

  /* sichqoncha harakatiga moslashish (parallax) */
  const onMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    const el = imgRefs.current[cur];
    if (el) el.style.transform = `scale(1.04) translate(${x * 14}px, ${y * 8}px)`;
  }, [cur]);

  const onMouseLeave = useCallback(() => {
    const el = imgRefs.current[cur];
    if (el) el.style.transform = "";
    setPaused(false);
  }, [cur]);

  const onPD = (e: React.PointerEvent) => { swipeX.current = e.clientX; };
  const onPU = (e: React.PointerEvent) => {
    if (swipeX.current === null) return;
    const d = swipeX.current - e.clientX;
    if (Math.abs(d) > 50) d > 0 ? next() : goPrev();
    swipeX.current = null;
  };

  const s = slides[cur];

  return (
    <section
      ref={sectionRef}
      className="hs"
      onMouseMove={onMouseMove}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={onMouseLeave}
      onPointerDown={onPD}
      onPointerUp={onPU}
      aria-roledescription="carousel"
      aria-label="Hero slider"
    >
      {/* ── Rasmlar ── */}
      {slides.map((sl, i) => (
        <div
          key={sl.id}
          ref={el => { imgRefs.current[i] = el; }}
          className={[
            "hs-img",
            i === cur  ? "is-active" : "",
            i === prev && animating ? "is-out" : "",
          ].filter(Boolean).join(" ")}
          style={{ backgroundImage: `url(${sl.image})` }}
          role="img"
          aria-label={`${sl.title} ${sl.accent}`}
          aria-hidden={i !== cur}
        />
      ))}

      {/* ── Gradient qatlam ── */}
      <div className="hs-grad" />

      {/* ── Yil belgisi (chap-tepa) ── */}
      <div className="hs-year">
        <span className="hs-year__line" />
        <span className="hs-year__txt">{s.year}</span>
      </div>

      {/* ── Kontent ── */}
      <div className={`hs-content ${visible ? "is-visible" : ""}`}>

        <div className="hs-tag">
          <span className="hs-tag__bar" />
          <span className="hs-tag__txt">{s.title} — {s.number}</span>
        </div>

        <div className="hs-title">
          <div className="hs-title__inner">
            <span className="hs-title__line">{s.title}</span>
            <span className="hs-title__line hs-title__line--accent">{s.accent}</span>
          </div>
        </div>

        <p className="hs-sub">{s.description}</p>

        <NavLink to={s.link} className="hs-cta">
          <span>{s.buttonText}</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </NavLink>

      </div>

      {/* ── Hisoblagich (o'ng tomon) ── */}
      <div className="hs-counter">
        <span className="hs-counter__cur">{s.number}</span>
        <div className="hs-counter__track">
          <span
            className="hs-counter__fill"
            style={{
              height: `${progress}%`,
              width: `${progress}%`,
            }}
          />
        </div>
        <span className="hs-counter__tot">0{slides.length}</span>
      </div>

      {/* ── Pastki navigatsiya ── */}
      <div className="hs-bottom">

        <div className="hs-dots">
          {slides.map((sl, i) => (
            <button
              key={sl.id}
              className={`hs-dot ${i === cur ? "is-active" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`${sl.title} ${sl.accent}`}
              aria-current={i === cur}
            />
          ))}
        </div>

        <div className="hs-arrows">
          <button className="hs-arr" onClick={goPrev} aria-label="Предыдущий слайд">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M9 3 5 7.5 9 12" stroke="currentColor" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button className="hs-arr" onClick={next} aria-label="Следующий слайд">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M6 3l4 4.5L6 12" stroke="currentColor" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

      </div>

      {/* ── Progress chizig'i ── */}
      <div className="hs-progress">
        <span className="hs-progress__fill" style={{ width: `${progress}%` }} />
      </div>

    </section>
  );
}
import { useEffect, useRef, useState } from "react";
import Hero from "../../components/Hero/Hero";
import Person from "../../assets/Person.jpg"
import "./About.scss";
import SEO from "../../components/SEO/SEO";

// ── Animated counter ──────────────────────────────────────
function Counter({ to, suffix, started }: { to: number; suffix: string; started: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!started) return;
    let s: number | null = null;
    const step = (ts: number) => {
      if (!s) s = ts;
      const p = Math.min((ts - s) / 2000, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setN(Math.floor(to * e));
      if (p < 1) requestAnimationFrame(step);
      else setN(to);
    };
    requestAnimationFrame(step);
  }, [started, to]);
  return <>{n.toLocaleString("ru-RU")}{suffix}</>;
}

// ── Data ──────────────────────────────────────────────────
const STATS = [
  { to: 2023, suffix: "",  label: "Год основания",       icon: "ti-calendar" },
  { to: 120,  suffix: "+", label: "Оттенков красок",     icon: "ti-palette"  },
  { to: 5000, suffix: "+", label: "Довольных клиентов",  icon: "ti-users"    },
  { to: 15,   suffix: "",  label: "Лет опыта",           icon: "ti-award"    },
];

const VALUES = [
  { icon: "ti-certificate", color: "#FF6B6B", title: "Качество",    desc: "Европейские стандарты и сертификаты на каждый продукт." },
  { icon: "ti-bulb",        color: "#FFD166", title: "Инновации",   desc: "Первыми предлагаем мировые дизайн-тренды клиентам." },
  { icon: "ti-heart",       color: "#E67E9A", title: "Забота",      desc: "Поддержка на каждом этапе — от выбора до нанесения." },
  { icon: "ti-leaf",        color: "#6BCB77", title: "Экология",    desc: "Безопасные составы без токсинов для вашей семьи." },
  { icon: "ti-star",        color: "#F09433", title: "Премиум",     desc: "Эксклюзивные коллекции, недоступные в обычных магазинах." },
  { icon: "ti-truck",       color: "#4ECDC4", title: "Доставка",    desc: "Быстрая доставка по всему Ташкенту и регионам." },
];

const MILESTONES = [
  { year: "Май 2023",  icon: "ti-building-store", title: "Открытие шоурума",    desc: "Tintera Decor Center открыл двери в Шайхонтохурском районе." },
  { year: "Июнь 2023", icon: "ti-palette",         title: "Первая коллекция",   desc: "Запуск каталога из 50 декоративных красок и штукатурок." },
  { year: "2024",      icon: "ti-trending-up",     title: "Расширение",         desc: "Ассортимент вырос до 120+ оттенков. Первые крупные объекты." },
  { year: "Сегодня",   icon: "ti-trophy",          title: "Лидерство",          desc: "Более 5 000 клиентов. Ведущий дизайн-центр Ташкента." },
];

// GALLERY - 7 ta rasm
const GALLERY_IMGS = [
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80",
  "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80",
  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
  "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=80",
  "https://images.unsplash.com/photo-1560448075-bb485b067938?w=800&q=80",
  "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80",
];

// ── Scroll-triggered animation hook ──────────────────────
function useInView(threshold = 0.2) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ── Contact Form ──────────────────────────────────────────
function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const validateName = (value: string) => {
    if (!value.trim()) {
      setNameError("Пожалуйста, введите ваше имя");
      return false;
    }
    setNameError("");
    return true;
  };

  const validatePhone = (value: string) => {
    const phoneRegex = /^[\+\d\s\-\(\)]{7,20}$/;
    if (!value.trim()) {
      setPhoneError("Пожалуйста, введите номер телефона");
      return false;
    }
    if (!phoneRegex.test(value.trim())) {
      setPhoneError("Введите корректный номер телефона");
      return false;
    }
    setPhoneError("");
    return true;
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    if (value.trim()) setNameError("");
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhone(value);
    if (value.trim()) setPhoneError("");
  };

  const sendToTelegram = async (name: string, phone: string) => {
    const BOT_TOKEN = "8703348503:AAEvLayIrZ5oMVAvKirEHdMBwlS5M56zMp0";
    const CHAT_ID = "630353326";
    
    const message = `
🏢 <b>Tintera Decor Center</b>
━━━━━━━━━━━━━━━━━━━━━━
📩 <b>Новое сообщение с сайта</b>
━━━━━━━━━━━━━━━━━━━━━━

👤 <b>Имя:</b> ${name}
📞 <b>Телефон:</b> ${phone}
📅 <b>Время:</b> ${new Date().toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })}
━━━━━━━━━━━━━━━━━━━━━━
💡 <i>Скоро свяжемся с вами!</i>
    `;
    
    try {
      const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: "HTML"
        })
      });
      return response.ok;
    } catch (error) {
      console.error("Telegram send error:", error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const isNameValid = validateName(name);
    const isPhoneValid = validatePhone(phone);
    
    if (!isNameValid || !isPhoneValid) {
      return;
    }
    
    setLoading(true);
    
    try {
      const sent = await sendToTelegram(name, phone);
      if (sent) {
        setSubmitted(true);
        setName("");
        setPhone("");
        setNameError("");
        setPhoneError("");
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'about-team__form-error-global';
        errorDiv.textContent = 'Ошибка отправки. Пожалуйста, попробуйте позже.';
        const form = document.querySelector('.about-team__form');
        if (form) form.prepend(errorDiv);
        setTimeout(() => errorDiv.remove(), 5000);
      }
    } catch (error) {
      const errorDiv = document.createElement('div');
      errorDiv.className = 'about-team__form-error-global';
      errorDiv.textContent = 'Ошибка отправки. Пожалуйста, попробуйте позже.';
      const form = document.querySelector('.about-team__form');
      if (form) form.prepend(errorDiv);
      setTimeout(() => errorDiv.remove(), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="about-team__form" onSubmit={handleSubmit} noValidate>
      <div className={`about-team__form-group ${nameError ? "about-team__form-group--error" : ""}`}>
        <label htmlFor="team-name">Ваше имя</label>
        <div className="about-team__form-input-wrap">
          <input
            id="team-name"
            type="text"
            placeholder="Иван Иванов"
            value={name}
            onChange={handleNameChange}
            onBlur={() => validateName(name)}
            required
          />
          <i className="ti ti-user" />
        </div>
        {nameError && <span className="about-team__form-error">{nameError}</span>}
      </div>

      <div className={`about-team__form-group ${phoneError ? "about-team__form-group--error" : ""}`}>
        <label htmlFor="team-phone">Номер телефона</label>
        <div className="about-team__form-input-wrap">
          <input
            id="team-phone"
            type="tel"
            placeholder="+998 90 123 45 67"
            value={phone}
            onChange={handlePhoneChange}
            onBlur={() => validatePhone(phone)}
            required
          />
          <i className="ti ti-phone" />
        </div>
        {phoneError && <span className="about-team__form-error">{phoneError}</span>}
      </div>

      <button type="submit" className="about-team__form-btn" disabled={loading}>
        {loading ? (
          <>
            <span className="about-team__spinner">
              <span className="about-team__spinner-dot" />
              <span className="about-team__spinner-dot" />
              <span className="about-team__spinner-dot" />
            </span>
            <span className="about-team__btn-text">Отправка...</span>
          </>
        ) : (
          <>
            <span className="about-team__btn-text">Отправить</span>
            <i className="ti ti-arrow-right" />
          </>
        )}
      </button>

      {submitted && (
        <div className="about-team__form-success">
          <i className="ti ti-check-circle" />
          <div>
            <span className="about-team__success-title">Успешно отправлено!</span>
            <span className="about-team__success-desc">Мы свяжемся с вами в ближайшее время</span>
          </div>
        </div>
      )}
    </form>
  );
}

// ─────────────────────────────────────────────────────────

function About() {
  const statsSection = useInView(0.3);
  const valuesSection = useInView(0.1);
  const timelineSection = useInView(0.1);
  const gallerySection = useInView(0.1);
  const teamSection = useInView(0.1);

  return (
    <>
      <Hero title="О компании" subtitle="История и ценности" />
  <SEO
        title="О Нас - Tintera Decor Center"
        description="Tintera Decor Center - декоративные краски, штукатурки и интерьерные решения в Ташкенте. Качественные материалы для вашего дома."
        keywords="декоративная штукатурка, краски, интерьер, Tintera, Ташкент, дизайн интерьера"
        url="https://tintera.uz/about"
      />
      {/* ══ 1. STORY ═══════════════════════════════════════ */}
      <section className="ab-story">
        <div className="about-deco" aria-hidden="true">
          <span className="about-deco__blob about-deco__blob--a" />
          <span className="about-deco__blob about-deco__blob--b" />
          <span className="about-deco__ring about-deco__ring--1" />
          <span className="about-deco__ring about-deco__ring--2" />
          {[...Array(6)].map((_, i) => <span key={i} className="about-deco__particle" style={{ "--pi": i } as React.CSSProperties} />)}
        </div>

        <div className="container ab-story__grid">
          <div className="ab-story__text">
            <span className="about-eyebrow">
              Наша история
            </span>
            <h2 className="about-section-title">
              Мир красок,<br />
              <span className="about-accent about-accent--block">рождённый из страсти</span>
            </h2>
            <div className="ab-story__text-content">
              <p>
                Tintera Decor Center был основан <strong>1 мая 2023 года</strong> в Шайхонтохурском
                районе Ташкента. Мы создавались с одной мечтой — сделать мир вокруг людей красивее,
                ярче и богаче цветом.
              </p>
              <p>
                Сегодня наш центр — это пространство вдохновения, где каждый найдёт идеальный
                оттенок для своего интерьера. Более 120 оттенков декоративных красок и штукатурок,
                соответствующих европейским стандартам.
              </p>
              <p>
                Мы мечтаем, чтобы Tintera стал не просто магазином, а творческим домом — местом,
                где рождаются идеи и воплощаются в жизнь красивые интерьеры.
              </p>
            </div>

            <div className="ab-story__chips">
              <span className="about-chip"><i className="ti ti-certificate" /> EU стандарты</span>
              <span className="about-chip"><i className="ti ti-shield-check" /> Гарантия</span>
              <span className="about-chip"><i className="ti ti-truck-delivery" /> Доставка</span>
            </div>

            <a href="/contacts" className="ab-story__cta">
              <span>Связаться с нами</span>
              <i className="ti ti-arrow-right" />
            </a>
          </div>

          <div className="ab-story__visual">
            <div className="ab-story__main-img">
              <img src={GALLERY_IMGS[0]} alt="Tintera" />
            </div>
            <div className="ab-story__side-img">
              <img src={GALLERY_IMGS[1]} alt="" />
            </div>
            <div className="ab-story__stat-card">
              <div className="ab-story__stat-card-ring" />
              <strong>120+</strong>
              <span>оттенков</span>
            </div>
            <div className="ab-story__year">
              <i className="ti ti-calendar-event" />
              <span>с 2023</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 2. STATS ═══════════════════════════════════════ */}
      <section
        className={`ab-stats${statsSection.inView ? " ab-stats--visible" : ""}`}
        ref={statsSection.ref as React.RefObject<HTMLElement>}
      >
        <div className="ab-stats__bg" aria-hidden="true">
          <span className="about-deco__ring about-deco__ring--stats1" />
          <span className="about-deco__ring about-deco__ring--stats2" />
        </div>
        <div className="container ab-stats__grid">
          {STATS.map((s, i) => (
            <div key={i} className="ab-stat" style={{ "--i": i } as React.CSSProperties}>
              <span className="ab-stat__icon"><i className={`ti ${s.icon}`} /></span>
              <strong className="ab-stat__value">
                <Counter to={s.to} suffix={s.suffix} started={statsSection.inView} />
              </strong>
              <span className="ab-stat__label">{s.label}</span>
              {i < STATS.length - 1 && <span className="ab-stat__sep" aria-hidden="true" />}
            </div>
          ))}
        </div>
      </section>

      {/* ══ 3. VALUES ══════════════════════════════════════ */}
      <section
        className={`ab-values${valuesSection.inView ? " ab-values--visible" : ""}`}
        ref={valuesSection.ref as React.RefObject<HTMLElement>}
      >
        <div className="about-deco about-deco--values" aria-hidden="true">
          <span className="about-deco__blob about-deco__blob--c" />
          <span className="about-deco__cross"><i className="ti ti-plus" /></span>
          <span className="about-deco__cross about-deco__cross--2"><i className="ti ti-plus" /></span>
        </div>

        <div className="container">
          <div className="about-section-head">
            <span className="about-eyebrow"> Наши принципы</span>
            <h2 className="about-section-title">
              Ценности, которые<br />
              <span className="about-accent">нас объединяют</span>
            </h2>
          </div>

          <div className="ab-values__grid">
            {VALUES.map((v, i) => (
              <div key={i} className="ab-value" style={{ "--i": i, "--vc": v.color } as React.CSSProperties}>
                <div className="ab-value__inner">
                  <span className="ab-value__icon"><i className={`ti ${v.icon}`} /></span>
                  <h3>{v.title}</h3>
                  <p>{v.desc}</p>
                </div>
                <span className="ab-value__num">0{i + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 4. GALLERY - 7 ta rasm ════════════════════════ */}
      <section
        className={`ab-gallery${gallerySection.inView ? " ab-gallery--visible" : ""}`}
        ref={gallerySection.ref as React.RefObject<HTMLElement>}
      >
        <div className="container ab-gallery__head">
          <span className="about-eyebrow"> Наши работы</span>
          <h2 className="about-section-title">Вдохновение<br /><span className="about-accent">в каждом оттенке</span></h2>
        </div>

        <div className="ab-gallery__grid">
          {GALLERY_IMGS.map((src, i) => (
            <div key={i} className="ab-gallery__item" style={{ "--i": i } as React.CSSProperties}>
              <img src={src} alt={`Tintera project ${i + 1}`} loading="lazy" />
              <div className="ab-gallery__item-overlay">
                <i className="ti ti-eye" />
                <span>Посмотреть</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ 5. TIMELINE ════════════════════════════════════ */}
      <section
        className={`ab-timeline${timelineSection.inView ? " ab-timeline--visible" : ""}`}
        ref={timelineSection.ref as React.RefObject<HTMLElement>}
      >
        <div className="about-deco about-deco--timeline" aria-hidden="true">
          <span className="about-deco__blob about-deco__blob--d" />
          <span className="about-deco__ring about-deco__ring--3" />
        </div>

        <div className="container">
          <div className="about-section-head about-section-head--center">
            <span className="about-eyebrow"> Наш путь</span>
            <h2 className="about-section-title">История<br /><span className="about-accent">развития</span></h2>
          </div>

          <div className="ab-timeline__track">
            <div className="ab-timeline__line" />
            {MILESTONES.map((m, i) => (
              <div key={i} className="ab-milestone" style={{ "--i": i } as React.CSSProperties}>
                <div className="ab-milestone__dot">
                  <i className={`ti ${m.icon}`} />
                </div>
                <div className="ab-milestone__card">
                  <span className="ab-milestone__year">{m.year}</span>
                  <h4>{m.title}</h4>
                  <p>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 6. TEAM - YANGILANGAN ══════════════════════════ */}
      <section
        className={`about-team${teamSection.inView ? " about-team--visible" : ""}`}
        ref={teamSection.ref as React.RefObject<HTMLElement>}
      >
        <div className="about-deco" aria-hidden="true">
          <span className="about-deco__blob about-deco__blob--a" />
          <span className="about-deco__blob about-deco__blob--c" />
          <span className="about-deco__ring about-deco__ring--1" />
          <span className="about-deco__ring about-deco__ring--3" />
          {[...Array(4)].map((_, i) => <span key={i} className="about-deco__particle" style={{ "--pi": i + 3 } as React.CSSProperties} />)}
        </div>

        <div className="container">
          <div className="about-section-head about-section-head--center">
            <span className="about-eyebrow">
                          Команда
            </span>
            <h2 className="about-section-title">
              Люди за <span className="about-accent">Tintera</span>
            </h2>
            <p className="about-section-sub">
              Профессионалы, которые помогают вам создать идеальный интерьер
            </p>
          </div>

          <div className="about-team__grid">
            <div className="about-team__profile">
              <div className="about-team__profile-image">
                <img 
                  src={Person}
                  alt="Беҳруз Азизович" 
                />
                <div className="about-team__profile-ring" />
              </div>
              
              <div className="about-team__profile-info">
                <h3 className="about-team__profile-name">Беҳруз Азизович</h3>
                <p className="about-team__profile-role">Основатель &amp; Директор</p>
                
                <div className="about-team__profile-socials">
                  <a href="https://www.instagram.com/tinterauz/" target="_blank" className="about-team__social about-team__social--instagram" aria-label="Instagram">
                    <i className="ti ti-brand-instagram" />
                  </a>
                  <a href="https://t.me/tinterauz" target="_blank" className="about-team__social about-team__social--telegram" aria-label="Telegram">
                    <i className="ti ti-brand-telegram" />
                  </a>
                  <a href="tel:+998901234567" target="_blank" className="about-team__social about-team__social--phone" aria-label="Phone">
                    <i className="ti ti-phone" />
                  </a>
                </div>
                
                <div className="about-team__profile-contact">
                  <a href="tel:+998901234567" className="about-team__profile-phone">
                    <i className="ti ti-phone" />
                    +998 90 123 45 67
                  </a>
                </div>
              </div>
            </div>

            <div className="about-team__form-wrapper">
              <div className="about-team__form-card">
                <h4 className="about-team__form-title">
                  <i className="ti ti-message-circle" />
                  Свяжитесь с нами
                </h4>
                <p className="about-team__form-desc">
                  Оставьте свои контакты и мы поможем вам подобрать идеальное решение
                </p>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 7. CTA - YANGILANGAN ═══════════════════════════ */}
      <section className="ab-cta">
        <div className="ab-cta__deco" aria-hidden="true">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="ab-cta__particle" style={{ "--pi": i } as React.CSSProperties} />
          ))}
          <span className="about-deco__ring about-deco__ring--cta" />
          <span className="ab-cta__circle ab-cta__circle--1" />
          <span className="ab-cta__circle ab-cta__circle--2" />
          <span className="ab-cta__circle ab-cta__circle--3" />
        </div>

        <div className="container ab-cta__inner">
          <div className="ab-cta__badge">
            <i className="ti ti-rocket" />
            <span>Готовы начать?</span>
          </div>
          
          <h2 className="ab-cta__title">
            Преобразите свой<br />
            <span className="ab-cta__highlight">интерьер с Tintera</span>
          </h2>
          
          <p className="ab-cta__sub">
            Посетите шоурум или свяжитесь с нами — поможем подобрать идеальный цвет
          </p>
          
          <div className="ab-cta__btns">
            <a href="/contacts" className="ab-cta__btn ab-cta__btn--fill">
              <span>Связаться</span>
              <i className="ti ti-arrow-right" />
            </a>
            <a href="/products" className="ab-cta__btn ab-cta__btn--ghost">
              <span>Каталог</span>
              <i className="ti ti-chevron-right" />
            </a>
          </div>

          <div className="ab-cta__stats">
            <div className="ab-cta__stat-item">
              <span className="ab-cta__stat-number">120+</span>
              <span className="ab-cta__stat-label">Оттенков</span>
            </div>
            <div className="ab-cta__stat-divider" />
            <div className="ab-cta__stat-item">
              <span className="ab-cta__stat-number">5000+</span>
              <span className="ab-cta__stat-label">Клиентов</span>
            </div>
            <div className="ab-cta__stat-divider" />
            <div className="ab-cta__stat-item">
              <span className="ab-cta__stat-number">4.9</span>
              <span className="ab-cta__stat-label">Рейтинг</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
import { useEffect, useRef, useState } from "react";
import Hero from "../../components/Hero/Hero";
import "./Products.scss";
import SEO from "../../components/SEO/SEO";

// ── Mahsulotlar ma'lumotlari ──
const PRODUCTS = [
  {
    id: 1,
    title: "Декоративная штукатурка",
    desc: "Создает уникальную текстуру на стенах, идеально для гостиной и спальни",
    price: "от 45 000 сум",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80",
    category: "Штукатурка",
    badge: "Хит",
  },
  {
    id: 2,
    title: "Краска для стен",
    desc: "Экологически чистая краска с широкой палитрой оттенков",
    price: "от 32 000 сум",
    image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600&q=80",
    category: "Краска",
    badge: "Новинка",
  },
  {
    id: 3,
    title: "Декоративное покрытие",
    desc: "Стойкое покрытие с эффектом шелка и металлическим блеском",
    price: "от 58 000 сум",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
    category: "Покрытие",
    badge: "Хит",
  },
  {
    id: 4,
    title: "Фактурная штукатурка",
    desc: "Объемная текстура для создания стильного интерьера",
    price: "от 52 000 сум",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
    category: "Штукатурка",
    badge: null,
  },
  {
    id: 5,
    title: "Акриловая краска",
    desc: "Водостойкая краска для стен и потолков, быстро сохнет",
    price: "от 28 000 сум",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
    category: "Краска",
    badge: "Эконом",
  },
  {
    id: 6,
    title: "Венецианская штукатурка",
    desc: "Элитное покрытие с эффектом мрамора для премиум интерьеров",
    price: "от 85 000 сум",
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=600&q=80",
    category: "Штукатурка",
    badge: "Премиум",
  },
  {
    id: 7,
    title: "Краска для ванной",
    desc: "Влагостойкая краска с антибактериальным эффектом",
    price: "от 38 000 сум",
    image: "https://images.unsplash.com/photo-1560448075-bb485b067938?w=600&q=80",
    category: "Краска",
    badge: null,
  },
  {
    id: 8,
    title: "Декоративный лак",
    desc: "Прозрачное покрытие для защиты и блеска поверхности",
    price: "от 25 000 сум",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80",
    category: "Лак",
    badge: "Новинка",
  },
  {
    id: 9,
    title: "Структурная штукатурка",
    desc: "Создает рельефную поверхность с глубокой текстурой",
    price: "от 48 000 сум",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
    category: "Штукатурка",
    badge: null,
  },
  {
    id: 10,
    title: "Краска для фасада",
    desc: "Устойчивая к погодным условиям фасадная краска",
    price: "от 42 000 сум",
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&q=80",
    category: "Краска",
    badge: null,
  },
  {
    id: 11,
    title: "Грунтовка глубокого проникновения",
    desc: "Укрепляет поверхность и улучшает сцепление материалов",
    price: "от 18 000 сум",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80",
    category: "Грунтовка",
    badge: "Эконом",
  },
  {
    id: 12,
    title: "Декоративная краска",
    desc: "Матовое покрытие с бархатистым эффектом для интерьера",
    price: "от 36 000 сум",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&q=80",
    category: "Краска",
    badge: null,
  },
];

// ── Kategoriyalar ──
const CATEGORIES = [
  "Все",
  "Штукатурка",
  "Краска",
  "Покрытие",
  "Лак",
  "Грунтовка"
];

// ── Scroll-triggered animation hook ──
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(currentRef);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  return { ref, inView };
}

// ── Modal komponenti (Forma bilan) ──
function ProductModal({ product, onClose }: { product: typeof PRODUCTS[0] | null; onClose: () => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  useEffect(() => {
    if (product) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "17px";
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [product, onClose]);

  if (!product) return null;

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

  const sendToTelegram = async (name: string, phone: string, productName: string, productPrice: string) => {
   const BOT_TOKEN = "8703348503:AAEvLayIrZ5oMVAvKirEHdMBwlS5M56zMp0";
    const CHAT_ID = "630353326";
    
    const message = `
🛍️ <b>Новый заказ с сайта Tintera</b>
━━━━━━━━━━━━━━━━━━━━━━

📄 <b>Страница:</b> Каталог продукции
📦 <b>Товар:</b> ${productName}
💰 <b>Цена:</b> ${productPrice}

👤 <b>Имя:</b> ${name}
📱 <b>Телефон:</b> ${phone}
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
      const sent = await sendToTelegram(name, phone, product.title, product.price);
      if (sent) {
        setSubmitted(true);
        setName("");
        setPhone("");
        setNameError("");
        setPhoneError("");
        setTimeout(() => {
          setSubmitted(false);
          onClose();
        }, 3000);
      } else {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'product-modal__form-error-global';
        errorDiv.textContent = 'Ошибка отправки. Пожалуйста, попробуйте позже.';
        const form = document.querySelector('.product-modal__form');
        if (form) form.prepend(errorDiv);
        setTimeout(() => errorDiv.remove(), 5000);
      }
    } catch (error) {
      const errorDiv = document.createElement('div');
      errorDiv.className = 'product-modal__form-error-global';
      errorDiv.textContent = 'Ошибка отправки. Пожалуйста, попробуйте позже.';
      const form = document.querySelector('.product-modal__form');
      if (form) form.prepend(errorDiv);
      setTimeout(() => errorDiv.remove(), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-modal" onClick={onClose}>
      <div className="product-modal__content" onClick={(e) => e.stopPropagation()}>
        <button className="product-modal__close" onClick={onClose}>
          <i className="ti ti-x" />
        </button>
        
        <div className="product-modal__image">
          <img src={product.image} alt={product.title} />
          {product.badge && (
            <span className="product-modal__badge">{product.badge}</span>
          )}
          <span className="product-modal__category">{product.category}</span>
        </div>
        
        <div className="product-modal__info">
          <h3 className="product-modal__title">{product.title}</h3>
          <p className="product-modal__desc">{product.desc}</p>
          <div className="product-modal__price">{product.price}</div>

          {/* ── Forma ── */}
          {!submitted ? (
            <form className="product-modal__form" onSubmit={handleSubmit} noValidate>
              <div className={`product-modal__form-group ${nameError ? "product-modal__form-group--error" : ""}`}>
                <label htmlFor="modal-name">Ваше имя</label>
                <div className="product-modal__form-input-wrap">
                  <input
                    id="modal-name"
                    type="text"
                    placeholder="Иван Иванов"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (e.target.value.trim()) setNameError("");
                    }}
                    onBlur={() => validateName(name)}
                    required
                  />
                  <i className="ti ti-user" />
                </div>
                {nameError && <span className="product-modal__form-error">{nameError}</span>}
              </div>

              <div className={`product-modal__form-group ${phoneError ? "product-modal__form-group--error" : ""}`}>
                <label htmlFor="modal-phone">Номер телефона</label>
                <div className="product-modal__form-input-wrap">
                  <input
                    id="modal-phone"
                    type="tel"
                    placeholder="+998 90 123 45 67"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (e.target.value.trim()) setPhoneError("");
                    }}
                    onBlur={() => validatePhone(phone)}
                    required
                  />
                  <i className="ti ti-phone" />
                </div>
                {phoneError && <span className="product-modal__form-error">{phoneError}</span>}
              </div>

              <button type="submit" className="product-modal__form-btn" disabled={loading}>
                {loading ? (
                  <>
                    <span className="product-modal__spinner">
                      <span className="product-modal__spinner-dot" />
                      <span className="product-modal__spinner-dot" />
                      <span className="product-modal__spinner-dot" />
                    </span>
                    <span>Отправка...</span>
                  </>
                ) : (
                  <>
                    <i className="ti ti-shopping-cart" />
                    <span>Заказать</span>
                    <i className="ti ti-arrow-right" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="product-modal__success">
              <i className="ti ti-circle-check" />
              <div>
                <span className="product-modal__success-title">Заказ оформлен!</span>
                <span className="product-modal__success-desc">Мы свяжемся с вами в ближайшее время</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Asosiy sahifa ──
function Products() {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [selectedProduct, setSelectedProduct] = useState<typeof PRODUCTS[0] | null>(null);
  const { ref, inView } = useInView(0.1);

  const filteredProducts = activeCategory === "Все" 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <>
      <Hero
        title="Каталог продукции"
        subtitle="Лучшие решения для вашего дома"
      />
         <SEO
        title="Каталог продукции - Tintera Decor Center"
        description="Широкий ассортимент декоративных красок, штукатурок и покрытий для интерьера. Европейское качество, доступные цены в Ташкенте."
        keywords="каталог красок, декоративная штукатурка, краски для стен, Tintera, интерьерные покрытия"
        url="https://tintera.uz/products"
      />

      <section className="products">
        <div className="products-deco" aria-hidden="true">
          <span className="products-deco__blob products-deco__blob--1" />
          <span className="products-deco__blob products-deco__blob--2" />
          <span className="products-deco__ring products-deco__ring--1" />
          <span className="products-deco__ring products-deco__ring--2" />
          <span className="products-deco__cross products-deco__cross--1">
            <i className="ti ti-plus" />
          </span>
          <span className="products-deco__cross products-deco__cross--2">
            <i className="ti ti-plus" />
          </span>
        </div>

        <div className="container">
          {/* Sarlavha */}
          <div className="products-head">
            <span className="products-eyebrow">
              Наша продукция
            </span>
            <h2 className="products-title">
              Качественные <br />
              <span className="products-accent">материалы для интерьера</span>
            </h2>
            <p className="products-sub">
              Широкий ассортимент декоративных покрытий для создания идеального интерьера
            </p>
          </div>

          {/* Filterlar */}
          <div className="products-filters">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`products-filter ${activeCategory === cat ? "products-filter--active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className={`products-grid ${inView ? "products-grid--visible" : ""}`} ref={ref}>
            {filteredProducts.map((product, i) => (
              <div
                key={product.id}
                className="products-item"
                style={{ "--i": i } as React.CSSProperties}
                onClick={() => setSelectedProduct(product)}
              >
                <div className="products-item__image">
                  <img src={product.image} alt={product.title} loading="lazy" />
                  {product.badge && (
                    <span className="products-item__badge">{product.badge}</span>
                  )}
                  <div className="products-item__overlay">
                    <i className="ti ti-eye" />
                    <span>Подробнее</span>
                  </div>
                </div>
                <div className="products-item__info">
                  <span className="products-item__category">{product.category}</span>
                  <h3 className="products-item__title">{product.title}</h3>
                  <p className="products-item__desc">{product.desc}</p>
                  <div className="products-item__bottom">
                    <span className="products-item__price">{product.price}</span>
                    <span className="products-item__arrow">
                      <i className="ti ti-arrow-right" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Ko'proq ko'rsatish */}
          <div className="products-more">
            <a href="/contacts" className="products-more__btn">
              <span>Полный каталог</span>
              <i className="ti ti-arrow-right" />
            </a>
          </div>
        </div>
      </section>

      {/* Modal */}
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </>
  );
}

export default Products;
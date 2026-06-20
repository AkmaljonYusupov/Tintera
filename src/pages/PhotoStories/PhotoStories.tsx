import { useEffect, useRef, useState } from "react";
import Hero from "../../components/Hero/Hero";
import "./PhotoStories.scss";
import SEO from "../../components/SEO/SEO";

// ── Interyer rasmlari - 20 ta eng zo'r ──
const STORIES = [
  {
    id: 1,
    title: "Современная гостиная",
    desc: "Использование декоративной штукатурки и натуральных оттенков",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80",
    category: "Гостиная",
    year: "2024",
  },
  {
    id: 2,
    title: "Минималистичная спальня",
    desc: "Светлые тона и текстуры для создания уюта",
    image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80",
    category: "Спальня",
    year: "2024",
  },
  {
    id: 3,
    title: "Кухня-студия",
    desc: "Сочетание декоративной краски и деревянных элементов",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    category: "Кухня",
    year: "2023",
  },
  {
    id: 4,
    title: "Офисное пространство",
    desc: "Строгие линии и акцентные стены для вдохновения",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    category: "Офис",
    year: "2024",
  },
  {
    id: 5,
    title: "Детская комната",
    desc: "Яркие акценты и безопасные материалы",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
    category: "Детская",
    year: "2023",
  },
  {
    id: 6,
    title: "Ванная комната",
    desc: "Влагостойкие покрытия и стильный дизайн",
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=80",
    category: "Ванная",
    year: "2024",
  },
  {
    id: 7,
    title: "Прихожая",
    desc: "Функциональность и эстетика в каждой детали",
    image: "https://images.unsplash.com/photo-1560448075-bb485b067938?w=800&q=80",
    category: "Прихожая",
    year: "2023",
  },
  {
    id: 8,
    title: "Балкон с видом",
    desc: "Уютное пространство для отдыха и вдохновения",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80",
    category: "Балкон",
    year: "2024",
  },
  {
    id: 9,
    title: "Гостиная в скандинавском стиле",
    desc: "Светлые тона и натуральные материалы",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    category: "Гостиная",
    year: "2024",
  },
  {
    id: 10,
    title: "Спальня с панорамным окном",
    desc: "Естественное освещение и уютная атмосфера",
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80",
    category: "Спальня",
    year: "2023",
  },
  {
    id: 11,
    title: "Современная кухня",
    desc: "Функциональность и стиль в каждой детали",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    category: "Кухня",
    year: "2024",
  },
  {
    id: 12,
    title: "Офис с зоной отдыха",
    desc: "Комфортное пространство для работы и отдыха",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80",
    category: "Офис",
    year: "2023",
  },
  {
    id: 13,
    title: "Игровая комната",
    desc: "Яркие цвета и безопасные материалы",
    image: "https://domtut.uz/resources/uploads/post/uyutnyy-minimalizm-v-interere.webp",
    category: "Детская",
    year: "2024",
  },
  {
    id: 14,
    title: "Спа-ванная",
    desc: "Релаксация и комфорт в каждом элементе",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80",
    category: "Ванная",
    year: "2023",
  },
  {
    id: 15,
    title: "Стильная прихожая",
    desc: "Первое впечатление от вашего дома",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
    category: "Прихожая",
    year: "2024",
  },
  {
    id: 16,
    title: "Уютный балкон",
    desc: "Комфортное пространство на свежем воздухе",
    image: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&q=80",
    category: "Балкон",
    year: "2023",
  },
  {
    id: 17,
    title: "Классическая гостиная",
    desc: "Элегантность и timeless дизайн",
    image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80",
    category: "Гостиная",
    year: "2024",
  },
  {
    id: 18,
    title: "Спальня в стиле бохо",
    desc: "Свобода и творчество в интерьере",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
    category: "Спальня",
    year: "2023",
  },
  {
    id: 19,
    title: "Минималистичная кухня",
    desc: "Чистые линии и функциональность",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    category: "Кухня",
    year: "2024",
  },
  {
    id: 20,
    title: "Офис с видом на город",
    desc: "Вдохновение в каждой детали",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80",
    category: "Офис",
    year: "2024",
  },
];

// ── Filter kategoriyalari ──
const CATEGORIES = [
  "Все",
  "Гостиная",
  "Спальня",
  "Кухня",
  "Офис",
  "Детская",
  "Ванная",
  "Прихожая",
  "Балкон"
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

// ── Modal komponenti ──
function StoryModal({ story, onClose }: { story: typeof STORIES[0] | null; onClose: () => void }) {
  useEffect(() => {
    if (story) {
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
  }, [story, onClose]);

  if (!story) return null;

  return (
    <div className="story-modal" onClick={onClose}>
      <div className="story-modal__content" onClick={(e) => e.stopPropagation()}>
        <button className="story-modal__close" onClick={onClose}>
          <i className="ti ti-x" />
        </button>
        
        <div className="story-modal__image">
          <img src={story.image} alt={story.title} />
          <div className="story-modal__image-badge">
            <span className="story-modal__category">{story.category}</span>
            <span className="story-modal__year">{story.year}</span>
          </div>
        </div>
        
        <div className="story-modal__info">
          <h3 className="story-modal__title">{story.title}</h3>
          <p className="story-modal__desc">{story.desc}</p>
          <div className="story-modal__actions">
            <a href="/contacts" className="story-modal__btn story-modal__btn--primary">
              <span>Связаться</span>
              <i className="ti ti-arrow-right" />
            </a>
            <a href="/products" className="story-modal__btn story-modal__btn--secondary">
              <span>Каталог</span>
              <i className="ti ti-chevron-right" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Asosiy sahifa ──
function PhotoStories() {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [selectedStory, setSelectedStory] = useState<typeof STORIES[0] | null>(null);
  const { ref, inView } = useInView(0.1);

  const filteredStories = activeCategory === "Все" 
    ? STORIES 
    : STORIES.filter(s => s.category === activeCategory);

  return (
    <>
      <Hero
        title="Фотоистории"
        subtitle="Наши проекты"
      />

         <SEO
        title="Фотоистории - Tintera Decor Center"
        description="Наши проекты и фотоистории. Вдохновение для создания идеального интерьера."
        keywords="фотоистории, проекты, Tintera, интерьер, дизайн"
        url="https://tintera.uz/stories"
      />

      <section className="stories">
        <div className="stories-deco" aria-hidden="true">
          <span className="stories-deco__blob stories-deco__blob--1" />
          <span className="stories-deco__blob stories-deco__blob--2" />
          <span className="stories-deco__ring stories-deco__ring--1" />
          <span className="stories-deco__ring stories-deco__ring--2" />
          <span className="stories-deco__cross stories-deco__cross--1">
            <i className="ti ti-plus" />
          </span>
          <span className="stories-deco__cross stories-deco__cross--2">
            <i className="ti ti-plus" />
          </span>
        </div>

        <div className="container">
          {/* Sarlavha */}
          <div className="stories-head">
            <span className="stories-eyebrow">
            
              Наши работы
            </span>
            <h2 className="stories-title">
              Вдохновение <br />
              <span className="stories-accent">в каждом проекте</span>
            </h2>
            <p className="stories-sub">
              Реализованные проекты, которые вдохновляют на создание идеального интерьера
            </p>
          </div>

          {/* Filterlar */}
          <div className="stories-filters">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`stories-filter ${activeCategory === cat ? "stories-filter--active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className={`stories-grid ${inView ? "stories-grid--visible" : ""}`} ref={ref}>
            {filteredStories.map((story, i) => (
              <div
                key={story.id}
                className="stories-item"
                style={{ "--i": i } as React.CSSProperties}
                onClick={() => setSelectedStory(story)}
              >
                <div className="stories-item__image">
                  <img src={story.image} alt={story.title} loading="lazy" />
                  <div className="stories-item__overlay">
                    <span className="stories-item__category">{story.category}</span>
                    <span className="stories-item__year">{story.year}</span>
                    <div className="stories-item__icon">
                      <i className="ti ti-eye" />
                      <span>Смотреть</span>
                    </div>
                  </div>
                </div>
                <div className="stories-item__info">
                  <h3 className="stories-item__title">{story.title}</h3>
                  <p className="stories-item__desc">{story.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Ko'proq ko'rsatish */}
          <div className="stories-more">
            <a href="/contacts" className="stories-more__btn">
              <span>Все проекты</span>
              <i className="ti ti-arrow-right" />
            </a>
          </div>
        </div>
      </section>

      {/* Modal */}
      <StoryModal story={selectedStory} onClose={() => setSelectedStory(null)} />
    </>
  );
}

export default PhotoStories;
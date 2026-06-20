export interface Slide {
  id: number;
  number: string;
  title: string;
  accent: string;
  description: string;
  buttonText: string;
  link: string;
  image: string;
  year: string;
}

export const slides: Slide[] = [
  {
    id: 1,
    number: "01",
    title: "Tintera Decor",
    accent: "Center",
    description:
      "Мы надеемся, что Тинтера станет не только красильным магазином, но и творческим домом и офисом для первых мастеров и художников Узбекистана.",
    buttonText: "Смотреть коллекцию",
    link: "/products",
    year: "2026",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=2000&q=90",
  },
  {
    id: 2,
    number: "02",
    title: "Декоративные изделия высокого",
    accent: "качества",
    description:
      "Мы постарались довести всю продукцию, выпускаемую под брендом Tintera, до уровня, соответствующего европейским стандартам и не уступающего по качеству красок.",
    buttonText: "Подробнее",
    link: "/about",
    year: "2026",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=2000&q=90",
  },
  {
    id: 3,
    number: "03",
    title: "Tintera Decor",
    accent: "Center",
    description:
      "В нашем центре декора Тинтера для вас, дорогие наши клиенты, представлен широкий ассортимент качественных декоративных красок и штукатурок.",
    buttonText: "Смотреть проекты",
    link: "/stories",
    year: "2026",
    image:
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=2000&q=90",
  }

];
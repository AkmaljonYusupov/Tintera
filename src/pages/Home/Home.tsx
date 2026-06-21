import HeroSlider from "../../components/HeroSlider/HeroSlider";
import AboutTintera from "../../components/AboutTintera/AboutTintera";
import StatsVideo from "../../components/StatsVideo/StatsVideo";
import InstagramReels from "../../components/InstagramReels/InstagramReels";
import Map from "../../components/Map/Map";
import Partners from "../../components/Partners/Partners";
import SEO from "../../components/SEO/SEO";
import "./Home.scss";

function Home() {
  return (
    <>
      <SEO
        title="Главная - Tintera Decor Center"
        description="Tintera Decor Center - декоративные краски, штукатурки и интерьерные решения в Ташкенте. Качественные материалы для вашего дома."
        keywords="декоративная штукатурка, краски, интерьер, Tintera, Ташкент, дизайн интерьера"
        url="https://tintera.uz/"
      />
      <HeroSlider />
      <AboutTintera />
      <StatsVideo />
      <InstagramReels />
      <Partners />
      <Map />
    </>
  );
}

export default Home;
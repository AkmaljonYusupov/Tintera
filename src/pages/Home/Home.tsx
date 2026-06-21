import HeroSlider from "../../components/HeroSlider/HeroSlider";
import AboutTintera from "../../components/AboutTintera/AboutTintera";
import StatsVideo from "../../components/StatsVideo/StatsVideo";
import InstagramReels from "../../components/InstagramReels/InstagramReels";
import Map from "../../components/Map/Map";
import "./Home.scss";
import Partners from "../../components/Partners/Partners";
import Products from "../Products/Products";

function Home() {
  return (
    <>
      <HeroSlider />
      <AboutTintera />
      <StatsVideo />
      <InstagramReels />
      <Partners />
      <Map/>
    </>
  );
}

export default Home;
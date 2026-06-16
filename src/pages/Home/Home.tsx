import HeroSlider from "../../components/HeroSlider/HeroSlider";
import AboutTintera from "../../components/AboutTintera/AboutTintera";
import StatsVideo from "../../components/StatsVideo/StatsVideo";
import InstagramReels from "../../components/InstagramReels/InstagramReels";
import "./Home.scss";
import Partners from "../../components/Partners/Partners";

function Home() {
  return (
    <>
      <HeroSlider />
      <AboutTintera />
      <StatsVideo />
      <InstagramReels />
      <Partners />
    </>
  );
}

export default Home;
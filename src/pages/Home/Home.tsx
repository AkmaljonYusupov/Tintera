import HeroSlider from "../../components/HeroSlider/HeroSlider";
import tintteraImg from "../../assets/about-tintera.png";
import "./Home.scss";

function Home() {
  return (
    <>
      <HeroSlider />

      <section className="about-tintera">
        <div className="about-container">
          <div className="about-left">
            <h2>О Тинтере</h2>

            <p>
              Центр Tintera Decor создан 1 мая 2023 года в Шайхонтохурском
              районе города Ташкента. В нашем центре декора Tintera для вас,
              дорогие наши клиенты, представлен широкий ассортимент
              качественных декоративных красок и штукатурок.
            </p>

            <p>
              Мы надеемся, что Tintera станет не только магазином красок, но и
              творческим домом для начинающих мастеров и профессионалов.
              Продукция соответствует европейским стандартам качества и
              сохраняет насыщенность цвета на долгие годы.
            </p>

            <p>
              Добро пожаловать в мир дизайна, вдохновения и современных
              декоративных решений вместе с Tintera Decor.
            </p>
          </div>

          <div className="about-right">
            <img src={tintteraImg} alt="Tintera Decor" />
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
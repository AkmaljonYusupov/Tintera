import "./Map.scss";

function Map() {
  return (
    <section className="map">
      <div className="container">

        <div className="map-wrapper">

          {/* Glass card */}
          <div className="map-card">
            <span className="map-badge">📍 МЫ ЗДЕСЬ</span>

            <h3 className="map-title">
              Наше местоположение
            </h3>

            <p className="map-text">
              Ташкент, Узбекистан. Нажмите кнопку ниже,
              чтобы открыть маршрут в Google Maps.
            </p>

            <a
              href="https://maps.app.goo.gl/yXNDoDsEi5j97xs69"
              target="_blank"
              rel="noopener noreferrer"
              className="map-btn"
            >
              Открыть в Google Maps
            </a>
          </div>

          {/* Animated pin */}
          <div className="map-pin">
            <div className="pin-icon">📍</div>
            <div className="pin-pulse"></div>
          </div>

          {/* Google Map */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d5992.422914650532!2d69.251608!3d41.326015!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDHCsDE5JzMzLjciTiA2OcKwMTUnMDUuOCJF!5e0!3m2!1sru!2s!4v1781671100920!5m2!1sru!2s"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            title="map"
          />

        </div>
      </div>
    </section>
  );
}

export default Map;
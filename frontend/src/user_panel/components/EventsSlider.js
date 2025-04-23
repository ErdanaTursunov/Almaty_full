import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/swiper-bundle.css";
import { getEvents } from "../../services/api";

// 🔧 Функция форматирования в дд.мм.гггг
const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};

function EventSlider() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const loadEvents = async () => {
      const response = await getEvents();
      if (response.events) {
        setEvents(response.events);
      }
    };

    loadEvents();
  }, []);

  return (
    <section className="event-slider-section">
      <div className="event-title-line">
        <span className="line-events" />
        <h2 className="slider-title">Оқиғалар анонсы</h2>
        <span className="line-events" />
      </div>

      <div className="event-carousel">
        <Swiper
          className="swiper"
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={2}
          loop={true}
          grabCursor={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
        >
          {events.map((event, index) => (
            <SwiperSlide key={index}>
              <div className="event-card">
                <div className="event-date">{formatDate(event.date)}</div>
                <div className="event-name">
                  {event.EventsName.length > 40
                    ? event.EventsName.slice(0, 40) + "..."
                    : event.EventsName}
                </div>
                <div className="event-description">
                  {event.description.length > 100
                    ? event.description.slice(0, 100) + "..."
                    : event.description}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default EventSlider;

import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/swiper-bundle.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { getBooks } from "../../services/api";
import { useNavigate } from "react-router-dom";




function NewBooks() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const swiperInstance = document.querySelector(".swiper").swiper;
    if (swiperInstance && prevRef.current && nextRef.current) {
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, []);

  useEffect(() => {
    const loadbooks = async () => {
      const res = await getBooks();

      if (res.books) {
        setBooks(res.books)
      }
    }

    loadbooks();
  }, [])


  const handleClickBook = (id) => {
    navigate(`/book/${id}`)
  }
  return (
    <div className="newbooks-section">
      <div className="overlay" />
      <div className="newbooks-title-line">
        <span className="line" />
        <h2 className="newbooks-title">Жаңа түсімдер</h2>
        <span className="line" />
      </div>

      <div className="newbooks-carousel">
        <button ref={prevRef} className="nav-button prev">
          <FaChevronLeft style={{ color: '#DECD90' }} />
        </button>
        <Swiper
          className="swiper"
          modules={[Navigation]}
          spaceBetween={30}
          slidesPerView={3}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current
          }}
          onSwiper={(swiper) => {
            if (prevRef.current && nextRef.current) {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }
          }}
        >
          {books.map((book) => (
            <SwiperSlide key={book.id}>
              <div className="book-card" onClick={() => handleClickBook(book.id)}>
                <div className="book-image-wrapper">
                  <img
                    src={`${process.env.REACT_APP_API_URL}${book.img_url}`}
                    alt={book.title}
                    className="book-image"
                  />
                  <div className="image-overlay" />
                </div>
                <h3 className="book-title">
                  {book.title.length > 50 ? book.title.slice(0, 30) + '...' : book.title}
                </h3>
                <p className="book-description">
                  {book.author.length > 40 ? book.author.slice(0, 30) + '...' : book.author}
                </p>
              </div>
            </SwiperSlide>

          ))}
        </Swiper>
        <button ref={nextRef} className="nav-button next">
          <FaChevronRight style={{ color: '#DECD90' }} />
        </button>
      </div>
    </div>
  );
}

export default NewBooks;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EventsSlider from './EventsSlider';
import { getNews } from '../../services/api';

const ITEMS_PER_PAGE = 6;

function AllNews() {
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const [allNews, setAllNews] = useState([]);
    const totalPages = Math.ceil(allNews.length / ITEMS_PER_PAGE);

    // Функция форматирования даты
    const months = [
        'ҚАҢТАР', 'Ақпан', 'Наурыз', 'Сәуір', 'Мамыр', 'Маусым',
        'Шілде', 'Тамыз', 'Қыркүйек', 'Қазан', 'Қараша', 'Желтоқсан'
    ];

    const formatKazakhDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        return `${day} ${month}, ${year}`;
    };

    useEffect(() => {
        const loadAllNews = async () => {
            const res = await getNews();
            if (res.news) {
                setAllNews(res.news);
            }
        };

        loadAllNews();
    }, []);

    const currentItems = allNews.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    const handleCardClick = (id) => {
        navigate(`/news/${id}`);
    };

    return (
        <div className="news-section">
            <div className="news-title-line">
                <span className="line-news"></span>
                <h2 className="newsMain">Кітапхана жаңалықтары</h2>
                <span className="line-news"></span>
            </div>

            <div className="news-grid">
                {currentItems.map((item) => (
                    <div
                        className="news-card"
                        key={item.id}
                        onClick={() => handleCardClick(item.id)}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="news-image">
                            <img
                                src={`${process.env.REACT_APP_API_URL}${item.img_url}`}
                                alt={item.NewsName}
                            />
                        </div>
                        <div className="news-content">
                            <p className="news-date">{formatKazakhDate(item.date)}</p>
                            <h3 className="news-title">{item.NewsName || "Без названия"}</h3>
                            <div className="news-footer">
                                <span className="news-category">{item.description || "Описание отсутствует"}</span>
                                <a href="#" className="instagram-link">
                                    <i className="fab fa-instagram"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                        key={page}
                        onClick={() => handlePageClick(page)}
                        className={`page-button ${page === currentPage ? 'active' : ''}`}
                    >
                        {page}
                    </button>
                ))}
            </div>

            <EventsSlider />
        </div>
    );
}

export default AllNews;

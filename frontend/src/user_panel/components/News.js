import React, { useEffect, useState } from 'react';
import { getNews } from '../../services/api';
import { useNavigate } from 'react-router-dom';

// 🔧 Функция форматирования даты в "27 НАУРЫЗ, 2025"
const formatKazakhDate = (isoDate) => {
    const months = [
        "ҚАҢТАР", "АҚПАН", "НАУРЫЗ", "СӘУІР", "МАМЫР", "МАУСЫМ",
        "ШІЛДЕ", "ТАМЫЗ", "ҚЫРКҮЙЕК", "ҚАЗАН", "ҚАРАША", "ЖЕЛТОҚСАН"
    ];

    const date = new Date(isoDate);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month}, ${year}`;
};

function News() {
    const [news, setNews] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const loadNews = async () => {
            const response = await getNews();
            if (response.news) {
                setNews(response.news);
            }
        };

        loadNews();
    }, []);

    const handleCardClick = (id) => {
        navigate(`/news/${id}`);
    };

    const truncate = (text, maxLength) =>
        text.length > maxLength ? text.slice(0, maxLength) + '...' : text;

    const sortedNews = [...news]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 3);

    return (
        <div className="news-section">
            <div className="news-title-line">
                <span className="line-news"></span>
                <h2 className="newsMain">Кітапхана жаңалықтары</h2>
                <span className="line-news"></span>
            </div>

            <div className="news-grid">
                {sortedNews.map((item) => (
                    <div className="news-card" key={item.id} onClick={() => handleCardClick(item.id)}>
                        <div className="news-image">
                            <img
                                src={`${process.env.REACT_APP_API_URL}${item.img_url}`}
                                alt={item.img_url}
                            />
                        </div>
                        <div className="news-content">
                            <div>
                                <p className="news-date">{formatKazakhDate(item.date)}</p>
                                <h3 className="news-title">{truncate(item.NewsName, 30)}</h3>
                            </div>
                            <div className="news-footer">
                                <span className="news-category">
                                    {truncate(item.description, 35)}
                                </span>
                                <a href="#" className="instagram-link">
                                    <i href="https://www.instagram.com/ulttyq_kitapkhana/?hl=ru%2F" className="fab fa-instagram"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button className="view-all-button" onClick={() => navigate("/news")}>БАРЛЫҒЫ</button>
        </div>
    );
}

export default News;

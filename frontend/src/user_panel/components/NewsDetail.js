import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getNewsById } from '../../services/api';

function NewsDetail() {
    const { id } = useParams();
    const [newsItem, setNewsItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
        const loadNewsItem = async () => {
            try {
                const res = await getNewsById(id);
                if (res.news) {
                    setNewsItem(res.news);
                } else {
                    setError('Жаңалық табылмады');
                }
            } catch (err) {
                setError('Қате орын алды');
            } finally {
                setLoading(false);
            }
        };

        loadNewsItem();
    }, [id]);

    if (loading) return <div className="loading">Жүктелуде...</div>;
    if (error || !newsItem) return <div className="not-found">{error}</div>;

    return (
        <div className="news-detail-container">
            <div className="news-detail">
                <img
                    className="news-image-detail"
                    src={`${process.env.REACT_APP_API_URL}${newsItem.img_url}`}
                    alt={newsItem.NewsName}
                />
                <div className="news-information">
                    <h1 className="news-title-detail">{newsItem.NewsName}</h1>
                    <p className="news-date-detail">{formatKazakhDate(newsItem.date)}</p>
                    <div className="social-icons-detail">
                        <a href="#"><i className="fab fa-facebook-f"></i></a>
                        <a href="#"><i className="fab fa-instagram"></i></a>
                        <a href="#"><i className="fab fa-twitter"></i></a>
                    </div>
                </div>
            </div>
            <div className="news-content">{newsItem.description}</div>
        </div>
    );
}

export default NewsDetail;
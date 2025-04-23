import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBookById } from '../../services/api';

function BookDetail() {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadBook = async () => {
            try {
                const res = await getBookById(id);
                if (res.book) {
                    setBook(res.book);
                } else {
                    setError('Кітап табылмады');
                }
            } catch (err) {
                setError('Қате орын алды');
            } finally {
                setLoading(false);
            }
        };

        loadBook();
    }, [id]);

    if (loading) return <div className="loading">Жүктелуде...</div>;
    if (error || !book) return <div className="not-found">{error}</div>;

    return (
        <div className="book-detail-container">
            <div className="book-detail">
                <img
                    className="book-image-detail"
                    src={`${process.env.REACT_APP_API_URL}${book.img_url}`}
                    alt={book.title}
                />
                <div className="book-information">
                    <h1 className="book-title-detail">{book.title}</h1>
                    <p><strong>Автор:</strong> {book.author}</p>
                    <p><strong>Жанр:</strong> {book.Genr}</p>
                    <p><strong>Жылы:</strong> {book.year}</p>
                    <p><strong>Саны:</strong> {book.quantity} дана</p>
                    <div className="social-icons-detail">
                        <a href="#"><i className="fab fa-facebook-f"></i></a>
                        <a href="#"><i className="fab fa-instagram"></i></a>
                        <a href="#"><i className="fab fa-twitter"></i></a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookDetail;

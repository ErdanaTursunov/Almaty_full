import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBook, FaBookReader, FaQuestion } from 'react-icons/fa';

const Content = () => {
  const navigate = useNavigate();

  return (
    <div className="content-buttons">

      <button className="button-catalog"
        onClick={() => window.open('https://kazneb.kz', '_blank', 'noopener,noreferrer')}>
        <FaBookReader size={30} /> Электрондық каталог
      </button>

      <button className="button-ticket"
        onClick={() => navigate('/register')}>
        <FaBook /> Оқу билетін алу
      </button>

      <button className="button-question"
        onClick={() => navigate('/questions')}>
        <FaQuestion style={{ marginRight: '8px' }} />
        Вопрос
      </button>
    </div>
  );
};

export default Content;

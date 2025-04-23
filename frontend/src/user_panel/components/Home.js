import React, { useState, useEffect } from 'react';
import '../styles/home.css';
import Content from './Content';
import NewBooks from './NewBooks';
import EventSlider from './EventsSlider';
import News from './News';

const quotes = [
  {
    text: 'Оқу – білімнің қайнары, білім – өмірдің айнасы.',
    author: 'Абай Құнанбаев',
  },
  {
    text: 'Ғылым таппай мақтанба, орын таппай баптанба.',
    author: 'Абай Құнанбаев',
  },
  {
    text: 'Халықтың кемеліне келіп өркендеуі үшін ең алдымен азаттық пен білім қажет.',
    author: 'Шоқан Уәлиханов',
  },
  {
    text: 'Білімдіден шыққан сөз, талаптыға болсын кез.',
    author: 'Абай Құнанбаев',
  },
  {
    text: 'Ел боламын десең, бесігіңді түзе.',
    author: 'Мұхтар Әуезов',
  },
];

function Home() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const fullText = quotes[currentQuoteIndex].text;
    setDisplayedText('');
    setCharIndex(0);

    const typingInterval = setInterval(() => {
      setDisplayedText(prev => {
        const next = fullText.slice(0, prev.length + 1);
        return next;
      });
      setCharIndex(prev => prev + 1);
    }, 20);

    return () => clearInterval(typingInterval);
  }, [currentQuoteIndex]);

  useEffect(() => {
    const switchInterval = setInterval(() => {
      setCurrentQuoteIndex(prevIndex => (prevIndex + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(switchInterval);
  }, []);

  const currentAuthor = quotes[currentQuoteIndex].author;

  return (
    <div>
      <div className="mainBackground">
        <div className="ornamentLeft"></div>
        <div className="ornamentRight"></div>
        <div className="user-panel-content">
          <div className="quote typewriter">
            «{displayedText}»
          </div>
          <div className="author">– {currentAuthor}</div>
        </div>
      </div>
      <Content />
      <NewBooks />
      <EventSlider />
      <News />
    </div>
  );
}

export default Home;
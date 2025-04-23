import React from 'react';
import logoLIB from '../images/logoLIB.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapMarkerAlt,
  faEnvelope,
  faPhoneAlt
} from '@fortawesome/free-solid-svg-icons';
import {
  faGooglePlusG,
  faTwitter,
  faFacebookF,
  faOdnoklassniki,
  faVk,
  faInstagram
} from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-title">БАЙЛАНЫС</h3>
          <div className="contact-info">
            <div className="contact-item">
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              <p>050013, Қазақстан Республикасы<br />Алматы қаласы, Абай даңғылы, 14</p>
            </div>
            <div className="contact-item">
              <FontAwesomeIcon icon={faEnvelope} />
              <p>org.nbrk@mail.ru</p>
            </div>
            <div className="contact-item">
              <FontAwesomeIcon icon={faPhoneAlt} />
              <p>+7 (727) 267-28-83 - қабылдау бөлмесі<br />+7-727-267-28-64 - баспасөз хатшысы</p>
            </div>
            <div className="contact-item">
              <FontAwesomeIcon icon={faEnvelope} />
              <p>ulttykktapkhana@mail.ru</p>
            </div>
          </div>
        </div>

        <div className="footer-section footer-logo">
          <div className="logo-container">
            <a href="/">
              <img src={logoLIB} alt="Library Logo" />
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">КІТАПХАНАЛЫҚ ҚАУЫМДАСТЫҚТАР</h3>
          <ul className="association-links">
            <li><a href="#">ҚАЗАҚСТАНДЫҚ КІТАПХАНАЛЫҚ ОДАҚ</a></li>
            <li><a href="http://www.ifla.org">Кітапханалық қауымдастықтар мен мекемелердің халықаралық федерациясы</a></li>
            <li><a href="https://bae.rsl.ru">Еуразия Кітапханалық Ассамблеясы</a></li>
            <li><a href="http://www.rba.ru">Ресей Кітапханалық Ассоциациясы (РКА)</a></li>
            <li><a href="https://neicon.ru">Электронды-ақпараттық консорциум Ассоциациясы</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2013-2025 Қазақстан Республикасының Ұлттық Кітапханасы. Барлық құқықтар сақталған.</p>
        <div className="social-links">
          <a href="https://workspaceupdates.googleblog.com/2023/04/new-community-features-for-google-chat-and-an-update-currents%20.html" className="social-link">
            <FontAwesomeIcon icon={faGooglePlusG} />
          </a>
          <a href="https://x.com/home" className="social-link">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="https://www.facebook.com/nlrk.kz/" className="social-link">
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <a href="https://ok.ru" className="social-link">
            <FontAwesomeIcon icon={faOdnoklassniki} />
          </a>
          <a href="https://vk.com/kitapkhana1931" className="social-link">
            <FontAwesomeIcon icon={faVk} />
          </a>
          <a href="https://www.instagram.com/ulttyq_kitapkhana/?hl=ru%2F" className="social-link">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

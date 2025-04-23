import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginIcon from '../assets/LoginIcon';
import logo from '../images/logo.png';
import logoLIB from '../images/logoLIB.png';

function Header() {
  const [isHovered, setIsHovered] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate();

  const menuItems = {
    about: {
      title: 'КІТАПХАНА ТУРАЛЫ',
      items: [
        { title: 'Кітапхана туралы', path: '/library-history' },
      ]
    },
    readers: {
      title: 'ОҚЫРМАНҒА',
      items: [
        { title: 'Читателям', path: '/for-readers' },
        { title: 'Услуги', path: '/services' },
        { title: 'Правила', path: '/rules' },
      ]
    },
    catalogs: {
      title: 'ҚОРЛАР',
      items: [
        { title: 'Читателям', path: '/for-readers' },

      ]
    },
    events: {
      title: 'АҚПАРАТ ОРТАЛЫҒЫ',
      items: [
        { title: 'Читателям', path: '/for-readers' },

      ]
    },
    projects: {
      title: 'МЕМ. САТЫП АЛУ',
      items: [
        { title: 'Читателям', path: '/for-readers' },

      ]
    },
    contacts: {
      title: 'БАЙЛАНЫСТАР',
      items: [
        { title: 'Читателям', path: '/for-readers' },

      ]
    }
  };

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <header className="header">

      <div className="header__logo-section">
      <button
          className="header__login-button"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleClick}
        >
          <span>Кіру</span>
          <LoginIcon width={16} height={16} fill={isHovered ? "#DECD90" : "#FFFFFF"} />
        </button>

        <div className="header__lang-selector">
          <a href="#" className="header__lang-link active">KZ</a>
          <a href="#" className="header__lang-link">RU</a>
          <a href="#" className="header__lang-link">EN</a>
        </div>
        <div className="header__ornament header__ornament-left"></div>
        <Link to="/" className="header__logo">
          <img className="header__logo-image" src={logoLIB} alt="Library Logo" width={80} height={80} />
          <img src={logo} alt="ҚАЗАҚСТАН РЕСПУБЛИКАСЫНЫҢ ҰЛТТЫҚ КІТАПХАНАСЫ" className="header__logo-title" />
        </Link>
        <div className="header__ornament header__ornament-right"></div>
      </div>

      <nav className="header__navigation">
        <div className="header__nav-container">
          {Object.entries(menuItems).map(([key, menu]) => (
            <div
              key={key}
              className="menu-item has-sub "
              onMouseEnter={() => setActiveDropdown(key)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link to={`/${key}`} className="header__nav-link">
                {menu.title}
              </Link>
              {activeDropdown === key && (
                <ul className="submenu">
                  {menu.items.map((item, index) => (
                    <li key={index}>
                      <Link to={item.path}>{item.title}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

        </div>
      </nav>
    </header>
  );
}

export default Header;
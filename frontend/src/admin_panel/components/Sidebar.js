import { Link, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import '../styles/style.css';
import { FaBars } from 'react-icons/fa';

const MenuButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 10px;
  color: white;
  max-width: 24px;
`;

function Sidebar({ isCollapsed, onMenuClick }) {
  const location = useLocation();

  const menuItems = [
    { path: '/admin', img: '/png/микро.svg', text: 'ОҚИҒАЛАР АНОНСЫ' },
    { path: '/admin/news', img: '/png/книга.svg', text: 'Кітапхана жаңалықтары' },
    { path: '/admin/new-arrivals', img: '/png/карзина.svg', text: 'Жаңа түсімдер' },
    { path: '/admin/ask-librarian', img: '/png/_.svg', text: 'Кітапханашыға сұрақ' },
  ];

  const name = localStorage.getItem('name');

  return (
    <aside className={`sidebar${isCollapsed ? ' collapsed' : ''}`}>
      <MenuButton onClick={onMenuClick}>
        <FaBars />
      </MenuButton>
      <div className="profile">
        <img src="/png/logo.png" alt="Аватар" className="profile-img" />
        <h6>{name}</h6>
      </div>
      <nav className="nav-links">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={location.pathname === item.path ? 'active' : ''}
          >
            <img src={item.img} alt="icon" className="nav-icon" />
            <span>{item.text}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;

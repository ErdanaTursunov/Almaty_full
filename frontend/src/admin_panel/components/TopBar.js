import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/authContext';

const TopBarContainer = styled.div`
  height: 60px;
  background-color: #004D3D;
  display: flex;
  align-items: center;
  justify-content: space-between; /* Для размещения кнопки справа */
  padding: 0 20px;
  position: relative;
  z-index: 1001;
`;

const LogoutButton = styled.button`
  background-color: transparent;
  border: none;
  color: white;
  font-weight: bold;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    text-decoration: underline;
  }
`;

function TopBar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <TopBarContainer>
      <div style={{ color: 'white', fontWeight: 'bold' }}>Admin Panel</div>
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
    </TopBarContainer>
  );
}

export default TopBar;

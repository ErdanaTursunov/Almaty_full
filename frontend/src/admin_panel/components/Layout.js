import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import styled from '@emotion/styled';

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  transition: margin-left 0.3s;
`;



function Layout({ children }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
    localStorage.setItem('sidebarCollapsed', !isSidebarCollapsed);
  };

  useEffect(() => {
    const collapsed = localStorage.getItem('sidebarCollapsed') === 'true';
    setIsSidebarCollapsed(collapsed);
  }, []);

  return (
<LayoutContainer>
  <Sidebar isCollapsed={isSidebarCollapsed} onMenuClick={toggleSidebar} />
  <div style={{ flex: 1 }}>
    <TopBar />
    <MainContent expanded={isSidebarCollapsed}>
      {children}
    </MainContent>
  </div>
</LayoutContainer>
  );
}

export default Layout; 
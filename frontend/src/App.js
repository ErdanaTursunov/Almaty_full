import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Layout from './admin_panel/components/Layout';
import Events from './admin_panel/pages/Events';
import News from './admin_panel/pages/News';
import NewArrivals from './admin_panel/pages/NewArrivals';
import AskLibrarian from './admin_panel/pages/AskLibrarian';
import withAuth from './WithAuth/WithAuth';
import LoginPage from './admin_panel/pages/LoginPage';
import Home from './user_panel/components/Home';
import Questions from './user_panel/components/Questions';
import Header from './user_panel/components/Header';
import Footer from './user_panel/components/Footer';
import AllNews from './user_panel/components/AllNews';
import NewsDetail from './user_panel/components/NewsDetail';
import BookDetail from './user_panel/components/BookDetail';
import RegisterPage from './admin_panel/pages/RegisterPage';
import Static_App from './static_pages/Static_App';
import './user_panel/styles/index.css';

const AdminLayout = () => (
  <Layout>
    <Outlet />
  </Layout>
);

const UserLayout = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
  </>
);

const ProtectedAdminLayout = withAuth(AdminLayout, ['admin']);

function App() {
  return (
    <Router>
      <Routes>

        {/* User Panel */}
        <Route path="/" element={<UserLayout />}>
          {Static_App()}
          
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route index element={<Home />} />
          <Route path="/questions" element={<Questions />} />
          <Route path="/news" element={<AllNews />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/book/:id" element={<BookDetail />} />
        </Route>

        {/* Admin Panel */}
        <Route path="/admin" element={<ProtectedAdminLayout />}>
          <Route index element={<Events />} />
          <Route path="news" element={<News />} />
          <Route path="new-arrivals" element={<NewArrivals />} />
          <Route path="ask-librarian" element={<AskLibrarian />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;

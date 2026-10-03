import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { MobileAdPopup } from './components/Sidebar';

// Pages
import Home from './pages/Home';
import Category from './pages/Category';
import Article from './pages/Article';
import Videos from './pages/Videos';
import News from './pages/News';
import SchoolTeam from './pages/SchoolTeam';
import Qabul2027 from './pages/Qabul2027';
import Qabul2026 from './pages/Qabul2026';
import EmptyPage from './pages/EmptyPage';
import Results from './pages/Results';
import AdminDashboard from './pages/admin/AdminDashboard';
import AboutSchool from './pages/AboutSchool';
import SchoolConstitution from './pages/SchoolConstitution';
import Statistics from './pages/Statistics';
import StudentPortfolio from './pages/StudentPortfolio';
import TeacherPortfolio from './pages/TeacherPortfolio';
import FmRadio from './pages/FmRadio';
import Contact from './pages/Contact';
import Olimpiadalar from './pages/Olimpiadalar';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const hideFooter = isAdmin;

  return (
    <div className="flex flex-col min-h-screen w-full max-w-[100vw] overflow-x-hidden">
      <ScrollToTop />
      {!isAdmin && <MobileAdPopup />}
      {!isAdmin && <Navbar />}
      <div className="flex-1 flex flex-col">
        <Routes>
          {/* Excluded Pages (Custom layouts without standard subpage hero banner) */}
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/premium" element={<Videos />} />
          <Route path="/videos" element={<Videos />} />

          {/* Qabul Section */}
          <Route path="/qabul-2026" element={<Qabul2026 />} />
          <Route path="/qabul-nizomi" element={<Qabul2027 />} />
          <Route path="/qabul" element={<Qabul2027 />} />

          {/* Biz haqimizda Section */}
          <Route path="/maktab-haqida" element={<AboutSchool />} />
          <Route path="/maktab-konstitutsiyasi" element={<SchoolConstitution />} />
          <Route path="/rahbariyat" element={<SchoolTeam category="Biz haqimizda" title="Rahbariyat" isRahbariyat={true} />} />
          <Route path="/oqituvchilar" element={<SchoolTeam category="Biz haqimizda" title="O'qituvchilar" isRahbariyat={false} />} />
          <Route path="/maktab-jamoasi" element={<SchoolTeam category="Biz haqimizda" title="Maktab jamoasi" isRahbariyat={false} />} />

          {/* Natijalar Section */}
          <Route path="/natijalar" element={<Results category="all" />} />
          <Route path="/natijalar/olimpiadalar" element={<Olimpiadalar />} />
          <Route path="/olimpiadalar" element={<Olimpiadalar />} />
          <Route path="/natijalar/ielts" element={<Results category="IELTS" />} />
          <Route path="/natijalar/sat" element={<Results category="SAT" />} />
          <Route path="/natijalar/a-level" element={<Results category="A-Level" />} />
          <Route path="/natijalar/as-level" element={<Results category="AS-Level" />} />
          <Route path="/category" element={<Results category="all" />} />
          <Route path="/article/:id" element={<Article />} />

          {/* Statistikalar Section */}
          <Route path="/statistika" element={<Statistics />} />
          <Route path="/oqituvchi-portfoliosi" element={<TeacherPortfolio />} />
          <Route path="/oquvchi-portfoliosi" element={<StudentPortfolio />} />
          <Route path="/fm-radio" element={<FmRadio />} />

          {/* Contact Page */}
          <Route path="/aloqa" element={<Contact />} />
          <Route path="/contact" element={<Contact />} />

          {/* Admin & Fallback */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<EmptyPage category="Bo'lim" title="Sahifa topilmadi" />} />
        </Routes>
      </div>
      {!hideFooter && <Footer />}
    </div>
  );
}

import { RadioProvider } from './context/RadioContext';

function App() {
  return (
    <RadioProvider>
      <Router>
        <AppContent />
      </Router>
    </RadioProvider>
  );
}

export default App;

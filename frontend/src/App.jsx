import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import '@fontsource/poppins'; // Mengimpor font Poppins
import Hero from './components/hero/Hero';
import Sidebar from './components/sidebar/Sidebar';
import Tools from './components/tools/Tools';
import Photo from './components/photo/Photo';
import Footer from './components/footer/Footer'; // Import komponen Footer
import Portfolio from './pages/Portfolio'; // Import komponen Portfolio
import Contact from './pages/Contact'; // Import komponen Contact

// Import ikon dari React Icons
import { FaBars, FaTimes } from 'react-icons/fa';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Fungsi untuk toggle (membuka/menutup) sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Gunakan useLocation untuk mendapatkan path saat ini
  const location = useLocation();

  return (
    <div className="App flex flex-col min-h-screen">
      {/* Tombol untuk membuka sidebar dengan ikon yang lebih modern */}
      <button
        onClick={toggleSidebar}
        className={`fixed top-4 left-4 bg-gray-700 text-white p-4 rounded-full shadow-lg z-50 transition-all duration-300 transform ${
          isSidebarOpen ? 'rotate-180 bg-red-500' : 'bg-gray-700 hover:bg-gray-600'
        }`}
      >
        {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Sidebar di kiri */}
      {isSidebarOpen && <Sidebar />}

      {/* Konten utama di kanan */}
      <div className={`flex-grow transition-all duration-300 ${isSidebarOpen ? 'ml-48' : 'ml-0'}`}>
        <Routes>
          <Route path="/" element={
            <>
              {/* Hero Section */}
              <Hero />

              {/* Tools Section */}
              <Tools />

              {/* Photo Section */}
              <Photo />
            </>
          } />
          <Route path="/portfolio" element={<Portfolio />} /> {/* Route untuk Portfolio */}
          <Route path="/contact" element={<Contact />} /> {/* Route untuk Contact */}
        </Routes>
        
        {/* Footer hanya muncul jika bukan di halaman portfolio dan contact */}
        {location.pathname !== '/portfolio' && location.pathname !== '/contact' && <Footer />}
      </div>
    </div>
  );
}

export default App;

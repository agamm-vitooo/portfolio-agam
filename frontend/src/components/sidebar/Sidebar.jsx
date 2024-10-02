import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import CV from '../../assets/file/CV.pdf';

// Impor Font Poppins
import '@fontsource/poppins'; // Mengimpor font Poppins

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true); // State untuk melacak apakah sidebar terbuka
  const [timer, setTimer] = useState(null);   // State untuk mengelola timer

  // Fungsi untuk membuka sidebar
  const openSidebar = () => {
    setIsOpen(true);
    resetTimer();
  };

  // Fungsi untuk menutup sidebar
  const closeSidebar = () => {
    setIsOpen(false);
  };

  // Fungsi untuk mereset timer ketika ada aktivitas
  const resetTimer = () => {
    if (timer) clearTimeout(timer); // Hapus timer sebelumnya jika ada
    setTimer(setTimeout(closeSidebar, 5000)); // Atur timer untuk menutup sidebar setelah 5 detik
  };

  // Event listener untuk aktivitas
  useEffect(() => {
    const handleActivity = () => {
      openSidebar(); // Buka sidebar saat ada aktivitas
    };

    // Tambahkan event listener untuk mendeteksi klik atau pergerakan mouse
    window.addEventListener('click', handleActivity);
    window.addEventListener('mousemove', handleActivity);

    // Bersihkan event listener saat komponen dilepas
    return () => {
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('mousemove', handleActivity);
    };
  }, [timer]); // Gunakan `timer` sebagai dependency

  return (
    <div
      className={`h-screen w-48 bg-gray-100 flex flex-col justify-center items-center space-y-6 fixed top-0 left-0 transition-transform duration-300 ease-in-out font-poppins ${
        isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
      }`}
      style={{ fontFamily: 'Poppins, sans-serif' }} // Terapkan font Poppins
    >
      <Link to="/" className="text-black text-lg">Home</Link>
      <Link to="/portfolio" className="text-black text-lg">Portfolio</Link>
      <Link to="/contact" className="text-black text-lg">Contact</Link>

      {/* Social Media Icons */}
      <div className="flex space-x-4">
        <a href="https://github.com/agamm-vitooo" target="_blank" rel="noopener noreferrer">
          <FaGithub size={24} className="text-black hover:text-gray-400" />
        </a>
        <a href="https://www.linkedin.com/in/agam-vito-7b4982205/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin size={24} className="text-black hover:text-gray-400" />
        </a>
        <a href="https://www.instagram.com/agamm.i/" target="_blank" rel="noopener noreferrer">
          <FaInstagram size={24} className="text-black hover:text-gray-400" />
        </a>
      </div>

      {/* Download CV Button */}
      <a
        href={CV}
        download
        className="bg-white text-black py-2 px-4 rounded"
      >
        Download CV
      </a>
    </div>
  );
};

export default Sidebar;

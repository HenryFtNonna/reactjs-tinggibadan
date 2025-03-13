import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Info from './components/Info';
import History from './components/History'; // Tambahkan impor untuk komponen History
import Preloader from "./components/preloader";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // Preloader akan hilang setelah 2.5 detik

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Preloader />; // Tampilkan Preloader sebelum aplikasi utama muncul
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Info />} />
        <Route path="/history-data" element={<History />} />
      </Routes>
    </Router>
  );
};

export default App;

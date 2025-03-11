import React, { useState, useEffect } from "react";
import Info from './components/Info'
import Preloader from './components/preloader'

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // Preloader akan hilang setelah 2.5 detik

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading && <Preloader />}
      <Info />
    </>
  );
};

export default App;
import React, { useState, useEffect } from "react";
import NavBar from '../components/Navbar.js';
import Footer from '../components/Footer.js';
import Splash from "../components/Splash.js";

function Home() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Oculta el splash después de 5 segundos
    const timeout = setTimeout(() => {
      setShowSplash(false);
    }, 5000);

    // Limpia el temporizador al desmontar el componente
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div>
      {showSplash ? (
        <Splash />
      ) : (
        <>
          <NavBar />
          <div>HOME</div>
          <Footer />
        </>
      )}
    </div>
  );
}

export default Home;

import React, { useState, useEffect } from "react";
import NavBar from '../components/Navbar.js';
import Footer from '../components/Footer.js';
import Lottie from "lottie-react";
import animationData from '../components/animations/fish.json'; // Reemplaza con la ruta correcta de tu animación

function Splash() {
  const [isAnimationVisible, setIsAnimationVisible] = useState(true);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  // Limita la duración de la animación a 5 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimationVisible(false);
    }, 5000); // 10000ms = 10s

    return () => clearTimeout(timer); // Limpia el temporizador si el componente se desmonta
  }, []);

  return (
    <div>
      {isAnimationVisible && (
        <Lottie animationData={animationData} options={{ ...defaultOptions, width: 200, height: 200, speed: 0.5 }} />
      )}
    </div>
  );
}

export default Splash;
import React from "react";
import NavBar from '../components/Navbar.js';
import Footer from '../components/Footer.js';
import Lottie from "lottie-react";
import animationData from '../components/animations/fishing.json'; // Reemplaza con la ruta correcta de tu animación

function Splash() {

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div>
        <div>
            <NavBar />
            <h1>Oops parece que no hay nada por acá</h1>
            <div>
                <Lottie animationData={animationData} options={{ ...defaultOptions, width: 200, height: 200, speed: 0.5 }} />
            </div>
            <Footer />
        </div>

    </div>
  );
}

export default Splash;
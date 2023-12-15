import React from "react";
import NavBar from '../components/Navbar.js';
import Footer from '../components/Footer.js';
import Lottie from "lottie-react";
import animationData from '../components/animations/fishing.json'; // Reemplaza con la ruta correcta de tu animación

function NoInfo() {

  return (
    
    <div style={{ position: 'relative', height: '100vh' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', fontFamily: 'Montserrat', width:'40%' }}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" />
        <h1 style={{ marginBottom: '30px',  fontFamily: 'Poppins', fontWeight: 'bolder'}}>Oops! No hay nada que mostrar por aquí</h1>
        <Lottie animationData={animationData}/>
      </div>
    </div>
  );
}

export default NoInfo;

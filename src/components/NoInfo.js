// NoInfo.js
import React from "react";
import Lottie from "lottie-react";
import animationData from '../components/animations/fishing.json';

function NoInfo() {
  return (
    <div style={{ position: 'relative', height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', fontFamily: 'Montserrat', width: '80%' }}>
        <h1 style={{  marginBottom: '30px',  fontFamily: 'Poppins', fontWeight: 'bolder' }}>Oops! No hay nada que mostrar por aquí</h1>
        <Lottie animationData={animationData}/>
      </div>
    </div>
  );
}

export default NoInfo;

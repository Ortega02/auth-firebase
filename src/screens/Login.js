import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import firebaseApp from '../firebase/credenciales';
import '../styles/Login.css';

// Manejo de credenciales
const auth = getAuth(firebaseApp);

function Login() {
  const [isLogin, setIsLogin] = useState(false);

  // Manejo de evento de inicio de sesión
  function submitHandler(event) {
    event.preventDefault();
    setIsLogin(true);

    // Almacenando valores
    const correo = event.target.correo.value;
    const contra = event.target.contra.value;

    signInWithEmailAndPassword(auth, correo, contra);
  }

  return (
    <div className="login-container">
      <div className="login-title">!Bienvenido!</div>
      <div className="login-subtitle">Inicia Sesión para continuar</div>
      <form onSubmit={submitHandler} className="login-form">
        <label htmlFor="email">Correo</label>
        <input type="email" id="correo" />
        <label htmlFor="password">Contra</label>
        <input type="password" id="contra" />
        <div className="button-container">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;

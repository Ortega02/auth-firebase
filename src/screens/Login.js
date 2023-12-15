import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import firebaseApp from '../firebase/credenciales';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';
import '../styles/Login.css';

const auth = getAuth(firebaseApp);

function Login() {
  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();
    setIsLogin(true);

    const correo = event.target.correo.value;
    const contra = event.target.contra.value;

    try {
      await signInWithEmailAndPassword(auth, correo, contra);
      // Si el inicio de sesión es exitoso, redirige al componente Home
      navigate('/');
    } catch (error) {
      setError('Correo o contraseña incorrectos. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={submitHandler} className="login-form">
        <div className="login-title">¡Bienvenido!</div>
        <div className="login-subtitle">Inicia Sesión para continuar</div>
        <div className="input-container">
          <label htmlFor="correo">
            <FontAwesomeIcon icon={faEnvelope} />
          </label>
          <input type="email" id="correo" placeholder="Correo" />
        </div>
        <div className="input-container">
          <label htmlFor="contra">
            <FontAwesomeIcon icon={faKey} />
          </label>
          <input type="password" id="contra" placeholder="Contraseña" />
        </div>
        {error && <div className="error-message">{error}</div>}
        <div className="button-container">
          <button type="submit">Iniciar Sesión</button>
        </div>
      </form>
      <div className="waves">
        <div className="wave" id='wave1'></div>
        <div className="wave" id='wave2'></div>
        <div className="wave" id='wave3'></div>
        <div className="wave" id='wave4'></div>
      </div>
    </div>
  );
}

export default Login;

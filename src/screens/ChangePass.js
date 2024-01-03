import React from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { getAuth } from "firebase/auth"; // Asegúrate de importar getAuth
import firebaseApp from "../firebase/credenciales";
import { useNavigate } from "react-router-dom";
import "../styles/ChangePass.css";

function ChangePass() {
    const history = useNavigate();
    const auth = getAuth(firebaseApp);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const emailVal = e.target.email.value;
  
      sendPasswordResetEmail(auth, emailVal)
        .then(() => {
          alert("Check your email");
          history("/login");
        })
        .catch((err) => {
          alert(err.code);
        });
    };
  
    return (
      <div className="container">
        <h1>Recuperar contraseña</h1>
        <p>Se te enviará un correo que te permitirá cambiar tu contraseña</p>
        <div className="box">
        <h2>Ingresa tu correo electrónico</h2>
          <form onSubmit={(e) => handleSubmit(e)}>
            <input name="email" />
            <br />
            <br />
            <button type="submit">Enviar correo</button>
          </form>
        </div>
      </div>
    );
  }
export default ChangePass;

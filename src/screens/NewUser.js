import React, { useState } from "react";
import firebaseApp from "../firebase/credenciales";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { getDatabase, ref, set, get } from "firebase/database";
import Modal from "react-modal";

const auth = getAuth(firebaseApp);

Modal.setAppElement("#root");

function Registro() {
  const database = getDatabase(firebaseApp);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function registrarUsuario(email, password, rol, nombre, apellido) {
    try {
      // Verificar si el correo ya existe
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
  
      if (signInMethods.length > 0) {
        // El correo ya está en uso, mostrar mensaje de error
        setErrorMessage("Ya existe un usuario con ese correo.");
        return;
      }
  
      // Registrar usuario si el correo no está en uso
      const infoUsuario = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
  
      // Almacenar información en Realtime Database, incluyendo la contraseña
      const dbRef = ref(database, `usuarios/${infoUsuario.user.uid}`);
      await set(dbRef, { correo: email, rol: rol, nombre, apellido, contraseña: password });
  
      // Mostrar modal de registro exitoso
      setModalIsOpen(true);
    } catch (error) {
      console.error("Error al registrar usuario:", error.message);
      setErrorMessage("Error al registrar usuario. Inténtalo nuevamente.");
    }
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  function submitHandler(e) {
    e.preventDefault();

    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const rol = "usuario"; // Establece el rol como "usuario" por defecto
    const nombre = e.target.elements.nombre.value;
    const apellido = e.target.elements.apellido.value;

    // Limpiar mensajes de error anteriores
    setErrorMessage("");

    // Registrar usuario y manejar validaciones y modal
    registrarUsuario(email, password, rol, nombre, apellido);
  }

  return (
    <div>
      <h1 style={{ color: "blue" }}>Regístrate</h1>

      <form onSubmit={submitHandler}>
        <label>
          Nombre:
          <input type="text" id="nombre" required />
        </label>

        <label>
          Apellido:
          <input type="text" id="apellido" required />
        </label>

        <label>
          Correo electrónico:
          <input type="email" id="email" required />
        </label>

        <label>
          Contraseña:
          <input type="password" id="password" required />
        </label>

        <input type="hidden" id="rol" value="usuario" />

        <input type="submit" value="Registrar" />
      </form>

      {errorMessage && (
        <div style={{ color: "red", marginTop: "10px" }}>{errorMessage}</div>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Registro Exitoso"
      >
        <h2 style={{ color: "blue" }}>Registro Exitoso</h2>
        <p>Tu cuenta ha sido registrada con éxito.</p>
        <button onClick={() => (window.location.href = "/login")}>
          Ir a Iniciar Sesión
        </button>
      </Modal>
    </div>
  );
}

export default Registro;

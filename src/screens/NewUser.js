import React, { useState } from "react";
import firebaseApp from "../firebase/credenciales";
import {
  getAuth,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationCircle,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import "animate.css/animate.min.css";
import "sweetalert2/dist/sweetalert2.min.css";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/NewUser.css";


const auth = getAuth(firebaseApp);

function showErrorAlert(errorMessage) {
  Swal.fire({
    title: "Error",
    html: `<div><FontAwesomeIcon icon={faExclamationCircle} size="2x" color="red" /></div><div>${errorMessage}</div>`,
    confirmButtonText: "Aceptar",
    showCancelButton: false,
    showCloseButton: true,
    customClass: {
      popup: "error-popup-class",
      title: "error-title-class",
      htmlContainer: "error-html-container-class",
    },
  });
}

function Registro() {
  const database = getDatabase(firebaseApp);
  const [errorMessages, setErrorMessages] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);

  const MySwal = Swal.mixin({
    showClass: {
      popup: "animate__animated animate__fadeInDown",
    },
    hideClass: {
      popup: "animate__animated animate__fadeOutUp",
    },
  });

  function handlePasswordVisibility() {
    setPasswordVisible((prevVisible) => !prevVisible);
  }

  async function registrarUsuario(email, password, rol, nombre, apellido) {
    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);

      if (signInMethods.length > 0) {
        setErrorMessages((prevErrors) => ({
          ...prevErrors,
          email: "Ya existe un usuario con ese correo.",
        }));
        showErrorAlert(errorMessages.email);
        return;
      }

      const infoUsuario = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const dbRef = ref(database, `usuarios/${infoUsuario.user.uid}`);
      await set(dbRef, {
        correo: email,
        rol: rol,
        nombre,
        apellido,
        contraseña: password,
      });

      // Trigger SweetAlert for successful registration
      MySwal.fire({
        title: "Registro Exitoso",
        icon: "success",
        showCancelButton: false,
        confirmButtonText: "Regresar",
      }).then(() => {
        // Redirect to /usuarios
        window.location.href = "/usuarios";
      });
    } catch (error) {
      console.error("Error al registrar usuario:", error.message);
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        email: "Error al registrar usuario. Inténtalo nuevamente.",
      }));
      showErrorAlert(errorMessages.email);
    }
  }

  function submitHandler(e) {
    e.preventDefault();

    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const rol = "usuario"; // Establece el rol como "usuario" por defecto
    const nombre = e.target.elements.nombre.value;
    const apellido = e.target.elements.apellido.value;

    // Validación de nombre y apellidos sin números
    const nameRegex = /^[a-zA-Z]+$/;
    if (!nameRegex.test(nombre)) {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        nombre: "Nombre no debe contener números.",
      }));
    } else {
      setErrorMessages((prevErrors) => ({ ...prevErrors, nombre: "" }));
    }

    if (!nameRegex.test(apellido)) {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        apellido: "Apellido no debe contener números.",
      }));
    } else {
      setErrorMessages((prevErrors) => ({ ...prevErrors, apellido: "" }));
    }

    // Validación de correo electrónico y contraseña
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{"':;?/>.<,])(?!.*\s).{8,}$/;

    if (!emailRegex.test(email)) {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        email: "Correo electrónico no válido.",
      }));
    } else {
      setErrorMessages((prevErrors) => ({ ...prevErrors, email: "" }));
    }

    if (!passwordRegex.test(password)) {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        password:
          "La contraseña debe contener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y caracteres especiales.",
      }));
    } else {
      setErrorMessages((prevErrors) => ({ ...prevErrors, password: "" }));
    }

    // If there are no errors, proceed with user registration
    if (
      !errorMessages.nombre &&
      !errorMessages.apellido &&
      !errorMessages.email &&
      !errorMessages.password
    ) {
      // Limpiar mensajes de error anteriores
      setErrorMessages({
        nombre: "",
        apellido: "",
        email: "",
        password: "",
      });

      // Registrar usuario y manejar validaciones y modal
      registrarUsuario(email, password, rol, nombre, apellido);
    }
  }

  return (
    <div>
      <NavBar />
      <h1 style={{ color: "blue" }}>Regístrar usuario</h1>
      <form onSubmit={submitHandler}>
        <label>
          Nombre:
          <input
            type="text"
            id="nombre"
            required
          />
          {errorMessages.nombre && (
            <div className="error-alert">{errorMessages.nombre}</div>
          )}
        </label>

        <label>
          Apellido:
          <input
            type="text"
            id="apellido"
            required
          />
          {errorMessages.apellido && (
            <div className="error-alert">{errorMessages.apellido}</div>
          )}
        </label>

        <label>
          Correo electrónico:
          <input
            type="email"
            id="email"
            required
          />
          {errorMessages.email && (
            <div className="error-alert">{errorMessages.email}</div>
          )}
        </label>

        <label>
          Contraseña:
          <div style={{ position: "relative" }}>
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              required
            />
            <FontAwesomeIcon
              icon={passwordVisible ? faEyeSlash : faEye}
              className="eye-icon fa-lg"
              onClick={handlePasswordVisibility}
            />
          </div>
          {errorMessages.password && (
            <div className="error-alert">{errorMessages.password}</div>
          )}
        </label>

        <input type="submit" value="Registrar" />
      </form>
      <Footer />
    </div>
  );
}

export default Registro;

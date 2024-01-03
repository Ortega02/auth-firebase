import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import firebaseApp from "../firebase/credenciales";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, get } from "firebase/database";
import Sidebar from "react-sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faChartLine,
  faFile,
  faUser,
  faArrowRightFromBracket,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/Layouts.css";

const auth = getAuth(firebaseApp);

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [userInSession, setUserInSession] = useState(null);
  const [showAddUserOption, setShowAddUserOption] = useState(false);

  const onSetSidebarOpen = (open) => {
    setSidebarOpen(open);
  };

  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate("/login");
    });
  };

  useEffect(() => {
    // Obtener información del usuario en sesión
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserInSession(user);
    });

    // Limpiar suscripciones al desmontar el componente
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    renderAddUserOption();
  }, [userInSession]);

  const renderAddUserOption = async () => {
    if (userInSession) {
      const database = getDatabase(firebaseApp);
      const userRef = ref(database, `usuarios/${userInSession.uid}`);

      try {
        const snapshot = await get(userRef);
        const userExists = snapshot.exists();

        // Actualizar el estado en lugar de retornar directamente
        setShowAddUserOption(!userExists);
      } catch (error) {
        console.error(
          "Error al verificar usuario en la base de datos:",
          error.message
        );
        // En caso de error, podrías manejarlo aquí
      }
    }
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-left">SISTEMA DE MONITOREO</div>
        <button
          className="sidebar-button"
          onClick={() => onSetSidebarOpen(true)}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      </nav>
      <Sidebar
        sidebar={
          <div className="sidebar">
            <h2>Menú</h2>
            <ul>
              <li className={activeLink === "/" ? "active" : ""}>
                <FontAwesomeIcon icon={faHome} className="icons" />
                <Link to="/">Home</Link>
              </li>
              <li
                className={activeLink === "/graficas-diarias" ? "active" : ""}
              >
                <FontAwesomeIcon icon={faChartLine} className="icons" />
                <Link to="/graficas-diarias">Gráficas diarias</Link>
              </li>
              <li
                className={activeLink === "/graficas-mensuales" ? "active" : ""}
              >
                <FontAwesomeIcon icon={faChartLine} className="icons" />
                <Link to="/graficas-mensuales">Gráficas mensuales</Link>
              </li>
              <li
                className={activeLink === "/reportes-diarios" ? "active" : ""}
              >
                <FontAwesomeIcon icon={faFile} className="icons" />
                <Link to="/reportes-diarios">Reportes diarios</Link>
              </li>
              <li
                className={activeLink === "/reportes-mensuales" ? "active" : ""}
              >
                <FontAwesomeIcon icon={faFile} className="icons" />
                <Link to="/reportes-mensuales">Reportes mensuales</Link>
              </li>
              {showAddUserOption && (
                <li className={activeLink === "/agregar-usuario" ? "active" : ""}>
                  <FontAwesomeIcon icon={faUser} className="icons" />
                  <Link to="/agregar-usuario">Agregar usuario</Link>
                </li>
              )}
              <li>
                <FontAwesomeIcon
                  icon={faArrowRightFromBracket}
                  className="icons"
                />
                <button className="button" onClick={handleSignOut}>
                  Cerrar sesión
                </button>
              </li>
            </ul>
          </div>
        }
        open={sidebarOpen}
        onSetOpen={onSetSidebarOpen}
        pullRight={true}
        styles={{ sidebar: { background: "white", width: "250px" } }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "10px",
          }}
        >
          <button onClick={() => onSetSidebarOpen(false)}>
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </Sidebar>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
};

export default NavBar;

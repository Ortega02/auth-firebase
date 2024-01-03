import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import firebaseApp from "../firebase/credenciales";
import Sidebar from "react-sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faChartLine,
  faFile,
  faUser,
  faArrowRightFromBracket,
  faHome
} from "@fortawesome/free-solid-svg-icons";
import "../styles/Layouts.css";

const auth = getAuth(firebaseApp);

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  const onSetSidebarOpen = (open) => {
    setSidebarOpen(open);
  };

  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Después de cerrar sesión, redirige al usuario a la pantalla de inicio de sesión
      navigate("/login");
    });
  };

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

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
              <li className={activeLink === "/graficas-diarias" ? "active" : ""}>
                <FontAwesomeIcon icon={faChartLine} className="icons" />
                <Link to="/graficas-diarias">Gráficas diarias</Link>
              </li>
              <li className={activeLink === "/graficas-mensuales" ? "active" : ""}>
                <FontAwesomeIcon icon={faChartLine} className="icons" />
                <Link to="/graficas-mensuales">Gráficas mensuales</Link>
              </li>
              <li className={activeLink === "/reportes-diarios" ? "active" : ""}>
                <FontAwesomeIcon icon={faFile} className="icons" />
                <Link to="/reportes-diarios">Reportes diarios</Link>
              </li>
              <li className={activeLink === "/reportes-mensuales" ? "active" : ""}>
                <FontAwesomeIcon icon={faFile} className="icons" />
                <Link to="/reportes-mensuales">Reportes mensuales</Link>
              </li>
              <li className={activeLink === "/agregar-usuario" ? "active" : ""}>
                <FontAwesomeIcon icon={faUser} className="icons" />
                <Link to="/agregar-usuario">Agregar usuario</Link>
              </li>
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
        {/* Botón de cierre del Sidebar */}
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

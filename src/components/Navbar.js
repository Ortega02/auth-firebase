import React, { useState } from 'react';
import { getAuth, signOut } from "firebase/auth";
import firebaseApp from "../firebase/credenciales";
import Sidebar from "react-sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import '../styles/Layouts.css';

const auth = getAuth(firebaseApp);

const NavBar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const onSetSidebarOpen = (open) => {
    setSidebarOpen(open);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-left">SISTEMA DE MONITOREO</div>
        <button className="sidebar-button" onClick={() => onSetSidebarOpen(true)}>
          <FontAwesomeIcon icon={faBars} />
        </button>
      </nav>
      <Sidebar
        sidebar={
          <div className="sidebar">
            <h2>Menú</h2>
            <ul>
              <li>Gráficas diarias</li>
              <li>Gráficas mensuales</li>
              <li>Reportes diarios</li>
              <li>Reportes mensuales</li>
              <li>Agregar usuario</li>
              <li>
                <button onClick={() => signOut(auth)}>Cerrar sesión</button>
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
        <div style={{ display: "flex", justifyContent: "flex-end", padding: "10px"}}>
          <button onClick={() => onSetSidebarOpen(false)}>
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </Sidebar>
    </div>
  );
};

export default NavBar;

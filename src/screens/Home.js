import React, { useState } from "react";
import Sidebar from "react-sidebar";
import { getAuth, signOut } from "firebase/auth";
import firebaseApp from "../firebase/credenciales";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const auth = getAuth(firebaseApp);

function Home() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const onSetSidebarOpen = (open) => {
    setSidebarOpen(open);
  };

  return (
    <div>
      <div>Home</div>

      <Sidebar
        sidebar={
          <div>
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
        pullRight={true} // Agrega esta línea para desplegar la barra lateral a la derecha
        styles={{ sidebar: { background: "white", width: "250px" } }}
      >
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button onClick={() => onSetSidebarOpen(true)}>
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </Sidebar>
    </div>
  );
}

export default Home;
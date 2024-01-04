import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/Navbar.js";
import Footer from "../components/Footer.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, get } from "firebase/database";
import firebaseApp from "../firebase/credenciales";
import Button from "../components/Button.js";
import { obtenerEstanques, agregarEstanque } from "../firebase/Dashboard.js";
import { testConnection } from "../firebase/credenciales.js";
import EstanquesCard from "../components/EstanquesCard.js";
import "../styles/Dashboard.css";
import "../styles/DashboardCards.css";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "react-modal";
import {
  faPen,
  faMapLocationDot,
  faFish,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import CustomInput from "../components/LoginInput.js";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import NoInfo from "../components/NoInfo.js";

const auth = getAuth(firebaseApp);

function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [estanques, setEstanques] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [Nombre, setNombre] = useState("");
  const [Ubicacion, setUbicacion] = useState("");
  const [Imagen, setImagen] = useState("");
  const [showAddCardOption, setShowAddCardOption] = useState(false);

  const AddClick = () => {
    console.log("agregando");
    setShowEditModal(true);
  };

  // Agregar
  const handleSubmit = async (event) => {
    event.preventDefault();

    const nuevoEstanque = {
      nombre: Nombre,
      ubicacion: Ubicacion,
      img: Imagen,
    };

    try {
      await agregarEstanque(nuevoEstanque);
      setNombre("");
      setUbicacion("");
      setImagen("");
      setShowEditModal(false);
      confirmAlert({
        title: "Inserción Exitosa",
        message: "Estanque agregado exitosamente",
        buttons: [
          {
            label: "Aceptar",
            onClick: () => {
              window.location.reload();
            },
          },
        ],
      });
    } catch (error) {
      console.error("Error al agregar estanque:", error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await obtenerEstanques();
        setEstanques(data);
      } catch (error) {
        console.error("Error al obtener estanques:", error.message);
      }
    };

    fetchData();
    testConnection();
  }, []);

  useEffect(() => {
    const checkUserInDatabase = async () => {
      if (user) {
        const database = getDatabase(firebaseApp);
        const userRef = ref(database, `usuarios/${user.uid}`);

        try {
          const snapshot = await get(userRef);
          const userExists = snapshot.exists();

          setShowAddCardOption(!userExists);
        } catch (error) {
          console.error(
            "Error al verificar usuario en la base de datos:",
            error.message
          );
        }
      }
    };

    checkUserInDatabase();
  }, [user]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);

      if (!user) {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  if (!user) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <NavBar />

      <div>
        <Modal
          className="custom-modal"
          isOpen={showEditModal}
          onRequestClose={() => setShowEditModal(false)}
          contentLabel="Agregar Estanque"
        >
          <h2>Agregando Estanque</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Imagen:
              <CustomInput
                iconname={faImage}
                type="text"
                value={Imagen}
                onChange={(e) => setImagen(e.target.value)}
              />
            </label>
            <label>
              Nombre:
              <CustomInput
                iconname={faFish}
                type="text"
                value={Nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </label>
            <label>
              Ubicación:
              <CustomInput
                iconname={faMapLocationDot}
                type="text"
                value={Ubicacion}
                onChange={(e) => setUbicacion(e.target.value)}
              />
            </label>
            <Button
              buttonStyles="login-button"
              type="submit"
              text="Agregar"
              iconname={faPen}
            ></Button>
          </form>
        </Modal>

        <div className="estanques-container">
      {estanques.length > 0 ? (
        estanques.map((estanque) => (
          <EstanquesCard
            key={estanque.id}
            id={estanque.id}
            nombre={estanque.nombre}
            ubicacion={estanque.ubicacion}
            imagen={estanque.imagen}
          />
        ))
      ) : (
        <NoInfo />
      )}
    </div>
        {showAddCardOption && (
          <Button
            buttonStyles="add-button"
            onPress={AddClick}
            iconname={faPlus}
          />
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Home;

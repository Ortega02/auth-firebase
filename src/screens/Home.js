import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from '../components/Navbar.js';
import Footer from '../components/Footer.js';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import firebaseApp from '../firebase/credenciales';
import Button from '../components/Button.js';
import { obtenerEstanques, agregarEstanque } from '../firebase/Dashboard.js';
import { testConnection } from '../firebase/credenciales.js';
import EstanquesCard from '../components/EstanquesCard.js';
import '../styles/Dashboard.css';
import '../styles/DashboardCards.css';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from 'react-modal';
import { faPen, faMapLocationDot, faFish, faImage } from '@fortawesome/free-solid-svg-icons';
import CustomInput from '../components/LoginInput.js';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const auth = getAuth(firebaseApp);

function Home() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [estanques, setEstanques] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [Nombre, setNombre] = useState('');
    const [Ubicacion, setUbicacion] = useState('');
    const [Imagen, setImagen] = useState('');

    const AddClick = () => {
        console.log('agregando');
        setShowEditModal(true);
    }

    //agregar
    const handleSubmit = async (event) => {
        event.preventDefault();

        const nuevoEstanque = {
            nombre: Nombre,
            ubicacion: Ubicacion,
            img: Imagen,

        };

        try {
            await agregarEstanque(nuevoEstanque);
            setNombre('');
            setUbicacion('');
            setImagen('');
            setShowEditModal(false);
            confirmAlert({
                title: 'Inserción Exitosa',
                message: 'Estanque agregado exitosamente',
                buttons: [
                    {
                        label: 'Aceptar',
                        onClick: () => { window.location.reload(); }

                    }
                ]
            });
        } catch (error) {
            // Manejo de errores
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await obtenerEstanques();
                setEstanques(data);
            } catch (error) {
                // Manejo de errores
            }
        };

        fetchData();
        testConnection();
    }, []);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            // El callback se ejecuta cada vez que cambia el estado de la autenticación
            setUser(user);

            // Si no hay un usuario en sesión, redirigir a la página de login
            if (!user) {
                navigate('/login');
            }
        });

        // Devolver una función de limpieza para detener la escucha cuando el componente se desmonta
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
                            <Button buttonStyles='login-button' type="submit" text="Agregar" iconname={faPen}></Button>
                        </form>
                    </Modal>

                    <div className="estanques-container">
                        {estanques.map((estanque) => (
                            <EstanquesCard
                                key={estanque.id}
                                id={estanque.id}
                                nombre={estanque.nombre}
                                ubicacion={estanque.ubicacion}
                                // ph={estanque.ph}
                                // oxigeno={estanque.oxigeno}
                                imagen={estanque.imagen}

                            />
                        ))}

                    </div>
                    <Button buttonStyles="add-button" onPress={AddClick} iconname={faPlus} />

                </div>
                <Footer />
          
        </div>
    );
}

export default Home;

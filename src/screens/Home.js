import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from '../components/Navbar.js';
import Footer from '../components/Footer.js';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import firebaseApp from '../firebase/credenciales';

const auth = getAuth(firebaseApp);

function Home() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

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
            <>
                <NavBar />
                <div>HOME</div>
                <Footer />
            </>
        </div>
    );
}

export default Home;

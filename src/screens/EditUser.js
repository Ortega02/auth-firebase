import React, { useState, useEffect } from 'react';
import '../styles/Users.css';
import NavBar from '../components/Navbar.js';
import Footer from '../components/Footer.js';
import Button from '../components/Button';
import CustomInput from '../components/LoginInput.js';
import { faUser, faKey, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { getUserById, updateUser } from '../firebase/Users';
import Swal from 'sweetalert2';
import { useLocation, useNavigate, useParams } from 'react-router-dom';


const EditUser = () => {

    //traemos por ruta el id seleccionado del usuario
    const { userId } = useParams();
    const [repassword, setrepassword] = useState('');
    const [password, setpassword] = useState('');
    const [nombre, setnombre] = useState('');
    const navigate = useNavigate();

    const [userData, setUserData] = useState({});

    useEffect(() => {
        //traemos la informacion del usuario segun el id(getuserbyid)
        const fetchData = async () => {
            try {
                const user = await getUserById(userId); 
                setUserData(user); 
            } catch (error) {
                console.error('Error al obtener información del usuario:', error);
                
            }
        };

        fetchData();
    }, [userId]);

    //mensajes de error o de exito
    const showErrorAlert = (errorMessage) => {
        Swal.fire({
            title: 'Error',
            html: `<div><FontAwesomeIcon icon={faExclamationCircle} size="2x" color="red" /></div><div>${errorMessage}</div>`,
            confirmButtonText: 'Aceptar',
            showCancelButton: false,
            showCloseButton: true,
            customClass: {
                popup: 'error-popup-class',
                title: 'error-title-class',
                htmlContainer: 'error-html-container-class',
            },
        });
    };

    const showSuccessAlert = () => {
        Swal.fire({
            title: 'Éxito',
            text: 'Usuario editado correctamente',
            icon: 'success',
            confirmButtonText: 'Aceptar',
        }).then(() => {
            navigate('/userlist');
        });
    };

    //metodo para editar usuario, si es undefined no se edita y se conserva el valor anterior
    const edituser = async () => {
        try {
            const updatedUserData = {
                nombre: nombre || userData.nombre || '', 
                password: password || undefined,
                repeatPassword: repassword || undefined,
            };

            await updateUser(userId, updatedUserData);
            showSuccessAlert();
        } catch (error) {
            let errorMessage = '';
            if (error.message === 'Las contraseñas no coinciden') {
                errorMessage = 'Las contraseñas no coinciden';
            } else if (error.message.includes('contraseña debe tener al menos')) {
                errorMessage =
                    'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.';
            } else {
                errorMessage = 'Hubo un problema al editar el usuario';
            }

            showErrorAlert(errorMessage);
        }
    };

    const closeadd = () => {
        navigate('/lista-usuarios');
    }

    const handleNombreChange = (event) => {
        setnombre(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setpassword(event.target.value);
    };

    const handleRePasswordChange = (event) => {
        setrepassword(event.target.value);
    };
    return (
        <div >
            <NavBar />
            <div className="formContainer">
                <CustomInput
                    iconname={faUser}
                    type="text"
                    placeholder="Nombre Usuario"
                    value={nombre || userData.nombre || ''}
                    onChange={handleNombreChange}
                />
                <CustomInput
                    iconname={faKey}
                    type="text"
                    placeholder="***************"
                    value={password }
                    onChange={handlePasswordChange}
                />
                <CustomInput
                    iconname={faKey}
                    type="text"
                    placeholder="***************"
                    value={repassword}
                    onChange={handleRePasswordChange}
                />
                <div className="buttonContainer">
                    <Button buttonStyles='adduserbotton' text="Editar" onPress={edituser} />
                    <Button buttonStyles='adduserbotton' text="Cerrar" onPress={closeadd} />
                </div>
            </div>
            <Footer />
        </div>
    );
};
export default EditUser;
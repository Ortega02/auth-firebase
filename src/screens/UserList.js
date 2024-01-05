import React from 'react';
import UserList from '../components/UserList.js';
import '../styles/Users.css';
import Button from '../components/Button.js';
import NavBar from '../components/Navbar.js';
import Footer from '../components/Footer.js';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

//pantalla principal de la lista de usuarios, renderizamos el componente de userlist
const UserListScreen = () => {

  const navigate = useNavigate();

  const adduser = () => {
    console.log('Agregar Usuario');
    navigate('/agregar-usuario');
  }
  return (
    <div>
      <NavBar />
      <br />
      <br />
        <div className="userContainer">      
          <UserList />
          <br />
          <Button className="adduserbotton" text="Agregar Usuario" iconname={faUserPlus} onPress={adduser} />   
      </div>
      <Footer />
    </div>
  );
};

export default UserListScreen;
import React, { useState } from 'react';
import '../styles/DashboardCards.css';
import { faEdit, faTrash, faPen, faMapLocationDot, faFish } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { eliminarEstanque, editarEstanque } from '../firebase/Dashboard';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Modal from 'react-modal';
import CustomInput from '../components/LoginInput';
import Button from '../components/Button';

const EstanquesCard = ({ nombre, ubicacion, ph, oxigeno, imagen, id }) => {

  //modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedNombre, setEditedNombre] = useState(nombre);
  const [editedUbicacion, setEditedUbicacion] = useState(ubicacion);
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleEditClick = () => {
    console.log('Editar');
    setShowEditModal(true);
    setEditedNombre(nombre);
    setEditedUbicacion(ubicacion);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const editedData = {
      nombre: editedNombre,
      ubicacion: editedUbicacion,
    };
    handleSaveEdit(editedData);
  };

  const handleSaveEdit = async (editedData) => {
    try {
      await editarEstanque(id, editedData);
      console.log('Estanque editado');
      setShowEditModal(false);
      confirmAlert({
        title: 'Edición Exitosa',
        message: 'Estanque editado exitosamente',
        buttons: [
          {
            label: 'Aceptar',
            onClick: () => {window.location.reload();}
            
          }
        ]
      });
    } catch (error) {
      console.error('Error al editar el estanque:', error);
    }
  };

  const handleDeleteClick = () => {
    confirmAlert({
      title: 'Confirmación',
      message: '¿Seguro que quieres eliminar este estanque?',
      buttons: [
        {
          label: 'Sí',
          onClick: async () => {
            try {
              await eliminarEstanque(id);
              console.log('Pecera eliminada');
              window.location.reload();
            } catch (error) {
              console.error('Error al eliminar la pecera:', error);
            }
          }
        },
        {
          label: 'No',
          onClick: () => { }
        }
      ]
    });
  };

  return (
    <div className={`estanque-card ${modalOpen ? 'modal-open' : ''}`}>
      <Modal
        className="custom-modal"
        isOpen={showEditModal}
        onRequestClose={() => setShowEditModal(false)}
        contentLabel="Editar Estanque"
      >
        <h2>Editando Estanque</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Nombre:
            <CustomInput
              iconname={faFish}
              type="text"
              value={editedNombre}
              onChange={(e) => setEditedNombre(e.target.value)}
            />
          </label>
          <label>
            Ubicación:
            <CustomInput
              iconname={faMapLocationDot}
              type="text"
              value={editedUbicacion}
              onChange={(e) => setEditedUbicacion(e.target.value)}
            />
          </label>
          <Button buttonStyles='login-button' type="submit" text="Editar" iconname={faPen}></Button>
        </form>
      </Modal>
      <button className="delete-button" onClick={handleDeleteClick}>
        <FontAwesomeIcon icon={faTrash} />
      </button>
      <img src={imagen} alt={nombre} className="estanque-image" />
      <div className="estanque-info">
        <div className="nombre-section">
          <button className="edit-button" onClick={handleEditClick}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <h2>{nombre}</h2>
        </div>
        <div className="ubicacion-section">
          <button className="edit-button" onClick={handleEditClick}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <p>Ubicación: {ubicacion}</p>
        </div>
      </div>
    </div>
  );
};

export default EstanquesCard;

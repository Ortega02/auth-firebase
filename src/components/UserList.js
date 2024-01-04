import React, { useState, useEffect } from "react";
import { getUsers } from "../firebase/Users.js";
import NoInfo from "../components/NoInfo.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import "../styles/Users.css";
import { deleteUser } from "../firebase/Users.js";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  //cargamos los usuarios que existen en la bd
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getUsers();
        setUsers(usersData);
      } catch (error) {
        console.error("Error al obtener usuarios:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  //metodo para editar, lleva a la pantalla, pasando el id
  const handleEdit = (userId) => {
    const selectedUser = users.find((user) => user.id === userId);
    navigate(`/editar-usuario/${userId}`, {
      state: { userData: selectedUser },
    });
  };

  //metodo para eliminar usuario
  const handleDelete = (userId) => {
    Swal.fire({
      title: "¿Seguro que quieres eliminar este usuario?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteUser(userId);
          console.log("Usuario eliminado");
          Swal.fire(
            "Eliminado",
            "El usuario ha sido eliminado exitosamente",
            "success"
          ).then(() => {
            window.location.reload();
          });
        } catch (error) {
          console.error("Error al eliminar el usuario:", error);
          Swal.fire(
            "Error",
            "Hubo un problema al intentar eliminar el usuario",
            "error"
          );
        }
      }
    });
  };
  return (
    <div>
      {users.length === 0 ? (
        <div>
          <NoInfo />
        </div>
      ) : (
        <div>
          <h3>Lista de Usuarios</h3>
          <ul>
            {users.map((user) => (
              <div key={user.id}>
                {/* Mandamos el id en la ruta de editar usuario */}
                <Link
                  to={`/editar-usuario/${user.id}`}
                  state={{ userData: user }}
                ></Link>
                <input
                  className="user-list"
                  type="text"
                  defaultValue={user.nombre}
                  readOnly
                />
                <button
                  className="editButton"
                  onClick={() => handleEdit(user.id)}
                >
                  <FontAwesomeIcon icon={faPen} />
                </button>
                <button
                  className="deleteButton"
                  onClick={() => handleDelete(user.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserList;

import { getDatabase, ref, get, remove, update, push, set } from 'firebase/database';
import { db } from '../firebase/credenciales.js';
import bcrypt from 'bcryptjs';
import { SHA256 } from 'crypto-js';

const getUsers = async () => {
    try {
      const usersRef = ref(db, 'usuarios');
  
      const snapshot = await get(usersRef);
      if (!snapshot.exists()) {
        throw new Error('No se encontraron datos de usuarios');
      } else {
        const data = snapshot.val();
  
        const users = Object.keys(data).map(key => ({
          id: key,
          nombre: data[key].nombre,
          apellido: data[key].apellido,
          correo: data[key].correo,
        
        }));
  
        console.log(users);
        return users;
      }
    } catch (error) {
      console.error('Error al obtener datos de usuarios:', error);
      throw error;
    }
  };

  const addUser = async (nombre, password, repeatPassword) => {
    try {
      if (password !== repeatPassword) {
        throw new Error('Las contraseñas no coinciden');
      }
  
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{"':;?/>.<,])(?!.*\s).{8,}$/;
      if (!passwordRegex.test(password)) {
        throw new Error(
          'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.'
        );
      }
  
      const hashedPassword = SHA256(password).toString();
  
      await push(ref(db, 'users'), {
        nombre,
        contrasena: hashedPassword,
      });
  
      console.log('Usuario agregado correctamente');
    } catch (error) {
      console.error('Error al agregar usuario:', error);
      throw error;
    }
  };

  const deleteUser = async (userId) => {
    try {
      await remove(ref(db, `users/${userId}`));
      console.log('Usuario eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      throw error;
    }
  };

  const updateUser = async (userId, { nombre, password, repeatPassword }) => {
    try {
      const userDataToUpdate = {};
  
      if (nombre !== undefined) {
        userDataToUpdate.nombre = nombre;
      }
  
      if (password !== undefined && repeatPassword !== undefined) {
        if (password !== repeatPassword) {
          throw new Error('Las contraseñas no coinciden');
        }
  
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{"':;?/>.<,])(?!.*\s).{8,}$/;
        if (!passwordRegex.test(password)) {
          throw new Error(
            'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.'
          );
        }
  
        const hashedPassword = SHA256(password).toString();
        userDataToUpdate.contrasena = hashedPassword;
      }
  
      if (Object.keys(userDataToUpdate).length > 0) {
        await update(ref(db, `users/${userId}`), userDataToUpdate);
        console.log('Usuario actualizado correctamente');
      } else {
        throw new Error('No se proporcionaron datos válidos para actualizar');
      }
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      throw error;
    }
  };
  
  
  
  const getUserById = async (userId) => {
    try {
      const userRef = ref(db, `users/${userId}`);
      const snapshot = await get(userRef);
      
      if (snapshot.exists()) {
        const userData = snapshot.val();
        // Supongamos que tu campo de contraseña se llama 'password' en los datos del usuario
        if (userData && userData.contrasena) {
          userData.contrasena = '*'.repeat(userData.contrasena.length); // Enmascarar la contraseña
        }
        return userData;
      } else {
        throw new Error('El usuario no existe');
      }
    } catch (error) {
      console.error('Error al obtener información del usuario:', error);
      throw error;
    }
  };
  

  export { getUsers, addUser, deleteUser, updateUser, getUserById };
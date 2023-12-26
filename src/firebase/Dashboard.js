import { getDatabase, ref, get, remove, update, push, set } from 'firebase/database';
import { db } from '../firebase/credenciales'; 

const obtenerEstanques = async () => {
  try {
    const databaseRef = ref(db, 'pecera'); 

    const snapshot = await get(databaseRef);
    if (!snapshot.exists()) {
      throw new Error('No se encontraron datos');
    } else {
      const data = snapshot.val();

      const estanques = Object.keys(data).map(key => ({
        id: key, 
        nombre: data[key].nombre,
        ubicacion: data[key].ubicacion,
        // ... 
        imagen: data[key].img
      }));

      console.log(estanques);
      return estanques;
    }
  } catch (error) {
    console.error('Error al obtener datos:', error);
    throw error;
  }
};


const eliminarEstanque = async (idEstanque) => {
  try {
    const estanqueRef = ref(db, `pecera/${idEstanque}`);
    await remove(estanqueRef);
    console.log('Estanque eliminado correctamente');
  } catch (error) {
    console.error('Error al eliminar el estanque:', error);
    throw error;
  }
};

const editarEstanque = async (idEstanque, newData) => {
  try {
    const estanqueRef = ref(db, `pecera/${idEstanque}`);
    await update(estanqueRef, newData);
    console.log('Estanque editado correctamente');
  } catch (error) {
    console.error('Error al editar el estanque:', error);
    throw error;
  }
};

const agregarEstanque = async (nuevoEstanque) => {
  try {
    const estanquesRef = ref(db, 'pecera');
    const newEstanqueRef = push(estanquesRef); 

    await set(newEstanqueRef, nuevoEstanque); 
    console.log('Estanque agregado correctamente');
  } catch (error) {
    console.error('Error al agregar el estanque:', error);
    throw error;
  }
};

export { obtenerEstanques, eliminarEstanque, editarEstanque, agregarEstanque };

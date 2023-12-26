// Importamos la función para inicializar la aplicación de Firebase
import { initializeApp } from "firebase/app";
import { getAnalytics } from 'firebase/analytics';
import { getDatabase, ref, get } from 'firebase/database';
import { getAuth } from "firebase/auth";

// Añade aquí tus credenciales
const firebaseConfig = {
  apiKey: "AIzaSyAqdYoY2iOHfTlH3A-Sy7uAQ1XYRp-z9w8",
  authDomain: "pruebaauth-fb96f.firebaseapp.com",
  projectId: "pruebaauth-fb96f",
  storageBucket: "pruebaauth-fb96f.appspot.com",
  messagingSenderId: "124018443153",
  appId: "1:124018443153:web:4d9e5b0e071fd860db1030",
  measurementId: "G-8BRNPX629M"
};

// Inicializamos la aplicación y la guardamos en firebaseApp
const firebaseApp = initializeApp(firebaseConfig);

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);
const auth = getAuth(app);

const testConnection = async () => {
  try {
    const databaseRef = ref(db);
    const snapshot = await get(databaseRef);
    if (snapshot.exists()) {
      console.log('¡Conexión exitosa!');
    } else {
      throw new Error('No se pudo conectar con la base de datos');
    }
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
  }
};

export { db, analytics, testConnection, auth  };
// Exportamos firebaseApp para poder utilizarla en cualquier lugar de la aplicación
export default firebaseApp;

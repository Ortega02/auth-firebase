// Importamos la función para inicializar la aplicación de Firebase
import { initializeApp } from "firebase/app";

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
// Exportamos firebaseApp para poder utilizarla en cualquier lugar de la aplicación
export default firebaseApp;

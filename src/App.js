import React, {useState} from 'react';
import {getAuth, onAuthStateChanged} from 'firebase/auth';

import Home from './screens/Home';
import Login from './screens/Login';
//importando credenciales de firebase
import firebaseApp from './firebase/credenciales';

  //manejo de credenciales
  const auth = getAuth(firebaseApp);


function App() {

  //manejo de user para mostrar home si hay un usuario en sesion o el login si no hay
  const [user, setUser] = useState(null);

  //Escuchando cambio de estado de sesion iniciada 

  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioFirebase) {
      setUser(usuarioFirebase);
      console.log(usuarioFirebase);
    } else {
      setUser(null);
    }
  });

  return (
    <>
      {user ? <Home user={user} /> : <Login />}
    </>
  );
}

export default App;

import React, { useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './screens/Home';
import Login from './screens/Login';
import DailyGraphs from './screens/DailyGraphs';
import MonthlyGraphs from './screens/MonthlyGraphs';
import DailyReports from './screens/DailyReports';
import MonthlyReports from './screens/MonthlyReports';
import NewUser from './screens/NewUser';

// Importando credenciales de firebase
import firebaseApp from './firebase/credenciales';

// Manejo de credenciales
const auth = getAuth(firebaseApp);

function App() {
  // Manejo de user para mostrar home si hay un usuario en sesión o el login si no hay
  const [user, setUser] = useState(null);

  // Escuchando cambio de estado de sesión iniciada
  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioFirebase) {
      const dataUser = {
        uid: usuarioFirebase.uid,
        email: usuarioFirebase.email,
      };
      setUser(dataUser);
    } else {
      setUser(null);
    }
  });

  return (
    <Router>
      <Routes>
        <Route path="/graficas-diarias" element={<DailyGraphs />} />
        <Route path="/graficas-mensuales" element={<MonthlyGraphs />} />
        <Route path="/reportes-diarios" element={<DailyReports />} />
        <Route path="/reportes-mensuales" element={<MonthlyReports />} />
        <Route path="/agregar-usuario" element={<NewUser />} />
        <Route path="/" element={user ? <Home user={user} /> : <Login />} />
      </Routes>
    </Router>
  );
}

export default App;

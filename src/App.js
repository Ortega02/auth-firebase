import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './screens/Home';
import Login from './screens/Login';
import DailyGraphs from './screens/DailyGraphs';
import MonthlyGraphs from './screens/MonthlyGraphs';
import DailyReports from './screens/DailyReports';
import MonthlyReports from './screens/MonthlyReports';
import NewUser from './screens/NewUser';


function App() {

  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/graficas-diarias" element={<DailyGraphs />} />
        <Route path="/graficas-mensuales" element={<MonthlyGraphs />} />
        <Route path="/reportes-diarios" element={<DailyReports />} />
        <Route path="/reportes-mensuales" element={<MonthlyReports />} />
        <Route path="/agregar-usuario" element={<NewUser />} />
      </Routes>
    </Router>
  );
}

export default App;

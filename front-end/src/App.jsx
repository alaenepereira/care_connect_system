import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RegisterPatient from './pages/RegisterPatient';
import Home from './pages/Home'; // Crie um componente Home.jsx para a sua página inicial

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | <Link to="/register-patient">Cadastro de Paciente</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register-patient" element={<RegisterPatient />} />
      </Routes>
    </Router>
  );
}

export default App;
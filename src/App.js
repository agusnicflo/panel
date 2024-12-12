import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home'; // Asegúrate de importar el componente Home
import Peluqueria from './components/Peluqueria'; // Crea los componentes correspondientes
import Futbol from './components/Futbol';
import Comida from './components/Comida';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/peluqueria" element={<Peluqueria />} />
        <Route path="/futbol" element={<Futbol />} />
        <Route path="/comida" element={<Comida />} />
      </Routes>
    </Router>
  );
}

export default App;
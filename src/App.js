import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLayout from './components/AdminLayout'; // Importa tu layout
import Calendar from './pages/Calendar';
import Orders from './pages/Orders';
import Payment from './pages/Payment';
import Revenue from './pages/Revenue';
import Apariencia from './pages/Apariencia';
import Home from "./components/Home"

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas principales */}
        <Route path="/" element={<Home />} /> {/* Página principal si tienes una */}
        
        {/* Rutas para el panel de administración */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="apariencia" element={<Apariencia />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="orders" element={<Orders />} />
          <Route path="payment" element={<Payment />} />
          <Route path="revenue" element={<Revenue />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

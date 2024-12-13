import React from 'react';
import { Link, Outlet } from 'react-router-dom'; // Asegúrate de importar Outlet aquí
import "../styles/AdminLayout.css"; // Asegúrate de que esta ruta sea correcta

function AdminLayout() {
  return (
    <div className="admin-layout">
      <div className="sidebar">
        <ul>
          <li><Link to="/admin/apariencia">Apariencia</Link></li>
          <li><Link to="/admin/calendar">Calendario</Link></li>
          <li><Link to="/admin/orders">Pedidos</Link></li>
          <li><Link to="/admin/payment">Métodos de pago</Link></li>
          <li><Link to="/admin/revenue">Recaudación</Link></li>
        </ul>
      </div>

      <div className="content">
        {/* Aquí se debe renderizar el contenido de las rutas hijas */}
        <Outlet /> {/* Aquí se renderiza el contenido de las rutas hijas, como Apariencia, Calendario, etc. */}
      </div>
    </div>
  );
}

export default AdminLayout;
import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <h1>Panel Administrativo</h1>
      <p>Bienvenido al panel administrativo de tu negocio.</p>
      <div>
        <h2>Resumen:</h2>
        <ul>
          <li>Reservas pendientes: 5</li>
          <li>Pedidos pendientes: 3</li>
          <li>Clientes registrados: 50</li>
        </ul>
      </div>
      <div>
        <h3>Secciones:</h3>
        <ul>
          <li><Link to="/admin/configurations">Configuraciones</Link></li>
          <li><Link to="/admin/reservations">Gestión de Reservas</Link></li>
          <li><Link to="/admin/products">Gestión de Productos/Menu</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
import React from 'react';
import { Link, Outlet } from 'react-router-dom'; // Asegúrate de importar Outlet aquí
import "../styles/AdminLayout.css"; // Asegúrate de que esta ruta sea correcta
import { BsStars } from "react-icons/bs";
import { FaCalendarAlt } from "react-icons/fa";
import { FaCreditCard } from "react-icons/fa";
import { BsBoxSeamFill } from "react-icons/bs";
import { GrMoney } from "react-icons/gr";

function AdminLayout() {
  return (
    <div className="admin-layout">
      <div className="sidebar" style={{display:"inlineblock"}}>
        <div><img src="/Group 14.png" alt="" style={{width:"160px"}} /></div>
        <ul style={{display:"inlineblock"}}>
          <li><Link to="/admin/apariencia"><BsStars/> Apariencia</Link></li>
          <li><Link to="/admin/calendar"><FaCalendarAlt /> Calendario</Link></li>
          <li><Link to="/admin/orders"><BsBoxSeamFill />Medios de pago</Link></li>
          <li><Link to="/admin/payment"><FaCreditCard /> Envio de pedidos</Link></li>
          <li><Link to="/admin/revenue"><GrMoney /> Recaudación</Link></li>
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
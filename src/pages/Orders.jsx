import React, { useState } from "react";
import "../styles/Orders.css";

function Orders() {
  const [isSwitch1On, setIsSwitch1On] = useState(false);
  const [isSwitch2On, setIsSwitch2On] = useState(false);
  const [isSwitch3On, setIsSwitch3On] = useState(false);

  return (
    <div className="container">
      <label htmlFor="">Transferencias</label>
      <div className="switch-container">
        <label className="switch">
          <input
            type="checkbox"
            checked={isSwitch1On}
            onChange={() => setIsSwitch1On(!isSwitch1On)}
          />
          <span className="switch-slider"></span>
        </label>
        <span className="switch-label">Switch 1</span>
      </div>
      <div className="switch-container">
        <label className="switch">
          <input
            type="checkbox"
            checked={isSwitch2On}
            onChange={() => setIsSwitch2On(!isSwitch2On)}
          />
          <span className="switch-slider"></span>
        </label>
        <span className="switch-label">Switch 2</span>
      </div>
      <label htmlFor="">Reserva con seña</label>
      <div className="switch-container">
        <label className="switch">
          <input
            type="checkbox"
            checked={isSwitch3On}
            onChange={() => setIsSwitch3On(!isSwitch3On)}
          />
          <span className="switch-slider"></span>
        </label>
        <span className="switch-label">Switch 3</span>
      </div>
      <label htmlFor="">Ingrese su contraseña para confirmar el cambio</label>
      <div style={{display:"flex", flexDirection:"column"}}> <label htmlFor="">Contraseña</label><input type="text" style={{width:"50%", height:"23px", border:"gray solid 1px", borderRadius:"5px", marginTop:"5px"}} /></div>
    </div>
  );
}

export default Orders;

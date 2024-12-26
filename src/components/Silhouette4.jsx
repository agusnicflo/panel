import React from "react";
import "../styles/Silhouette4.css";

const Silhouette4 = ({ selectedServiceImage }) => {
  return (
    <div className="silhouette4">
      {/* Título */}
      <h2 style={{color:"white", fontSize:"16px"}}>Ingrese sus datos para abonar</h2>

      {/* Nombre */}
      <label htmlFor="name" style={{color:"white"}}>Nombre</label>
      <input
        type="text"
        id="name"
        placeholder="Ingrese su nombre"
        className="input-field"
      />

      {/* Número de teléfono */}
      <label htmlFor="phone" style={{color:"white"}}>Número de Teléfono</label>
      <input
        type="text"
        id="phone"
        placeholder="Ingrese su número de teléfono"
        className="input-field"
      />

      {/* Número de tarjeta de débito */}
      <label htmlFor="card" style={{color:"white"}}>Número de Tarjeta de Débito</label>
      <input
        type="text"
        id="card"
        placeholder="Ingrese su número de tarjeta"
        className="input-field"
      />

      {/* Botones de pago */}
      <button className="payment-button">Pagar en efectivo</button>
      <button className="payment-button">Pagar con MercadoPago</button>

      {/* Imagen del servicio */}
      <div className="service-image-container">
        {selectedServiceImage ? (
          <img
            src={selectedServiceImage}
            alt="Imagen del servicio"
            className="service-image"
          />
        ) : (
          <p>No se ha seleccionado un servicio.</p>
        )}
      </div>

      {/* Total a abonar */}
      <p className="total-text">Total a abonar</p>

      {/* Botón para pagar */}
      <button className="pay-button">Confirmar pago</button>
    </div>
  );
};

export default Silhouette4;
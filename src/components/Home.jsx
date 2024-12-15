import React, { useState } from "react"; // Agrega useState
import "../styles/Home.css";
import { Link } from "react-router-dom"; // Para navegar a otras pantallas
import { useNavigate } from "react-router-dom";

function Home() {
  const [selectedCategory, setSelectedCategory] = useState(null); // Estado para manejar la selección
  const navigate = useNavigate();

  const handleAccept = () => {
    navigate("/admin");
  };

  // Definir la función handleCategoryClick fuera de handleAccept
  const handleCategoryClick = (category) => {
    setSelectedCategory(category); // Establece la categoría seleccionada
  };
  return (
    <div className="home-container">
      <h1 className="title">Selecciona tu rubro de emprendimiento</h1>
      <div className="buttons-container">
        <div
          className={`button-with-text ${
            selectedCategory === "peluqueria" ? "selected" : ""
          }`}
          onClick={() => handleCategoryClick("peluqueria")}
        >
          <img src="/tijera.png" alt="Peluquería" className="button-image" />
          <span className="button-text">Peluquería</span>
        </div>

        <div
          className={`button-with-text ${
            selectedCategory === "futbol" ? "selected" : ""
          }`}
          onClick={() => handleCategoryClick("futbol")}
        >
          <img src="/pelota.png" alt="Fútbol" className="button-image" />
          <span className="button-text">Canchas</span>
        </div>

        <div
          className={`button-with-text ${
            selectedCategory === "comida" ? "selected" : ""
          }`}
          onClick={() => handleCategoryClick("comida")}
        >
          <img src="./pizza.png" alt="Comida" className="button-image" />
          <span className="button-text">Comida</span>
        </div>
      </div>
      <div className="divbtn">
        <button className="btn" onClick={handleAccept}>
          Aceptar
        </button>
      </div>
    </div>
  );
}

export default Home;

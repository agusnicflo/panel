import React from 'react';
import '../styles/Home.css';
import { Link } from 'react-router-dom'; // Para navegar a otras pantallas

function Home() {
    return (
      <div className="home-container">
        <h1 className="title">Selecciona tu categoría</h1>
        <div className="buttons-container">
          <Link to="/peluqueria">
            <div className="button-with-text">
              <img src="/tijera.png" alt="Peluquería" className="button-image" />
              <span className="button-text">Peluquería</span>
            </div>
          </Link>
          <Link to="/futbol">
            <div className="button-with-text">
              <img src="/pelota.png" alt="Fútbol" className="button-image" />
              <span className="button-text">Fútbol</span>
            </div>
          </Link>
          <Link to="/comida">
            <div className="button-with-text">
              <img src="./pizza.png" alt="Comida" className="button-image" />
              <span className="button-text">Comida</span>
            </div>
          </Link>
        </div>
        <div className='divbtn'>
          <button className='btn'>Aceptar</button>
        </div>
      </div>
    );
  }

export default Home;
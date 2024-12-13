import React, { useState, useEffect } from "react";
import "../styles/Apariencia.css";

function Apariencia() {
  const [profileImage, setProfileImage] = useState(null);

  // Función para manejar la selección de la imagen
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        // Guardar la imagen en localStorage
        localStorage.setItem("profileImage", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageDelete = () => {
    setProfileImage(null); // Restablece a "sin imagen"
  };

  // Cargar la imagen del perfil desde localStorage al cargar el componente
  useEffect(() => {
    const storedImage = localStorage.getItem("profileImage");
    if (storedImage) {
      setProfileImage(storedImage);
    }
  }, []);

  return (
    <div className="apariencia-container">
      <div className="left-container">
        <div className="box top">
          <h2>Editar apariencia</h2>
          <div className="image-upload-container">
            <div className="profile-image">
              {profileImage ? (
                <img src={profileImage} alt="Perfil" className="profile-icon" />
              ) : (
                <img
                  src="/default-avatar.png"
                  alt="Avatar Predeterminado"
                  className="profile-icon"
                />
              )}
            </div>
            <div className="image-buttons">
              <label htmlFor="file-upload" className="custom-file-upload">
                Elige una imagen
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              <button onClick={handleImageDelete} className="delete-button">
                Eliminar imagen
              </button>
            </div>
            <div className="list">
              <div className="extra-box">Dominio</div>
              <div className="extra-box">Subdominio</div>
              <div className="extra-box">Nombre del emprendimiento</div>
              <div className="extra-box">Descripcion</div>
            </div>
          </div>
        </div>
        <div className="box bottom">
          <div>asd</div>
          <div>asd</div>
          <div>asd</div>
          <div>asdas</div>
        </div>
      </div>
      <div className="right-container">
        <div className="box">Contenedor derecho</div>
      </div>
    </div>
  );
}

export default Apariencia;

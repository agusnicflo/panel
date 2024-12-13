import React, { useState, useEffect } from "react";
import "../styles/Apariencia.css";

function Apariencia() {
  const [profileImage, setProfileImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState("/tema1.png");

  // Función para manejar la selección de la imagen
  const handleEditClick = () => {
    if (selectedImage) {
      // Configura las dimensiones y posición de la ventana
      const width = 900; // Ancho de la ventana
      const height = 700; // Alto de la ventana
      const left = (window.innerWidth - width) / 2; // Centrado horizontalmente
      const top = (window.innerHeight - height) / 2; // Centrado verticalmente
      const popupWindow = window.open(
        "",
        "_blank",
        `width=${width},height=${height},top=${top},left=${left},resizable=no,scrollbars=no`
      );
      // Crea contenido en la ventana emergente
      popupWindow.document.write(`
          <html>
            <head>
              <title>Editar Imagen</title>
              <style>
                body {
                  margin: 0;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  height: 100vh;
                  background-color: #f5f5f5;
                  font-family: Arial, sans-serif;
                }
                img {
                  max-width: 100%;
                  max-height: 100%;
                  border-radius: 8px;
                  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }
              </style>
            </head>
            <body>
              <img src="${selectedImage}" alt="Imagen Seleccionada" />
            </body>
          </html>
        `);
    } else {
      alert("Por favor, selecciona una imagen antes de editar.");
    }
  };

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc); // Actualiza la imagen seleccionada
  };

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
        <div className="boxtop">
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
        <div className="boxbottom">
          <div className="imgcontainer">
            <div className="temas">
              <img
                src="/tema1.png"
                alt="tema1"
                className="tema"
                onClick={() => handleImageClick("/tema1.png")}
              />
            </div>
            <div className="temas">
              <img
                src="/tema2.png"
                alt="tema2"
                className="tema"
                onClick={() => handleImageClick("/tema2.png")}
              />
            </div>
            <div className="temas">
              <img
                src="/tema3.png"
                alt="tema3"
                className="tema"
                onClick={() => handleImageClick("/tema3.png")}
              />
            </div>
            <div className="temas">
              <img
                src="/tema4.png"
                alt="tema3"
                className="tema"
                onClick={() => handleImageClick("/tema4.png")}
              />
            </div>
            <div className="temas">
              <img
                src="/tema4.png"
                alt="tema4"
                className="tema"
                onClick={() => handleImageClick("/tema4.png")}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="right-container">
        <div className="box2">
          <button className="btnlink">Compartir link</button>
          <button className="btnedit" onClick={handleEditClick}>
            Editar
          </button>
          <img src={selectedImage} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Apariencia;

import React, { useState, useEffect } from "react";
import "../styles/Apariencia.css";

function Apariencia() {
  const [selectedImage, setSelectedImage] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [selectedColor, setSelectedColor] = useState("#ffffff");
  // eslint-disable-next-line no-unused-vars
  const [secondColor, setSecondColor] = useState("#ffffff");
  const [profileImage, setProfileImage] = useState(null);

  const imageColorMapping = {
    "/tema1.png": ["#bd8677", "#b5735d"], // Rosita
    "/tema2.png": ["#5d80a2", "#b6808a"], // Verde lima
    "/tema3.png": ["#a41922", "#be6f23"], // Azul
    "/tema4.png": ["#727271", "#6d6b69"], // Rosa fuerte
  };

  // Función para manejar la selección de la imagen
  const handleEditClick = () => {
    if (selectedImage) {
      localStorage.setItem("selectedImage", selectedImage);
      // Configurar dimensiones y posición de la ventana emergente
      const width = 900;
      const height = 700;
      const left = (window.innerWidth - width) / 2;
      const top = (window.innerHeight - height) / 2;
      // Abrir la ventana emergente con la ruta "/edit"
      window.open(
        "/edit",
        "_blank",
        `width=${width},height=${height},top=${top},left=${left},resizable=no,scrollbars=no`
      );
    } else {
      alert("Por favor, selecciona una imagen antes de editar.");
    }
  };

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
    const colors = imageColorMapping[imageSrc] || ["#ffffff", "#ffffff"]; // Colores por defecto si no hay mapeo
    setSelectedColor(colors[0]); // Primer color
    setSecondColor(colors[1]); // Segundo color
    localStorage.setItem("selectedImage", imageSrc);
    localStorage.setItem("selectedColor", colors[0]);
    localStorage.setItem("secondColor", colors[1]);
    setSelectedImage(imageSrc); // Actualiza la imagen seleccionada
    // Obtén el color asociado a la imagen
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
              <button onClick={handleImageDelete} className="delete-button" style={{backgroundColor:"#e6e4f1", color:"#6281fe"}}>
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

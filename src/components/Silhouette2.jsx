import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Silhouette2.css"; // Asegúrate de tener los estilos necesarios

const Silhouette2 = ({ selectedImage, imageFit }) => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);
  const [containers, setContainers] = useState(
    Array(6)
      .fill()
      .map(() => ({
        image: null,
        texts: ["", ""],
        showInputs: [true, true],
      }))
  );

  // Verificar si es un administrador
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const handleFileChange = (event, index) => {
    if (!isAdmin) return; // Solo permite que el administrador suba imágenes

    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const updatedContainers = [...containers];
        updatedContainers[index].image = e.target.result;
        setContainers(updatedContainers);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (containerIndex, textIndex, value) => {
    if (!isAdmin) return; // Solo permite que el administrador ingrese texto

    const updatedContainers = [...containers];
    updatedContainers[containerIndex].texts[textIndex] = value;
    setContainers(updatedContainers);
  };

  const handleKeyDown = (event, containerIndex, textIndex) => {
    if (!isAdmin) return; // Solo permite que el administrador interactúe con los inputs

    if (
      event.key === "Enter" &&
      containers[containerIndex].texts[textIndex].trim() !== ""
    ) {
      const updatedContainers = [...containers];
      updatedContainers[containerIndex].showInputs[textIndex] = false;
      setContainers(updatedContainers);
    }
  };

  const handleReserve = () => {
    const reservationData = {
      reserved: true,
      profileImage,
      containerImages: containers.map((c) => c.image),
    };

    localStorage.setItem("reservationData", JSON.stringify(reservationData));

    // Redirigir a la página Silhouette3
    navigate("/silhouette3");
  };

  useEffect(() => {
    const storedProfileImage = localStorage.getItem("profileImage");
    const storedContainers = localStorage.getItem("containers");
    if (storedProfileImage) {
      setProfileImage(storedProfileImage);
    }
    if (storedContainers) {
      setContainers(JSON.parse(storedContainers));
    }
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("silhouette2Data"));
    if (storedData) {
      setProfileImage(storedData.profileImage || null);
      setContainers(storedData.containers || Array(6).fill().map(() => ({ image: null, texts: ["", ""], showInputs: [true, true] })));
    }
  }, []);

  useEffect(() => {
    const dataToSave = {
      profileImage,
      containers,
    };
    localStorage.setItem("silhouette2Data", JSON.stringify(dataToSave));
  }, [profileImage, containers]);

  return (
    <div className="silhouette2">
      {profileImage && (
        <img
          src={profileImage}
          alt="Profile"
          className="profile-image-thumbnail"
        />
      )}
      <div className="image-containers">
        {containers.map((container, containerIndex) => (
          <div key={containerIndex} className="image-container2">
            {/* Área de selección de imagen */}
            <div
              className="image-selection-area"
              onClick={() => {
                if (isAdmin) {
                  document.getElementById(`fileInput-${containerIndex}`).click(); // Activa el input de archivo solo para el administrador
                }
              }}
            >
              {container.image ? (
                <img
                  src={container.image}
                  alt={`Contenedor ${containerIndex + 1}`}
                />
              ) : (
                <div className="empty-container">+</div>
              )}
            </div>
            {isAdmin && (
              <input
                id={`fileInput-${containerIndex}`}
                type="file"
                accept="image/*"
                style={{ display: "none" }} // Oculta visualmente el input de archivo
                onChange={(e) => handleFileChange(e, containerIndex)} // Solo afecta al contenedor actual
              />
            )}

            {/* Mostrar solo el contenido sin edición para el usuario final */}
            <div className="inputs-container">
              {container.texts.map((text, textIndex) => (
                <div key={textIndex} className="text-wrapper">
                  {isAdmin && container.showInputs[textIndex] ? (
                    <input
                      type="text"
                      value={text}
                      placeholder={`Texto ${textIndex + 1}`}
                      onChange={(e) =>
                        handleInputChange(containerIndex, textIndex, e.target.value)
                      }
                      onKeyDown={(e) =>
                        handleKeyDown(e, containerIndex, textIndex)
                      }
                      className="text-input"
                    />
                  ) : (
                    <span className="text-display">{text}</span> // Muestra el texto ingresado, sin edición
                  )}
                </div>
              ))}
              {/* Si no es admin, mostrar solo el botón de reserva */}
              {!isAdmin && (
                <button className="btnreserva" onClick={handleReserve} disabled={isAdmin}>
                  {isAdmin ? "En modo edición" : "Reservar"}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Silhouette2;
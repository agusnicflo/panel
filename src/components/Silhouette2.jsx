import React, { useState, useEffect } from "react";
import "../styles/Silhouette2.css"; // Asegúrate de tener los estilos necesarios

const Silhouette2 = ({ selectedImage, imageFit }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [containers, setContainers] = useState(
    Array(6)
      .fill()
      .map(() => ({
        image: null, // Imagen única para cada contenedor
        texts: ["", ""], // Dos textos únicos para cada contenedor
        showInputs: [true, true], // Controla la visibilidad de cada input
      }))
  );

  

  const handleFileChange = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const updatedContainers = [...containers];
        updatedContainers[index].image = e.target.result; // Actualiza la imagen solo para el contenedor correspondiente
        setContainers(updatedContainers);
      };
      reader.readAsDataURL(file); // Lee el archivo como URL
    }
  };

   // Verificar si es un administrador

  const handleInputChange = (containerIndex, textIndex, value) => {
    const updatedContainers = [...containers];
    updatedContainers[containerIndex].texts[textIndex] = value; // Actualiza el texto específico del contenedor y el input
    setContainers(updatedContainers);
  };

  const handleKeyDown = (event, containerIndex, textIndex) => {
    if (
      event.key === "Enter" &&
      containers[containerIndex].texts[textIndex].trim() !== ""
    ) {
      const updatedContainers = [...containers];
      updatedContainers[containerIndex].showInputs[textIndex] = false; // Oculta el input para ese texto
      setContainers(updatedContainers);
    }
  };

  const handleReserve = () => {
    const reservationData = {
      reserved: true, // Marca que se ha realizado una reserva
      profileImage, // Puedes incluir la imagen de perfil si la necesitas
      containerImages: containers.map((c) => c.image), // Ejemplo: imágenes de los contenedores
    };
  
    // Guarda los datos en localStorage
    localStorage.setItem("reservationData", JSON.stringify(reservationData));
    alert("Reserva creada con éxito. Ve al siguiente paso para agendar el turno.");
  };

  useEffect(() => {
    const storedProfileImage = localStorage.getItem("profileImage");
    const storedContainers = localStorage.getItem("containers");
    if (storedProfileImage) {
      setProfileImage(storedProfileImage); // Carga la imagen desde localStorage
    }
    if (storedContainers) {
      setContainers(JSON.parse(storedContainers));
    }
  }, []);

  useEffect(() => {
    // Cargar desde localStorage
    const storedData = JSON.parse(localStorage.getItem("silhouette2Data"));
    if (storedData) {
      setProfileImage(storedData.profileImage || null);
      setContainers(storedData.containers || Array(6).fill().map(() => ({ image: null, texts: ["", ""], showInputs: [true, true] })));
    }
  }, []);

  useEffect(() => {
    // Guardar en localStorage de manera estructurada
    const dataToSave = {
      profileImage,
      containers
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
                document.getElementById(`fileInput-${containerIndex}`).click(); // Activa el input de archivo solo para este contenedor
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
            <input
              id={`fileInput-${containerIndex}`}
              type="file"
              accept="image/*"
              style={{ display: "none" }} // Oculta visualmente el input de archivo
              onChange={(e) => handleFileChange(e, containerIndex)} // Solo afecta al contenedor actual
            />

            {/* Inputs de texto */}
            <div className="inputs-container">
              {container.texts.map((text, textIndex) => (
                <div key={textIndex} className="text-wrapper">
                  {container.showInputs[textIndex] ? (
                    <input
                      type="text"
                      value={text} // Vincula este input a su contenedor e índice específicos
                      placeholder={`Texto ${textIndex + 1}`}
                      onChange={(e) =>
                        handleInputChange(
                          containerIndex,
                          textIndex,
                          e.target.value
                        )
                      }
                      onKeyDown={(e) =>
                        handleKeyDown(e, containerIndex, textIndex)
                      }
                      className="text-input"
                    />
                  ) : (
                    <span className="text-display">{text}</span> // Muestra el texto ingresado
                  )}
                </div>
              ))}
              <button className="btnreserva">Reservar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Silhouette2;

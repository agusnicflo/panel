import React, { useEffect, useState } from "react";
import "../styles/FinalPage2.css"

const FinalPage2 = () => {
    const [profileImage, setProfileImage] = useState(""); // Aquí está la imagen de perfil
    const [backgroundColor, setBackgroundColor] = useState("");
    const [backgroundStyle, setBackgroundStyle] = useState("");
    const [containers, setContainers] = useState(
    Array(6)
      .fill()
      .map(() => ({
        image: null,
        texts: ["", ""],
      }))
  );

  useEffect(() => {
    // Recuperar datos desde localStorage
    const storedData = JSON.parse(localStorage.getItem("silhouette2Data"));
    
    if (storedData) {
        setProfileImage(storedData.profileImage || ""); // Asegúrate de tener un valor por defecto
        setContainers(storedData.containers || []); // Asegúrate de tener un valor por defecto para containers
    }
  }, []);

  useEffect(() => {
    const storedColor = localStorage.getItem("selectedColor");
    const storedSecondColor = localStorage.getItem("secondColor");

    if (storedColor && storedSecondColor) {
      // Aplica el estilo del gradiente
      setBackgroundStyle(
        `linear-gradient(to bottom, ${storedColor}, ${storedSecondColor})`
      );
    }
  }, []); // Solo se ejecuta una vez al montar el componente



  useEffect(() => {
    // Cargar datos de localStorage
    const storedData = JSON.parse(localStorage.getItem("silhouette2Data"));
    if (storedData) {
      setProfileImage(storedData.profileImage || null);
      setContainers(storedData.containers || []);
    }
  }, []);



  // Función para actualizar la imagen de perfil
  const handleImageChange = (event) => {
    const newImage = event.target.value;
    setProfileImage(newImage);
    localStorage.setItem("profileImage", newImage); // Guardar en localStorage
  };

  // Función para actualizar el color de fondo
  const handleColorChange = (event) => {
    const newColor = event.target.value;
    setBackgroundColor(newColor);
    localStorage.setItem("backgroundColor", newColor); // Guardar en localStorage
  };


  return (
    <div
      style={{
        background: backgroundStyle,
        margin: "0 auto",
        width: "350px",
        height: "550px",
        maxWidth: "400px",
        textAlign: "center",
        border: "1px solid black",
        borderRadius: "30px",
      }}
    >
      {/* Mostrar imagen de perfil */}
      {profileImage && (
        <img
          src={profileImage}
          alt="Imagen de perfil"
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            margin: "20px auto",
          }}
        />
      )}{" "}
      <div className="image-containers">
        {containers.map((container, containerIndex) => (
          <div key={containerIndex} className="image-container">
            <div className="image-container2">
              {container.image ? (
                <img
                  src={container.image}
                  alt={`Contenedor ${containerIndex + 1}`}
                />
              ) : (
                <div className="empty-container">+</div>
              )}
            </div>
            <div className="container-texts">
              {container.texts.map((text, textIndex) => (
                <div key={textIndex} className="text-display">
                  <span>{text || "Texto vacío"}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinalPage2;

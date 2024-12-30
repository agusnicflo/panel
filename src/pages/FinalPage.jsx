import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Importa Link de react-router-dom

const FinalPage = () => {
  const [silhouette1Data, setSilhouette1Data] = useState(null);
  const [profileImage, setProfileImage] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");
  const [openHours, setOpenHours] = useState([]);
  const [socialLinks, setSocialLinks] = useState([]);
  const [showButton, setShowButton] = useState(false);
  const [showButton2, setShowButton2] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [backgroundStyle, setBackgroundStyle] = useState("");

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
    const storedShowButton = localStorage.getItem("showButton");
    const storedShowButton2 = localStorage.getItem("showButton2");
    const storedImage = localStorage.getItem("selectedImage");
    if (storedImage) {
      setSelectedImage(storedImage);
    }

    if (storedShowButton !== null) {
      setShowButton(storedShowButton === "true");
    }

    if (storedShowButton2 !== null) {
      setShowButton2(storedShowButton2 === "true");
    }
  }, []);

  useEffect(() => {
    // Cargar los datos de Silhouette1 desde localStorage
    const silhouette1 = JSON.parse(localStorage.getItem("silhouette1"));
    if (silhouette1) {
      setSilhouette1Data(silhouette1);
    }
  }, []);

  if (!silhouette1Data) {
    return <p>Cargando los datos de la página final...</p>;
  }

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

  // Función para actualizar los horarios de apertura
  const handleOpenHoursChange = (index, field, value) => {
    const updatedOpenHours = [...openHours];
    updatedOpenHours[index][field] = value;
    setOpenHours(updatedOpenHours);
    localStorage.setItem("openHours", JSON.stringify(updatedOpenHours)); // Guardar en localStorage
  };

  // Función para agregar un nuevo horario
  const handleAddOpenHour = () => {
    const newHour = { day: "", time: "" };
    setOpenHours([...openHours, newHour]);
    localStorage.setItem("openHours", JSON.stringify([...openHours, newHour])); // Guardar en localStorage
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
      {silhouette1Data.profileImage && (
        <img
          src={silhouette1Data.profileImage}
          alt="Imagen de perfil"
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            margin: "20px auto",
          }}
        />
      )}
      {/* Mostrar horarios y días */}
      <div>
        <p>
          <strong>Horario:</strong> {silhouette1Data.openHour} -{" "}
          {silhouette1Data.closeHour}
        </p>
        <p>
          <strong>Días de apertura:</strong>{" "}
          {silhouette1Data.openDays && silhouette1Data.openDays.length > 0
            ? silhouette1Data.openDays.join(", ")
            : "No especificado"}
        </p>
      </div>
      {/* Botones */}
      {showButton && (
        <Link to="/finalpage2">
        <button
          style={{
            textDecoration:"none",
            display: "block",
            margin: "10px auto",
            padding: "10px 20px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Servicios
        </button>
        </Link>
      )}
      {showButton2 && (
        <button
          style={{
            display: "block",
            margin: "10px auto",
            padding: "10px 20px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Agendar Turno
        </button>
      )}
      {/* Mostrar imágenes adicionales */}
      {selectedImage ? (
        <div className="additional-image">
          {" "}
          {/* Aplicas la clase aquí para el estilo */}
          <img
            src={selectedImage}
            alt="Selected"
            style={{
              width: "250px",
              height: "150px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </div>
      ) : (
        <p>No image selected.</p>
      )}{" "}
    </div>
  );
};

export default FinalPage;

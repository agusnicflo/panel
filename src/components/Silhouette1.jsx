import React, { useState, useEffect } from "react";

const Silhouette1 = ({
  showButton,
  showButton2,
  socialUrl,
  showSocialInput,
  selectedImage,
  imageFit,
  timeInterval,
  openHour,
  openDays,
  closeHour,
  updateFinalData,
}) => {
  const [profileImage, setProfileImage] = useState(null);
  const [socialIcons, setSocialIcons] = useState([]); // Lista de iconos de redes sociales

  const addSocialIcon = (url) => {
    if (url) {
      setSocialIcons((prevIcons) => [...prevIcons, url]); // Añade la URL a la lista
    }
  };

  useEffect(() => {
    const storedProfileImage = localStorage.getItem("profileImage");
    if (storedProfileImage) {
      setProfileImage(storedProfileImage); // Carga la imagen desde localStorage
    }
  }, []);

  // Actualizar los datos finales
  useEffect(() => {
    updateFinalData({
      silhouette1: {
        profileImage,
        socialIcons,
        openHour,
        closeHour,
        openDays,
        buttons: {
          showButton,
          showButton2,
        },
      },
    });
  }, [
    profileImage,
    socialIcons,
    openHour,
    closeHour,
    openDays,
    showButton,
    showButton2,
    updateFinalData,
  ]);
  return (
    <div style={{ marginTop: "25%" }}>
      {profileImage && (
        <img
          src={profileImage}
          alt="Profile"
          className="profile-image-thumbnail"
          style={{
            position: "absolute", // Posiciona la imagen dentro de la silueta
            top: "15%", // Centrado vertical
            left: "50%", // Centrado horizontal
            transform: "translate(-50%, -50%)", // Ajuste final para centrar
            width: "100px", // Ajusta el tamaño de la imagen dentro de la silueta
            height: "100px", // Mantener la proporción de la imagen
            borderRadius: "50%", // Hacer la imagen redonda, si lo deseas
          }}
        />
      )}

      {/* Mostrar horario y días de apertura */}
      <div
        className="schedule-container"
        style={{
          textAlign: "center",
          top: "23%",
          left: "20%",
          position: "absolute",
        }}
      >
        <p style={{ fontWeight: "bold", fontSize: "11px" }}>
          Horario de Apertura:
        </p>
        <p style={{ fontSize: "11px" }}>Abierto desde las {openHour}</p>{" "}
        <p style={{ fontSize: "11px" }}>hasta las {closeHour}</p>
        <p style={{ fontWeight: "bold", fontSize: "11px" }}>
          <strong>Días de apertura:</strong>{" "}
          {openDays.length > 0 ? openDays.join(" y ") : "No especificado"}
        </p>
      </div>

      {/* Mostrar el botón si showButton es true */}
      <div>
        {showButton && (
          <button
            style={{
              position: "absolute",
              top: "42%",
              left: "50%",
              transform: "translateX(-50%)",
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
        )}

        {/* Botón del Switch 2 */}
        {showButton2 && (
          <button
            style={{
              position: "absolute",
              top: "50%", // Botón más abajo que el anterior
              left: "50%",
              transform: "translateX(-50%)",
              padding: "10px 20px",
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Agendar turnos
          </button>
        )}
      </div>
      <div>
        {/* Imagen seleccionada */}
        {selectedImage && (
          <div className="additional-image">
            <img
              src={selectedImage}
              alt="Selected"
              style={{
                position: "absolute",
                width: "250px",
                height: "150px",
                objectFit: imageFit, // Aplica el ajuste seleccionado
                borderRadius: "8px",
                top: "60%",
                left: "8%",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Silhouette1;

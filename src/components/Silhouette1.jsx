import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Silhouette1 = ({
  isAdmin, // Nueva propiedad para verificar si es admin
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
  const navigate = useNavigate(); // Hook de react-router
  const [profileImage, setProfileImage] = useState(null);
  const [socialIcons, setSocialIcons] = useState([]);

  const [openHourState, setOpenHourState] = useState(openHour);
  const [closeHourState, setCloseHourState] = useState(closeHour);
  const [openDaysState, setOpenDaysState] = useState(openDays || []);
  const [showButtonState, setShowButtonState] = useState(showButton);
  const [showButton2State, setShowButton2State] = useState(showButton2);

  useEffect(() => {
    // Cargar datos desde localStorage
    const storedData = JSON.parse(localStorage.getItem("silhouette1")) || {};
    setProfileImage(storedData.profileImage || null);
    setSocialIcons(storedData.socialIcons || []);
    setOpenHourState(storedData.openHour || openHour);
    setCloseHourState(storedData.closeHour || closeHour);
    setOpenDaysState(storedData.openDays || openDays || []);
    setShowButtonState(
      storedData.showButton !== undefined ? storedData.showButton : showButton
    );
    setShowButton2State(
      storedData.showButton2 !== undefined
        ? storedData.showButton2
        : showButton2
    );
  }, []);

  useEffect(() => {
    // Guardar datos en localStorage
    const silhouetteData = {
      profileImage,
      socialIcons,
      openHour: openHourState,
      closeHour: closeHourState,
      openDays: openDaysState,
      showButton: showButtonState,
      showButton2: showButton2State,
    };
    localStorage.setItem("silhouette1", JSON.stringify(silhouetteData));

    // Actualizar datos en EditPage
    if (updateFinalData) {
      updateFinalData({ silhouette1: silhouetteData });
    }
  }, [
    profileImage,
    socialIcons,
    openHourState,
    closeHourState,
    openDaysState,
    showButtonState,
    showButton2State,
    updateFinalData,
  ]);
  /*const addSocialIcon = (url) => {
    if (url) {
      setSocialIcons((prevIcons) => [...prevIcons, url]);
    }
  };*/

  useEffect(() => {
    if (selectedImage) {
      localStorage.setItem("selectedImage", selectedImage);
    }
  }, [selectedImage]);

  const handleServiciosClick = () => {
    navigate("./silhouette3"); // Asumiendo que el componente Silhouette3 está en esta ruta
  };

  useEffect(() => {
    const storedProfileImage = localStorage.getItem("profileImage");
    if (storedProfileImage) {
      setProfileImage(storedProfileImage);
    }

    const storedSocialIcons = JSON.parse(localStorage.getItem("socialIcons"));
    if (storedSocialIcons) {
      setSocialIcons(storedSocialIcons);
    }

    const storedOpenHour = localStorage.getItem("openHour");
    const storedCloseHour = localStorage.getItem("closeHour");
    const storedOpenDays = JSON.parse(localStorage.getItem("openDays"));
    if (storedOpenHour && storedCloseHour && storedOpenDays) {
      setOpenHourState(storedOpenHour);
      setCloseHourState(storedCloseHour);
      setOpenDaysState(storedOpenDays);
    }

    const storedShowButton = localStorage.getItem("showButton");
    const storedShowButton2 = localStorage.getItem("showButton2");
    if (storedShowButton !== null) {
      setShowButtonState(storedShowButton === "true");
    }
    if (storedShowButton2 !== null) {
      setShowButton2State(storedShowButton2 === "true");
    }
  }, []);

  useEffect(() => {
    if (profileImage) {
      localStorage.setItem("profileImage", profileImage);
    }
    if (socialIcons.length > 0) {
      localStorage.setItem("socialIcons", JSON.stringify(socialIcons));
    }
    if (openHourState && closeHourState && openDaysState) {
      localStorage.setItem("openHour", openHourState);
      localStorage.setItem("closeHour", closeHourState);
      localStorage.setItem("openDays", JSON.stringify(openDaysState));
    }
    if (showButtonState !== undefined) {
      localStorage.setItem("showButton", showButtonState);
    }
    if (showButton2State !== undefined) {
      localStorage.setItem("showButton2", showButton2State);
    }
  }, [
    profileImage,
    socialIcons,
    openHourState,
    closeHourState,
    openDaysState,
    showButtonState,
    showButton2State,
  ]);

  useEffect(() => {
    updateFinalData({
      silhouette1: {
        profileImage,
        socialIcons,
        openHour: openHourState,
        closeHour: closeHourState,
        openDays: openDaysState,
        buttons: {
          showButton: showButtonState,
          showButton2: showButton2State,
        },
      },
    });
  }, [
    profileImage,
    socialIcons,
    openHourState,
    closeHourState,
    openDaysState,
    showButtonState,
    showButton2State,
    updateFinalData,
  ]);

  useEffect(() => {
    setOpenDaysState(openDays);
  }, [openDays]);

  useEffect(() => {
    setOpenHourState(openHour);
  }, [openHour]);

  useEffect(() => {
    setCloseHourState(closeHour);
  }, [closeHour]);

  useEffect(() => {
    setShowButtonState(showButton);
    setShowButton2State(showButton2);
  }, [showButton, showButton2]);

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
        <p style={{ fontSize: "11px" }}>Abierto desde las {openHourState}</p>{" "}
        <p style={{ fontSize: "11px" }}>hasta las {closeHourState}</p>
        <p style={{ fontWeight: "bold", fontSize: "11px" }}>
          <strong>Días de apertura:</strong>{" "}
          {openDaysState.length > 0
            ? openDaysState.join(" y ")
            : "No especificado"}
        </p>
      </div>

      {/* Mostrar el botón si showButtonState es true */}
      <div>
        {showButtonState && (
          <button
            onClick={isAdmin ? null : handleServiciosClick}
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
        {showButton2State && (
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

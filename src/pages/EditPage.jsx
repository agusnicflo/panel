import React, { useState, useEffect } from "react";

const EditPage = () => {
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [isActive, setIsActive] = useState(false); // Estado para saber si está activo o no
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState("#ffffff"); // Color predeterminado
  const [secondColor, setSecondColor] = useState("#ffffff");
  const [profileImage, setProfileImage] = useState(null);

  const toggleSwitch = () => {
    setIsActive(!isActive);
  };

  const handleSwitchChange = (event) => {
    setIsButtonVisible(event.target.checked);
  };

  useEffect(() => {
    // Recupera la imagen y el color del localStorage
    const storedImage = localStorage.getItem("selectedImage");
    const storedColor = localStorage.getItem("selectedColor");
    const storedSecondColor = localStorage.getItem("secondColor");
    const storedProfileImage = localStorage.getItem("profileImage");

    if (storedImage) {
      setSelectedImage(storedImage);
    }
    if (storedColor) {
      setSelectedColor(storedColor); // Actualiza el color
    }
    if (storedSecondColor) {
      setSecondColor(storedSecondColor); // Asegúrate de asignar el segundo color
    }

    if (storedProfileImage) {
      setProfileImage(storedProfileImage);
    }
  }, []);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Silueta del móvil */}
      <div
        style={{
          width: "40%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f0f0f0",
          borderRight: "1px solid #ddd",
        }}
      >
        <div
          style={{
            width: "300px",
            height: "600px",
            backgroundImage: `linear-gradient(to bottom, ${selectedColor}, ${secondColor})`, // Degradado con dos colores
            borderRadius: "40px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              width: "300px",
              height: "600px",
              background: `linear-gradient(to bottom, ${selectedColor}, ${secondColor})`, // Degradado con los colores seleccionados
              borderRadius: "40px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative", // Para posicionar la imagen dentro
              flexDirection: "column", // Esto pone los botones uno abajo del otro
              gap: "10px", // Espacio entre los botones
            }}
          >
            {/* Imagen de perfil dentro de la silueta */}
            {profileImage && (
              <img
                src={profileImage}
                alt="Imagen de perfil"
                style={{
                  width: "100px", // Ajusta el tamaño según sea necesario
                  height: "100px",
                  borderRadius: "50%", // Hace que la imagen tenga forma circular
                  objectFit: "cover", // Para que la imagen no se distorsione
                  position: "absolute", // Para posicionar la imagen dentro de la silueta
                  top: "17%", // Ajusta la posición vertical
                  left: "50%", // Ajusta la posición horizontal
                  transform: "translate(-50%, -50%)", // Centra la imagen
                }}
              />
            )}
            <button
              style={{
                width: "80%",
                padding: "10px",
                borderRadius: "5%",
                border: "none",
              }}
            >
              Botón 1
            </button>
            <button
              style={{
                width: "80%",
                padding: "10px",
                borderRadius: "5%",
                border: "none",
              }}
            >
              Botón 2
            </button>
          </div>
        </div>
      </div>

      {/* Panel lateral */}
      <div
        style={{
          width: "60%",
          padding: "20px",
          backgroundColor: "#f5f5f5",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {/* Perilla (interruptor) */}
        <div style={containerStyle}>
          <label style={{ marginBottom: "10px" }}>Activar opción:</label>
          <div
            style={{
              position: "relative",
              display: "inline-block",
              width: "50px",
              height: "24px",
            }}
          >
            <input
              type="checkbox"
              checked={isActive}
              onChange={toggleSwitch}
              style={{
                opacity: 0,
                width: "0",
                height: "0",
                position: "absolute",
              }}
            />
            <span
              style={{
                position: "absolute",
                cursor: "pointer",
                top: "0",
                left: "0",
                right: "0",
                bottom: "0",
                backgroundColor: isActive ? "#4CAF50" : "#ccc", // Color verde si está activado
                borderRadius: "24px",
                transition: "0.4s",
              }}
            ></span>
            <span
              style={{
                position: "absolute",
                content: "",
                height: "16px",
                width: "16px",
                borderRadius: "50%",
                left: isActive ? "26px" : "4px", // Movimiento de la bolita
                bottom: "4px",
                backgroundColor: "#fff",
                transition: "0.4s",
              }}
            ></span>
          </div>
        </div>

        {/* Contenedores vacíos */}
        <div style={containerStyle}></div>
        <div style={containerStyle}></div>
        <div style={containerStyle}></div>
        <div style={containerStyle}></div>
      </div>
    </div>
  );
};

const containerStyle = {
  flex: 1,
  backgroundColor: "#ffffff",
  borderRadius: "10px",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  padding: "10px",
};

export default EditPage;

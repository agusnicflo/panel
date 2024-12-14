import React, { useState, useEffect } from "react";

const EditPage = () => {
  const [isActive, setIsActive] = useState(false); // Estado para saber si está activo o no
  const [isScheduleActive, setIsScheduleActive] = useState(false); // Estado para el switch de Agendar Turnos
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState("#ffffff"); // Color predeterminado
  const [secondColor, setSecondColor] = useState("#ffffff");
  const [profileImage, setProfileImage] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedImageForMobile, setSelectedImageForMobile] = useState(null); // Imagen mostrada en el móvil

  const handleImageClick = (image) => {
    setSelectedImageForMobile(image); // Actualizamos la imagen mostrada en el móvil
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const images = files.map((file) => URL.createObjectURL(file));
    setSelectedImages((prevImages) => [...prevImages, ...images]);
  };

  const handleSwitchChange = () => {
    setIsActive(!isActive);
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
            {/* Imagen seleccionada */}
            {selectedImageForMobile && (
              <img
                src={selectedImageForMobile}
                alt="Imagen seleccionada"
                style={{
                  width: "80%",
                  height: "30%",
                  borderRadius: "10px",
                  objectFit: "cover",
                  position: "absolute",
                  top: "60%",
                }}
              />
            )}
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
            <div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            {isActive && (
              <button
                style={{
                  width: "80%",
                  padding: "10px",
                  borderRadius: "5%",
                  border: "none",
                }}
              >
                Servicios
              </button>
            )}
            {isScheduleActive && (
              <button
                style={{
                  width: "80%",
                  padding: "10px",
                  borderRadius: "5%",
                  border: "none",
                }}
              >
                Agendar Turnos
              </button>
            )}
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
        <div
          style={{
            flex: 1,
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            padding: "10px",
            display: "flex", // Usamos flex para alinear en línea
            flexDirection: "column", // Organiza los elementos en columnas
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <label htmlFor="buttonSwitch" style={{ marginRight: "10px" }}>
              Servicios
            </label>
            <div
              style={{
                position: "relative",
                display: "inline-block",
                width: "45px",
                height: "24px",
              }}
            >
              <input
                type="checkbox"
                id="buttonSwitch"
                checked={isActive}
                onChange={handleSwitchChange}
                style={{
                  opacity: 0, // Dejamos el checkbox oculto pero funcional
                  width: "50px", // Mantenemos el tamaño del input
                  height: "24px",
                  position: "absolute",
                  top: "0",
                  left: "0",
                  zIndex: 1, // Aseguramos que el input sea interactivo
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
                  zIndex: 0,
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
          <div style={{ marginTop: "8px" }}>
            <span>Añade imagenes para tus servicios o menu digital</span>
          </div>
          {/* Contenedor de miniaturas */}
          <div
            style={{
              marginTop: "10px",
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap", // Permite que las miniaturas bajen a otra línea si es necesario
            }}
          >
            {/* Miniatura con "+" para añadir */}
            <label
              htmlFor="fileUpload"
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "5px",
                backgroundColor: "#f0f0f0",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "24px",
                fontWeight: "bold",
                cursor: "pointer",
                marginRight: "10px",
                border: "1px dashed #ccc",
              }}
            >
              +
            </label>
            <input
              type="file"
              id="fileUpload"
              accept="image/*"
              style={{ display: "none" }}
              multiple // Permite seleccionar varias imágenes
              onChange={handleImageUpload}
            />

            {/* Renderizado dinámico de miniaturas */}
            {selectedImages.map((image, index) => (
              <div
                key={index}
                onClick={() => handleImageClick(image)} // Manejar clic para reflejar en el móvil
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "5px",
                  backgroundImage: `url(${image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  marginRight: "10px",
                  cursor: "pointer",
                  border:
                    selectedImageForMobile === image
                      ? "2px solid blue"
                      : "none", // Resaltar imagen seleccionada
                }}
              ></div>
            ))}
          </div>
        </div>
        {/* Contenedores vacíos */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            padding: "10px",
            display: "flex", // Usamos flex para alinear en línea
            flexDirection: "column", // Organiza los elementos en columnas
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <label htmlFor="scheduleSwitch">Agendar turnos</label>
            <div
              style={{
                position: "relative",
                display: "inline-block",
                width: "45px",
                height: "24px",
                marginLeft: "5px",
              }}
            >
              <input
                type="checkbox"
                id="scheduleSwitch"
                checked={isScheduleActive}
                onChange={() => setIsScheduleActive(!isScheduleActive)}
                style={{
                  opacity: 0, // Dejamos el checkbox oculto pero funcional
                  width: "50px", // Mantenemos el tamaño del input
                  height: "24px",
                  position: "absolute",
                  top: "0",
                  left: "0",
                  zIndex: 1, // Aseguramos que el input sea interactivo
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
                  backgroundColor: isScheduleActive ? "#4CAF50" : "#ccc", // Color verde si está activado
                  borderRadius: "24px",
                  transition: "0.4s",
                  zIndex: 0,
                }}
              ></span>

              <span
                style={{
                  position: "absolute",
                  content: "",
                  height: "16px",
                  width: "16px",
                  borderRadius: "50%",
                  left: isScheduleActive ? "26px" : "4px", // Movimiento de la bolita
                  bottom: "4px",
                  backgroundColor: "#fff",
                  transition: "0.4s",
                }}
              ></span>
            </div>
          </div>
          <p>Añade tu disponibilidad horaria para los turnos</p>
          <div>
            <div
              style={{
                display: "flex",
                border: "1px solid black",
                flexDirection: "column",
              }}
            >
              <label htmlFor="horarioInicio" style={{ margin: "0 10px" }}>
                Horarios
              </label>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ margin: "5px" }}>
                  <label htmlFor="desde" style={{ margin: "0 5px" }}>
                    Desde
                  </label>
                  <select
                    id="horarioInicio"
                    style={{ marginBottom: "10px", marginLeft: "5px" }}
                  >
                    <option value="08:00">08:00</option>
                    <option value="09:00">09:00</option>
                    <option value="10:00">10:00</option>
                    <option value="11:00">11:00</option>
                    <option value="12:00">12:00</option>
                    {/* Agrega más opciones de horario según lo necesites */}
                  </select>
                </div>
                <div style={{ margin: "5px" }}>
                  <label style={{ margin: "0 5px" }}>Hasta</label>
                  <select
                    id="horarioFin"
                    style={{ marginBottom: "10px", marginLeft: "5px" }}
                  >
                    <option value="08:30">08:30</option>
                    <option value="09:30">09:30</option>
                    <option value="10:30">10:30</option>
                    <option value="11:30">11:30</option>
                    <option value="12:30">12:30</option>
                    {/* Agrega más opciones de horario según lo necesites */}
                  </select>
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                border: "1px solid black",
              }}
            >
              <label htmlFor="diasDisponibles" style={{ margin: "0 10px" }}>
                Días disponibles para reservar
              </label>

              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ margin: "5px" }}>
                  <label htmlFor="desde" style={{ margin: "0 5px" }}>
                    Desde
                  </label>
                  <select
                    id="desde"
                    name="desde"
                    style={{ marginBottom: "10px", marginLeft: "5px" }}
                  >
                    <option value="lunes">Lunes</option>
                    <option value="martes">Martes</option>
                    <option value="miercoles">Miércoles</option>
                    <option value="jueves">Jueves</option>
                    <option value="viernes">Viernes</option>
                    <option value="sabado">Sábado</option>
                    <option value="domingo">Domingo</option>
                  </select>
                </div>

                <div style={{ marginLeft: "10px" }}>
                  <label htmlFor="hasta">Hasta</label>
                  <select
                    id="hasta"
                    name="hasta"
                    style={{ marginBottom: "10px", marginLeft: "5px" }}
                  >
                    <option value="lunes">Lunes</option>
                    <option value="martes">Martes</option>
                    <option value="miercoles">Miércoles</option>
                    <option value="jueves">Jueves</option>
                    <option value="viernes">Viernes</option>
                    <option value="sabado">Sábado</option>
                    <option value="domingo">Domingo</option>
                  </select>
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                border: "1px solid black",
              }}
            >
              <label htmlFor="diasDisponibles" style={{ margin: "0 10px" }}>
                Días no disponibles para reservar
              </label>

              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ margin: "5px" }}>
                  <label htmlFor="desde" style={{ margin: "0 5px" }}>
                    Desde
                  </label>
                  <select
                    id="desde"
                    name="desde"
                    style={{ marginBottom: "10px", marginLeft: "5px" }}
                  >
                    <option value="lunes">Lunes</option>
                    <option value="martes">Martes</option>
                    <option value="miercoles">Miércoles</option>
                    <option value="jueves">Jueves</option>
                    <option value="viernes">Viernes</option>
                    <option value="sabado">Sábado</option>
                    <option value="domingo">Domingo</option>
                  </select>
                </div>

                <div style={{ marginLeft: "10px" }}>
                  <label htmlFor="hasta">Hasta</label>
                  <select
                    id="hasta"
                    name="hasta"
                    style={{ marginBottom: "10px", marginLeft: "5px" }}
                  >
                    <option value="lunes">Lunes</option>
                    <option value="martes">Martes</option>
                    <option value="miercoles">Miércoles</option>
                    <option value="jueves">Jueves</option>
                    <option value="viernes">Viernes</option>
                    <option value="sabado">Sábado</option>
                    <option value="domingo">Domingo</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
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

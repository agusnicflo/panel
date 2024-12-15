import React, { useState, useEffect } from "react";
import "../styles/global.css";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { SiMyspace } from "react-icons/si";

const EditPage = () => {
  const [isActive, setIsActive] = useState(false); // Estado para saber si está activo o no
  const [isScheduleActive, setIsScheduleActive] = useState(false); // Estado para el switch de Agendar Turnos
  const [isSocialActive, setIsSocialActive] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState("#ffffff"); // Color predeterminado
  const [secondColor, setSecondColor] = useState("#ffffff");
  const [profileImage, setProfileImage] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedImageForMobile, setSelectedImageForMobile] = useState(null); // Imagen mostrada en el móvil
  const [horaInicio, setHoraInicio] = useState("6:00 AM");
  const [horaFin, setHoraFin] = useState("12:00 PM");
  const [diaDesde, setDiaDesde] = useState("lunes");
  const [diaHasta, setDiaHasta] = useState("lunes");
  const [socialLinks, setSocialLinks] = useState([]); // Estado para las redes sociales
  const [inputValue, setInputValue] = useState(""); // Estado para el valor del input

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && isSocialActive) {
      handleAddSocialLink(); // Llama a la función al presionar Enter
    }
  };

  // Maneja la adición de una nueva red social
  const handleAddSocialLink = () => {
    if (inputValue.trim() !== "") {
      setSocialLinks([...socialLinks, inputValue]); // Agrega la URL al estado
      setInputValue(""); // Limpia el input
    }
  };

  // Obtiene el ícono correspondiente según la URL
  const getIcon = (url) => {
    if (url.includes("facebook.com"))
      return <FaFacebook style={{ width: "50%", height: "50%" }} />;
    if (url.includes("instagram.com"))
      return <FaInstagram style={{ width: "50%", height: "50%" }} />;
    if (url.includes("telegram.me") || url.includes("t.me"))
      return <FaTelegramPlane style={{ width: "50%", height: "50%" }} />;
    if (url.includes("whatsapp.com"))
      return <FaWhatsapp style={{ width: "50%", height: "50%" }} />;
    if (url.includes("twitter.com") || url.includes("x.com"))
      return <RiTwitterXLine style={{ width: "50%", height: "50%" }} />;
    if (url.includes("myspace.com"))
      return <SiMyspace style={{ width: "50%", height: "50%" }} />;
    return null; // Si no coincide con ninguna red social conocida
  };

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
                  width: "85%",
                  height: "30%",
                  borderRadius: "10px",
                  objectFit: "cover",
                  position: "absolute",
                  top: "59%",
                }}
              />
            )}

            {/* Contenedor para imágenes en la parte inferior */}
            <div
              style={{
                position: "absolute",
                bottom: "10px", // Posiciona el contenedor en la parte inferior
                width: "85%",
                display: "flex",
                justifyContent: "space-around", // Espaciado entre las imágenes
                alignItems: "center",
              }}
            >
              {/* Imagenes debajo */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  gap: "10px",
                  width: "100%",
                  marginTop: "10px",
                }}
              >
                {socialLinks.map((url, index) => (
                  <a
                    key={index}
                    href={url} // Enlace a la URL ingresada
                    target="_blank" // Abre en una nueva pestaña
                    rel="noopener noreferrer" // Seguridad
                    style={{
                      width: "40px",
                      height: "40px",
                      backgroundColor: "#f8f9f7",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "10px",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    {getIcon(url) || (
                      <span style={{ fontSize: "10px", color: "#555" }}>
                        N/A
                      </span>
                    )}
                  </a>
                ))}
              </div>
            </div>
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
                  top: "12%", // Ajusta la posición vertical
                  left: "50%", // Ajusta la posición horizontal
                  transform: "translate(-50%, -50%)", // Centra la imagen
                }}
              />
            )}
            <div
              style={{ position: "absolute", top: "22%", textAlign: "center" }}
            >
              <div>
                <div
                  style={{
                    alignItems: "center",
                    fontSize: "11px",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  <p style={{ fontSize: "18px" }}>Peluqueria</p>
                  <p>
                    Abierto de {diaDesde} a {diaHasta}
                  </p>
                  <p>
                    {horaInicio} - {horaFin}
                  </p>
                </div>
              </div>
            </div>
            {isActive && (
              <button
                style={{
                  width: "80%",
                  padding: "10px",
                  borderRadius: "10px",
                  border: "none",
                  marginTop: "-12px", // Esto mueve los botones hacia arriba
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)", // Sombra hacia abajo
                  fontWeight: "bold",
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
                  borderRadius: "10px",
                  border: "none",
                  marginTop: "5px", // Esto mueve los botones hacia arriba
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)", // Sombra hacia abajo
                  fontWeight: "bold",
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
          gap: "10px",
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
          <div style={{ marginTop: "8px", fontSize: "14px" }}>
            <span>
              Elige imagenes y haz click en la que desees añadir a la plantilla
            </span>
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
        {/* Agenda */}
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
          <p style={{ fontSize: "14px" }}>
            Añade tu disponibilidad horaria para los turnos
          </p>
          <div>
            <div
              style={{
                margin: "5px",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#dddfdb",
                borderRadius: "10px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)", // Sombra hacia abajo
              }}
            >
              <label
                htmlFor="horarioInicio"
                style={{ margin: "0 10px", color: "gray" }}
              >
                Horarios
              </label>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ margin: "5px" }}>
                  <label
                    htmlFor="desde"
                    style={{ margin: "0 5px", fontSize: "14px" }}
                  >
                    Desde
                  </label>
                  <select
                    id="horarioInicio"
                    value={horaInicio}
                    onChange={(e) => setHoraInicio(e.target.value)}
                    style={{
                      marginBottom: "10px",
                      marginLeft: "5px",
                      borderRadius: "5px",
                      border: "none",
                    }}
                  >
                    <option value="06:00">6:00 am</option>
                    <option value="07:00">7:00 am</option>
                    <option value="08:00">8:00 am</option>
                    <option value="09:00">9:00 am</option>
                    <option value="10:00">10:00 am</option>
                    <option value="11:00">11:00 am</option>
                    <option value="12:00">12:00 am</option>
                    <option value="13:00">13:00 pm</option>
                    <option value="14:00">14:00 pm</option>
                    <option value="15:00">15:00 pm</option>
                    <option value="16:00">16:00 pm</option>
                    <option value="17:00">17:00 pm</option>
                    <option value="18:00">18:00 pm</option>
                    <option value="19:00">19:00 pm</option>
                    <option value="20:00">20:00 pm</option>
                    <option value="21:00">21:00 pm</option>
                    <option value="22:00">22:00 pm</option>
                    <option value="23:00">23:00 pm</option>
                    {/* Agrega más opciones de horario según lo necesites */}
                  </select>
                </div>
                <div style={{ marginLeft: "5px" }}>
                  <label style={{ margin: "0 5px", fontSize: "14px" }}>
                    Hasta
                  </label>
                  <select
                    id="horarioFin"
                    value={horaFin}
                    onChange={(e) => setHoraFin(e.target.value)} // Actualiza el estado cuando cambia el valor
                    style={{
                      marginBottom: "10px",
                      marginLeft: "5px",
                      borderRadius: "5px",
                      border: "none",
                    }}
                  >
                    <option value="06:00">6:00 am</option>
                    <option value="07:00">7:00 am</option>
                    <option value="08:00">8:00 am</option>
                    <option value="09:00">9:00 am</option>
                    <option value="10:00">10:00 am</option>
                    <option value="11:00">11:00 am</option>
                    <option value="12:00">12:00 am</option>
                    <option value="13:00">13:00 pm</option>
                    <option value="14:00">14:00 pm</option>
                    <option value="15:00">15:00 pm</option>
                    <option value="16:00">16:00 pm</option>
                    <option value="17:00">17:00 pm</option>
                    <option value="18:00">18:00 pm</option>
                    <option value="19:00">19:00 pm</option>
                    <option value="20:00">20:00 pm</option>
                    <option value="21:00">21:00 pm</option>
                    <option value="22:00">22:00 pm</option>
                    <option value="23:00">23:00 pm</option>
                    {/* Agrega más opciones de horario según lo necesites */}
                  </select>
                </div>
              </div>
            </div>
            <div
              style={{
                margin: "5px",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#dddfdb",
                borderRadius: "10px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)", // Sombra hacia abajo
              }}
            >
              <label
                htmlFor="diasDisponibles"
                style={{ margin: "0 10px", color: "gray" }}
              >
                Días disponibles para reservar
              </label>

              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ margin: "5px" }}>
                  <label
                    htmlFor="desde"
                    style={{ margin: "0 5px", fontSize: "14px" }}
                  >
                    Desde
                  </label>
                  <select
                    id="desde"
                    value={diaDesde}
                    name="desde"
                    onChange={(e) => setDiaDesde(e.target.value)} // Actualiza el estado cuando cambia el valor
                    style={{
                      marginBottom: "10px",
                      marginLeft: "5px",
                      borderRadius: "5px",
                      border: "none",
                    }}
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

                <div style={{ marginLeft: "5px", fontSize: "14px" }}>
                  <label htmlFor="hasta">Hasta</label>
                  <select
                    id="hasta"
                    value={diaHasta} // Asocia el valor del estado
                    name="hasta"
                    onChange={(e) => setDiaHasta(e.target.value)} // Actualiza el estado cuando cambia el valor
                    style={{
                      marginBottom: "10px",
                      marginLeft: "5px",
                      borderRadius: "5px",
                      border: "none",
                    }}
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
                margin: "5px",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#dddfdb",
                borderRadius: "10px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)", // Sombra hacia abajo
              }}
            >
              <label
                htmlFor="diasDisponibles"
                style={{ margin: "0 10px", color: "gray" }}
              >
                Días no disponibles
              </label>

              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ margin: "5px" }}>
                  <label
                    htmlFor="desde"
                    style={{ margin: "0 5px", fontSize: "14px" }}
                  >
                    Desde
                  </label>
                  <select
                    id="desde"
                    name="desde"
                    style={{
                      marginBottom: "10px",
                      marginLeft: "5px",
                      borderRadius: "5px",
                      border: "none",
                    }}
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

                <div style={{ marginLeft: "5px", fontSize: "14px" }}>
                  <label htmlFor="hasta">Hasta</label>
                  <select
                    id="hasta"
                    name="hasta"
                    style={{
                      marginBottom: "10px",
                      marginLeft: "5px",
                      borderRadius: "5px",
                      border: "none",
                    }}
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
              Redes Sociales
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
                checked={isSocialActive}
                onChange={() => setIsSocialActive(!isSocialActive)}
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
                  backgroundColor: isSocialActive ? "#4CAF50" : "#ccc", // Color verde si está activado
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
                  left: isSocialActive ? "26px" : "4px", // Movimiento de la bolita
                  bottom: "4px",
                  backgroundColor: "#fff",
                  transition: "0.4s",
                }}
              ></span>
            </div>
          </div>
          <div>
            <input
              type="text"
              placeholder="URL"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)} // Actualiza el valor del input
              onKeyDown={handleKeyDown}
              disabled={!isSocialActive}
              style={{
                marginTop: "5px",
                marginRight: "4px",
                width: "83%",
                height: "27px",
                border: "none",
                backgroundColor: !isSocialActive ? "#e0e0e0" : "#dddfdb", // Cambia el color según el estado
                borderRadius: "5px",
                cursor: !isSocialActive ? "not-allowed" : "text", // Cursor de no permitido cuando está deshabilitado
              }}
            />{" "}
            <button
              onClick={handleAddSocialLink}
              disabled={!isSocialActive}
              style={{
                width: "13%",
                height: "30px",
                border: "none",
                backgroundColor: "#dddfdb",
                borderRadius: "15px",
                cursor: "pointer",
              }}
            >
              Añadir
            </button>
          </div>
          <hr
            style={{
              border: "1px solid #000",
              width: "100%",
              marginBottom: "-2px",
              marginTop: "15px",
            }}
          ></hr>
          <p>Redes Sociales</p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              flexWrap: "wrap",
              gap: "10px",
              width: "100%",
              marginTop: "-10px",
            }}
          >
            <div
              style={{
                width: "50px",
                height: "50px",
                backgroundColor: "#f8f9f7",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FaFacebook style={{ width: "50%", height: "50%" }} />
            </div>
            <div
              style={{
                width: "50px",
                height: "50px",
                backgroundColor: "#f8f9f7",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FaInstagram style={{ width: "50%", height: "50%" }} />
            </div>
            <div
              style={{
                width: "50px",
                height: "50px",
                backgroundColor: "#f8f9f7",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FaTelegramPlane style={{ width: "50%", height: "50%" }} />
            </div>
            <div
              style={{
                width: "50px",
                height: "50px",
                backgroundColor: "#f8f9f7",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FaWhatsapp style={{ width: "50%", height: "50%" }} />
            </div>
            <div
              style={{
                width: "50px",
                height: "50px",
                backgroundColor: "#f8f9f7",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <RiTwitterXLine style={{ width: "50%", height: "50%" }} />
            </div>
            <div
              style={{
                width: "50px",
                height: "50px",
                backgroundColor: "#f8f9f7",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <SiMyspace style={{ width: "50%", height: "50%" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



export default EditPage;

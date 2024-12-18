import React, { useState, useEffect } from "react";
import "../styles/EditPage.css";
import "../styles/global.css";
import {
  FaFacebook,
  FaInstagram,
  FaTelegramPlane,
  FaWhatsapp,
} from "react-icons/fa";
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
  const [diaDesde, setDiaDesde] = useState("lunes");
  const [diaHasta, setDiaHasta] = useState("lunes");
  const [socialLinks, setSocialLinks] = useState([]); // Estado para las redes sociales
  const [inputValue, setInputValue] = useState(""); // Estado para el valor del input
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");
  const [opcionesHorario, setOpcionesHorario] = useState([]);

  function ejemploDeCambio() {
    let mensaje = "Esto es un cambio de prueba para CodeRabbit";
    console.log(mensaje);
  }

  ejemploDeCambio();
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
    if (url.includes("facebook"))
      return <FaFacebook style={{ width: "50%", height: "50%" }} />;
    if (url.includes("instagram"))
      return <FaInstagram style={{ width: "50%", height: "50%" }} />;
    if (url.includes("telegram") || url.includes("t.me"))
      return <FaTelegramPlane style={{ width: "50%", height: "50%" }} />;
    if (url.includes("whatsapp"))
      return <FaWhatsapp style={{ width: "50%", height: "50%" }} />;
    if (url.includes("twitter") || url.includes("x.com"))
      return <RiTwitterXLine style={{ width: "50%", height: "50%" }} />;
    if (url.includes("myspace"))
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

    const horasDisponibles = [];
    for (let i = 8; i <= 18; i++) {
      // Crear las horas en formato 24 horas (8:00, 9:00, ...).
      const horaFormateada = `${i}:00`;
      horasDisponibles.push(horaFormateada);
    }

    // Asignar las horas al estado
    setOpcionesHorario(horasDisponibles); // Aquí es donde debes actualizar el estado

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
    <div className="div1">
      {/* Silueta del móvil */}
      <div className="div2">
        <div
          className="fondo"
          style={{
            background: `linear-gradient(to bottom, ${selectedColor}, ${secondColor})`,
          }}
        >
          {/* Imagen seleccionada */}
          {selectedImageForMobile && (
            <img
              className="imgselec"
              src={selectedImageForMobile}
              alt="Imagen seleccionada"
            />
          )}

          {/* Contenedor para imágenes en la parte inferior */}
          <div className="imgcontainerEP">
            {/* Imagenes debajo */}
            <div className="imglist">
              {socialLinks.map((url, index) => (
                <a
                  key={index}
                  href={url} // Enlace a la URL ingresada
                  target="_blank" // Abre en una nueva pestaña
                  rel="noopener noreferrer" // Seguridad
                  className="social"
                >
                  {getIcon(url) || (
                    <span style={{ fontSize: "10px", color: "#555" }}>N/A</span>
                  )}
                </a>
              ))}
            </div>
          </div>
          {/* Imagen de perfil dentro de la silueta */}
          {profileImage && (
            <img src={profileImage} alt="Imagen de perfil" className="imgprf" />
          )}
          <div
            style={{ position: "absolute", top: "22%", textAlign: "center" }}
          >
            <div>
              <div className="title">
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
          {isActive && <button className="btnservicios">Servicios</button>}
          {isScheduleActive && (
            <button className="btnagendar">Agendar Turnos</button>
          )}
        </div>
      </div>

      {/* Panel lateral */}
      <div className="div1PL">
        {/* Perilla (interruptor) */}
        <div className="div2PL">
          <div style={{ display: "flex", alignItems: "center" }}>
            <label htmlFor="buttonSwitch" style={{ marginRight: "10px" }}>
              Servicios
            </label>
            <div className="div3PL">
              <input
                type="checkbox"
                id="buttonSwitch"
                checked={isActive}
                onChange={handleSwitchChange}
                className="btnswitch"
              />
              <span
                style={{ backgroundColor: isActive ? "#4CAF50" : "#ccc" }}
                className="btnverde"
              ></span>

              <span
                style={{ left: isActive ? "26px" : "4px" }} // Movimiento de la bolita
                className="bolita"
              ></span>
            </div>
          </div>

          <div style={{ marginTop: "8px", fontSize: "14px" }}>
            <span>
              Elige imagenes y haz click en la que desees añadir a la plantilla
            </span>
          </div>
          {/* Contenedor de miniaturas */}
          <div className="mincontainer">
            {/* Miniatura con "+" para añadir */}
            <label htmlFor="fileUpload" className="minmas">
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
                  backgroundImage: `url(${image})`,
                  border:
                    selectedImageForMobile === image
                      ? "2px solid blue"
                      : "none",
                }}
                className="imgmas"
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
          <div className="schedule-container">
            <label htmlFor="scheduleSwitch">Agendar turnos</label>
            <div className="switch-container">
              <input
                type="checkbox"
                id="scheduleSwitch"
                checked={isScheduleActive}
                onChange={() => setIsScheduleActive(!isScheduleActive)}
                className="switch-input"
              />
              <span
                className="switch-background"
                style={{
                  backgroundColor: isScheduleActive ? "#4CAF50" : "#ccc",
                }}
              />
              <span
                className="switch-circle"
                style={{ left: isScheduleActive ? "26px" : "4px" }}
              />
            </div>
          </div>
          <p style={{ fontSize: "14px" }}>
            Añade tu disponibilidad horaria para los turnos
          </p>
          <div className="wtfdiv">
            <div className="container">
              <label
                htmlFor="horarioInicio"
                style={{ margin: "0 10px", color: "gray" }}
              >
                Horarios
              </label>
              <div className="inner-container">
                <div className="section" style={{ margin: "5px" }}>
                  <label
                    htmlFor="desde"
                    style={{ margin: "0 5px", fontSize: "14px" }}
                    className="label-small"
                  >
                    Desde
                  </label>
                  <select
                    id="horarioInicio"
                    value={horaInicio}
                    onChange={(e) => setHoraInicio(e.target.value)}
                    className="select-box"
                  >
                    {opcionesHorario.map((hora, index) => (
                      <option key={index} value={hora}>
                        {hora}
                      </option>
                    ))}
                  </select>

                  <select
                    id="horarioFin"
                    value={horaFin}
                    onChange={(e) => setHoraFin(e.target.value)}
                    className="select-box"
                  >
                    {opcionesHorario.map((hora, index) => (
                      <option key={index} value={hora}>
                        {hora}
                      </option>
                    ))}
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
                boxShadow: "0 4px 2px rgba(0, 0, 0, 0.2)", // Sombra hacia abajo
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
                boxShadow: "0 4px 2px rgba(0, 0, 0, 0.2)", // Sombra hacia abajo
              }}
            ></div>
          </div>
        </div>
        {/* Perilla (interruptor) */}
        <div className="social-container">
          <div className="switch-section">
            <label htmlFor="buttonSwitch" style={{ marginRight: "10px" }}>
              Redes Sociales
            </label>
            <div className="switch-container">
              <input
                type="checkbox"
                id="buttonSwitch"
                checked={isSocialActive}
                onChange={() => setIsSocialActive(!isSocialActive)}
                className="switch-input"
              />
              <span
                className="switch-background"
                style={{ backgroundColor: isSocialActive ? "#4CAF50" : "#ccc" }}
              />
              <span
                className="switch-circle"
                style={{ left: isSocialActive ? "26px" : "4px" }}
              />
            </div>
          </div>

          <div className="input-container">
            <input
              type="text"
              placeholder="URL"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={!isSocialActive}
              style={{
                backgroundColor: !isSocialActive ? "#e0e0e0" : "#dddfdb",
                cursor: !isSocialActive ? "not-allowed" : "text",
              }}
            />
            <button onClick={handleAddSocialLink} disabled={!isSocialActive}>
              Añadir
            </button>
          </div>

          <hr className="divider" />
          <p className="social-text">Redes Sociales</p>

          <div className="social-icons">
            <div className="social-icon">
              <FaFacebook />
            </div>
            <div className="social-icon">
              <FaInstagram />
            </div>
            <div className="social-icon">
              <FaTelegramPlane />
            </div>
            <div className="social-icon">
              <FaWhatsapp />
            </div>
            <div className="social-icon">
              <RiTwitterXLine />
            </div>
            <div className="social-icon">
              <SiMyspace />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPage;

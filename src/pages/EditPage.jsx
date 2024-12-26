import React, { useState, useEffect } from "react";
import "../styles/Carousel.css"; // Archivo CSS para estilos
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

// Importar los componentes de las siluetas
import Silhouette1 from "../components/Silhouette1";
import Silhouette2 from "../components/Silhouette2";
import Silhouette3 from "../components/Silhouette3";
import Silhouette4 from "../components/Silhouette4";

const EditPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState("#ffffff"); // Color predeterminado
  const [secondColor, setSecondColor] = useState("#ffffff");
  const [images, setImages] = useState([]);
  const [isSwitch1Active, setIsSwitch1Active] = useState(false);
  const [isSwitch2Active, setIsSwitch2Active] = useState(false);
  const [isSwitch3Active, setIsSwitch3Active] = useState(false);
  const [socialUrl, setSocialUrl] = useState(""); // Estado para almacenar la URL ingresada
  const [socialIcons, setSocialIcons] = useState([]); // Estado para almacenar los iconos de redes sociales
  const [selectedImage, setSelectedImage] = useState(null); // Imagen seleccionada para la silueta
  const [imageFit, setImageFit] = useState("cover"); // Valor inicial: "cover"
  const [timeInterval, setTimeInterval] = useState("30"); // Intervalo de tiempo: 20, 30, 60
  const [openHour, setOpenHour] = useState(12); // Hora de apertura entre 0 y 24
  const [closeHour, setCloseHour] = useState("22:00");
  const [openDays, setOpenDays] = useState([]); // Días seleccionados

  const updateFinalData = (updatedData) => {
    setFinalData((prevData) => ({
      ...prevData,
      ...updatedData,
    }));
  };

  const handleCreate = () => {
    console.log("Datos finales generados:", finalData);
    localStorage.setItem("userData", JSON.stringify(finalData)); // Guarda en localStorage
    alert("Interfaz creada con éxito!");
  };

  const [finalData, setFinalData] = useState({
    silhouette1: {},
    silhouette2: {},
    silhouette3: {},
    silhouette4: {},
  });

  const generateTimeOptions = () => {
    const times = [];
    let currentTime = new Date();
    currentTime.setHours(6, 0, 0, 0); // Hora inicial: 06:00
    const endTime = new Date();
    endTime.setHours(22, 0, 0, 0); // Hora final: 22:00

    while (currentTime <= endTime) {
      const hours = currentTime.getHours().toString().padStart(2, "0");
      const minutes = currentTime.getMinutes().toString().padStart(2, "0");
      times.push(`${hours}:${minutes}`);
      currentTime.setMinutes(currentTime.getMinutes() + parseInt(timeInterval));
    }
    return times;
  };

  const timeOptions = generateTimeOptions();

  const addSocialIcon = (url) => {
    if (!url) {
      alert("Por favor, ingresa una URL válida.");
      return;
    }
    setSocialIcons((prevIcons) => [...prevIcons, url]); // Agrega la URL al estado
  };

  const handleSwitch1Change = (event) => {
    setIsSwitch1Active(event.target.checked);
  };

  const handleAddImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Crear una URL para la imagen seleccionada
      setImages((prevImages) => [...prevImages, imageUrl]); // Agregar la imagen al array
    }
  };

  const silhouettes = [
    <Silhouette1
    updateFinalData={updateFinalData}
      showButton={isSwitch1Active}
      showButton2={isSwitch2Active}
      socialUrl={socialUrl}
      showSocialInput={isSwitch3Active}
      selectedImage={selectedImage}
      imageFit={imageFit}
      timeInterval={timeInterval} // Intervalo de tiempo
      openHour={openHour} // Hora de apertura
      closeHour={closeHour}
      openDays={openDays} // Días seleccionados
    />, // Primer componente de silueta
    <Silhouette2 selectedImage={selectedImage} images={images} updateFinalData={updateFinalData}/>, // Segundo componente de silueta
    <Silhouette3 updateFinalData={updateFinalData}/>, // Tercer componente de silueta
    <Silhouette4 updateFinalData={updateFinalData}/>, // Cuarto componente de silueta
  ];

  // Lista de colores de fondo de las siluetas
  const backgrounds = ["#FFCDD2", "#C8E6C9", "#BBDEFB", "#D1C4E9"];

  // Función para cambiar al siguiente índice
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
  };

  // Función para cambiar al índice anterior
  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + backgrounds.length) % backgrounds.length
    );
  };

  useEffect(() => {
    // Recupera la imagen y el color del localStorage

    const storedColor = localStorage.getItem("selectedColor");
    const storedSecondColor = localStorage.getItem("secondColor");

    if (storedColor) {
      setSelectedColor(storedColor); // Actualiza el color
    }
    if (storedSecondColor) {
      setSecondColor(storedSecondColor); // Asegúrate de asignar el segundo color
    }
  }, []);

  return (
    <div className="carousel">
      <div className="carousel-container">
        {silhouettes.map((silhouette, index) => (
          <div
            key={index}
            className={`slide ${index === currentIndex ? "active" : ""}`}
            style={{
              display: index === currentIndex ? "block" : "none",
            }}
          >
            <div className="slide-content">
              {/* Caja izquierda */}
              <div className="left-box">
                <div className="switch-container">
                  <div
                    style={{
                      marginTop: "10px",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <label className="switch">
                      <input type="checkbox" onChange={handleSwitch1Change} />
                      <span className="slider"></span>
                    </label>
                    <span>Switch 1</span>
                  </div>
                  <div>
                    <label htmlFor="">Añade imagenes</label>
                  </div>{" "}
                  <select
                    id="image-fit-selector"
                    value={imageFit}
                    onChange={(e) => setImageFit(e.target.value)} // Actualiza el estado con la selección
                    className="image-fit-selector"
                  >
                    <option value="cover">Rellenar (cover)</option>
                    <option value="contain">Contener (contain)</option>
                    <option value="fill">Estirar (fill)</option>
                    <option value="none">Sin ajustar (none)</option>
                    <option value="scale-down">
                      Reducir si es necesario (scale-down)
                    </option>
                  </select>
                  <div className="image-uploader-container">
                    {/* Botón para agregar imágenes */}

                    {/* Contenedor para mostrar las imágenes */}
                    <div id="image-gallery" className="image-gallery">
                      <div className="imgcontainer">
                        <label className="add-image-button">
                          +
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            className="image-input"
                            onChange={handleAddImage}
                          />
                        </label>
                        <div>
                          {images.map((image, index) => (
                            <img
                              key={index}
                              src={image}
                              alt={`Uploaded ${index + 1}`}
                              className="image-thumbnail"
                              onClick={() => setSelectedImage(image)}
                              style={{
                                cursor: "pointer",
                                border:
                                  selectedImage === image
                                    ? "2px solid blue"
                                    : "none", // Resalta la imagen seleccionada
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="switch-container">
                  <div
                    style={{
                      marginTop: "10px",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={isSwitch2Active}
                        onChange={() => setIsSwitch2Active((prev) => !prev)}
                      />
                      <span className="slider"></span>
                    </label>
                    <span>Switch 2</span>
                  </div>

                  {/* Inputs debajo de Switch 2 */}
                  <div className="inputs-container">
                    {/* Input para elegir el intervalo de tiempo */}
                    <div>
                      <label>Fraccionar el horario cada:</label>
                      <select
                        value={timeInterval}
                        onChange={(e) => setTimeInterval(e.target.value)}
                        style={{
                          padding: "4px",
                          marginTop: "10px",
                          height: "20px",
                          fontSize: "10px",
                          width: "100%",
                        }}
                      >
                        <option value="20">Cada 20 minutos</option>
                        <option value="30">Cada 30 minutos</option>
                        <option value="60">Cada 1 hora</option>
                      </select>
                    </div>

                    {/* Input para la hora de apertura (0-24) */}
                    <div className="horascontainer">
                      <div>
                        <label style={{fontSize:"12px"}}>Hora de apertura:</label>
                        <select
                          value={openHour}
                          onChange={(e) => setOpenHour(e.target.value)}
                          style={{ padding: "2px", marginTop: "5px",height:"18px", fontSize:"11px", width:"100%" }}
                        >
                          {timeOptions.map((time) => (
                            <option key={time} value={time}>
                              {time}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label style={{fontSize:"12px"}}>Hora de cierre:</label>
                        <select
                          value={closeHour}
                          onChange={(e) => setCloseHour(e.target.value)}
                          style={{ padding: "2px", marginTop: "5px",height:"18px", fontSize:"11px", width:"100%" }}
                        >
                          {timeOptions.map((time) => (
                            <option key={time} value={time}>
                              {time}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    {/* Input para elegir los dos días de apertura */}
                    <div>
                      <label>Elige 2 días de apertura:</label>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <select
                          value={openDays[0] || ""}
                          onChange={(e) =>
                            setOpenDays([e.target.value, openDays[1]])
                          }
                          className="openDays"
                        >
                          <option value="">Día 1</option>
                          <option value="Lunes">Lunes</option>
                          <option value="Martes">Martes</option>
                          <option value="Miércoles">Miércoles</option>
                          <option value="Jueves">Jueves</option>
                          <option value="Viernes">Viernes</option>
                          <option value="Sábado">Sábado</option>
                          <option value="Domingo">Domingo</option>
                        </select>

                        <select
                          value={openDays[1] || ""}
                          onChange={(e) =>
                            setOpenDays([openDays[0], e.target.value])
                          }
                          className="days"
                        >
                          <option value="">Día 2</option>
                          <option value="Lunes">Lunes</option>
                          <option value="Martes">Martes</option>
                          <option value="Miércoles">Miércoles</option>
                          <option value="Jueves">Jueves</option>
                          <option value="Viernes">Viernes</option>
                          <option value="Sábado">Sábado</option>
                          <option value="Domingo">Domingo</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="switch-container">
                  <div
                    style={{
                      marginTop: "10px",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={isSwitch3Active}
                        onChange={() => setIsSwitch3Active((prev) => !prev)}
                      />
                      <span className="slider"></span>
                    </label>
                    <span>Switch 3</span>
                  </div>
                  <div>
                    {/* Mostrar el input y el botón solo si el switch está activo */}
                    {isSwitch3Active && (
                      <div
                        style={{
                          marginTop: "10px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {/* Input para ingresar la URL */}
                        <input
                          type="text"
                          value={socialUrl}
                          onChange={(e) => setSocialUrl(e.target.value)} // Actualizar el estado con la URL ingresada
                          placeholder="Ingresa URL de red social"
                          className="inputurl"
                        />

                        {/* Botón para agregar iconos */}
                        <button
                          onClick={() => addSocialIcon(socialUrl)} // Lógica para añadir iconos
                          className="icnadd"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Silueta del iPhone */}
              <div
                className="iphone-silhouette"
                style={{
                  background: `linear-gradient(to bottom, ${selectedColor}, ${secondColor})`,
                }}
              >
                {" "}
                {silhouette}
              </div>

              {/* Caja derecha */}
              <div className="right-box">
                <p>Contenido derecha</p>
                <button style={{height:"40px", width:"100%" , backgroundColor:"red", cursor:"pointer"}} onClick={handleCreate}>CREAR</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="prev" onClick={prevSlide}>
        <IoIosArrowBack />
      </button>
      <button className="next" onClick={nextSlide}>
        <IoIosArrowForward />
      </button>
    </div>
  );
};

export default EditPage;

import React, { useState, useEffect } from "react";
import "../styles/Silhouette3.css"; // Asegúrate de tener estilos específicos

const Silhouette3 = ({ updateFinalData }) => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  // Simulación de los días y números
  const days = [
    { day: "Lun", date: 11 },
    { day: "Mar", date: 12 },
    { day: "Mié", date: 13 },
    { day: "Jue", date: 14 },
    { day: "Vie", date: 15 },
    { day: "Sáb", date: 16 },
    { day: "Dom", date: 17 },
  ];

  const times = [
    "08:00 am",
    "09:00 am",
    "10:00 am",
    "11:00 am",
    "12:00 pm",
    "01:00 pm",
    "02:00 pm",
  ];

  useEffect(() => {
    // Solo actualizamos los datos si hay un día y hora seleccionados
    if (selectedDay && selectedTime) {
      updateFinalData({
        selectedDay,
        selectedTime,
        profileImage: "ruta/a/imagen-de-perfil.jpg", // Aquí puedes reemplazar con datos reales
        socialIcons: ["facebook", "instagram"], // Cambiar según lo que el usuario haya seleccionado
        openHours: [{ day: selectedDay.day, open: selectedTime }],
        // Aquí puedes agregar más datos según lo que necesites enviar
      });
    }
  }, [selectedDay, selectedTime, updateFinalData]); // Dependencias del useEffect

  const handleDayClick = (day) => {
    setSelectedDay(day);
    setSelectedTime(null); // Resetear la hora al seleccionar un nuevo día
  };

  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };

  const handleReservation = () => {
    if (selectedDay && selectedTime) {
      alert(
        `Reserva realizada para ${selectedDay.day} ${selectedDay.date} a las ${selectedTime}`
      );
    } else {
      alert("Por favor, selecciona un día y una hora.");
    }
  };

  return (
    <div className="silhouette3">
      <div className="calendar">
        {days.map((item, index) => (
          <button
            key={index}
            className={`calendar-day ${
              selectedDay?.date === item.date ? "selected" : ""
            }`}
            onClick={() => handleDayClick(item)}
          >
            <span className="day">{item.day}</span>
            <span className="date">{item.date}</span>
          </button>
        ))}
      </div>
      {selectedDay && (  // Asegúrate de que esto esté cerrado correctamente
        <div className="divscontainer">
          <div className="columnturnos1">
            {times.map((time, index) => (
              <div key={index} className="time-slot">
                <label>{time}</label>
                <div
                  className={`vertical-line ${
                    selectedTime === time ? "selected-time" : ""
                  }`}
                  onClick={() => handleTimeClick(time)}
                ></div>
              </div>
            ))}
          </div>
          <div className="columnturnos2">
            <button className="btnagenda" onClick={handleReservation}>
              Agendar turno
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Silhouette3;

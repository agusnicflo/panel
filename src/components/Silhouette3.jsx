import React, { useState, useEffect } from "react";
import "../styles/Silhouette3.css"; // Asegúrate de tener estilos específicos

const Silhouette3 = ({ openHour, closeHour, openDays }) => {
  const [schedule, setSchedule] = useState({
    openHour: openHour,
    closeHour: closeHour,
    openDays: openDays
  });
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



  // Actualizamos el estado del horario cuando cambian los props
  useEffect(() => {
    setSchedule({ openHour, closeHour, openDays });
  }, [openHour, closeHour, openDays]);

  const openDaysArray = schedule.openDays || [];


  return (
    <div className="silhouette3">
      <div className="calendar">
        {days.map((item, index) => (
          <button key={index} className={`calendar-day ${openDaysArray.includes(item.day) ? "open" : ""}`}>
            <span className="day">{item.day}</span>
            <span className="date">{item.date}</span>
          </button>
        ))}
      </div>
      <div className="divscontainer">
        <div className="columnturnos1">
          <label>{openHour} am</label>
          <div className="vertical-line"></div>
          <label>09:00 am</label>
          <div className="vertical-line"></div>
          <label>10:00 am</label>
          <div className="vertical-line"></div>
          <label>09:00 am</label>
          <div className="vertical-line"></div>
          <label>10:00 am</label>
          <div className="vertical-line"></div>
          <label>09:00 am</label>
          <div className="vertical-line"></div>
          <label>{closeHour} am</label>
        </div>
        <div className="columnturnos2">
          <button className="btnagenda">Agendar turno</button>
          <button className="btnagenda">Agendar turno</button>
          <button className="btnagenda">Agendar turno</button>
          <button className="btnagenda">Agendar turno</button>
          <button className="btnagenda">Agendar turno</button>
          <button className="btnagenda">Agendar turno</button>
        </div>
      </div>
    </div>
  );
};

export default Silhouette3;

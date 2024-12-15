import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/Calendar.css"; // Archivo CSS para el diseño
import { MdOutlineWatchLater } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { MdCircle } from "react-icons/md";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Crear las horas del día (de 09:00 a 20:00)
  const hours = Array.from({ length: 12 }, (_, i) => `${i + 9}:00`);

  // Crear los días de la semana a partir de la fecha seleccionada
  const startOfWeek = new Date(
    selectedDate.setDate(selectedDate.getDate() - selectedDate.getDay() + 1)
  ); // Lunes
  const days = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(startOfWeek);
    day.setDate(day.getDate() + i);
    return day.toLocaleDateString("es-ES", {
      weekday: "long",
      day: "numeric",
    });
  });

  return (
    <>
      <div>
        <button className="btnpagos">Pago pendiente <MdCircle style={{color:"red"}} /></button>
        <button className="btnpagos">Pago realizado <MdCircle style={{color:"green"}} /></button>
        <button className="btnpagos">Efectivo <MdCircle style={{color:"orange"}}/></button>
        <button className="btnpagos">Transferencia <MdCircle style={{color:"blue"}}/></button>
      </div>
      <div className="calendar-container">
        {/* Selector de fechas */}
        <div className="date-picker">
          <button className="btnarrow"><IoIosArrowBack /></button>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="dd/MM/yyyy"
            className="date-input"
          />
        <button className="btnarrow"><IoIosArrowForward /></button></div>
        {/* Calendario */}
        <div className="calendar">
          {/* Cabecera con días de la semana */}
          <div className="calendar-header">
            <div className="empty-cell">
              <MdOutlineWatchLater style={{ height: "50px", width: "30px" }} />
            </div>
            {days.map((day, index) => (
              <div key={index} className="header-cell">
                {day}
              </div>
            ))}
          </div>

          {/* Cuerpo con las horas y las intersecciones */}
          <div className="calendar-body">
            {hours.map((hour, rowIndex) => (
              <div key={rowIndex} className="row">
                {/* Columna izquierda con las horas */}
                <div className="hour-cell">{hour}</div>
                {/* Celdas vacías para cada intersección */}
                {days.map((_, colIndex) => (
                  <div key={colIndex} className="cell"></div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Calendar;

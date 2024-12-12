import React from 'react';

const Reservations = () => {
  const reservations = [
    { id: 1, customer: 'Juan Pérez', date: '2024-12-15 14:00', status: 'Pendiente' },
    { id: 2, customer: 'Ana Gómez', date: '2024-12-15 16:00', status: 'Confirmada' },
  ];

  return (
    <div>
      <h1>Gestión de Reservas</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Fecha</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.id}>
              <td>{reservation.id}</td>
              <td>{reservation.customer}</td>
              <td>{reservation.date}</td>
              <td>{reservation.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reservations;
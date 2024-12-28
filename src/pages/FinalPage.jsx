import React, { useState, useEffect } from "react";
import Silhouette1 from "../components/Silhouette1";
import Silhouette2 from "../components/Silhouette2";
import Silhouette3 from "../components/Silhouette3";
import Silhouette4 from "../components/Silhouette4";

const FinalPage = () => {
  const [silhouettes, setSilhouettes] = useState([]);

  useEffect(() => {
    // Leer datos del localStorage
    const savedData = localStorage.getItem("silhouettes");

    // Verificar si los datos existen y si son un arreglo válido
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      if (Array.isArray(parsedData)) {
        setSilhouettes(parsedData);
      } else {
        console.error("Los datos de silhouettes no son un arreglo válido.");
      }
    }
  }, []);

  // Validar que silhouettes es un arreglo antes de mapear
  if (!Array.isArray(silhouettes)) {
    return <p>No se encontraron siluetas disponibles.</p>;
  }

  return (
    <div>
      <h1>Vista del Usuario Final</h1>
      {silhouettes.map((silhouette, index) => {
        switch (silhouette.type) {
          case "Silhouette1":
            return <Silhouette1 key={index} data={silhouette} />;
          case "Silhouette2":
            return <Silhouette2 key={index} data={silhouette} />;
          case "Silhouette3":
            return <Silhouette3 key={index} data={silhouette} />;
          case "Silhouette4":
            return <Silhouette4 key={index} data={silhouette} />;
          default:
            return null;
        }
      })}
    </div>
  );
};

export default FinalPage;

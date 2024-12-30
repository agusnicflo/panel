import React, { createContext, useState } from 'react';

// Crear el contexto
const SilhouetteContext = createContext();

export const SilhouetteProvider = ({ children }) => {
  // Estado para las configuraciones de las siluetas
  const [silhouettes, setSilhouettes] = useState({
    Silhouette1: { elements: [], colors: {}, profileImage: '' },
    Silhouette2: { elements: [], colors: {}, profileImage: '' },
    Silhouette3: { elements: [], colors: {}, profileImage: '' },
    Silhouette4: { elements: [], colors: {}, profileImage: '' },
  });

  // Estado para controlar el modo (admin o usuario)
  const [isAdminMode, setIsAdminMode] = useState(true);

  // Función para alternar entre modos
  const toggleMode = () => {
    setIsAdminMode((prevMode) => !prevMode);
  };

  // Función para actualizar una silueta específica
  const updateSilhouette = (silhouetteKey, newConfig) => {
    setSilhouettes((prevSilhouettes) => ({
      ...prevSilhouettes,
      [silhouetteKey]: {
        ...prevSilhouettes[silhouetteKey],
        ...newConfig,
      },
    }));
  };

  return (
    <SilhouetteContext.Provider
      value={{ silhouettes, updateSilhouette, isAdminMode, toggleMode }}
    >
      {children}
    </SilhouetteContext.Provider>
  );
};

export default SilhouetteContext;
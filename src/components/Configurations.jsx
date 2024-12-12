import React, { useState } from 'react';

const Configurations = () => {
  const [logo, setLogo] = useState(null);
  const [primaryColor, setPrimaryColor] = useState('#000000');

  const handleLogoChange = (event) => {
    setLogo(URL.createObjectURL(event.target.files[0]));
  };

  const handleColorChange = (event) => {
    setPrimaryColor(event.target.value);
  };

  return (
    <div>
      <h1>Configuraciones del Negocio</h1>
      <div>
        <h2>Personalizar Logo</h2>
        <input type="file" onChange={handleLogoChange} />
        {logo && <img src={logo} alt="Logo" width="150" />}
      </div>
      <div>
        <h2>Seleccionar Color Primario</h2>
        <input type="color" value={primaryColor} onChange={handleColorChange} />
      </div>
      <button>Guardar Configuraciones</button>
    </div>
  );
};

export default Configurations;
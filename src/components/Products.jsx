import React, { useState } from 'react';

const Products = () => {
  const [products, setProducts] = useState([
    { name: 'Hamburguesa Clásica', price: 10 },
    { name: 'Papas Fritas', price: 3 },
  ]);

  return (
    <div>
      <h1>Gestión de Productos/Menu</h1>
      <ul>
        {products.map((product, index) => (
          <li key={index}>{product.name} - ${product.price}</li>
        ))}
      </ul>
      <button>Añadir Producto</button>
    </div>
  );
};

export default Products;
import React, { useState, useCallback } from "react";

export default function ProductList() {
  const [products, setProducts] = useState(["Jabłko", "Gruszka", "Banan"]);

  const removeProduct = useCallback((item) => {
    setProducts(prev => prev.filter(p => p !== item));
  }, []);

  return (
    <div>
      <ul>
        {products.map(p => (
          <li key={p}>
            {p} <button onClick={() => removeProduct(p)}>Usuń</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

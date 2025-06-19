import React from "react";
import Exercise1 from "./Exercise1";
import Exercise2 from "./Exercise2";
import Exercise3 from "./Exercise3";
import ProductList from "./ProductList";

function App() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Lab 9 – useCallback</h1>

      <h2>Ćwiczenie 1: Referencja funkcji</h2>
      <Exercise1 />

      <h2>Ćwiczenie 2: Nowa referencja co render</h2>
      <Exercise2 />

      <h2>Ćwiczenie 3: useCallback dla stabilnej referencji</h2>
      <Exercise3 />

      <h2>Ćwiczenie 4: Lista produktów z useCallback</h2>
      <ProductList />
    </div>
  );
}

export default App;

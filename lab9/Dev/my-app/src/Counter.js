import React from "react";

export default function Counter({ onLog }) {
  console.log("Counter zrenderowany");
  return <button onClick={onLog}>Pokaż licznik</button>;
}

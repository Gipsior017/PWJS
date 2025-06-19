import React from "react";
import ClickCounter from "./ClickCounter";
import PrimeCalculator from "./PrimeCalculator";
import FormReducer from "./FormReducer";
import { ThemeProvider } from "./ThemeContext";
import ThemeSwitcher from "./ThemeSwitcher";
import LayoutEffectExample from "./LayoutEffectExample";

export default function App() {
  return (
    <div style={{ fontFamily: "Arial", padding: "20px" }}>
      <h1>Lab 10 – React Hooki</h1>

      <h2>1. useRef – licznik kliknięć bez renderowania</h2>
      <ClickCounter />

      <h2>2. useMemo – zliczanie liczb pierwszych</h2>
      <PrimeCalculator />

      <h2>3. useReducer – formularz</h2>
      <FormReducer />

      <h2>4. useContext – przełączanie motywu</h2>
      <ThemeProvider>
        <ThemeSwitcher />
      </ThemeProvider>

      <h2>5. useLayoutEffect – pomiar wysokości</h2>
      <LayoutEffectExample />
    </div>
  );
}

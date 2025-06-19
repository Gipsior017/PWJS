import { useTheme } from "./ThemeContext";

export default function ThemeSwitcher() {
  const { dark, toggleTheme } = useTheme();

  return (
    <div style={{ background: dark ? "#333" : "#fff", color: dark ? "#fff" : "#000", padding: "10px" }}>
      <button onClick={toggleTheme}>Przełącz motyw</button>
    </div>
  );
}

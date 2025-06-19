import { useEffect, useState } from "react";
import Quiz from "./Quiz";
import Leaderboard from "./Leaderboard";
import "./App.css";

function App() {
  const [screen, setScreen] = useState("menu");
  const [nickname, setNickname] = useState("");
  const [darkMode, setDarkMode] = useState(() =>
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "light";
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setDarkMode(savedTheme === "dark");
    }
  }, []);

  const startQuiz = () => {
    if (nickname.trim()) {
      setScreen("quiz");
    } else {
      alert("Podaj swój nick, kapitanie!");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      {/* Przełącznik motywu */}
      <div style={{ position: "absolute", top: 20, right: 20 }}>
        <label className="toggle-switch">
  <input
    type="checkbox"
    checked={darkMode}
    onChange={() => setDarkMode(!darkMode)}
  />
  <span className="slider">
    <span className="icon moon">🌙</span>
    <span className="icon sun">☀️</span>
  </span>
</label>

      </div>

      <h1>Wielki Quiz Lotniczy</h1>

      {screen === "menu" && (
        <>
          <input
            type="text"
            placeholder="Podaj swój nick"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            style={{ padding: "0.5rem", marginBottom: "1rem" }}
          />
          <div>
            <button onClick={startQuiz} style={{ margin: "0.5rem" }}>
              Rozpocznij quiz
            </button>
            <button onClick={() => setScreen("leaderboard")} style={{ margin: "0.5rem" }}>
              Tablica wyników
            </button>
          </div>
        </>
      )}

      {screen === "quiz" && <Quiz nickname={nickname} onBack={() => setScreen("menu")} />}
      {screen === "leaderboard" && <Leaderboard onBack={() => setScreen("menu")} />}
      {screen === "answers" && <QuestionList onBack={() => setScreen("menu")} />}
    </div>
  );
}

export default App;

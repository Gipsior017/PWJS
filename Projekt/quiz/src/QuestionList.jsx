// QuestionList.jsx
import { useEffect, useState } from "react";

export default function QuestionList({ onBack }) {
  const [questions, setQuestions] = useState([]);
  const [openQuestions, setOpenQuestions] = useState([]);

  useEffect(() => {
    fetch("/pytania.json")
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data.Questions || []);
        setOpenQuestions(data.open_questions || []);
      })
      .catch((err) => console.error("Błąd ładowania pytań:", err));
  }, []);

  return (
    <div style={{ textAlign: "left", maxWidth: "700px", margin: "0 auto" }}>
      <h2>Pytania i poprawne odpowiedzi</h2>
      <button onClick={onBack} style={{ marginBottom: "1rem" }}>⬅️ Wróć</button>
      <ul>
        {questions.map((q, index) => (
          <li key={index} style={{ marginBottom: "2rem" }}>
            <strong>{index + 1}. {q.pytanie}</strong>
            {q.photo && (
              <div>
                <img
                  src={`/${q.photo}`}
                  alt="obraz"
                  style={{ maxWidth: "100%", height: "auto", margin: "0.5rem 0" }}
                />
              </div>
            )}
            {q.answers ? (
              <ul>
                {Object.entries(q.answers).map(([key, val]) => (
                  <li
                    key={key}
                    style={{
                      color: key === q.poprawna ? "lightgreen" : "white",
                      fontWeight: key === q.poprawna ? "bold" : "normal"
                    }}
                  >
                    <strong>{key.toUpperCase()}.</strong> {val}
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ color: "lightgreen" }}>Odpowiedź: {q.poprawna}</p>
            )}
          </li>
        ))}
      </ul>

      {openQuestions.length > 0 && (
        <>
          <h2>Pytania otwarte</h2>
          <ul>
            {openQuestions.map((q, index) => (
              <li key={index} style={{ marginBottom: "2rem" }}>
                <strong>{questions.length + index + 1}. {q.pytanie}</strong>
                <p style={{ color: "lightgreen" }}>Odpowiedź: {q.poprawna}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

import { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

const shuffleArray = (arr) => [...arr].sort(() => Math.random() - 0.5);

export default function Quiz({ nickname, onBack }) {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [inputAnswer, setInputAnswer] = useState("");

  useEffect(() => {
     fetch("/pytania.json")
      .then((res) => res.json())
      .then((data) => {
        const closed = (data.Questions || []).map((q) => {
          const entries = Object.entries(q.answers);
          const shuffledAnswers = shuffleArray(entries);
          return { ...q, shuffledAnswers, open: false };
        });

        const open = (data.open_questions || []).map((q) => ({ ...q, open: true }));

        const combined = shuffleArray([...closed, ...open]).slice(0, 15);
        setQuestions(combined);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Błąd ładowania JSON:", error);
        setLoading(false);
      });
  }, []);

  const handleAnswer = (answer) => {
    if (selected !== null) return;

    const q = questions[current];
    let isCorrect = false;

    if (q.open) {
      isCorrect = answer.trim().toLowerCase() === q.poprawna.trim().toLowerCase();
    } else {
      isCorrect = answer === q.poprawna;
      setSelected(answer);
    }

    const newScore = isCorrect ? score + 1 : score;

    setTimeout(() => {
      if (current + 1 < questions.length) {
        setCurrent((prev) => prev + 1);
        setSelected(null);
        setInputAnswer("");
        setScore(newScore);
      } else {
        setScore(newScore);
        setFinished(true);
        saveResult(newScore);
      }
    }, 800);
  };

  const saveResult = async (finalScore) => {
    try {
      await addDoc(collection(db, "results"), {
        nick: nickname,
        score: finalScore,
        timestamp: new Date().toLocaleString("pl-PL")
      });
    } catch (error) {
      console.error("Błąd zapisu wyniku:", error);
    }
  };

  if (loading) return <p>Ładowanie pytań...</p>;
  if (!questions.length) return <p>Brak pytań do wyświetlenia.</p>;
  if (finished) {
    return (
      <div style={{ textAlign: "center" }}>
        <h2>{nickname}, Twój wynik: {score} / {questions.length}</h2>
        <button onClick={onBack}>🔁 Wróć do menu</button>
      </div>
    );
  }

  const q = questions[current];

  return (
    <div style={{ textAlign: "center", padding: "1rem" }}>
      <h3>Pytanie {current + 1} / {questions.length}</h3>
      <p>{q.pytanie}</p>
      {q.photo && (
        <img
          src={`/${q.photo}`}
          alt="Zdjęcie"
          style={{
            maxWidth: "90%",
            maxHeight: "300px",
            borderRadius: "8px",
            marginTop: "1rem"
          }}
        />
      )}
      <br /><br />

      {q.open ? (
        <>
          <input
            type="text"
            value={inputAnswer}
            onChange={(e) => setInputAnswer(e.target.value)}
            placeholder="Wpisz odpowiedź..."
            style={{ padding: "0.5rem", width: "80%", maxWidth: "300px" }}
          />
          <br /><br />
          <button
            onClick={() => handleAnswer(inputAnswer)}
            style={{ padding: "0.5rem 1rem" }}
          >
            Zatwierdź
          </button>
        </>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0.5rem",
            justifyItems: "stretch",
            maxWidth: "400px",
            margin: "0 auto"
          }}
        >
          {q.shuffledAnswers.map(([key, value]) => {
            const isCorrect = key === q.poprawna;
            const isSelected = key === selected;

            let bg = "#000";
            if (selected !== null) {
              if (isCorrect) bg = "lightgreen";
              else if (isSelected) bg = "salmon";
            }

            return (
              <button
  key={key}
  onClick={() => handleAnswer(key)}
  disabled={selected !== null}
  className="answer-button"
  style={{
    backgroundColor:
      selected !== null
        ? isCorrect
          ? "lightgreen"
          : isSelected
          ? "salmon"
          : ""
        : "",
    color:
      selected !== null && isCorrect
        ? "#000"
        : selected !== null && isSelected
        ? "#fff"
        : "",
  }}
>
  {value}
</button>

            );
          })}
        </div>
      )}
    </div>
  );
}

import { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

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
    const fetchQuestions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "questions"));
        const fetchedQuestions = [];
        querySnapshot.forEach((doc) => {
          const q = doc.data();
          if (q.type === "closed") {
            const shuffledAnswers = shuffleArray(Object.entries(q.options));
            fetchedQuestions.push({
              ...q,
              open: false,
              shuffledAnswers,
              poprawna: q.correct,
              pytanie: q.question,
            });
          } else {
            fetchedQuestions.push({
              ...q,
              open: true,
              poprawna: q.correct,
              pytanie: q.question,
            });
          }
        });

        const selected = shuffleArray(fetchedQuestions).slice(0, 15);
        setQuestions(selected);
        setLoading(false);
      } catch (error) {
        console.error("Błąd ładowania z Firestore:", error);
        setLoading(false);
      }
    };

    fetchQuestions();
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
          src={q.photo}
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

            return (
              <button
                key={key}
                onClick={() => handleAnswer(key)}
                disabled={selected !== null}
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
                    selected !== null && isSelected
                      ? "#fff"
                      : "#000",
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

// Leaderboard.jsx
import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "./firebase";

export default function Leaderboard({ onBack }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      const q = query(
  collection(db, "results"),
  orderBy("score", "desc"),
  orderBy("timestamp", "asc"),
  limit(10)
);

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => doc.data());
      setResults(data);
    };

    fetchResults();
  }, []);

  return (
    <div >
      <h2>🏆 Tablica wyników</h2>
      <button onClick={onBack} >⬅️ Wróć</button>
      <table >
        <thead>
          <tr>
            <th>Miejsce</th>
            <th>Gracz</th>
            <th>Wynik</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {results.map((res, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{res.nick}</td>
              <td>{res.score}/15</td>
              <td>{res.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import React from 'react';

function ScoreDisplay({ score }) {
  let message;
  if (score < 50) {
    message = <p>Za mało punktów</p>;
  } else if (score < 80) {
    message = <p>W sam raz</p>;
  } else {
    message = <p>Super wynik!</p>;
  }

  return (
    <div>
      <h3>Ćwiczenie 2 – Wynik punktowy</h3>
      {message}
    </div>
  );
}

export default ScoreDisplay;

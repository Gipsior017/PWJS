import React, { useState, useEffect } from 'react';

function TimerCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count >= 10) return;
    const interval = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [count]);

  return (
    <div>
      <h3>Ćwiczenie 5 – Licznik czasu</h3>
      <p>Licznik: {count}</p>
    </div>
  );
}

export default TimerCounter;

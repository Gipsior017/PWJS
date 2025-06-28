import React, { useState } from 'react';

function ToggleDetails() {
  const [show, setShow] = useState(false);

  return (
    <div>
      <h3>Ćwiczenie 1 – Warunkowe wyświetlanie</h3>
      <button onClick={() => setShow(prev => !prev)}>
        {show ? 'Ukryj szczegóły' : 'Pokaż szczegóły'}
      </button>
      {show && <p>To są szczegóły, które można ukryć lub pokazać.</p>}
    </div>
  );
}

export default ToggleDetails;

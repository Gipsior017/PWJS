import { useState } from 'react';
function InputTracker() {
 const [text, setText] = useState('');
 return (
 <div>
 <input type="text" onChange={(e) => setText(e.target.value)}
/>
 <p>Wpisany tekst: {text}</p>
 </div>
 );
}
export default InputTracker;
import { useState } from 'react';
function LoginForm() {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const handleSubmit = (e) => {
 e.preventDefault();
 alert(`Email: ${email}\nHasło: ${password}`);
 };
 return (
 <form onSubmit={handleSubmit}>
 <input type="email" onChange={(e) => setEmail(e.target.value)}
placeholder="Email" />
 <input type="password" onChange={(e) =>
setPassword(e.target.value)} placeholder="Hasło" />
 <button type="submit">Zaloguj</button>
 </form>
 );
}
export default LoginForm;

import './App.css';
import Counter from './Counter';
import Hello from './hello';
import HelloWithProps from './HelloWithProps';
import InputTracker from './InputTracker';
import LoginForm from './LoginForm';
import LoginStatus from './LoginStatus';
import TodoList from './todolist';

function App() {
  return (
    <div>
      <Hello/>
      <HelloWithProps name="Nikt Ważny"/>
      <HelloWithProps name="Adam Kowalski"/>
      <HelloWithProps name="Tomasz Nowak"/>
      <Counter/>
      <InputTracker/>
      <LoginStatus isLoggedIn={true}/>
      <LoginStatus isLoggedIn={false}/>
      <TodoList todos={['Projekt PWJS','Projekt SWIM','Projekt PRIR']} />
      <LoginForm/>
    </div>
  );
}

export default App;

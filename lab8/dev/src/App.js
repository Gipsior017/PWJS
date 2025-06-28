// App.js
import ToggleDetails from './ToggleDetails';
import ScoreDisplay from './ScoreDisplay';
import TaskList from './TaskList';
import UserList from './UserList';
import TimerCounter from './TimerCounter';

function App() {
  return (
    <div>
      <ToggleDetails />
      <ScoreDisplay score={75} />
      <TaskList />
      <UserList />
      <TimerCounter />
    </div>
  );
}

export default App;

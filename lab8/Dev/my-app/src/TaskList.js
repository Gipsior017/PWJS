import React, { useState } from 'react';

const tasks = [
  { id: 1, title: 'Zadanie 1', completed: true },
  { id: 2, title: 'Zadanie 2', completed: false },
  { id: 3, title: 'Zadanie 3', completed: true },
  { id: 4, title: 'Zadanie 4', completed: false },
];

function TaskList() {
  const [filter, setFilter] = useState('all');

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return filter === 'completed' ? task.completed : !task.completed;
  });

  return (
    <div>
      <select onChange={e => setFilter(e.target.value)}>
        <option value="all">Wszystkie</option>
        <option value="completed">Ukończone</option>
        <option value="incomplete">Nieukończone</option>
      </select>
      <ul>
        {filteredTasks.map(task => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;

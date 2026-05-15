import React, { useState } from 'react';
import './App.css';

function App() {
  const [newTitle, setNewTitle] = useState('');
  const [newDeadline, setNewDeadline] = useState('');
  const [tasks, setTasks] = useState([]);

  const handleAddTask = () => {
    const newTask = {
      id: Date.now(),
      title: newTitle.trim(),
      deadline: newDeadline,
      status: 'To Do',
    };

    setTasks([...tasks, newTask]);
    setNewTitle('');
    setNewDeadline('');
  };

  return (
    <div className="App">
      <div className="add-task-form">
        <div className="form-group">
          <label>Название задачи</label>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Дедлайн</label>
          <input
            type="date"
            value={newDeadline}
            onChange={(e) => setNewDeadline(e.target.value)}
          />
        </div>
        <button className="add-btn" onClick={handleAddTask}>
          Добавить
        </button>
      </div>

      <div className="tasks-list">
        {tasks.map((task) => (
            <div
              key={task.id}
              className={'task-card'}
            >
              <div className="task-info">
                <div className="task-title">{task.title}</div>
                <div className="task-deadline">
                  {task.deadline}
                </div>
              </div>

              <div className="task-status">
                <select
                  className="status-select"
                  value={task.status}
                >
                  <option value="To Do">Сделать</option>
                  <option value="In Progress">В процессе выполнения</option>
                  <option value="Done">Завершено</option>
                </select>
              </div>

              <button className="delete-btn">Удалить</button>
            </div>
            ))}
      </div>
    </div>
  );
}

export default App;

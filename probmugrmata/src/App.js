import React, { useState } from 'react';
import './App.css';

function App() {
  const [newTitle, setNewTitle] = useState('');
  const [newDeadline, setNewDeadline] = useState('');
  const [tasks, setTasks] = useState([]);

  const handleStatusChange = (id, newStatus) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  }

  const handleAddTask = () => {
    const newTask = {
      id: Date.now(),
      title: newTitle.trim(),
      deadline: newDeadline,
      status: 'ToDo',
    };

    setTasks([...tasks, newTask]);
    setNewTitle('');
    setNewDeadline('');
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const today = new Date();
  const todayDateStr = today.toISOString().slice(0, 10);

  const isOverdue = (task) => {
    return task.status !== 'Done' && task.deadline < todayDateStr;
  };

  return (
    <div className="App">
      <div className="date-header">Сегодня: {todayDateStr}</div>
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
              className={`task-card ${task.status} ${isOverdue(task)}`}
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
                onChange={(e) => handleStatusChange(task.id, e.target.value)}
                >
                  <option value="ToDo">Сделать</option>
                  <option value="InProgress">В процессе выполнения</option>
                  <option value="Done">Завершено</option>
                </select>
              </div>

              <button className="delete-btn" onClick={() => handleDeleteTask(task.id)}>Удалить</button>
            </div>
            ))}
      </div>
    </div>
  );
}

export default App;

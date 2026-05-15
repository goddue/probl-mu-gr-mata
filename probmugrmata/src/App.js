import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const loadTasksFromStorage = () => {
    const stored = localStorage.getItem('tasks');
    if (stored) {
      return JSON.parse(stored);
    }
    
    return [];  };

  const saveTasksToStorage = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  const [newTitle, setNewTitle] = useState('');
  const [newDeadline, setNewDeadline] = useState('');
  const [tasks, setTasks] = useState(loadTasksFromStorage);

  useEffect(() => {
    saveTasksToStorage(tasks);
  }, [tasks]);

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

      <div className="filter">
        <div>
          <span className="filter-label">Фильтр по статусу:</span>
          <select
            className="filter-select"
          >
            <option value="all">Все задачи</option>
            <option value="To Do">Предстоящие</option>
            <option value="In Progress">В процессе</option>
            <option value="Done">Завершенные</option>
          </select>
        </div>
        <div className="task-count">
          Количество задач: {tasks.length}
        </div>
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

import './App.css';

function App() {
  return (
    <div className="App">
      <div className="add-task-form">
        <div className="form-group">
          <label>Название задачи</label>
          <input
            type="text"
          />
        </div>
        <div className="form-group">
          <label>Дедлайн</label>
          <input
            type="date"
          />
        </div>
        <button className="add-btn">
          Добавить
        </button>
      </div>
    </div>
  );
}

export default App;

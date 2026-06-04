import { useState, useEffect } from "react";
import "./App.css";

function App() {

  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const saved = localStorage.getItem("todos");

    if (saved) {
      setTodos(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "todos",
      JSON.stringify(todos)
    );
  }, [todos]);

  const addTask = () => {

    if (task.trim() === "") return;

    const newTask = {
      id: Date.now(),
      text: task,
      completed: false
    };

    setTodos([...todos, newTask]);
    setTask("");
  };

  const toggleTask = (id) => {

    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed
            }
          : todo
      )
    );
  };

  const deleteTask = (id) => {

    setTodos(
      todos.filter(
        (todo) => todo.id !== id
      )
    );
  };

  const filteredTodos = todos.filter(
    (todo) => {

      if (filter === "active")
        return !todo.completed;

      if (filter === "completed")
        return todo.completed;

      return true;
    }
  );

  const completed =
    todos.filter(
      (todo) => todo.completed
    ).length;

  const progress =
    todos.length === 0
      ? 0
      : Math.round(
          (completed / todos.length) * 100
        );

  return (
    <div className="container">

      <div className="card">

        <h1>🌸 MY DEADLINE</h1>

        <p className="subtitle">
        <br></br>Stay productive & cute today
        </p>

        <div className="stats">

          <div className="box">
            <h3>{todos.length}</h3>
            <p>Total</p>
          </div>

          <div className="box">
            <h3>{completed}</h3>
            <p>Done</p>
          </div>

          <div className="box">
            <h3>{progress}%</h3>
            <p>Progress</p>
          </div>

        </div>

        <div className="input-area">

          <input
            type="text"
            placeholder="Masukkan tugas..."
            value={task}
            onChange={(e) =>
              setTask(e.target.value)
            }
          />

          <button onClick={addTask}>
            +
          </button>

        </div>

        <div className="filter">

          <button onClick={() => setFilter("all")}>
            All
          </button>

          <button onClick={() => setFilter("active")}>
            Active
          </button>

          <button onClick={() => setFilter("completed")}>
            Done
          </button>

        </div>

        <ul>

          {filteredTodos.map((todo) => (

            <li key={todo.id}>

              <span
                className={
                  todo.completed
                    ? "completed"
                    : ""
                }
                onClick={() =>
                  toggleTask(todo.id)
                }
              >
                {todo.completed ? "💖" : "⭕"}{" "}
                {todo.text}
              </span>

              <button
                className="delete"
                onClick={() =>
                  deleteTask(todo.id)
                }
              >
                ✕
              </button>

            </li>

          ))}

        </ul>

      </div>

    </div>
  );
}

export default App;

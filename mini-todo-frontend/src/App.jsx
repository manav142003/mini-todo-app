import { useState, useEffect } from "react";
import axios from "axios";

function formatTime(iso) {
  const d = new Date(iso);
  return d.toLocaleString();
}

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const fetchTasks = () => {
    axios.get("http://13.233.127.147:3000/tasks")
      .then(res => setTasks(res.data || []))
      .catch(err => console.error("fetch error:", err));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = () => {
    if (!task.trim()) return;

    axios.post("http://13.233.127.147:3000/tasks", { task })
      .then(res => {
        setTasks(res.data.tasks || []);
        setTask("");
      })
      .catch(err => console.error("add task error:", err));
  };

  const toggleComplete = (t) => {
    axios.patch(`http://13.233.127.147:3000/tasks/${t.id}`, {
      completed: !t.completed
    })
    .then(res => {
      setTasks(res.data.tasks || []);
    })
    .catch(err => console.error("update error:", err));
  };

  const removeTask = (id) => {
    axios.delete(`http://13.233.127.147:3000/tasks/${id}`)
      .then(res => setTasks(res.data.tasks || []))
      .catch(err => console.error("delete error:", err));
  };

  return (
    <div style={{
      padding: "40px",
      fontFamily: "Arial",
      maxWidth: "650px",
      margin: "auto"
    }}>
      <h1 style={{ textAlign: "center", color: "#5c48ee" }}>
        Mini Todo App
      </h1>

      <div style={{ display: "flex", marginBottom: "20px" }}>
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task..."
          style={{
            flex: 1,
            padding: "10px",
            border: "2px solid #5c48ee",
            borderRadius: "8px"
          }}
        />
        <button
          onClick={addTask}
          style={{
            marginLeft: "10px",
            padding: "10px 16px",
            background: "#5c48ee",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          Add
        </button>
      </div>

      {tasks.map((t) => (
        <div key={t.id} style={{
          background: "#f1f0ff",
          padding: "14px",
          margin: "10px 0",
          borderRadius: "10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            
            {/* CHECKBOX */}
            <input
              type="checkbox"
              checked={t.completed}
              onChange={() => toggleComplete(t)}
              style={{ width: "18px", height: "18px", cursor: "pointer" }}
            />

            {/* TEXT + TIMESTAMP */}
            <div>
              <div style={{
                fontSize: "17px",
                textDecoration: t.completed ? "line-through" : "none",
                color: t.completed ? "green" : "black",
                fontWeight: t.completed ? "bold" : "normal"
              }}>
                {t.text}
              </div>
              <div style={{
                fontSize: "12px",
                color: "#666",
                marginTop: "6px"
              }}>
                Added: {formatTime(t.timestamp)}
              </div>
            </div>
          </div>

          {/* DELETE BUTTON */}
          <button
            onClick={() => removeTask(t.id)}
            style={{
              background: "red",
              color: "white",
              border: "none",
              padding: "6px 10px",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;

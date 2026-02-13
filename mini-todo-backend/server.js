const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

let tasks = []; // each: { id, text, timestamp, completed }
let nextId = 1;

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const text = req.body.task;
  if (!text || !text.toString().trim()) {
    return res.status(400).json({ error: 'Task is required' });
  }

  const item = {
    id: nextId++,
    text: text.toString(),
    timestamp: new Date().toISOString(),
    completed: false
  };

  tasks.push(item);
  res.json({ message: 'Task added', tasks });
});

app.patch('/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  const { completed } = req.body;

  const task = tasks.find(t => t.id === id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  task.completed = completed;
  res.json({ message: 'Task updated', task, tasks });
});

app.delete('/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  const before = tasks.length;
  tasks = tasks.filter(t => t.id !== id);

  if (tasks.length === before) {
    return res.status(404).json({ error: 'Task not found' });
  }

  res.json({ message: 'Task removed', tasks });
});
// 
app.listen(3000, () => {
  console.log('Server running on port 3000');
});

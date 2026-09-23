// Q4. GET, POST, PUT, DELETE routes - To-Do List App (no database, in-memory array)
// Run: npm install express   then   node q4_todoRoutes.js

const express = require('express');
const app = express();
app.use(express.json()); // to parse JSON request bodies

let tasks = [
  { id: 1, title: 'Buy groceries', completed: false },
  { id: 2, title: 'Finish assignment', completed: false }
];
let nextId = 3;

// GET - see all tasks
app.get('/tasks', (req, res) => {
  res.status(200).json(tasks);
});

// POST - add a new task
app.post('/tasks', (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Task title is required' });
  }
  const newTask = { id: nextId++, title, completed: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT - mark a task as completed
app.put('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  task.completed = true;
  res.status(200).json(task);
});

// DELETE - remove a task
app.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  const removed = tasks.splice(index, 1);
  res.status(200).json({ message: 'Task deleted', task: removed[0] });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`To-do list server running at http://localhost:${PORT}/tasks`);
});

/*
  Test with curl or Postman:
  GET    http://localhost:4000/tasks
  POST   http://localhost:4000/tasks       body: { "title": "New task" }
  PUT    http://localhost:4000/tasks/1
  DELETE http://localhost:4000/tasks/1
*/

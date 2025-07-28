
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = 4000;
let todos = [];
let users = [{ username: 'admin', password: 'admin' }];

app.use(cors());
app.use(bodyParser.json());

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) res.status(200).json({ message: 'Login successful' });
  else res.status(401).json({ message: 'Invalid credentials' });
});

app.get('/todos', (req, res) => {
  res.json(todos);
});

app.post('/todos', (req, res) => {
  const todo = { id: Date.now().toString(), ...req.body };
  todos.push(todo);
  res.status(201).json(todo);
});

app.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  const index = todos.findIndex(t => t.id === id);
  if (index !== -1) {
    todos[index] = { ...todos[index], ...req.body };
    res.json(todos[index]);
  } else res.status(404).json({ message: 'Todo not found' });
});

app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  todos = todos.filter(t => t.id !== id);
  res.status(204).send({message:'Todo deleted'});
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

module.exports = app;

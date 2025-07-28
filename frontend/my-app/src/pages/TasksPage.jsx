import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TasksPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    if (isLoggedIn) fetchTodos();
  }, [isLoggedIn]);

  const fetchTodos = async () => {
    const res = await axios.get('http://localhost:4000/todos');
    setTodos(res.data);
  };

  const login = async () => {
    try {
      await axios.post('http://localhost:4000/login', { username, password });
      setIsLoggedIn(true);
    } catch {
      alert('Invalid credentials');
    }
  };

  const addTodo = async () => {
    const res = await axios.post('http://localhost:4000/todos', { title: newTodo });
    setTodos([...todos, res.data]);
    setNewTodo('');
  };

  const updateTodo = async (id, title) => {
    const res = await axios.put(`http://localhost:4000/todos/${id}`, { title });
    setTodos(todos.map(todo => (todo.id === id ? res.data : todo)));
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:4000/todos/${id}`);
    setTodos(todos.filter(todo => todo.id !== id));
  };

  if (!isLoggedIn) {
    return (
      <div>
        <h2>Login</h2>
        <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button onClick={login}>Login</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Todo List</h2>
      <input value={newTodo} onChange={e => setNewTodo(e.target.value)} placeholder="New Todo" />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input
              value={todo.title}
              onChange={e => updateTodo(todo.id, e.target.value)}
            />
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TasksPage;
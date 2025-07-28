const request = require('supertest');
const app = require('../server'); 

describe('API Tests', () => {
  let createdId;

  test('POST /login - valid credentials', async () => {
    const res = await request(app)
      .post('/login')
      .send({ username: 'admin', password: 'admin' });

    expect(res.statusCode).toBe(200);
    // expect(res.body).toHaveProperty('token');
  });

  test('POST /login - invalid credentials', async () => {
    const res = await request(app)
      .post('/login')
      .send({ email: 'wrong@example.com', password: 'wrongpass' });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Invalid credentials');
  });

  test('POST /todos - create new task', async () => {
    const res = await request(app)
      .post('/todos')
      .send({ title: 'Buy milk' });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    createdId = res.body.id;
  });

  test('GET /todos - fetch all task', async () => {
    const res = await request(app).get('/todos');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('PUT /todos/:id - update task', async () => {
    const res = await request(app)
      .put(`/todos/${createdId}`)
      .send({ title: 'Buy bread' });

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Buy bread');
  });

  test('DELETE /todos/:id - delete task', async () => {
    const res = await request(app).delete(`/todos/${createdId}`);
    expect(res.statusCode).toBe(204);
    // expect(res.body.message).toBe('Todo deleted');
  });
});

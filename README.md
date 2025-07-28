# QA Automation Challenge – Full Stack Web App

This project demonstrates automated testing for a full-stack application using a **React frontend** and a **Node.js backend**. It includes both **UI automation with Playwright** and **API testing with Supertest**.

---

## 📦 Project Structure

```
qa-automation-challenge/
├── frontend/                 # React frontend
│   └── tests/              # Playwright UI tests
├── backend/                 # Node.js backend API
│   └── tests/              # Jest + Supertest API tests
├── .github/workflows/      # GitHub Actions CI pipeline
└── README.md               # Project documentation
```

---

## 🔧 Technologies Used

| Area             | Tool               | Purpose                            |
|------------------|--------------------|------------------------------------|
| UI Automation     | Playwright         | Fast and reliable end-to-end testing |
| API Testing       | Supertest + Jest   | Testing Express API routes         |
| CI Integration    | GitHub Actions     | Automating test runs               |
| Code Coverage     | NYC / Istanbul     | Code coverage reporting            |

---

## 🚀 Features Covered

### ✅ UI Automation (Playwright)

- Login with valid/invalid credentials
- Creating a new todo
- Editing an existing todo
- Deleting a todo
- Asserting UI updates

### ✅ API Testing (Supertest + Jest)

- `POST /login` – login tests
- `GET /todos` – fetch todos
- `POST /todos` – create todo
- `PUT /todos/:id` – edit todo
- `DELETE /todos/:id` – delete todo

Each includes **positive and negative test cases**.

---

## 🧪 How to Run Tests

### 1. Start the Backend

```bash
cd backend
npm install
npm run dev
```

### 2. Run API Tests

```bash
npm run test
```

Open the generated coverage report:

```
open coverage/lcov-report/index.html
```

---

### 3. Start the Frontend

```bash
cd ../frontend
npm install
npm run dev
```

### 4. Run UI Tests

```bash
npx playwright install
npx playwright test
```

---

## 🔁 Continuous Integration (GitHub Actions)

This project includes a GitHub Actions workflow to:

- Run API tests with coverage
- Run Playwright UI tests
- Upload test coverage artifacts

File: `.github/workflows/ci.yml`

---

## 📌 Assumptions

- A sample user is pre-seeded in the DB (`user@example.com / password`)
- MongoDB runs locally or as a GitHub Actions service
- Tests run in a clean environment with seeded data

---

## 📈 Future Improvements

- Add visual regression snapshots for UI tests
- Run Playwright tests across multiple browsers
- Use Docker to containerize the environment
- Add test badges in README

---

## 👤 Author

Kojo Akyer  
QA Automation Enthusiast  
[kojoakyer777@gmail.com](mailto:kojoakyer777@gmail.com)

---

## 📝 License


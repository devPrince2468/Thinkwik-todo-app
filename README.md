# Thinkwik Todo App

A RESTful API for managing todo items with user authentication and automatic completion of expired todos.

---

## 🚀 Features

- User registration and login with JWT-based authentication
- CRUD operations for todos
- Protected routes
- Daily CRON job to mark expired todos as completed
- Built with TypeScript

---

## 📦 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

---

## 🔧 Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/devPrince2468/Thinkwik-todo-app.git
   cd Thinkwik-todo-app
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory based on `.env.example` or use the `.env` shared via email:

   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/todo-api
   JWT_SECRET=your_jwt_secret
   ```

---

## ▶️ Running the App

### Development

```bash
npm run dev
```

### Production

```bash
npm run build
npm start
```

---

## 📚 API Endpoints

### 🔐 Authentication

- **POST /api/v1/user/register**  
  Register a new user  
  **Body:**

  ```json
  {
    "name": "Test User",
    "email": "user@example.com",
    "password": "password123"
  }
  ```

- **POST /api/v1/user/login**  
  Login user  
  **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

---

### ✅ Todo (Protected Routes)

> **Note:** All routes below require the JWT token in the `Authorization` header.

**Header:**

```http
Authorization: Bearer <your_jwt_token>
```

- **POST /api/v1/todo/**  
  Create a todo  
  **Body:**

  ```json
  {
    "title": "Task title",
    "description": "Task description",
    "dueDate": "2023-12-31T23:59:59.999Z"
  }
  ```

- **GET /api/v1/todo/**  
  Get all todos for the logged-in user

- **GET /api/v1/todo/:id**  
  Get todo by ID

- **PUT /api/v1/todo/:id**  
  Update a todo  
  **Body:**

  ```json
  {
    "title": "Updated title",
    "description": "Updated description",
    "dueDate": "2023-12-31T23:59:59.999Z",
    "completed": true
  }
  ```

- **DELETE /api/v1/todo/:id**  
  Delete a todo

---

## ⏱️ CRON Job

A daily CRON job runs at midnight to automatically mark todos with past due dates as completed.

---

## 🗂 Project Structure

```
THINKWIK-TODO-APP/
├── build/                # Compiled output
├── node_modules/         # npm packages
├── src/
│   ├── controllers/      # Request handlers
│   ├── helpers/          # Custom error class and helpers
│   ├── middlewares/      # Auth, error, rate limiter
│   ├── routes/           # API route definitions
│   ├── Schemas/          # Mongoose models
│   ├── services/         # Business logic
│   └── utils/            # Cron job, JWT, etc.
│   └── index.ts          # root file.
├── .env                  # Actual env variables
├── .env.example          # Sample env file
├── nodemon.json          # Nodemon config
├── package.json          # Project info & scripts
├── tsconfig.json         # TypeScript config
├── README.md             # Project documentation
```

---

## 📝 License

Licensed under the **ISC License**.

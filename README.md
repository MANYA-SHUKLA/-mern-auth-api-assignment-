# TaskFlow — MERN Auth & Tasks API

A **scalable REST API** with **JWT authentication**, **role-based access**, and **Tasks CRUD**, plus a **React frontend** for testing and demonstration.

## Features

### Backend
- **User registration & login** with bcrypt password hashing and JWT
- **Role-based access** (user vs admin): users see own tasks, admins see all
- **Tasks CRUD** with pagination, status, and priority
- **API versioning** (`/api/v1`)
- **Validation** (express-validator) and **input sanitization** (mongo-sanitize)
- **Error handling** middleware and consistent JSON responses
- **Swagger** documentation at `/api-docs`
- **Security**: Helmet, CORS, rate limiting, secure JWT handling
- **MongoDB** with Mongoose schemas and indexes

### Frontend
- **Register & login** with error/success feedback
- **Protected dashboard** (JWT required)
- **Task list** with create, edit, delete, pagination
- **Toast notifications** for API success/error
- Modern dark UI (Outfit font, cyan accent)

---

## Quick Start

### Prerequisites
- **Node.js** 18+
- **MongoDB** (local or Atlas connection string)

### 1. Backend

```bash
cd backend
# Edit .env: set MONGODB_URI, JWT_SECRET (and optionally PORT, FRONTEND_URL)
npm install
npm run dev
```

Server runs at **http://localhost:5001**.  
Swagger UI: **http://localhost:5001/api-docs**

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

App runs at **http://localhost:5173** and proxies `/api` to the backend.

### 3. Admin user 

Set in `.env`: `ADMIN_EMAIL`, `ADMIN_PASSWORD` (min 6 chars), `ADMIN_NAME`. On startup the backend creates or updates that user with role `admin`. No seed file—admin comes from env only.

---

## API Overview

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/v1/auth/register` | No | Register |
| POST | `/api/v1/auth/login` | No | Login |
| GET | `/api/v1/auth/me` | Yes | Current user |
| GET | `/api/v1/tasks` | Yes | List tasks (query: page, limit, status, priority) |
| POST | `/api/v1/tasks` | Yes | Create task |
| GET | `/api/v1/tasks/:id` | Yes | Get task |
| PUT | `/api/v1/tasks/:id` | Yes | Update task |
| DELETE | `/api/v1/tasks/:id` | Yes | Delete task |

Use header: `Authorization: Bearer <token>` for protected routes.

---

## Project Structure

```
mern-auth-api-assignment/
├── backend/
│   ├── src/
│   │   ├── config/       # DB, Swagger
│   │   ├── controllers/
│   │   ├── middleware/    # auth, roleCheck, errorHandler
│   │   ├── models/        # User, Task
│   │   ├── routes/v1/     # auth, tasks
│   │   ├── validators/
│   │   └── index.js
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/           # API client
│   │   ├── components/
│   │   ├── context/       # AuthContext
│   │   └── pages/
│   └── package.json
├── SCALABILITY.md
└── README.md
```

---

## API Documentation

- **Swagger UI**: run backend and open [http://localhost:5001/api-docs](http://localhost:5001/api-docs)
- **Postman**: import `backend/postman_collection.json`. Set `BASE_URL` (e.g. `http://localhost:5001/api/v1`), then run **Login**; the collection will set `token` for protected requests.

---

## Evaluation Checklist

- [x] REST design, status codes, modular structure
- [x] MongoDB schema, indexes, Mongoose models
- [x] JWT auth, bcrypt hashing, validation, sanitization
- [x] Frontend integrated with backend APIs
- [x] Scalability note (see [SCALABILITY.md](./SCALABILITY.md))

---

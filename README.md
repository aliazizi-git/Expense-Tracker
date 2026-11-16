<div align="center">

# 💰 Expense Tracker — Full-Stack Finance OS

A production-ready, full-stack personal finance application with a modular Express REST API, MongoDB aggregation pipelines, and a sleek Next.js (App Router) dashboard powered by Zustand and Tailwind CSS.

[![Project Roadmap](https://img.shields.io/badge/roadmap.sh-Expense--Tracker-blue?style=for-the-badge&logo=target)](https://roadmap.sh/projects/expense-tracker)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-green?style=for-the-badge&logo=node.js)](https://nodejs.org)
[![Next.js](https://img.shields.io/badge/Next.js-16.x-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-emerald?style=for-the-badge&logo=mongodb)](https://mongodb.com)
[![Zustand](https://img.shields.io/badge/Zustand-State_Management-orange?style=for-the-badge)](https://zustand.docs.pmnd.rs)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-Modern_UI-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)

</div>

---

## 📌 Project Overview

This project was built to solve the [roadmap.sh Expense Tracker Project](https://roadmap.sh/projects/expense-tracker). While the original challenge suggests a basic CLI or single-file storage, this project elevates the concept into a **production-grade Full-Stack Monorepo architecture**:

* **Backend Engine:** Scalable, modular Express architecture with MongoDB schemas, JWT authentication, role-based authorization, and native MongoDB aggregation pipelines for instant analytics.
* **Frontend Dashboard:** Modern client application built with Next.js App Router, global state persistence with Zustand, centralized Axios interceptors, and a custom Obsidian-Fintech design system.

---

## 🚀 Key Features

### 🔐 Authentication & Security
- **JWT Authorization:** Stateless token authentication with Bearer token validation and automatic client-side request interceptors.
- **Bcrypt Password Hashing:** 10 salt rounds with input validation checks.
- **User Data Isolation:** Strict tenancy isolation—users can only query, modify, or delete their own categories and expenses.

### 🏷️ Dynamic Category Management
- Categorize expenses dynamically (e.g., Food, Travel, Utilities, Subscriptions).
- Full CRUD API with duplicate name prevention per user.
- Quick inline category creation right from the transaction dashboard.

### 💸 Real-Time Financial Aggregations
- **MongoDB Aggregation Pipelines:** Calculates real-time total expenses and transaction counts using native `$match` and `$group` operations directly in the database engine.
- **Monthly Filter Analytics:** Filter spending by specific months (January to December) or inspect all-time totals instantly without full page reloads.

### ⚡ Client-Side State & UI
- **Zustand State Stores:** Modular global stores (`useAuthStore`, `useCategoryStore`, `useExpenseStore`) with automatic `localStorage` persistence.
- **Modern Fintech UI:** High-contrast dark theme built with Tailwind CSS, custom glassmorphism, responsive data grids, and non-blocking toast notifications.

---

## 🏛️ System Architecture

```text
Expense-Tracker/
├── backend/                  # RESTful API Service (Port 5000)
│   ├── config/               # Database connection & environment setup
│   ├── middlewares/          # JWT extraction, auth guards, validators
│   ├── modules/
│   │   ├── Auth/             # Register, Login, JWT tokens
│   │   ├── Category/         # Category schemas, controllers & routes
│   │   ├── Expense/          # Expense schemas, aggregation & routes
│   │   └── User/             # User Mongoose model
│   ├── Utils/                # Validation response handlers
│   ├── app.js                # Express app configuration & middleware
│   └── server.js             # Server bootstrapper & DB connection
│
├── frontend/                 # Client Application (Port 3000)
│   ├── api/                  # Axios instance with auto-auth interceptor
│   ├── app/                  # Next.js App Router
│   │   ├── (auth)/           # Route group for /login and /register
│   │   ├── expenses/         # Main dashboard & expense cards
│   │   ├── layout.js         # Root layout with Toaster & Navbar
│   │   └── page.jsx          # Dynamic auth-based router redirect
│   ├── Components/           # Shared UI components (Navbar, Footer, etc.)
│   └── Store/                # Zustand global state management
│
└── README.md
```

---

## 📡 API Reference

### Auth Endpoints
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Create a new user account | No |
| `POST` | `/api/auth/login` | Authenticate user and retrieve JWT token | No |

### Category Endpoints
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/categories` | Retrieve user's categories | Yes (Bearer Token) |
| `POST` | `/api/categories` | Create a custom category | Yes (Bearer Token) |
| `PATCH` | `/api/categories/:id` | Update category details | Yes (Bearer Token) |
| `DELETE` | `/api/categories/:id` | Delete a category | Yes (Bearer Token) |

### Expense Endpoints
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/expenses` | Retrieve all expenses for logged-in user | Yes (Bearer Token) |
| `POST` | `/api/expenses` | Record a new expense | Yes (Bearer Token) |
| `GET` | `/api/expenses/summary` | Aggregate totals (supports `?month=X`) | Yes (Bearer Token) |
| `PATCH` | `/api/expenses/:id` | Update an existing expense | Yes (Bearer Token) |
| `DELETE` | `/api/expenses/:id` | Delete an expense record | Yes (Bearer Token) |

---

## 🛠️ Getting Started Locally

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18.0 or higher)
- [MongoDB](https://www.mongodb.com/) (running locally or MongoDB Atlas URI)
- Git

### 2. Clone the Repository
```bash
git clone https://github.com/your-username/Expense-Tracker.git
cd Expense-Tracker
```

### 3. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:
```env
PORT=5000
BASE_DB_URL=mongodb://127.0.0.1:27017
BASE_DB_NAME=expense-tracker-db
JWT_SECRET=your_super_secret_jwt_key
```

Start the backend development server:
```bash
npm run dev
```
Backend will run on `http://localhost:5000`.

### 4. Frontend Setup
Open a new terminal window:
```bash
cd frontend
npm install
npm run dev
```
Frontend will be accessible at `http://localhost:3000`.

---

## 💡 Engineering Highlights

1. **Native MongoDB Aggregations:**  
   Instead of pulling all records to the Node.js server and calculating totals with JavaScript `.reduce()`, the app delegates aggregation computation directly to MongoDB with `$match` and `$group`, ensuring $O(1)$ memory usage on the Node.js server.

2. **Decoupled Architecture:**  
   The backend is a standalone REST API that can support web, mobile (React Native), or CLI clients simultaneously without changing a single line of backend logic.

3. **Optimistic & Synced Zustand State:**  
   When a user records or removes an expense, the list updates smoothly while automatically triggering a background re-aggregation of the summary cards to ensure 100% data consistency.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

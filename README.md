# 🍔 FoodHub Pro API

A production-ready backend API for a Food Ordering Platform built with Node.js, Express, TypeScript, 
PostgreSQL, and Prisma.

---

## 🚀 Live API
https://stn-foodhub-backend.vercel.app/

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT Authentication
- Zod Validation

---

## 📦 Features

- 🔐 Authentication (Register, Login, JWT)
- 👤 Role-based access (User / Admin)
- 🍔 Food Management (CRUD)
- 🛒 Order System
- ⭐ Review System
- 📊 Dashboard Analytics
- 🔍 Search, Filter, Pagination, Sorting

---

## 📁 Project Structure
src/
│
├── app/
│ ├── modules/
│ │ ├── auth/
│ │ ├── food/
│ │ ├── order/
│ │ ├── review/
│ │ └── analytics/
│ │
│ ├── middleware/
│ ├── config/
│ └── routes/
│
├── server.ts
└── app.ts


---

## ⚙️ Installation

```bash
git clone https://github.com/kamrul125/project-update-backend-2
cd foodhub-pro-api
npm install

Environment Variables

Create .env file:

DATABASE_URL=your_postgres_url
JWT_SECRET=your_secret_key
PORT=5000

Run Project
npm run dev

Build & Start

npm run build
npm start

API Endpoints

Auth
POST http://localhost:5000/api/auth/register
POST http://localhost:5000/api/v1/auth/login
Food
GET http://localhost:5000/api/v1/foods
POST http://localhost:5000 /api/v1/foods (Admin)
PATCH http://localhost:5000/api/v1/foods/:id (Admin)
DELETE http://localhost:5000/api/v1/foods/:id (Admin)
Orders
POST http://localhost:5000/api/v1/order
GET http://localhost:5000/api/v1/orders/my-orders
GET http://localhost:5000/api/v1/orders (Admin)


Demo Credentials: 

👤 User
Email: test@gmail.com
Password: 123456

👤 admin
Email: admin@gmail.com
Password: 123456

📌 Author
Md Kamruzzaman
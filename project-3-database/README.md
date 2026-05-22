# BuildSpace DB — Project 3
**DecodeLabs Full Stack Internship · Batch 2026**
Author: Abdelrahman Sabaa

> *"Your journey to becoming a professional engineer begins with the very first table you define."* — DecodeLabs

---

## What is this project?

A production-ready **Node.js + Express + MongoDB** REST API that replaces the in-memory store from Project 2 with a real persistent database. Data survives server restarts. Relationships between resources are enforced at the schema level.

---

## Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Runtime    | Node.js                           |
| Framework  | Express.js                        |
| Database   | MongoDB (hosted on MongoDB Atlas) |
| ODM        | Mongoose (ORM for MongoDB)        |
| Security   | Parameterized queries via Mongoose|

---

## Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Set up your environment
```bash
# Copy the example env file
cp .env.example .env
```
Then open `.env` and replace the `MONGO_URI` with your **MongoDB Atlas** connection string.

> **Get your free MongoDB Atlas URI:**
> 1. Go to [mongodb.com/atlas](https://mongodb.com/atlas) → Sign up free
> 2. Create a cluster → Connect → Drivers → Copy the connection string
> 3. Replace `<password>` with your DB password

### 3. Start the server
```bash
npm start
```
You should see:
```
✅ BuildSpace DB API running at http://localhost:3000
✅ MongoDB Connected: cluster0.xxxxx.mongodb.net
```

---

## Project Structure

```
buildspace-db/
├── server.js              → Entry point
├── .env.example           → Environment variables template
├── .gitignore             → Excludes node_modules & .env
├── config/
│   └── db.js              → MongoDB connection
├── models/
│   ├── User.js            → User schema (UNIQUE, NOT NULL, CHECK)
│   └── Post.js            → Post schema (Foreign Key → User)
├── routes/
│   ├── users.js           → Full CRUD for users
│   └── posts.js           → Full CRUD for posts + populate (JOIN)
├── middleware/
│   └── validate.js        → Input validation (Gatekeeper)
└── README.md              → This file
```

---

## API Endpoints

Base URL: `http://localhost:3000/api`

### Users

| Method | Endpoint         | Action             | SQL Equivalent             |
|--------|------------------|--------------------|----------------------------|
| GET    | `/users`         | Get all users      | `SELECT * FROM users`      |
| GET    | `/users/:id`     | Get one user       | `SELECT * WHERE id = ?`    |
| POST   | `/users`         | Create user        | `INSERT INTO users`        |
| PUT    | `/users/:id`     | Update user        | `UPDATE users WHERE id = ?`|
| DELETE | `/users/:id`     | Delete user        | `DELETE WHERE id = ?`      |

### Posts

| Method | Endpoint         | Action             |
|--------|------------------|--------------------|
| GET    | `/posts`         | Get all posts (with author data populated) |
| GET    | `/posts/:id`     | Get one post       |
| POST   | `/posts`         | Create post        |
| PUT    | `/posts/:id`     | Update post        |
| DELETE | `/posts/:id`     | Delete post        |

---

## Example Requests

### Create a User
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Abdelrahman Sabaa", "email": "abdo@example.com", "role": "intern"}'
```

### Create a Post (use the user _id from above)
```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{"title": "My First Post", "content": "Learning database integration at DecodeLabs.", "author": "USER_ID_HERE"}'
```

### Get all posts with author info
```bash
curl http://localhost:3000/api/posts
```

---

## Database Schema

### Users Collection
```
_id        → ObjectId (Primary Key, auto-generated)
name       → String, required, min 2 chars
email      → String, required, UNIQUE, valid format
role       → String, enum: [intern, admin, mentor], default: intern
createdAt  → Date (auto)
updatedAt  → Date (auto)
```

### Posts Collection
```
_id        → ObjectId (Primary Key)
title      → String, required, 3–100 chars
content    → String, required, min 10 chars
author     → ObjectId → ref: User (Foreign Key)
published  → Boolean, default: false
createdAt  → Date (auto)
updatedAt  → Date (auto)
```

---

## Key Concepts Demonstrated

- **Schema Design** — UNIQUE, NOT NULL, and CHECK constraints at model level
- **1:Many Relationship** — One User has many Posts via Foreign Key
- **Mongoose populate()** — equivalent of SQL JOIN
- **Parameterized Queries** — Mongoose prevents SQL Injection by default
- **Proper HTTP Status Codes** — 200, 201, 204, 400, 404, 409, 500
- **Environment Variables** — secrets never committed to GitHub

---

*Powered by DecodeLabs · Greater Lucknow, India*

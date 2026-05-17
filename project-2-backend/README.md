# BuildSpace API — Project 2
**DecodeLabs Full Stack Internship · Batch 2026**  
Author: Abdelrahman Sabaa

> *"If it isn't documented, it doesn't exist."* — DecodeLabs

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start the server
npm start

# Server runs at: http://localhost:3000
```

---

## Architecture

```
buildspace-api/
├── server.js          → Entry point, middleware, global error handling
├── routes/
│   ├── users.js       → Full CRUD for users resource
│   └── contact.js     → Contact/message submission
├── middleware/
│   └── validate.js    → Syntactic + semantic input validation
├── data/
│   └── store.js       → In-memory data store (simulates a database)
└── README.md          → This file
```

---

## Base URL

```
http://localhost:3000/api
```

---

## Endpoints

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/`      | API status & info |

**Response `200`:**
```json
{
  "status": "ok",
  "message": "BuildSpace API is running 🚀",
  "version": "1.0.0"
}
```

---

### Users `/api/users`

#### GET /api/users
Returns all users. Optional query filter: `?role=intern`

**Response `200`:**
```json
{
  "status": "success",
  "code": 200,
  "count": 2,
  "data": [
    {
      "id": 1,
      "name": "Abdelrahman Sabaa",
      "email": "abdelrahman@example.com",
      "role": "intern",
      "createdAt": "2026-05-10T00:00:00.000Z"
    }
  ]
}
```

---

#### GET /api/users/:id
Returns a single user by ID.

**Response `200`:** User object  
**Response `404`:** User not found  
**Response `400`:** Invalid ID format

---

#### POST /api/users
Creates a new user.

**Request Body:**
```json
{
  "name":  "Jane Doe",
  "email": "jane@example.com",
  "role":  "intern"
}
```

| Field   | Type   | Required | Rules |
|---------|--------|----------|-------|
| `name`  | string | ✅       | min 2 characters |
| `email` | string | ✅       | valid email format, unique |
| `role`  | string | ❌       | `intern` / `admin` / `mentor` (default: `intern`) |

**Response `201`:** Created user  
**Response `400`:** Validation error  
**Response `409`:** Email already exists

---

#### PUT /api/users/:id
Updates a user's `name` or `role`. Email cannot be changed.

**Request Body (at least one field):**
```json
{
  "name": "New Name",
  "role": "mentor"
}
```

**Response `200`:** Updated user  
**Response `400`:** Validation error  
**Response `404`:** User not found

---

#### DELETE /api/users/:id
Deletes a user.

**Response `204`:** No content (success)  
**Response `404`:** User not found

---

### Contact `/api/contact`

#### POST /api/contact
Submits a contact message.

**Request Body:**
```json
{
  "name":    "Abdelrahman Sabaa",
  "email":   "abdelrahman@example.com",
  "message": "I have a question about the project submission."
}
```

| Field     | Type   | Required | Rules |
|-----------|--------|----------|-------|
| `name`    | string | ✅       | min 2 characters |
| `email`   | string | ✅       | valid email format |
| `message` | string | ✅       | min 10 characters |

**Response `201`:** Message stored  
**Response `400`:** Validation error

---

#### GET /api/contact
Returns all submitted messages.

**Response `200`:** Array of messages

---

## HTTP Status Codes Used

| Code | Meaning           | When Used |
|------|-------------------|-----------|
| 200  | OK                | Successful GET / PUT |
| 201  | Created           | Successful POST |
| 204  | No Content        | Successful DELETE |
| 400  | Bad Request       | Validation failure |
| 404  | Not Found         | Resource doesn't exist |
| 409  | Conflict          | Duplicate email |
| 500  | Internal Error    | Unexpected server crash |

---

## Testing the API

You can test all endpoints using **Postman** or **Thunder Client** (VS Code extension).

### Example: Create a user with curl
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Jane Doe", "email": "jane@example.com", "role": "intern"}'
```

### Example: Get all users
```bash
curl http://localhost:3000/api/users
```

### Example: Filter by role
```bash
curl http://localhost:3000/api/users?role=admin
```

---

## Key Concepts Demonstrated

- **RESTful Naming** — Resources are nouns (`/users`), methods are verbs (GET, POST…)
- **IPO Model** — Every endpoint: Input → Process → Output
- **The Gatekeeper Rule** — All input validated before touching the data store
- **Semantic Status Codes** — 201 for creation, 204 for deletion, 409 for conflicts
- **Stateless Architecture** — No session state; each request is self-contained
- **Separation of Concerns** — Routes → Middleware → Data store (3 clear layers)

---

*Powered by DecodeLabs · Greater Lucknow, India*

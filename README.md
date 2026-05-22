# DecodeLabs Internship — Full Stack Development
**Batch 2026 · Abdelrahman Sabaa**

> Building real-world full stack applications from scratch — frontend to database.

---

## About This Repository

This repo contains all project milestones completed during the **DecodeLabs Full Stack Development Internship** (May 10 – June 10, 2026). Each project builds on the previous one, forming a complete full stack application.

---

## Projects

### Project 1 — Responsive Frontend Interface
**Folder:** `project-1-frontend/`

A fully responsive web interface built with pure HTML5, CSS3, and vanilla JavaScript — no frameworks.

**What I built:**
- Semantic HTML5 landmark structure (`header`, `nav`, `main`, `article`, `footer`)
- CSS Grid (macro layouts) + Flexbox (micro components)
- Mobile-first responsive design (breakpoints: 768px, 1024px)
- 2025 design aesthetics — Mocha Mousse, Ethereal Blue & Moonlit Grey palette
- WCAG accessibility — skip links, ARIA labels, focus styles
- Hamburger menu, scroll animations, stat counter in vanilla JS

**How to run:**
```
Open project-1-frontend/index.html in your browser
```

---

### Project 2 — Backend API Development
**Folder:** `project-2-backend/`

A RESTful Node.js + Express API with input validation, proper HTTP status codes, and clean architecture.

**What I built:**
- RESTful endpoints — GET, POST, PUT, DELETE for `/users` and `/contact`
- 2-layer input validation — syntactic (format) + semantic (logic)
- Proper HTTP status codes — 200, 201, 204, 400, 404, 409, 500
- In-memory data store (no database yet)
- CORS enabled for frontend integration

**How to run:**
```bash
cd project-2-backend
npm install
npm start
# → http://localhost:3000
```

---

### Project 3 — Database Integration
**Folder:** `project-3-database/`

Upgraded the Project 2 API to connect to a real MongoDB database using Mongoose. Data now persists permanently.

**What I built:**
- MongoDB Atlas integration via Mongoose ODM
- Schema design with UNIQUE, NOT NULL, and CHECK constraints
- 1:Many relationship — Users → Posts (Foreign Key + populate/JOIN)
- Parameterized queries via Mongoose (SQL Injection prevention)
- Environment variables — secrets kept out of GitHub

**How to run:**
```bash
cd project-3-database
npm install
cp .env.example .env
# Add your MongoDB Atlas URI to .env
npm start
# → http://localhost:3000
```

---

## Tech Stack Progression

| Project | Frontend | Backend     | Database      |
|---------|----------|-------------|---------------|
| 1       | HTML5, CSS3, JS | —      | —             |
| 2       | —        | Node + Express | In-memory  |
| 3       | —        | Node + Express | MongoDB Atlas|

---

## Contact

**Abdelrahman Sabaa**
DecodeLabs Full Stack Intern · Batch 2026
Powered by [DecodeLabs](https://www.decodelabs.tech) · Greater Lucknow, India

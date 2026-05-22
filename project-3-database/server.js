// ============================================================
//  BuildSpace DB — server.js
//  DecodeLabs Full Stack Project 3 · Batch 2026
//  Author : Abdelrahman Sabaa
//  Stack  : Node.js + Express + MongoDB (Mongoose)
//  Motto  : Design it. Connect it. Protect it.
// ============================================================

require('dotenv').config();

const express     = require('express');
const cors        = require('cors');
const connectDB   = require('./config/db');
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Connect to MongoDB ────────────────────────────────────────
connectDB();

// ── Middleware ────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Request Logger ────────────────────────────────────────────
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// ── Routes ────────────────────────────────────────────────────
app.use('/api/users', usersRouter);
app.use('/api/posts', postsRouter);

// ── Health Check ──────────────────────────────────────────────
app.get('/', (req, res) => {
  res.status(200).json({
    status:   'ok',
    message:  'BuildSpace DB API is running 🚀',
    version:  '3.0.0',
    author:   'Abdelrahman Sabaa — DecodeLabs Batch 2026',
    database: 'MongoDB via Mongoose',
    endpoints: {
      users: '/api/users',
      posts: '/api/posts'
    }
  });
});

// ── 404 Handler ───────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    status:  'error',
    code:    404,
    message: `Route '${req.method} ${req.path}' not found.`
  });
});

// ── Global Error Handler ──────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('[SERVER ERROR]', err.message);
  res.status(500).json({
    status:  'error',
    code:    500,
    message: 'Internal server error.'
  });
});

// ── Start ─────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n✅ BuildSpace DB API running at http://localhost:${PORT}`);
  console.log('   Waiting for MongoDB connection...\n');
});

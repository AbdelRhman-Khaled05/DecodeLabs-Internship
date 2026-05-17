// ============================================================
//  BuildSpace API — server.js
//  DecodeLabs Full Stack Project 2 · Batch 2026
//  Author : Abdelrahman Sabaa
//  Stack  : Node.js + Express (no frontend frameworks)
//  Motto  : Validate Everything. Communicate Clearly.
//           Respect the Architecture.
// ============================================================

const express = require('express');
const cors    = require('cors');

const usersRouter   = require('./routes/users');
const contactRouter = require('./routes/contact');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ────────────────────────────────────────────────
app.use(cors());                         // Allow Project 1 frontend to connect
app.use(express.json());                 // Parse JSON request bodies
app.use(express.urlencoded({ extended: true }));

// ── Request Logger (simple, no library) ──────────────────────
app.use((req, res, next) => {
  const now = new Date().toISOString();
  console.log(`[${now}] ${req.method} ${req.path}`);
  next();
});

// ── Routes ───────────────────────────────────────────────────
app.use('/api/users',   usersRouter);
app.use('/api/contact', contactRouter);

// ── Health Check ─────────────────────────────────────────────
app.get('/', (req, res) => {
  res.status(200).json({
    status:  'ok',
    message: 'BuildSpace API is running 🚀',
    version: '1.0.0',
    author:  'Abdelrahman Sabaa — DecodeLabs Batch 2026',
    docs:    'See README.md for full endpoint reference',
    endpoints: {
      users:   '/api/users',
      contact: '/api/contact'
    }
  });
});

// ── 404 Handler ──────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    status:  'error',
    code:    404,
    message: `Route '${req.method} ${req.path}' not found.`
  });
});

// ── Global Error Handler ─────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('[SERVER ERROR]', err.message);
  res.status(500).json({
    status:  'error',
    code:    500,
    message: 'Internal server error. Please try again later.'
  });
});

// ── Start ─────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n✅ BuildSpace API running at http://localhost:${PORT}`);
  console.log('   Press Ctrl+C to stop.\n');
});

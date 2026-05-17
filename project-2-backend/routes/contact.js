// ============================================================
//  routes/contact.js
//
//  POST /api/contact  → Submit a contact / support message
//  GET  /api/contact  → List all received messages (admin view)
// ============================================================

const express             = require('express');
const router              = express.Router();
const { validateContact } = require('../middleware/validate');

// In-memory messages store
const messages = [];
let nextMsgId  = 1;

// ── POST /api/contact ─────────────────────────────────────────
router.post('/', validateContact, (req, res) => {
  const { name, email, message } = req.body;

  const entry = {
    id:        nextMsgId++,
    name:      name.trim(),
    email:     email.toLowerCase().trim(),
    message:   message.trim(),
    createdAt: new Date().toISOString()
  };

  messages.push(entry);

  res.status(201).json({
    status:  'success',
    code:    201,
    message: 'Message received. We will get back to you shortly!',
    data:    entry
  });
});

// ── GET /api/contact ──────────────────────────────────────────
router.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    code:   200,
    count:  messages.length,
    data:   messages
  });
});

module.exports = router;

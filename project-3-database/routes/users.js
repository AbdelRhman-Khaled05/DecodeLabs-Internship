// ============================================================
//  routes/users.js
//  Pillar 3: The Action — CRUD mapped to RESTful HTTP
//
//  CREATE → POST   /api/users       → db.insertOne()
//  READ   → GET    /api/users       → db.find()
//  READ   → GET    /api/users/:id   → db.findById()
//  UPDATE → PUT    /api/users/:id   → db.findByIdAndUpdate()
//  DELETE → DELETE /api/users/:id   → db.findByIdAndDelete()
// ============================================================

const express            = require('express');
const router             = express.Router();
const User               = require('../models/User');
const { validateUser }   = require('../middleware/validate');

// ── GET /api/users ────────────────────────────────────────────
// READ — SQL equivalent: SELECT * FROM users
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.role) filter.role = req.query.role;

    const users = await User.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      status: 'success',
      code:   200,
      count:  users.length,
      data:   users
    });
  } catch (err) {
    res.status(500).json({ status: 'error', code: 500, message: err.message });
  }
});

// ── GET /api/users/:id ────────────────────────────────────────
// READ — SQL equivalent: SELECT * FROM users WHERE id = ?
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        status:  'error',
        code:    404,
        message: `User with id "${req.params.id}" not found.`
      });
    }
    res.status(200).json({ status: 'success', code: 200, data: user });
  } catch (err) {
    // Mongoose CastError = invalid ObjectId format
    if (err.name === 'CastError') {
      return res.status(400).json({ status: 'error', code: 400, message: 'Invalid user ID format.' });
    }
    res.status(500).json({ status: 'error', code: 500, message: err.message });
  }
});

// ── POST /api/users ───────────────────────────────────────────
// CREATE — SQL equivalent: INSERT INTO users VALUES (...)
router.post('/', validateUser, async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const user = await User.create({ name, email, role });

    res.status(201).json({
      status:  'success',
      code:    201,
      message: 'User created successfully.',
      data:    user
    });
  } catch (err) {
    // Mongoose duplicate key error (UNIQUE constraint)
    if (err.code === 11000) {
      return res.status(409).json({
        status:  'error',
        code:    409,
        message: `A user with that email already exists.`
      });
    }
    res.status(500).json({ status: 'error', code: 500, message: err.message });
  }
});

// ── PUT /api/users/:id ────────────────────────────────────────
// UPDATE — SQL equivalent: UPDATE users SET ... WHERE id = ?
router.put('/:id', async (req, res) => {
  try {
    const { name, role } = req.body;
    if (!name && !role) {
      return res.status(400).json({
        status:  'error',
        code:    400,
        message: 'Provide at least one field to update: "name" or "role".'
      });
    }

    const updated = await User.findByIdAndUpdate(
      req.params.id,
      { $set: { ...(name && { name }), ...(role && { role }) } },
      { new: true, runValidators: true }   // runValidators = enforce schema rules
    );

    if (!updated) {
      return res.status(404).json({ status: 'error', code: 404, message: 'User not found.' });
    }

    res.status(200).json({
      status:  'success',
      code:    200,
      message: 'User updated successfully.',
      data:    updated
    });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ status: 'error', code: 400, message: 'Invalid user ID format.' });
    }
    res.status(500).json({ status: 'error', code: 500, message: err.message });
  }
});

// ── DELETE /api/users/:id ─────────────────────────────────────
// DELETE — SQL equivalent: DELETE FROM users WHERE id = ?
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ status: 'error', code: 404, message: 'User not found.' });
    }
    res.status(204).send(); // 204 No Content — success, nothing to return
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ status: 'error', code: 400, message: 'Invalid user ID format.' });
    }
    res.status(500).json({ status: 'error', code: 500, message: err.message });
  }
});

module.exports = router;

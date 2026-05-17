// ============================================================
//  routes/users.js
//  RESTful naming: Resources are Nouns. Methods are Verbs.
//
//  GET    /api/users          → list all users
//  GET    /api/users/:id      → get one user
//  POST   /api/users          → create a user
//  PUT    /api/users/:id      → update a user
//  DELETE /api/users/:id      → delete a user
// ============================================================

const express              = require('express');
const router               = express.Router();
const store                = require('../data/store');
const { validateCreateUser } = require('../middleware/validate');

// ── Helper: parse & validate :id param ───────────────────────
function parseId(req, res) {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    res.status(400).json({
      status:  'error',
      code:    400,
      message: '"id" must be a valid integer.'
    });
    return null;
  }
  return id;
}

// ── GET /api/users ────────────────────────────────────────────
// Returns all users. Supports optional ?role= query filter.
router.get('/', (req, res) => {
  let users = store.getAll();

  // Optional filter: GET /api/users?role=intern
  if (req.query.role) {
    users = users.filter(u => u.role === req.query.role);
  }

  res.status(200).json({
    status: 'success',
    code:   200,
    count:  users.length,
    data:   users
  });
});

// ── GET /api/users/:id ────────────────────────────────────────
router.get('/:id', (req, res) => {
  const id   = parseId(req, res);
  if (id === null) return;

  const user = store.getById(id);
  if (!user) {
    return res.status(404).json({
      status:  'error',
      code:    404,
      message: `User with id ${id} not found.`
    });
  }

  res.status(200).json({
    status: 'success',
    code:   200,
    data:   user
  });
});

// ── POST /api/users ───────────────────────────────────────────
// Requires: name, email. Optional: role (default: 'intern')
router.post('/', validateCreateUser, (req, res) => {
  const { name, email, role = 'intern' } = req.body;

  // Semantic check: duplicate email
  const existing = store.getAll().find(u => u.email === email.toLowerCase());
  if (existing) {
    return res.status(409).json({
      status:  'error',
      code:    409,
      message: `A user with email "${email}" already exists.`
    });
  }

  const newUser = store.create({
    name:  name.trim(),
    email: email.toLowerCase().trim(),
    role
  });

  // 201 Created — the correct status for resource creation
  res.status(201).json({
    status:  'success',
    code:    201,
    message: 'User created successfully.',
    data:    newUser
  });
});

// ── PUT /api/users/:id ────────────────────────────────────────
// Update name or role. Email is not updatable (identity field).
router.put('/:id', (req, res) => {
  const id = parseId(req, res);
  if (id === null) return;

  const { name, role } = req.body;
  const allowedRoles   = ['intern', 'admin', 'mentor'];
  const errors         = [];

  if (!name && !role) {
    return res.status(400).json({
      status:  'error',
      code:    400,
      message: 'Provide at least one field to update: "name" or "role".'
    });
  }

  if (name && name.trim().length < 2) errors.push('"name" must be at least 2 characters.');
  if (role && !allowedRoles.includes(role)) {
    errors.push(`"role" must be one of: ${allowedRoles.join(', ')}.`);
  }

  if (errors.length > 0) {
    return res.status(400).json({ status: 'error', code: 400, errors });
  }

  const updated = store.update(id, {
    ...(name && { name: name.trim() }),
    ...(role && { role })
  });

  if (!updated) {
    return res.status(404).json({
      status:  'error',
      code:    404,
      message: `User with id ${id} not found.`
    });
  }

  res.status(200).json({
    status:  'success',
    code:    200,
    message: 'User updated successfully.',
    data:    updated
  });
});

// ── DELETE /api/users/:id ─────────────────────────────────────
router.delete('/:id', (req, res) => {
  const id      = parseId(req, res);
  if (id === null) return;

  const deleted = store.remove(id);
  if (!deleted) {
    return res.status(404).json({
      status:  'error',
      code:    404,
      message: `User with id ${id} not found.`
    });
  }

  // 204 No Content — correct status for successful deletion
  res.status(204).send();
});

module.exports = router;

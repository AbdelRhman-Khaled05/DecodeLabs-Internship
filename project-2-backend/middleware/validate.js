// ============================================================
//  middleware/validate.js
//  The Gatekeeper Rule: "Never Trust the Client."
//  Two layers:
//    1. Syntactic  — Is the format correct?
//    2. Semantic   — Is the logic valid?
// ============================================================

// ── Reusable email format checker ────────────────────────────
function isValidEmail(email) {
  // Syntactic check: basic RFC-compliant pattern
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ── Reusable name checker ────────────────────────────────────
function isValidName(name) {
  return typeof name === 'string' && name.trim().length >= 2;
}

// ── Validate POST /api/users ─────────────────────────────────
function validateCreateUser(req, res, next) {
  const { name, email, role } = req.body;
  const errors = [];

  // --- Syntactic validation ---
  if (!name)  errors.push('Field "name" is required.');
  if (!email) errors.push('Field "email" is required.');

  if (name  && !isValidName(name))   errors.push('"name" must be at least 2 characters.');
  if (email && !isValidEmail(email)) errors.push('"email" must be a valid email address.');

  // --- Semantic validation ---
  const allowedRoles = ['intern', 'admin', 'mentor'];
  if (role && !allowedRoles.includes(role)) {
    errors.push(`"role" must be one of: ${allowedRoles.join(', ')}.`);
  }

  if (errors.length > 0) {
    return res.status(400).json({
      status:  'error',
      code:    400,
      message: 'Validation failed. Please fix the following errors:',
      errors
    });
  }

  next();
}

// ── Validate POST /api/contact ───────────────────────────────
function validateContact(req, res, next) {
  const { name, email, message } = req.body;
  const errors = [];

  if (!name)    errors.push('Field "name" is required.');
  if (!email)   errors.push('Field "email" is required.');
  if (!message) errors.push('Field "message" is required.');

  if (name    && !isValidName(name))       errors.push('"name" must be at least 2 characters.');
  if (email   && !isValidEmail(email))     errors.push('"email" must be a valid email address.');
  if (message && message.trim().length < 10) errors.push('"message" must be at least 10 characters.');

  if (errors.length > 0) {
    return res.status(400).json({
      status:  'error',
      code:    400,
      message: 'Validation failed.',
      errors
    });
  }

  next();
}

module.exports = { validateCreateUser, validateContact };

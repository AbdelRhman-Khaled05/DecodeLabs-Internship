// ============================================================
//  middleware/validate.js — Input validation (Gatekeeper)
// ============================================================

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateUser(req, res, next) {
  const { name, email, role } = req.body;
  const errors = [];

  if (!name)  errors.push('Field "name" is required.');
  if (!email) errors.push('Field "email" is required.');
  if (name  && name.trim().length < 2)  errors.push('"name" must be at least 2 characters.');
  if (email && !isValidEmail(email))    errors.push('"email" must be a valid email address.');

  const allowedRoles = ['intern', 'admin', 'mentor'];
  if (role && !allowedRoles.includes(role)) {
    errors.push(`"role" must be one of: ${allowedRoles.join(', ')}.`);
  }

  if (errors.length > 0) {
    return res.status(400).json({ status: 'error', code: 400, errors });
  }
  next();
}

function validatePost(req, res, next) {
  const { title, content, author } = req.body;
  const errors = [];

  if (!title)   errors.push('Field "title" is required.');
  if (!content) errors.push('Field "content" is required.');
  if (!author)  errors.push('Field "author" (User ID) is required.');

  if (title   && title.trim().length   < 3)  errors.push('"title" must be at least 3 characters.');
  if (content && content.trim().length < 10) errors.push('"content" must be at least 10 characters.');

  if (errors.length > 0) {
    return res.status(400).json({ status: 'error', code: 400, errors });
  }
  next();
}

module.exports = { validateUser, validatePost };

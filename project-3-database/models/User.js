// ============================================================
//  models/User.js
//  Pillar 1: The Blueprint — Schema & Design
//
//  Constraints enforced at schema level:
//    - UNIQUE  → email must be distinct
//    - NOT NULL → name & email are required
//    - CHECK   → role must be one of allowed values
// ============================================================

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type:     String,
      required: [true, 'Name is required'],
      trim:     true,
      minlength: [2, 'Name must be at least 2 characters']
    },
    email: {
      type:     String,
      required: [true, 'Email is required'],
      unique:   true,           // UNIQUE constraint
      trim:     true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email']
    },
    role: {
      type:    String,
      enum:    {               // CHECK constraint — only allowed values
        values:  ['intern', 'admin', 'mentor'],
        message: 'Role must be: intern, admin, or mentor'
      },
      default: 'intern'
    }
  },
  {
    timestamps: true           // Auto-adds createdAt & updatedAt
  }
);

module.exports = mongoose.model('User', UserSchema);

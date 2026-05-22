// ============================================================
//  models/Post.js
//  Demonstrates a One-to-Many (1:Many) relationship:
//  One User → Many Posts
//  The 'author' field is a Foreign Key pointing to User._id
// ============================================================

const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    title: {
      type:      String,
      required:  [true, 'Title is required'],
      trim:      true,
      minlength: [3, 'Title must be at least 3 characters'],
      maxlength: [100, 'Title cannot exceed 100 characters']
    },
    content: {
      type:      String,
      required:  [true, 'Content is required'],
      minlength: [10, 'Content must be at least 10 characters']
    },
    author: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      'User',        // Foreign Key → references User model
      required: [true, 'Author is required']
    },
    published: {
      type:    Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Post', PostSchema);

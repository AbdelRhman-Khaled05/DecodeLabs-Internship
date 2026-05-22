// ============================================================
//  routes/posts.js
//  Demonstrates 1:Many relationship — Posts belong to Users
//  Uses .populate() to JOIN the author's data (like SQL JOIN)
// ============================================================

const express           = require('express');
const router            = express.Router();
const Post              = require('../models/Post');
const { validatePost }  = require('../middleware/validate');

// ── GET /api/posts ────────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    // .populate('author') = SQL JOIN — fetches full user object
    const posts = await Post.find()
      .populate('author', 'name email role')
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: 'success',
      code:   200,
      count:  posts.length,
      data:   posts
    });
  } catch (err) {
    res.status(500).json({ status: 'error', code: 500, message: err.message });
  }
});

// ── GET /api/posts/:id ────────────────────────────────────────
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'name email role');

    if (!post) {
      return res.status(404).json({ status: 'error', code: 404, message: 'Post not found.' });
    }
    res.status(200).json({ status: 'success', code: 200, data: post });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ status: 'error', code: 400, message: 'Invalid post ID format.' });
    }
    res.status(500).json({ status: 'error', code: 500, message: err.message });
  }
});

// ── POST /api/posts ───────────────────────────────────────────
router.post('/', validatePost, async (req, res) => {
  try {
    const { title, content, author, published } = req.body;
    const post = await Post.create({ title, content, author, published });
    await post.populate('author', 'name email');

    res.status(201).json({
      status:  'success',
      code:    201,
      message: 'Post created successfully.',
      data:    post
    });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ status: 'error', code: 400, message: 'Invalid author ID format.' });
    }
    res.status(500).json({ status: 'error', code: 500, message: err.message });
  }
});

// ── PUT /api/posts/:id ────────────────────────────────────────
router.put('/:id', async (req, res) => {
  try {
    const { title, content, published } = req.body;
    if (title === undefined && content === undefined && published === undefined) {
      return res.status(400).json({
        status:  'error',
        code:    400,
        message: 'Provide at least one field to update: "title", "content", or "published".'
      });
    }

    const updated = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: {
        ...(title     !== undefined && { title }),
        ...(content   !== undefined && { content }),
        ...(published !== undefined && { published })
      }},
      { new: true, runValidators: true }
    ).populate('author', 'name email');

    if (!updated) {
      return res.status(404).json({ status: 'error', code: 404, message: 'Post not found.' });
    }

    res.status(200).json({
      status:  'success',
      code:    200,
      message: 'Post updated successfully.',
      data:    updated
    });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ status: 'error', code: 400, message: 'Invalid ID format.' });
    }
    res.status(500).json({ status: 'error', code: 500, message: err.message });
  }
});

// ── DELETE /api/posts/:id ─────────────────────────────────────
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Post.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ status: 'error', code: 404, message: 'Post not found.' });
    }
    res.status(204).send();
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ status: 'error', code: 400, message: 'Invalid post ID format.' });
    }
    res.status(500).json({ status: 'error', code: 500, message: err.message });
  }
});

module.exports = router;

const express = require('express');
const Todo    = require('../models/Todo');
const router  = express.Router();

// GET only this user’s todos
router.get('/', async (req, res) => {
  const todos = await Todo.find({ user: req.userId })
                          .sort('-createdAt');
  res.json(todos);
});

// POST new todo for this user
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    user: req.userId
  });
  res.json(todo);
});

// PATCH update only if it belongs to this user
router.patch('/:id', async (req, res) => {
  const todo = await Todo.findOneAndUpdate(
    { _id: req.params.id, user: req.userId },
    { completed: req.body.completed },
    { new: true }
  );
  if (!todo) return res.sendStatus(404);
  res.json(todo);
});

// DELETE only if it belongs to this user
router.delete('/:id', async (req, res) => {
  const result = await Todo.deleteOne({
    _id: req.params.id,
    user: req.userId
  });
  if (result.deletedCount === 0) return res.sendStatus(404);
  res.sendStatus(204);
});

module.exports = router;

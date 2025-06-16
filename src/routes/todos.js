const express = require('express');
const Todo = require('../models/Todo');
const router = express.Router();

// GET all
router.get('/', async (req, res) => {
  const todos = await Todo.find().sort('-createdAt');
  res.json(todos);
});

// POST new
router.post('/', async (req, res) => {
  const newTodo = new Todo({ text: req.body.text });
  const saved = await newTodo.save();
  res.json(saved);
});

// PATCH update
router.patch('/:id', async (req, res) => {
  const updated = await Todo.findByIdAndUpdate(
    req.params.id,
    { completed: req.body.completed },
    { new: true }
  );
  res.json(updated);
});

// DELETE
router.delete('/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;

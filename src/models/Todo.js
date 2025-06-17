const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  text:      { type: String,               required: true },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date,    default: Date.now },
  user:      { type: mongoose.Schema.Types.ObjectId,
               ref: 'User',
               required: true }
});

module.exports = mongoose.model('Todo', TodoSchema);

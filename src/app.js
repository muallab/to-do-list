const express = require('express');
const cors    = require('cors');
const mongoose = require('mongoose');
const { logRequest } = require('./services/logger');
const todoRoutes = require('./routes/todos');

const app = express();
app.use((req, res, next) => {
    logRequest(req);
    next();
  });
app.use(cors());
app.use(express.json());
app.use('/api/todos', todoRoutes);
app.use(express.static('src/public'));

mongoose
  .connect('mongodb://127.0.0.1:27017/todoapp')
  .then(() => console.log('MongoDB connected'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));

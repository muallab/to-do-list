const express       = require('express');
const cors          = require('cors');
const mongoose      = require('mongoose');
const cookieParser  = require('cookie-parser');
const { logRequest } = require('./services/logger');
const { router: authRoutes, verifyToken } = require('./routes/auth');
const todoRoutes    = require('./routes/todos');

const app = express();

//  Logging
app.use((req, res, next) => { logRequest(req); next(); });

// ─── Core Middleware ─────────────────────────────────────────────────────────
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// ─── Auth Endpoints ──────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);

// ─── Protected Todo Endpoints ───────────────────────────────────────────────
app.use('/api/todos', verifyToken, todoRoutes);

// ─── Static Front-End ────────────────────────────────────────────────────────
app.use(express.static('src/public'));

// ─── DB & Server Startup ────────────────────────────────────────────────────
mongoose.connect('mongodb://127.0.0.1:27017/todoapp')
  .then(() => console.log('MongoDB connected'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));

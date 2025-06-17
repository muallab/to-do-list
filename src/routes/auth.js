const express = require('express');
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');
const User    = require('../models/User');
const router  = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'a-very-secret-key';

// Registration 
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    await User.create({ username, password: hash });
    res.status(201).json({ msg: 'User created' });
  } catch (err) {
    res.status(400).json({ error: 'Username taken' });
  }
});

// ─── Login ─────────────────────────────────────────────────────────────────
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
  // Send JWT as httpOnly cookie:
  res.cookie('token', token, { httpOnly: true }).json({ msg: 'Logged in' });
});

// ─── Middleware to protect routes ───────────────────────────────────────────
function verifyToken(req, res, next) {
  const token =
    req.cookies?.token ||
    (req.header('Authorization')?.split(' ')[1]);
  if (!token) return res.status(401).send('No token');
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.userId = payload.userId;
    next();
  } catch {
    res.status(401).send('Invalid token');
  }
}

module.exports = { router, verifyToken };

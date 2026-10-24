const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/User');
const { requireAuth, JWT_SECRET } = require('../middleware/auth');
const { memoryStore } = require('../database/db');

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role, institution } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required.' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let userObj = null;

    // Try MongoDB first
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: 'An account with this email already exists.' });
      }

      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        role: role || 'researcher',
        institution: institution || 'Department of CSE'
      });
      await newUser.save();
      userObj = {
        id: newUser._id.toString(),
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        institution: newUser.institution
      };
    } catch {
      // Memory Store fallback
      const existing = memoryStore.users.find(u => u.email === email);
      if (existing) {
        return res.status(409).json({ message: 'An account with this email already exists.' });
      }
      const memUser = {
        id: `usr_${uuidv4().slice(0, 8)}`,
        name,
        email,
        password: hashedPassword,
        role: role || 'researcher',
        institution: institution || 'Department of CSE'
      };
      memoryStore.users.push(memUser);
      userObj = {
        id: memUser.id,
        name: memUser.name,
        email: memUser.email,
        role: memUser.role,
        institution: memUser.institution
      };
    }

    const token = jwt.sign(userObj, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ user: userObj, token });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Internal server error during registration.' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Special check for Academic Evaluator Demo Account
    if (email === 'evaluator@university.edu' && password === 'AgriFusion@2026') {
      const demoUser = {
        id: 'usr_eval_academic_2026',
        name: 'Academic Review Committee',
        email: 'evaluator@university.edu',
        role: 'evaluator',
        institution: 'Dept of Computer Science & Engineering (AI/ML)'
      };
      const token = jwt.sign(demoUser, JWT_SECRET, { expiresIn: '7d' });
      return res.json({ user: demoUser, token });
    }

    let foundUser = null;

    // Check MongoDB
    try {
      const dbUser = await User.findOne({ email });
      if (dbUser) {
        const isMatch = await bcrypt.compare(password, dbUser.password);
        if (isMatch) {
          foundUser = {
            id: dbUser._id.toString(),
            name: dbUser.name,
            email: dbUser.email,
            role: dbUser.role,
            institution: dbUser.institution
          };
        }
      }
    } catch {
      // Check memory store
      const memUser = memoryStore.users.find(u => u.email === email);
      if (memUser) {
        const isMatch = await bcrypt.compare(password, memUser.password);
        if (isMatch) {
          foundUser = {
            id: memUser.id,
            name: memUser.name,
            email: memUser.email,
            role: memUser.role,
            institution: memUser.institution
          };
        }
      }
    }

    if (!foundUser) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const token = jwt.sign(foundUser, JWT_SECRET, { expiresIn: '7d' });
    res.json({ user: foundUser, token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Internal server error during authentication.' });
  }
});

// GET /api/auth/me
router.get('/me', requireAuth, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;

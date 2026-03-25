const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/UserJson');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key_here';

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    if (User.findByEmail(email)) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const user = await User.create({ name, email, password, phone });

    // Create JWT token
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '24h',
    });

    // Remove password from response
    const userResponse = { ...user };
    delete userResponse.password;

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: userResponse,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = User.findByEmail(email);
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const isPasswordValid = await User.comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Create JWT token
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '24h',
    });

    // Remove password from response
    const userResponse = { ...user };
    delete userResponse.password;

    res.json({
      message: 'Login successful',
      token,
      user: userResponse,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

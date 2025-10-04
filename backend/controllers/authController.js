// backend/controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) return res.status(400).json({ msg: 'Please provide name, email and password' });

    // Checking  if email already exist
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) return res.status(400).json({ msg: 'User already exists with this email' });

    // hash pass
    const saltRounds = 10;
    const hashed = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({ name, email: email.toLowerCase(), password: hashed });

    return res.status(201).json({ msg: 'User registered successfully', userId: newUser._id });
  } catch (error) {
    // duplicate erroor
    return res.status(500).json({ msg: 'Server error', error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ msg: 'Please provide email and password' });

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: 'Invalid credentials' });

    const payload = { id: user._id, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

    return res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (error) {
    return res.status(500).json({ msg: 'Server error', error: error.message });
  }
};

module.exports = { signup, login };

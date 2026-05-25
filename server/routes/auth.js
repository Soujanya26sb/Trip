const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const User = require('../models/User');

const TIMEZONE = 'Asia/Kolkata';
const createToken = () => crypto.randomBytes(24).toString('hex');

function formatLocalTime(date = new Date()) {
  return new Intl.DateTimeFormat('en-IN', {
    timeZone: TIMEZONE,
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  }).format(date);
}

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password) 
      return res.status(400).json({ message: 'Email and password are required.' });

    let user = await User.findOne({ email });
    const now = new Date();

    if (user) {
      user.password = password;
      if (name) user.name = name;
      if (!user.createdAtLocal) {
        user.createdAtLocal = formatLocalTime(now);
        user.createdAtTimezone = TIMEZONE;
      }
      await user.save();
      return res.status(200).json({
        message: 'Sign in successful',
        token: createToken(),
        user: {
          name: user.name,
          email: user.email,
          createdAtLocal: user.createdAtLocal,
          createdAtTimezone: user.createdAtTimezone
        }
      });
    }

    user = new User({
      name: name || '',
      email,
      password,
      createdAtLocal: formatLocalTime(now),
      createdAtTimezone: TIMEZONE
    });
    await user.save();

    return res.status(201).json({
      message: 'Account registered successfully!',
      token: createToken(),
      user: {
        name: user.name,
        email: user.email,
        createdAtLocal: user.createdAtLocal,
        createdAtTimezone: user.createdAtTimezone
      }
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: 'Email and password are required.' });

    const user = await User.findOne({ email });
    if (!user || user.password !== password)
      return res.status(400).json({ message: 'Invalid email or password.' });

    return res.status(200).json({
      message: 'Sign in successful',
      token: createToken(),
      user: {
        name: user.name,
        email: user.email,
        createdAtLocal: user.createdAtLocal,
        createdAtTimezone: user.createdAtTimezone
      }
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
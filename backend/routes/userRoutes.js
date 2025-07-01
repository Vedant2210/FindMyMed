

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const axios = require('axios');

// Customer Registration
router.post('/register-customer', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email, role: 'customer' });
    if (existingUser) {
      return res.status(400).json({ error: 'Customer already exists ❌' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: 'customer'
    });

    await newUser.save();

    res.status(201).json({ message: 'Customer registered successfully ✅' });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ error: 'Server error during registration ❌' });
  }
});

// Store Owner Registration
router.post('/register-storeowner', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword, role: 'storeowner' });
    await user.save();
    res.json({ message: 'Store Owner registered successfully ✅' });
  } catch (error) {
    res.status(500).json({ error: 'Store Owner registration failed ❌' });
  }
});






// Customer Login
// router.post('/login-customer', async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email, role: 'customer' });

//   if (!user) return res.status(401).json({ error: 'Customer not found ❌' });

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) return res.status(401).json({ error: 'Invalid credentials ❌' });

//   const token = jwt.sign({ userId: user._id,name: user.name }, process.env.JWT_SECRET, { expiresIn: '1h' });
//   res.json({ message: 'Login successful ✅', token , name: user.name});
// });
router.post('/login-customer', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, role: 'customer' });
  if (!user) return res.status(401).json({ error: 'Customer not found ❌' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ error: 'Invalid credentials ❌' });

  const token = jwt.sign(
    { userId: user._id, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({ message: 'Login successful ✅', token, name: user.name });
});

// Store Owner Login
router.post('/login-storeowner', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, role: 'storeowner' });
    if (!user) {
      return res.status(404).json({ error: 'Store Owner not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, name: user.name });
  } catch (error) {
    console.error('Store Owner Login Error:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});


router.post('/google-register', async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    // Check if user already exists
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        name,
        email,
        password: '', // No password for Google user
        role: 'customer'
      });

      await user.save();
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Google registration successful ✅', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Google registration failed ❌' });
  }
});




router.post('/google-login', async (req, res) => {
  try {
    const { name, email, googleId } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        name,
        email,
        password: googleId,  // Optional: Store Google ID just to have some value
        role: 'customer'
      });
      await user.save();
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({ token, name: user.name });
  } catch (error) {
    console.error('Google login error:', error);
    res.status(500).json({ error: 'Google login failed ❌' });
  }
});


router.post('/login-storeowner-google', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email, role: 'storeowner' });
    if (!user) {
      return res.status(404).json({ error: 'Store Owner not found ❌' });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      'your_jwt_secret',               // Replace with your actual secret
      { expiresIn: '1h' }
    );

    res.json({ token, name: user.name });
  } catch (error) {
    console.error('Google Store Owner Login Error:', error);
    res.status(500).json({ error: 'Server Error ❌' });
  }
});

module.exports = router;

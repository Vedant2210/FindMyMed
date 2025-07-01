const express = require('express');
const router = express.Router();
const Store = require('../models/store');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/auth');
const requiredRole = require('../middlewares/rolecheck');

// Middleware for verifying JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token missing ❌' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token ❌' });
    }

    // ✅ Make sure both userId and role are available for downstream middlewares like requiredRole
    req.user = {
      userId: decoded.userId,
      role: decoded.role
    };

    next();
  });
}

router.get('/my-stores', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const stores = await Store.find({ owner: userId });
    res.json(stores);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stores' });
  }
});


// Add Store (Protected Route)
router.post('/add', authMiddleware, requiredRole('storeowner'), async (req, res) => {
  try {
    const { name, location, contact, state, city } = req.body;

    if (!name || !location || !contact || !state || !city) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newStore = new Store({
      name,
      location,
      contact,
      state,
      city,
      owner: req.user.userId
    });

    await newStore.save();

    res.status(201).json({
      message: '✅ Store created successfully',
      store: newStore
    });
  } catch (error) {
    console.error('Add Store Error:', error);
    res.status(500).json({ error: 'Server Error ❌' });
  }
});


// In storeRoutes.js
router.get('/locations', async (req, res) => {
  try {
    const stores = await Store.find({}, 'state city'); // Only fetch state and city fields

    const locationMap = {};

    stores.forEach((store) => {
      if (!locationMap[store.state]) {
        locationMap[store.state] = new Set();
      }
      locationMap[store.state].add(store.city);
    });

    // Convert Set to Array for JSON serialization
    const formattedLocations = {};
    for (const state in locationMap) {
      formattedLocations[state] = Array.from(locationMap[state]);
    }

    res.json(formattedLocations);
  } catch (error) {
    console.error('Error fetching locations:', error);
    res.status(500).json({ error: 'Failed to fetch locations' });
  }
});

module.exports = router;




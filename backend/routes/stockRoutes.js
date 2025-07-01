const express = require('express');
const router = express.Router();
const Stock = require('../models/Stock');
const Medicine = require('../models/Medicine');
const Store = require('../models/store');
const jwt = require('jsonwebtoken');

// Auth Middleware (same as before)
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token missing' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
}

// Add/Update stock for a medicine
router.post('/add', authenticateToken, async (req, res) => {
  try {
    const { storeId, medicineId, quantity } = req.body;

    const existingStock = await Stock.findOne({ store: storeId, medicine: medicineId });

    if (existingStock) {
      existingStock.quantity = quantity;
      await existingStock.save();
      return res.json({ message: 'Stock updated', stock: existingStock });
    }

    const newStock = new Stock({
      store: storeId,
      medicine: medicineId,
      quantity
    });

    await newStock.save();
    res.status(201).json({ message: 'Stock added', stock: newStock });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// In stockRoutes.js
router.get('/availability', async (req, res) => {
  const { state, city, medicineName } = req.query;

  try {
    const medicine = await Medicine.findOne({ name: { $regex: new RegExp(medicineName, 'i') } });
    if (!medicine) return res.status(404).json({ error: 'Medicine not found' });

    const stores = await Store.find({ state, city });
    const storeIds = stores.map((s) => s._id);

    const stocks = await Stock.find({
      store: { $in: storeIds },
      medicine: medicine._id
    }).populate('store');

    const results = stocks.map((stock) => ({
      storeName: stock.store.name,
      location: stock.store.location,
      quantity: stock.quantity
    }));

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch availability' });
  }
});


module.exports = router;

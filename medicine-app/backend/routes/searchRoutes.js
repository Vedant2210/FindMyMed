const express = require('express');
const router = express.Router();
const Stock = require('../models/Stock');
const Medicine = require('../models/Medicine');
const Store = require('../models/store');

// Search stores having a particular medicine
router.get('/medicine', async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({ error: 'Medicine name is required' });
    }

    // Find the medicine first
    const medicine = await Medicine.findOne({ name: new RegExp(name, 'i') });

    if (!medicine) {
      return res.status(404).json({ error: 'Medicine not found' });
    }

    // Find all stocks with quantity > 0 for this medicine
    const stocks = await Stock.find({ medicine: medicine._id, quantity: { $gt: 0 } }).populate('store');

    if (stocks.length === 0) {
      return res.status(404).json({ message: 'No stores have this medicine in stock' });
    }

    const storeList = stocks.map(stock => ({
      storeName: stock.store.name,
      location: stock.store.location,
      contact: stock.store.contact,
      availableQuantity: stock.quantity
    }));

    res.json({ medicine: medicine.name, stores: storeList });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

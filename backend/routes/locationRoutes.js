const express = require('express');
const router = express.Router();
const Store = require('../models/store');
const Medicine = require('../models/Medicine');
const Stock = require('../models/Stock');

// Get all states
router.get('/states', async (req, res) => {
  try {
    const states = await Store.distinct('state');
    res.json(states);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch states' });
  }
});

// Get cities for a state
router.get('/cities/:state', async (req, res) => {
  try {
    const state = req.params.state;
    const cities = await Store.distinct('city', { state });
    res.json(cities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cities' });
  }
});

// Search stores by state, city, and medicine
router.get('/search', async (req, res) => {
  try {
    const { state, city, medicine } = req.query;

    const medicineDoc = await Medicine.findOne({
      name: { $regex: new RegExp(`^${medicine}$`, 'i') } // case-insensitive match
    });

    if (!medicineDoc) {
      return res.status(404).json({ error: 'Medicine not found' });
    }

    const stores = await Store.find({ state, city });

    const storeIds = stores.map(store => store._id);

    const stockItems = await Stock.find({
      store: { $in: storeIds },
      medicine: medicineDoc._id,
      quantity: { $gt: 0 }
    }).populate('store');

    const resultStores = stockItems.map(item => ({
      storeName: item.store.name,
      location: item.store.location,
      contact: item.store.contact,
      availableQuantity: item.quantity
    }));

    res.json(resultStores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Search failed' });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Medicine = require('../models/Medicine');
const Stock = require('../models/Stock');

// Add New Medicine
router.post('/add', async (req, res) => {
  try {
    const { name, description } = req.body;
    const newMed = new Medicine({ name, description });
    await newMed.save();
    res.status(201).json({ message: 'Medicine added successfully', medicine: newMed });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get all medicines
router.get('/all', async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.json({ medicines });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch medicines' });
  }
});


router.get('/by-store/:storeId', async (req, res) => {
  try {
    const { storeId } = req.params;

    // Find all stock items for this store, and populate medicine details
    const stockItems = await Stock.find({ store: storeId }).populate('medicine');

    // Extract unique medicine list
    const medicines = stockItems.map(item => item.medicine);

    res.json(medicines);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch medicines for the store' });
  }
});





router.get('/suggestions', async (req, res) => {
  const query = req.query.query;

  if (!query || query.trim() === '') {
    return res.json([]);
  }

  try {
    const suggestions = await Medicine.find({
      name: { $regex: `^${query}`, $options: 'i' }
    })
      .limit(10)
      .select('name -_id');

    const names = suggestions.map(med => med.name);
    res.json(names);
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    res.status(500).json({ error: 'Server error' });
  }
});



module.exports = router;

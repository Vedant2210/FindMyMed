const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  store: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', required: true },
  medicine: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine', required: true },
  quantity: { type: Number, required: true }
});

module.exports = mongoose.models.Stock || mongoose.model('Stock', stockSchema);


const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  name: { type: String, required: true, lowercase: true },
  description: String
});

module.exports = mongoose.models.Medicine || mongoose.model('Medicine', medicineSchema);


const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
  name: String,
  location: String,
  contact: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  state: String,
  city: String
});

module.exports = mongoose.models.Store || mongoose.model('Store', storeSchema);

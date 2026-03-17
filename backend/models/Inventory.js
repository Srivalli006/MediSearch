const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  pharmacyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pharmacy', required: true },
  medicineId: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine', required: true },
  stockQuantity: { type: Number, required: true, min: 0 },
  price: { type: Number, required: true },
  expiryDate: { type: Date, required: true },
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Inventory', inventorySchema);

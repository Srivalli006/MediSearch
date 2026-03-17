const mongoose = require('mongoose');

const searchLogSchema = new mongoose.Schema({
  query:      { type: String, required: true },
  department: { type: String, default: 'General' },
  resultCount:{ type: Number, default: 0 },
  userId:     { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  timestamp:  { type: Date, default: Date.now }
});

module.exports = mongoose.model('SearchLog', searchLogSchema);

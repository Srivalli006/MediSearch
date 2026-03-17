const mongoose = require('mongoose');

const DEPARTMENTS = [
  'General', 'Cardiology', 'Paediatrics', 'Dermatology',
  'Orthopaedics', 'Neurology', 'Oncology', 'Gynaecology',
  'Ophthalmology', 'ENT', 'Psychiatry', 'Pulmonology'
];

const medicineSchema = new mongoose.Schema({
  name:               { type: String, required: true },
  description:        { type: String, default: '' },
  manufacturer:       { type: String, default: '' },
  // Composition Module
  composition:        { type: [String], default: [] },  // e.g. ['Paracetamol 500mg', 'Caffeine 30mg']
  // Description Module extras
  usageInstructions:  { type: String, default: '' },
  sideEffects:        { type: String, default: '' },
  // Department Module
  department: {
    type: String,
    enum: DEPARTMENTS,
    default: 'General'
  },
  createdAt:          { type: Date, default: Date.now }
});

// text index for full-text search on name + composition
medicineSchema.index({ name: 'text', composition: 'text' });

module.exports = mongoose.model('Medicine', medicineSchema);
module.exports.DEPARTMENTS = DEPARTMENTS;

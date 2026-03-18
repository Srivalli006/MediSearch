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
  composition:        [String],
  department:         { type: String, default: 'General' },
  // Detailed Composition (Detailed ingredients module)
  detailedComposition: [{
    ingredient: { type: String, required: true },
    quantity:   { type: Number, required: true },
    unit:       { type: String, required: true },
    howToUse:   { type: String },
    sideEffects: { type: String },
    precautions: { type: String },
    interactions: { type: String },
    storage:    { type: String }
  }],
  clinicalOverview: {
    uses: { type: String },
    mechanism: { type: String },
    contraindications: { type: String },
    sideEffects: { type: String },
    precautions: { type: String },
    pregnancyCategory: { type: String },
    alcoholWarning: { type: String },
    drivingWarning: { type: String },
    lactationWarning: { type: String }
  },
  createdAt:          { type: Date, default: Date.now }
});

// text index for full-text search on name + composition
medicineSchema.index({ name: 'text', composition: 'text' });

module.exports = mongoose.model('Medicine', medicineSchema);
module.exports.DEPARTMENTS = DEPARTMENTS;

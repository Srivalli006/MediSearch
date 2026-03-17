const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Pharmacy = require('./models/Pharmacy');
const Medicine = require('./models/Medicine');
const Inventory = require('./models/Inventory');

const seedDatabase = async () => {
  try {
    await Promise.all([
      User.deleteMany({}),
      Pharmacy.deleteMany({}),
      Medicine.deleteMany({}),
      Inventory.deleteMany({})
    ]);

    const hashedPassword = await bcrypt.hash('password123', 10);

    // Users
    const admin  = await User.create({ name: 'Admin User',    email: 'admin@medisearch.com',    password: hashedPassword, role: 'admin' });
    const owner1 = await User.create({ name: 'Rakesh Sharma', email: 'apollo@example.com',      password: hashedPassword, role: 'pharmacy_owner' });
    const owner2 = await User.create({ name: 'Sunita Patel',  email: 'medplus@example.com',     password: hashedPassword, role: 'pharmacy_owner' });
    await           User.create({ name: 'John Customer',  email: 'customer@example.com',    password: hashedPassword, role: 'customer' });

    // Pharmacies
    const p1 = await Pharmacy.create({ name: 'Apollo Pharmacy',         ownerId: owner1._id, address: '123 Main Street, City Center',      location: { lat: 17.3850, lng: 78.4867 }, contactNumber: '+91 9876543210', isVerified: true  });
    const p2 = await Pharmacy.create({ name: 'MedPlus Medical Services', ownerId: owner2._id, address: '45 West Avenue, Near Hospital',      location: { lat: 17.4050, lng: 78.4967 }, contactNumber: '+91 9012345678', isVerified: true  });
    const p3 = await Pharmacy.create({ name: 'HealthCare Pharmacy',      ownerId: owner1._id, address: '78 East Road, Downtown',            location: { lat: 17.3650, lng: 78.5067 }, contactNumber: '+91 9345678901', isVerified: false });
    const p4 = await Pharmacy.create({ name: 'CityMed Drugstore',        ownerId: owner2._id, address: '9 North Plaza, Sector 5',           location: { lat: 17.3950, lng: 78.4767 }, contactNumber: '+91 9567890123', isVerified: true  });

    // Medicines — Including many Paracetamol variants as requested for "Alternative Brands" feature
    const medicines = await Medicine.insertMany([
      // Paracetamol 500mg variants
      { name: 'Paracetamol 500mg (Generic)',   description: 'Generic paracetamol for mild pain/fever.', manufacturer: 'Generic Pharma', composition: ['Paracetamol 500mg'], department: 'General', usageInstructions: '1 tablet every 6 hours', sideEffects: 'Rarely nausea.' },
      { name: 'Crocin Advance 500mg',          description: 'Fast acting paracetamol for fever and pain relief.', manufacturer: 'GSK', composition: ['Paracetamol 500mg'], department: 'General', usageInstructions: '1 tablet every 6 hours', sideEffects: 'Rarely nausea.' },
      { name: 'Calpol 500mg',                  description: 'Used for fever reduction and pain relief.', manufacturer: 'GSK', composition: ['Paracetamol 500mg'], department: 'General', usageInstructions: '1 tablet every 6 hours', sideEffects: 'Rarely nausea.' },
      { name: 'Pacimol 500mg',                 description: 'Antipyretic and analgesic.', manufacturer: 'Ipca', composition: ['Paracetamol 500mg'], department: 'General', usageInstructions: '1 tablet every 6 hours', sideEffects: 'Rarely nausea.' },
      { name: 'Tylenol 500mg',                 description: 'Pain reliever and fever reducer.', manufacturer: 'J&J', composition: ['Paracetamol 500mg'], department: 'General', usageInstructions: '1 tablet every 6 hours', sideEffects: 'Rarely nausea.' },
      
      // Paracetamol 650mg variants
      { name: 'Dolo 650',                      description: 'Higher dose paracetamol for stronger fever control.', manufacturer: 'Micro Labs', composition: ['Paracetamol 650mg'], department: 'General', usageInstructions: '1 tablet every 6 hours', sideEffects: 'Can cause liver stress if overused.' },
      { name: 'Crocin 650 Advance',            description: 'Extended relief paracetamol.', manufacturer: 'GSK', composition: ['Paracetamol 650mg'], department: 'General', usageInstructions: '1 tablet every 6 hours', sideEffects: 'Can cause liver stress if overused.' },
      { name: 'Calpol 650',                    description: 'Stronger dose for severe fever.', manufacturer: 'GSK', composition: ['Paracetamol 650mg'], department: 'General', usageInstructions: '1 tablet every 6 hours', sideEffects: 'Can cause liver stress if overused.' },

      // Amoxicillin variants
      { name: 'Amoxicillin 250mg',             description: 'Generic broad-spectrum antibiotic.', manufacturer: 'Cipla', composition: ['Amoxicillin Trihydrate 250mg'], department: 'ENT', usageInstructions: '1 capsule every 8 hours', sideEffects: 'Nausea, diarrhea.' },
      { name: 'Novamox 250mg',                 description: 'Branded broad-spectrum antibiotic.', manufacturer: 'Cipla', composition: ['Amoxicillin Trihydrate 250mg'], department: 'ENT', usageInstructions: '1 capsule every 8 hours', sideEffects: 'Nausea, diarrhea.' },
      { name: 'Almox 250mg',                   description: 'Treats bacterial infections.', manufacturer: 'Alkem', composition: ['Amoxicillin Trihydrate 250mg'], department: 'ENT', usageInstructions: '1 capsule every 8 hours', sideEffects: 'Nausea, diarrhea.' },

      // Others
      { name: 'Vitamin C 1000mg',              description: 'Essential vitamin for immunity.', manufacturer: 'Sun Pharma', composition: ['Ascorbic Acid 1000mg'], department: 'General', usageInstructions: '1 tablet daily', sideEffects: 'Stomach upset.' },
      { name: 'Limcee 500mg',                  description: 'Vitamin C chewable tablets.', manufacturer: 'Abbott', composition: ['Ascorbic Acid 500mg'], department: 'General', usageInstructions: '1-2 tablets daily', sideEffects: 'Stomach upset.' },
      
      { name: 'Atorvastatin 10mg',             description: 'Statin to lower cholesterol.', manufacturer: 'Sun Pharma', composition: ['Atorvastatin Calcium 10mg'], department: 'Cardiology', usageInstructions: '1 tablet daily', sideEffects: 'Muscle pain.' },
      { name: 'Lipitor 10mg',                  description: 'Branded statin to lower cholesterol.', manufacturer: 'Pfizer', composition: ['Atorvastatin Calcium 10mg'], department: 'Cardiology', usageInstructions: '1 tablet daily', sideEffects: 'Muscle pain.' },
    ]);

    // Helper to find medicine by name
    const med = name => medicines.find(m => m.name === name);

    // Inventory
    await Inventory.insertMany([
      // Apollo Pharmacy gets lot of Paracetamol variants
      { pharmacyId: p1._id, medicineId: med('Paracetamol 500mg (Generic)')._id, stockQuantity: 145, price: 10,  expiryDate: new Date('2026-10-15') },
      { pharmacyId: p1._id, medicineId: med('Crocin Advance 500mg')._id,        stockQuantity: 200, price: 15,  expiryDate: new Date('2027-01-10') },
      { pharmacyId: p1._id, medicineId: med('Calpol 500mg')._id,                stockQuantity: 80,  price: 14,  expiryDate: new Date('2026-11-05') },
      { pharmacyId: p1._id, medicineId: med('Dolo 650')._id,                    stockQuantity: 300, price: 30,  expiryDate: new Date('2027-02-28') },
      { pharmacyId: p1._id, medicineId: med('Amoxicillin 250mg')._id,           stockQuantity: 50,  price: 40,  expiryDate: new Date('2026-08-20') },
      { pharmacyId: p1._id, medicineId: med('Limcee 500mg')._id,                stockQuantity: 120, price: 25,  expiryDate: new Date('2027-06-30') },
      { pharmacyId: p1._id, medicineId: med('Atorvastatin 10mg')._id,           stockQuantity: 45,  price: 90,  expiryDate: new Date('2026-12-30') },

      // MedPlus gets others
      { pharmacyId: p2._id, medicineId: med('Pacimol 500mg')._id,               stockQuantity: 32,  price: 12,  expiryDate: new Date('2026-12-01') },
      { pharmacyId: p2._id, medicineId: med('Tylenol 500mg')._id,               stockQuantity: 60,  price: 18,  expiryDate: new Date('2027-03-15') },
      { pharmacyId: p2._id, medicineId: med('Crocin 650 Advance')._id,          stockQuantity: 90,  price: 28,  expiryDate: new Date('2026-09-10') },
      { pharmacyId: p2._id, medicineId: med('Novamox 250mg')._id,               stockQuantity: 45,  price: 45,  expiryDate: new Date('2027-04-01') },
      { pharmacyId: p2._id, medicineId: med('Lipitor 10mg')._id,                stockQuantity: 120, price: 300, expiryDate: new Date('2026-07-20') },

      // CityMed
      { pharmacyId: p4._id, medicineId: med('Calpol 650')._id,                  stockQuantity: 200, price: 27,  expiryDate: new Date('2027-01-01') },
      { pharmacyId: p4._id, medicineId: med('Almox 250mg')._id,                 stockQuantity: 35,  price: 38,  expiryDate: new Date('2026-11-30') },
      { pharmacyId: p4._id, medicineId: med('Vitamin C 1000mg')._id,            stockQuantity: 25,  price: 55,  expiryDate: new Date('2026-10-01') },
      { pharmacyId: p4._id, medicineId: med('Dolo 650')._id,                    stockQuantity: 90,  price: 31,  expiryDate: new Date('2027-08-15') },
    ]);

    console.log('✅ Database seeded with 4 users, 4 pharmacies, 15 medicines, 16 inventory entries');
    console.log('📧 Login: admin@medisearch.com | apollo@example.com | customer@example.com  (password: password123)');
  } catch (err) {
    console.error('❌ Seed error:', err.message);
  }
};

module.exports = seedDatabase;

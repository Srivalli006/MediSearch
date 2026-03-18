const bcrypt = require('bcryptjs');
const dns = require('dns');

// Force use Google DNS (8.8.8.8) to resolve Atlas SRV records
dns.setServers(['8.8.8.8', '8.8.4.4']);
const User = require('./models/User');
const Pharmacy = require('./models/Pharmacy');
const Medicine = require('./models/Medicine');
const Inventory = require('./models/Inventory');
const mongoose = require('mongoose');
const medicineCatalog = require('./medicine_catalog');

const MONGODB_URI = process.env.MONGODB_URI;

const seedDatabase = async () => {
  try {
    console.log('🧹 Cleaning existing data...');
    await Promise.all([
      User.deleteMany({}),
      Pharmacy.deleteMany({}),
      Medicine.deleteMany({}),
      Inventory.deleteMany({})
    ]);

    const hashedPassword = await bcrypt.hash('password123', 10);

    // Users
    console.log('👤 Seeding users...');
    const admin  = await User.create({ name: 'Admin User',    email: 'admin@medisearch.com',    password: hashedPassword, role: 'admin' });
    const owner1 = await User.create({ name: 'Rakesh Sharma', email: 'apollo@example.com',      password: hashedPassword, role: 'pharmacy_owner' });
    const owner2 = await User.create({ name: 'Sunita Patel',  email: 'medplus@example.com',     password: hashedPassword, role: 'pharmacy_owner' });
    await           User.create({ name: 'John Customer',  email: 'customer@example.com',    password: hashedPassword, role: 'customer' });

    // Pharmacies
    console.log('🏥 Seeding pharmacies...');
    const p1 = await Pharmacy.create({ name: 'Apollo Pharmacy',         ownerId: owner1._id, address: '123 Main Street, City Center',      location: { lat: 17.3850, lng: 78.4867 }, contactNumber: '+91 9876543210', isVerified: true  });
    const p2 = await Pharmacy.create({ name: 'MedPlus Medical Services', ownerId: owner2._id, address: '45 West Avenue, Near Hospital',      location: { lat: 17.4050, lng: 78.4967 }, contactNumber: '+91 9012345678', isVerified: true  });
    const p3 = await Pharmacy.create({ name: 'HealthCare Pharmacy',      ownerId: owner1._id, address: '78 East Road, Downtown',            location: { lat: 17.3650, lng: 78.5067 }, contactNumber: '+91 9345678901', isVerified: false });
    const p4 = await Pharmacy.create({ name: 'CityMed Drugstore',        ownerId: owner2._id, address: '9 North Plaza, Sector 5',           location: { lat: 17.3950, lng: 78.4767 }, contactNumber: '+91 9567890123', isVerified: true  });

    // Medicines
    console.log(`💊 Seeding ${medicineCatalog.length} medicines from catalog...`);
    const medicines = await Medicine.insertMany(medicineCatalog);

    // Inventory Distribution
    console.log('📦 Seeding inventory (populating pharmacy stocks)...');
    const inventoryData = [];
    const activePharmacies = [p1, p2, p4]; // Use verified pharmacies for best UX

    medicines.forEach((m, index) => {
      // Ensure every medicine is available in at least 1-3 pharmacies
      const pharmacyCount = (index % 3) + 1; 
      // Shuffle activePharmacies briefly by rotating
      const availablePharmacies = [...activePharmacies].sort(() => 0.5 - Math.random());
      
      for (let i = 0; i < pharmacyCount; i++) {
        const p = availablePharmacies[i];
        inventoryData.push({
          pharmacyId: p._id,
          medicineId: m._id,
          stockQuantity: Math.floor(Math.random() * 200) + 5, // 5 to 205 units
          price: Math.floor(Math.random() * 500) + 10,   // 10 to 510 INR
          expiryDate: new Date(Date.now() + (Math.random() * 700 + 150) * 24 * 60 * 60 * 1000)
        });
      }
    });

    await Inventory.insertMany(inventoryData);

    console.log(`✅ DATABASE EXPANSION COMPLETE!`);
    console.log(`- Medicines: ${medicines.length}`);
    console.log(`- Inventory Entries: ${inventoryData.length}`);
    
  } catch (err) {
    console.error('❌ Data Expansion failed:', err.message);
  }
};

module.exports = seedDatabase;

if (require.main === module) {
  require('dotenv').config();
  (async () => {
    try {
      if (MONGODB_URI) {
        console.log('Connecting to MongoDB Atlas...');
        await mongoose.connect(MONGODB_URI);
      } else {
        console.log('No MONGODB_URI found, using local fallback...');
        const { MongoMemoryServer } = require('mongodb-memory-server');
        const mongod = await MongoMemoryServer.create();
        await mongoose.connect(mongod.getUri());
      }
      await seedDatabase();
      process.exit(0);
    } catch (err) {
      console.error('Standalone seeding failed:', err);
      process.exit(1);
    }
  })();
}

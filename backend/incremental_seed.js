const mongoose = require('mongoose');
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
require('dotenv').config({ path: './backend/.env' });
const Medicine = require('./models/Medicine');
const Inventory = require('./models/Inventory');
const Pharmacy = require('./models/Pharmacy');
const expandedCatalog = require('./medicine_catalog_expanded');

async function incrementalSeed() {
  try {
    const MONGO_URI_ATLAS = "mongodb+srv://clusteruser:cluster%40123@cluster0.j416xnc.mongodb.net/medicine_availability_finder?retryWrites=true&w=majority";
    const uri = process.env.MONGODB_URI || MONGO_URI_ATLAS;
    console.log('Connecting to database...');
    await mongoose.connect(uri);
    console.log('✅ Connected to database');

    let addedCount = 0;
    let skippedCount = 0;

    const pharmacies = await Pharmacy.find({});
    if (pharmacies.length === 0) {
      console.error('❌ No pharmacies found. Please run main seed first.');
      process.exit(1);
    }

    const inventoryDocs = [];

    console.log(`🚀 Starting incremental seed of ${expandedCatalog.length} medicines...`);

    for (const medData of expandedCatalog) {
      const exists = await Medicine.findOne({ name: medData.name });
      if (exists) {
        skippedCount++;
        continue;
      }

      const newMed = await Medicine.create(medData);
      addedCount++;

      // Distribute to 1-2 random pharmacies
      const randomPharmacies = pharmacies.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 2) + 1);
      
      randomPharmacies.forEach(p => {
        inventoryDocs.push({
          pharmacyId: p._id,
          medicineId: newMed._id,
          stockQuantity: Math.floor(Math.random() * 150) + 10,
          price: Math.floor(Math.random() * 800) + 50,
          expiryDate: new Date(Date.now() + (Math.random() * 500 + 200) * 24 * 60 * 60 * 1000)
        });
      });
    }

    if (inventoryDocs.length > 0) {
      await Inventory.insertMany(inventoryDocs);
    }

    console.log(`\n🎉 CATALOG EXPANSION COMPLETE!`);
    console.log(`- New medicines added: ${addedCount}`);
    console.log(`- Medicines skipped (already exist): ${skippedCount}`);
    console.log(`- New inventory entries created: ${inventoryDocs.length}`);

    process.exit(0);
  } catch (err) {
    console.error('❌ Incremental seeding failed:', err.message);
    process.exit(1);
  }
}

incrementalSeed();

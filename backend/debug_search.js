require('dotenv').config();
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const mongoose = require('mongoose');
const Medicine = require('./models/Medicine');
const Inventory = require('./models/Inventory');

async function debug() {
  await mongoose.connect(process.env.MONGODB_URI);
  const brufen = await Medicine.findOne({ name: /Brufen/i });
  console.log('Brufen:', brufen ? { name: brufen.name, dept: brufen.department } : 'Not found');
  
  const m1 = await Medicine.findOne({ name: /Paracetamol/i });
  console.log('Paracetamol sample:', m1 ? { name: m1.name, dept: m1.department } : 'Not found');

  if (brufen) {
    const alternates = await Medicine.find({ department: brufen.department });
    console.log(`Medicines in ${brufen.department}:`, alternates.length);
    const altIds = alternates.map(a => a._id);
    const inv = await Inventory.find({ medicineId: { $in: altIds }, stockQuantity: { $gt: 0 } });
    console.log(`Available inventory for ${brufen.department}:`, inv.length);
  }
  process.exit(0);
}
debug();

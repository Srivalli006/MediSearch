require('dotenv').config();
const mongoose = require('mongoose');
const seedDatabase = require('./seed');

async function forceSeed() {
  try {
    const uri = process.env.MONGODB_URI;
    console.log('Connecting to MongoDB...', uri.replace(/:([^:@]{3,})@/, ':***@'));
    await mongoose.connect(uri);
    console.log('Connected. Running seed script...');
    await seedDatabase();
    console.log('Seed complete. Exiting...');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
}
forceSeed();

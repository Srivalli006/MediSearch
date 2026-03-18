require('dotenv').config();
const mongoose = require('mongoose');
const seedDatabase = require('./seed');

async function forceSeed() {
  try {
    const uri = process.env.MONGODB_URI;
    if (uri) {
      console.log('Connecting to MongoDB...', uri.replace(/:([^:@]{3,})@/, ':***@'));
      await mongoose.connect(uri);
    } else {
      console.log('MONGODB_URI not found in .env, falling back to In-Memory DB via seed.js logic...');
      // seed.js handles the fallback if called directly or via server.js
    }
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

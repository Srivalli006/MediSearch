require('dotenv').config();
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const mongoose = require('mongoose');
const User = require('./models/User');

async function listUsers() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');
    const users = await User.find({});
    console.log('👥 Users found:', users.length);
    users.forEach(u => {
      console.log(`- ${u.email} | Role: ${u.role} | Verified: ${u.isVerified}`);
    });
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}
listUsers();

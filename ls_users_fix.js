require('dotenv').config({ path: require('path').join(__dirname, 'backend', '.env') });
const mongoose = require('mongoose');
const User = require('./backend/models/User');

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

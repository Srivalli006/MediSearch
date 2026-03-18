require('dotenv').config({ path: './backend/.env' });
const mongoose = require('mongoose');
const User = require('./backend/models/User');

async function checkUsers() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to Atlas');
    const users = await User.find({}, 'email role isVerified');
    console.log('👥 Users in DB:', users.length);
    users.forEach(u => console.log(`- ${u.email} (${u.role}) ${u.isVerified ? '[Verified]' : '[Unverified]'}`));
    process.exit(0);
  } catch (e) {
    console.error('❌ Error:', e.message);
    process.exit(1);
  }
}
checkUsers();

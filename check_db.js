require('dotenv').config({ path: './backend/.env' });
const mongoose = require('mongoose');

async function check() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to:', mongoose.connection.name);
    console.log('Host:', mongoose.connection.host);
    const isAtlas = mongoose.connection.getClient()?.s?.url?.includes('mongodb.net') || false;
    console.log('Is Atlas detected:', isAtlas);
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
check();
